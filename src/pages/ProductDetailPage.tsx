import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ShoppingBag, ChevronLeft, Heart, Minus, Plus } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
    if (!product || !selectedSize) return null;
    return product.variants.edges.find(v => 
      v.node.selectedOptions.some(opt => 
        opt.name.toLowerCase() === 'size' && opt.value === selectedSize
      )
    )?.node;
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
              {/* Main Image */}
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                {images[selectedImageIndex] ? (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={images[selectedImageIndex].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                    <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 transition-colors",
                        selectedImageIndex === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-muted-foreground/50"
                      )}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
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
              <p className="text-2xl font-bold text-primary mb-6">
                {selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}{' '}
                {parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>

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
                  disabled={!isAvailable || isCartLoading || !selectedSize}
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
        </div>
      </section>
    </Layout>
  );
}
