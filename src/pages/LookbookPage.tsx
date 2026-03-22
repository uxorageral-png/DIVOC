import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const labels: Record<string, Record<string, string>> = {
  pt: { title: 'LOOKBOOK', subtitle: 'Explora a nossa coleção num formato editorial. Cada peça conta uma história.', shopNow: 'Ver Produto', season: 'COLEÇÃO 2024', close: 'Fechar' },
  en: { title: 'LOOKBOOK', subtitle: 'Explore our collection in editorial format. Every piece tells a story.', shopNow: 'View Product', season: 'COLLECTION 2024', close: 'Close' },
  fr: { title: 'LOOKBOOK', subtitle: 'Explorez notre collection en format éditorial. Chaque pièce raconte une histoire.', shopNow: 'Voir le Produit', season: 'COLLECTION 2024', close: 'Fermer' },
};

export default function LookbookPage() {
  const { language } = useLanguage();
  const l = labels[language] || labels.pt;
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; handle: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts(12);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Create a masonry-style layout by assigning different spans
  const getSpan = (i: number) => {
    const pattern = [2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2];
    return pattern[i % pattern.length];
  };

  return (
    <Layout>
      <SEO
        title={l.title}
        description={l.subtitle}
        canonical="/lookbook"
      />
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: l.title },
        ]} />

        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-sm font-medium tracking-[0.3em] text-primary mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {l.season}
            </motion.span>
            <h1 className="text-display-lg font-bold tracking-tight text-foreground mb-4">
              {l.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {l.subtitle}
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[250px] lg:auto-rows-[350px]"
            staggerDelay={0.08}
          >
            {products.map((product, i) => {
              const image = product.node.images.edges[0]?.node;
              if (!image) return null;
              const span = getSpan(i);

              return (
                <StaggerItem
                  key={product.node.id}
                  className={`${span === 2 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}`}
                >
                  <motion.div
                    className="relative group h-full w-full overflow-hidden rounded-lg cursor-pointer bg-secondary"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedImage({ url: image.url, title: product.node.title, handle: product.node.handle })}
                  >
                    <motion.img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-foreground font-semibold text-sm lg:text-base mb-1">
                        {product.node.title}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[85vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-foreground font-bold text-xl">{selectedImage.title}</h3>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to={`/product/${selectedImage.handle}`}>{l.shopNow}</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
