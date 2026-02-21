import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations';

const lifestyleImages = [
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop', alt: 'Streetwear look 1' },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=750&fit=crop', alt: 'Streetwear look 2' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop', alt: 'Streetwear look 3' },
  { src: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=600&h=750&fit=crop', alt: 'Streetwear look 4' },
  { src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=750&fit=crop', alt: 'Streetwear look 5' },
  { src: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=750&fit=crop', alt: 'Streetwear look 6' },
];

export function InstagramSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="h-6 w-6 text-primary" />
              <h2 className="text-display-md font-bold tracking-tight text-foreground">
                {t.instagram.title}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t.instagram.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {lifestyleImages.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-[3/4] overflow-hidden rounded-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
