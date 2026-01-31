import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

export function FeaturedProducts() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(8);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

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
    
    toast.success('Added to cart', {
      description: product.node.title,
    });
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-display-md font-bold tracking-tight text-center text-foreground mb-16">
            {t.products.featured}
          </h2>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t.products.noProducts}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-display-md font-bold tracking-tight text-center text-foreground mb-16">
          {t.products.featured}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => {
            const variant = product.node.variants.edges[0]?.node;
            const image = product.node.images.edges[0]?.node;
            const isAvailable = variant?.availableForSale;

            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-4">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Quick Add Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!isAvailable || isCartLoading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {!isAvailable ? t.products.outOfStock : t.products.addToCart}
                    </Button>
                  </div>
                </div>

                <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.node.title}
                </h3>
                <p className="text-primary font-semibold">
                  {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                  {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/products">{t.nav.allProducts}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
