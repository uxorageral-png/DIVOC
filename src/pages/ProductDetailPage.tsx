import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ShoppingBag, ChevronLeft, ChevronRight, Heart, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { RelatedProducts } from '@/components/products/RelatedProducts';

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const { t } = useLanguage();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        // Auto-select first available size
        if (data?.options) {
          const sizeOption = data.options.find(opt => opt.name.toLowerCase() === 'size');
          if (sizeOption?.values) {
            // Find first available size
            const firstAvailableSize = sizeOption.values.find(size => {
              const variant = data.variants.edges.find(v =>
                v.node.selectedOptions.some(opt => 
                  opt.name.toLowerCase() === 'size' && opt.value === size
                )
              )?.node;
              return variant?.availableForSale ?? false;
            });
            setSelectedSize(firstAvailableSize || sizeOption.values[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [handle]);

  const getSelectedVariant = () => {
    if (!product) return null;
    // If the product has a size option, match by selected size
    if (selectedSize) {
      const match = product.variants.edges.find(v =>
        v.node.selectedOptions.some(opt =>
          opt.name.toLowerCase() === 'size' && opt.value === selectedSize
        )
      )?.node;
      if (match) return match;
    }
    // Fallback: product has no size option (e.g. single default variant)
    return product.variants.edges[0]?.node ?? null;
  };

  const handleAddToCart = async () => {
    const variant = getSelectedVariant();
    if (!variant || !product) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    
    toast.success(t.cart.added, {
      description: `${product.title} - ${selectedSize} × ${quantity}`,
    });
    
    // Reset quantity after adding
    setQuantity(1);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const selectedVariant = getSelectedVariant();
  const isAvailable = selectedVariant?.availableForSale ?? false;
  const images = product?.images.edges || [];
  const sizeOption = product?.options.find(opt => opt.name.toLowerCase() === 'size');

  const currentAmount = parseFloat(
    selectedVariant?.price.amount || product?.priceRange.minVariantPrice.amount || '0'
  );
  const compareAmount = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : product?.compareAtPriceRange?.minVariantPrice.amount
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : 0;
  const hasDiscount = compareAmount > currentAmount;
  const discountPercent = hasDiscount
    ? Math.round(((compareAmount - currentAmount) / compareAmount) * 100)
    : 0;
  const currencyCode =
    selectedVariant?.price.currencyCode ||
    product?.priceRange.minVariantPrice.currencyCode ||
    '';

  if (loading) {
    return (
      <Layout>
        <section className="py-20 lg:py-32 bg-background min-h-screen">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-center items-center py-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <section className="py-20 lg:py-32 bg-background min-h-screen">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{t.products.noProducts}</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/products">{t.nav.allProducts}</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 lg:py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link 
            to="/products" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t.nav.allProducts}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image with Navigation Arrows */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary group">
                <AnimatePresence mode="wait">
                  {images[selectedImageIndex] ? (
                    <motion.img
                      key={selectedImageIndex}
                      src={images[selectedImageIndex].node.url}
                      alt={images[selectedImageIndex].node.altText || product.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                    </div>
                  )}
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 transition-all duration-200",
                        selectedImageIndex === index
                          ? "border-primary ring-1 ring-primary/30"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-muted-foreground/50"
                      )}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Product Type Badge */}
              {product.productType && (
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.productType}
                </p>
              )}

              {/* Title */}
              <h1 className="text-display-md font-bold tracking-tight text-foreground mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                <p className="text-2xl font-bold text-primary">
                  {currencyCode} {currentAmount.toFixed(2)}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-lg text-muted-foreground line-through">
                      {currencyCode} {compareAmount.toFixed(2)}
                    </p>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-bold tracking-wider">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-2">{t.product.description}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || 'Premium streetwear crafted with attention to detail and quality materials.'}
                </p>
              </div>

              {/* Size Selector */}
              {sizeOption && (
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3">{t.product.size}</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOption.values.map((size) => {
                      const sizeVariant = product.variants.edges.find(v =>
                        v.node.selectedOptions.some(opt => 
                          opt.name.toLowerCase() === 'size' && opt.value === size
                        )
                      )?.node;
                      const isSizeAvailable = sizeVariant?.availableForSale ?? true;

                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={!isSizeAvailable}
                          className={cn(
                            "min-w-[3rem] px-4 py-3 rounded-md border-2 font-medium transition-all",
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : isSizeAvailable
                                ? "border-border hover:border-primary text-foreground"
                                : "border-border/50 text-muted-foreground/50 cursor-not-allowed line-through"
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-3">{t.product.quantity}</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-border hover:border-primary"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-semibold text-foreground">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-border hover:border-primary"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!isAvailable || isCartLoading || (!!sizeOption && !selectedSize)}
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-semibold"
                >
                  {isCartLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : !isAvailable ? (
                    t.products.outOfStock
                  ) : (
                    t.products.addToCart
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 w-14 border-border hover:border-primary hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Product Details */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">{t.product.details}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium quality materials</li>
                  <li>• Designed in Portugal</li>
                  <li>• Regular fit</li>
                  <li>• Machine washable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts 
            currentHandle={handle || ''} 
            productType={product.productType} 
          />
        </div>
      </section>
    </Layout>
  );
}
