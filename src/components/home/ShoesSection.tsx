import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { toast } from 'sonner';

export function ShoesSection() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(4, 'product_type:Shoes');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch shoes:', error);
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

  const sectionTitle =
    language === 'fr' ? 'Chaussures' : language === 'en' ? 'Footwear' : 'Calçado';

  if (loading) {
    return (
      <section className="py-24 lg:py-36 bg-background">
        <div className="container mx-auto px-5 lg:px-16">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/40" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-5 lg:px-16">
        <FadeIn>
          <div className="flex items-end justify-between mb-16 lg:mb-20 gap-6 flex-wrap">
            <div>
              <span className="inline-flex items-center gap-4 text-foreground/50 text-[10px] font-medium tracking-[0.4em] uppercase">
                <span className="h-px w-10 bg-foreground/30" />
                {language === 'fr' ? 'Nouveautés' : language === 'en' ? 'New Arrivals' : 'Novidades'}
              </span>
              <h2 className="mt-5 font-editorial italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-foreground">
                {sectionTitle}
              </h2>
            </div>
            <Link
              to="/products/shoes"
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] uppercase text-foreground transition-colors"
            >
              <span className="border-b border-foreground pb-1">
                {language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'Ver tudo'}
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.25} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10"
          staggerDelay={0.1}
        >
          {products.map((product) => {
            const variant = product.node.variants.edges[0]?.node;
            const image = product.node.images.edges[0]?.node;
            const isAvailable = variant?.availableForSale;
            const currentPrice = parseFloat(product.node.priceRange.minVariantPrice.amount);
            const compareAmount = product.node.compareAtPriceRange?.minVariantPrice.amount;
            const comparePrice = compareAmount ? parseFloat(compareAmount) : 0;
            const hasDiscount = comparePrice > currentPrice;
            const discountPercent = hasDiscount
              ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
              : 0;

            return (
              <StaggerItem key={product.node.id}>
                <Link
                  to={`/product/${product.node.handle}`}
                  className="group block"
                >
                  <motion.div
                    className="relative aspect-square overflow-hidden bg-secondary mb-5"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {image ? (
                      <motion.img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}

                    {hasDiscount && (
                      <Badge className="absolute top-4 right-4 bg-background text-foreground rounded-none px-2.5 py-1 text-[9px] font-medium tracking-[0.25em] border border-foreground/10">
                        -{discountPercent}%
                      </Badge>
                    )}

                    <motion.div
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!isAvailable || isCartLoading}
                        className="w-full h-11 rounded-none bg-foreground text-background hover:bg-foreground/90 text-[10px] font-medium tracking-[0.3em] uppercase"
                      >
                        {!isAvailable ? t.products.outOfStock : t.products.addToCart}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <h3 className="text-[13px] font-normal tracking-wide text-foreground mb-1.5 group-hover:opacity-60 transition-opacity">
                    {product.node.title}
                  </h3>
                  <div className="flex items-baseline gap-2.5">
                    <p className="text-[13px] text-foreground/80 font-light">
                      {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                      {currentPrice.toFixed(2)}
                    </p>
                    {hasDiscount && (
                      <p className="text-[12px] text-muted-foreground/70 line-through font-light">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {comparePrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
