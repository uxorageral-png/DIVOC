import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';

const content = {
  pt: {
    title: 'Envios e Devoluções',
    lastUpdated: 'Última atualização: Março 2026',
    sections: [
      {
        heading: 'Envios',
        subsections: [
          {
            subtitle: 'Portugal Continental',
            text: 'Entrega em 2-3 dias úteis. Envio gratuito para encomendas acima de 50€. Para encomendas abaixo deste valor, o custo de envio é de 4,50€.',
          },
          {
            subtitle: 'Ilhas (Açores e Madeira)',
            text: 'Entrega em 5-7 dias úteis. Custo de envio de 6,50€. Envio gratuito para encomendas acima de 75€.',
          },
          {
            subtitle: 'Europa',
            text: 'Entrega em 5-10 dias úteis. Os custos de envio variam entre 8€ e 15€ dependendo do país. Envio gratuito para encomendas acima de 100€.',
          },
          {
            subtitle: 'Resto do Mundo',
            text: 'Entrega em 10-15 dias úteis. Os custos de envio são calculados no checkout com base no peso e destino.',
          },
        ],
      },
      {
        heading: 'Tracking',
        text: 'Todas as encomendas incluem número de rastreamento. Receberás um email com o link de tracking assim que a encomenda for expedida. Podes acompanhar o estado da entrega em tempo real.',
      },
      {
        heading: 'Devoluções',
        text: 'Aceitamos devoluções até 14 dias após a receção do produto, desde que esteja nas condições originais: sem uso, com etiquetas e na embalagem original. Para iniciar uma devolução, envia um email para returns@divoc.pt com o número da encomenda.',
      },
      {
        heading: 'Trocas',
        text: 'Trocas de tamanho são gratuitas em Portugal Continental. Contacta-nos com o número da encomenda e o tamanho desejado. Enviaremos o novo tamanho assim que recebermos o artigo original.',
      },
      {
        heading: 'Reembolsos',
        text: 'Os reembolsos são processados no prazo de 5-7 dias úteis após a receção e verificação do produto devolvido. O valor será creditado no método de pagamento original.',
      },
    ],
  },
  en: {
    title: 'Shipping & Returns',
    lastUpdated: 'Last updated: March 2026',
    sections: [
      {
        heading: 'Shipping',
        subsections: [
          {
            subtitle: 'Mainland Portugal',
            text: 'Delivery in 2-3 business days. Free shipping on orders over €50. For orders below this amount, shipping costs €4.50.',
          },
          {
            subtitle: 'Islands (Azores & Madeira)',
            text: 'Delivery in 5-7 business days. Shipping cost of €6.50. Free shipping on orders over €75.',
          },
          {
            subtitle: 'Europe',
            text: 'Delivery in 5-10 business days. Shipping costs range from €8 to €15 depending on the country. Free shipping on orders over €100.',
          },
          {
            subtitle: 'Rest of the World',
            text: 'Delivery in 10-15 business days. Shipping costs are calculated at checkout based on weight and destination.',
          },
        ],
      },
      {
        heading: 'Tracking',
        text: 'All orders include a tracking number. You will receive an email with the tracking link once the order has been shipped. You can follow the delivery status in real time.',
      },
      {
        heading: 'Returns',
        text: 'We accept returns up to 14 days after receiving the product, provided it is in original condition: unworn, with tags, and in the original packaging. To initiate a return, send an email to returns@divoc.pt with your order number.',
      },
      {
        heading: 'Exchanges',
        text: 'Size exchanges are free within mainland Portugal. Contact us with your order number and desired size. We will send the new size once we receive the original item.',
      },
      {
        heading: 'Refunds',
        text: 'Refunds are processed within 5-7 business days after receiving and verifying the returned product. The amount will be credited to the original payment method.',
      },
    ],
  },
  fr: {
    title: 'Livraison et Retours',
    lastUpdated: 'Dernière mise à jour : Mars 2026',
    sections: [
      {
        heading: 'Livraison',
        subsections: [
          {
            subtitle: 'Portugal Continental',
            text: 'Livraison en 2-3 jours ouvrables. Livraison gratuite pour les commandes supérieures à 50€. Pour les commandes inférieures, les frais de port sont de 4,50€.',
          },
          {
            subtitle: 'Îles (Açores et Madère)',
            text: 'Livraison en 5-7 jours ouvrables. Frais de port de 6,50€. Livraison gratuite pour les commandes supérieures à 75€.',
          },
          {
            subtitle: 'Europe',
            text: 'Livraison en 5-10 jours ouvrables. Les frais de port varient entre 8€ et 15€ selon le pays. Livraison gratuite pour les commandes supérieures à 100€.',
          },
          {
            subtitle: 'Reste du Monde',
            text: 'Livraison en 10-15 jours ouvrables. Les frais de port sont calculés au moment du paiement en fonction du poids et de la destination.',
          },
        ],
      },
      {
        heading: 'Suivi',
        text: 'Toutes les commandes incluent un numéro de suivi. Vous recevrez un email avec le lien de suivi dès que la commande aura été expédiée. Vous pouvez suivre l\'état de la livraison en temps réel.',
      },
      {
        heading: 'Retours',
        text: 'Nous acceptons les retours jusqu\'à 14 jours après la réception du produit, à condition qu\'il soit dans son état d\'origine : non porté, avec étiquettes et dans l\'emballage d\'origine. Pour initier un retour, envoyez un email à returns@divoc.pt avec votre numéro de commande.',
      },
      {
        heading: 'Échanges',
        text: 'Les échanges de taille sont gratuits au Portugal continental. Contactez-nous avec votre numéro de commande et la taille souhaitée. Nous enverrons la nouvelle taille dès réception de l\'article original.',
      },
      {
        heading: 'Remboursements',
        text: 'Les remboursements sont traités dans un délai de 5-7 jours ouvrables après réception et vérification du produit retourné. Le montant sera crédité sur le moyen de paiement original.',
      },
    ],
  },
};

type SectionType = {
  heading: string;
  text?: string;
  subsections?: { subtitle: string; text: string }[];
};

export default function ShippingPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <Layout>
      <SEO title="Envios e Devoluções" description="Informação sobre envios, prazos de entrega e política de devoluções DIVOC." canonical="/shipping" />
      <div className="min-h-screen bg-background">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <FadeIn>
              <h1 className="font-bebas text-4xl md:text-6xl tracking-wider text-foreground mb-2">
                {c.title}
              </h1>
              <p className="text-sm text-muted-foreground mb-12">{c.lastUpdated}</p>
            </FadeIn>
            <div className="space-y-10">
              {c.sections.map((section: SectionType, i: number) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                  {section.text && (
                    <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                  )}
                  {section.subsections && (
                    <div className="space-y-6 mt-4">
                      {section.subsections.map((sub, j) => (
                        <div key={j} className="pl-4 border-l-2 border-primary/30">
                          <h3 className="text-base font-medium text-foreground mb-1">{sub.subtitle}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
