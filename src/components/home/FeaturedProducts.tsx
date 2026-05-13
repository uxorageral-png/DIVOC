import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
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
    <section className="py-24 lg:py-36 bg-background">
      <div className="container mx-auto px-5 lg:px-16">
        <FadeIn>
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-4 text-foreground/50 text-[10px] font-medium tracking-[0.4em] uppercase mb-5">
              <span className="h-px w-10 bg-foreground/30" />
              Selection
              <span className="h-px w-10 bg-foreground/30" />
            </span>
            <h2 className="font-editorial italic text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-tight text-foreground">
              {t.products.featured}
            </h2>
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
                    className="relative aspect-[3/4] overflow-hidden bg-secondary mb-5"
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

                    {/* NEW Badge - show on first 2 products */}
                    {products.indexOf(product) < 2 && (
                      <Badge className="absolute top-4 left-4 bg-foreground text-background rounded-none px-2.5 py-1 text-[9px] font-medium tracking-[0.25em]">
                        {t.newBadge}
                      </Badge>
                    )}

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <Badge className="absolute top-4 right-4 bg-background text-foreground rounded-none px-2.5 py-1 text-[9px] font-medium tracking-[0.25em] border border-foreground/10">
                        -{discountPercent}%
                      </Badge>
                    )}
                    
                    {/* Quick Add Button */}
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

        <FadeIn delay={0.4}>
          <div className="text-center mt-16 lg:mt-20">
            <Link
              to="/products"
              className="group inline-flex flex-col items-center gap-2 text-[11px] font-medium tracking-[0.3em] uppercase text-foreground"
            >
              <span>{t.nav.allProducts}</span>
              <span className="block h-px w-full bg-foreground origin-center scale-x-100 transition-transform duration-500 group-hover:scale-x-110" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
