import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductGridProps {
  query?: string;
  title: string;
}

export function ProductGrid({ query, title }: ProductGridProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(50, query);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [query]);

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
    
    toast.success(t.cart.added, {
      description: product.node.title,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">{t.products.noProducts}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-display-md font-bold tracking-tight text-foreground mb-12">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
                  <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {hasDiscount && (
                  <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold tracking-wider">
                    -{discountPercent}%
                  </Badge>
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
              <p className="text-sm text-muted-foreground mb-1">
                {product.node.productType || product.node.variants.edges[0]?.node.title}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-primary font-semibold">
                  {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                  {currentPrice.toFixed(2)}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-muted-foreground line-through">
                    {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                    {comparePrice.toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
