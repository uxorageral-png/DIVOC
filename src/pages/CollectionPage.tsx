import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { ProductGrid } from '@/components/products/ProductGrid';
import { fetchCollectionByHandle, ShopifyCollection } from '@/lib/shopify';

const FALLBACK_TITLES: Record<string, string> = {
  'men-hoodies': 'Men — Hoodies',
  'men-tshirts': 'Men — T-Shirts',
  'men-shoes': 'Men — Shoes',
  'women-hoodies': 'Women — Hoodies',
  'women-tshirts': 'Women — T-Shirts',
  'women-shoes': 'Women — Shoes',
};

export default function CollectionPage() {
  const { handle = '' } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCollectionByHandle(handle, 50)
      .then((data) => {
        if (!cancelled) setCollection(data);
      })
      .catch((err) => console.error('Failed to fetch collection:', err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [handle]);

  const title = collection?.title || FALLBACK_TITLES[handle] || handle;

  return (
    <Layout>
      <SEO
        title={title}
        description={collection?.description || `${title} — DIVOC.`}
        canonical={`/collections/${handle}`}
      />
      <section className="py-20 lg:py-32 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <CollectionProductGrid title={title} handle={handle} products={collection?.products ?? []} />
          )}
        </div>
      </section>
    </Layout>
  );
}

// Reuse ProductGrid styling by injecting products; ProductGrid currently fetches its own,
// so we render a thin wrapper that mirrors its layout for collection products.
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import type { ShopifyProduct } from '@/lib/shopify';

function CollectionProductGrid({
  title,
  products,
}: {
  title: string;
  handle: string;
  products: ShopifyProduct[];
}) {
  const { t } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

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

  if (products.length === 0) {
    return (
      <div>
        <h1 className="text-display-md font-bold tracking-tight text-foreground mb-12">{title}</h1>
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">{t.products.noProducts}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-display-md font-bold tracking-tight text-foreground mb-12">{title}</h1>
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
            <Link key={product.node.id} to={`/product/${product.node.handle}`} className="group">
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
                  {product.node.priceRange.minVariantPrice.currencyCode} {currentPrice.toFixed(2)}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-muted-foreground line-through">
                    {product.node.priceRange.minVariantPrice.currencyCode} {comparePrice.toFixed(2)}
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