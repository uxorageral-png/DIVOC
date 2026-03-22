import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Info } from 'lucide-react';
import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const sizeDataHoodies = [
  { size: 'S', chest: '96', length: '68', sleeve: '62', shoulder: '44' },
  { size: 'M', chest: '102', length: '70', sleeve: '64', shoulder: '46' },
  { size: 'L', chest: '108', length: '72', sleeve: '66', shoulder: '48' },
  { size: 'XL', chest: '114', length: '74', sleeve: '68', shoulder: '50' },
  { size: 'XXL', chest: '120', length: '76', sleeve: '70', shoulder: '52' },
];

const sizeDataTshirts = [
  { size: 'S', chest: '94', length: '70', sleeve: '20', shoulder: '43' },
  { size: 'M', chest: '100', length: '72', sleeve: '21', shoulder: '45' },
  { size: 'L', chest: '106', length: '74', sleeve: '22', shoulder: '47' },
  { size: 'XL', chest: '112', length: '76', sleeve: '23', shoulder: '49' },
  { size: 'XXL', chest: '118', length: '78', sleeve: '24', shoulder: '51' },
];

const labels: Record<string, Record<string, string>> = {
  pt: { title: 'GUIA DE TAMANHOS', desc: 'Todas as medidas em centímetros (cm). Mede sobre o corpo.', chest: 'Peito', length: 'Comprimento', sleeve: 'Manga', shoulder: 'Ombro', hoodies: 'Hoodies', tshirts: 'T-Shirts', tip: 'Dica: Se estiveres entre dois tamanhos, recomendamos escolher o tamanho maior para um fit mais confortável.', howTo: 'Como medir', howToChest: 'Peito — Mede à volta da parte mais larga do peito.', howToLength: 'Comprimento — Do ponto mais alto do ombro até à bainha.', howToSleeve: 'Manga — Do ombro até ao punho.', howToShoulder: 'Ombro — De uma costura do ombro à outra.' },
  en: { title: 'SIZE GUIDE', desc: 'All measurements in centimeters (cm). Measure over the body.', chest: 'Chest', length: 'Length', sleeve: 'Sleeve', shoulder: 'Shoulder', hoodies: 'Hoodies', tshirts: 'T-Shirts', tip: 'Tip: If you\'re between two sizes, we recommend choosing the larger size for a more comfortable fit.', howTo: 'How to measure', howToChest: 'Chest — Measure around the widest part of your chest.', howToLength: 'Length — From the highest point of the shoulder to the hem.', howToSleeve: 'Sleeve — From shoulder seam to cuff.', howToShoulder: 'Shoulder — From one shoulder seam to the other.' },
  fr: { title: 'GUIDE DES TAILLES', desc: 'Toutes les mesures en centimètres (cm). Mesurez sur le corps.', chest: 'Poitrine', length: 'Longueur', sleeve: 'Manche', shoulder: 'Épaule', hoodies: 'Hoodies', tshirts: 'T-Shirts', tip: 'Conseil : Si vous hésitez entre deux tailles, nous recommandons la taille supérieure pour un fit plus confortable.', howTo: 'Comment mesurer', howToChest: 'Poitrine — Mesurez autour de la partie la plus large de votre poitrine.', howToLength: 'Longueur — Du point le plus haut de l\'épaule à l\'ourlet.', howToSleeve: 'Manche — De la couture de l\'épaule au poignet.', howToShoulder: 'Épaule — D\'une couture d\'épaule à l\'autre.' },
};

function SizeTable({ data, l }: { data: typeof sizeDataHoodies; l: Record<string, string> }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary/50">
            <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">Size</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-primary uppercase tracking-wider">{l.chest}</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-primary uppercase tracking-wider">{l.length}</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-primary uppercase tracking-wider">{l.sleeve}</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-primary uppercase tracking-wider">{l.shoulder}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={row.size}
              className="border-t border-border transition-colors"
              onHoverStart={() => setHoveredRow(i)}
              onHoverEnd={() => setHoveredRow(null)}
              animate={{
                backgroundColor: hoveredRow === i ? 'hsl(43 74% 49% / 0.08)' : 'transparent',
              }}
            >
              <td className="px-6 py-4 text-foreground font-bold text-lg">{row.size}</td>
              <td className="px-6 py-4 text-center text-muted-foreground">{row.chest}</td>
              <td className="px-6 py-4 text-center text-muted-foreground">{row.length}</td>
              <td className="px-6 py-4 text-center text-muted-foreground">{row.sleeve}</td>
              <td className="px-6 py-4 text-center text-muted-foreground">{row.shoulder}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  const { language } = useLanguage();
  const l = labels[language] || labels.pt;

  return (
    <Layout>
      <SEO
        title={l.title}
        description={l.desc}
        canonical="/size-guide"
      />
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: l.title },
        ]} />

        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-6">
              <Ruler className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-display-md font-bold tracking-tight text-foreground mb-4">
              {l.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {l.desc}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs defaultValue="hoodies" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/30">
              <TabsTrigger value="hoodies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                {l.hoodies}
              </TabsTrigger>
              <TabsTrigger value="tshirts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                {l.tshirts}
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="hoodies" asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SizeTable data={sizeDataHoodies} l={l} />
                </motion.div>
              </TabsContent>
              <TabsContent value="tshirts" asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SizeTable data={sizeDataTshirts} l={l} />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="max-w-3xl mx-auto mt-12 space-y-8">
            {/* How to measure */}
            <div className="rounded-lg border border-border p-6 bg-card">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" />
                {l.howTo}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>{l.howToChest}</li>
                <li>{l.howToLength}</li>
                <li>{l.howToSleeve}</li>
                <li>{l.howToShoulder}</li>
              </ul>
            </div>

            {/* Tip */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 flex gap-4 items-start">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{l.tip}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
}
