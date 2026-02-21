import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { FadeIn } from '@/components/animations';
import { toast } from 'sonner';

interface RelatedProductsProps {
  currentHandle: string;
  productType?: string;
}

export function RelatedProducts({ currentHandle, productType }: RelatedProductsProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function load() {
      try {
        const query = productType ? `product_type:${productType}` : undefined;
        const data = await fetchProducts(8, query);
        const filtered = data.filter(p => p.node.handle !== currentHandle).slice(0, 4);
        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentHandle, productType]);

  const handleAddToCart = async (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant || !variant.availableForSale) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(t.cart.added, { description: product.node.title });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 border-t border-border">
      <FadeIn>
        <h2 className="text-display-sm font-bold tracking-tight text-foreground mb-10 text-center">
          {t.relatedProducts.title}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => {
          const variant = product.node.variants.edges[0]?.node;
          const image = product.node.images.edges[0]?.node;
          const isAvailable = variant?.availableForSale;

          return (
            <Link key={product.node.id} to={`/product/${product.node.handle}`} className="group block">
              <motion.div
                className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-3"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {image ? (
                  <img
                    src={image.url}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}

                <motion.div
                  className="absolute bottom-3 left-3 right-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <Button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!isAvailable || isCartLoading}
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {!isAvailable ? t.products.outOfStock : t.products.addToCart}
                  </Button>
                </motion.div>
              </motion.div>

              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {product.node.title}
              </h3>
              <p className="text-primary text-sm font-semibold">
                {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
