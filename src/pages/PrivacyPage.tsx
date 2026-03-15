import { Layout } from '@/components/layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';

const content = {
  pt: {
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: Março 2026',
    sections: [
      {
        heading: '1. Recolha de Dados',
        text: 'A DIVOC recolhe apenas os dados pessoais necessários para processar as tuas encomendas e melhorar a tua experiência de compra. Isto inclui: nome, email, morada de envio, número de telefone e informações de pagamento. Não vendemos nem partilhamos os teus dados com terceiros para fins de marketing.',
      },
      {
        heading: '2. Utilização dos Dados',
        text: 'Utilizamos os teus dados para: processar e enviar encomendas, comunicar o estado das encomendas, enviar a newsletter (apenas com o teu consentimento), melhorar os nossos produtos e serviços, e cumprir obrigações legais.',
      },
      {
        heading: '3. Cookies',
        text: 'O nosso site utiliza cookies essenciais para o funcionamento da loja, cookies analíticos para compreender o tráfego e cookies de preferências para guardar as tuas escolhas (como o idioma). Podes gerir as tuas preferências de cookies a qualquer momento nas definições do browser.',
      },
      {
        heading: '4. Segurança',
        text: 'Todos os pagamentos são processados de forma segura através de encriptação SSL. Não armazenamos dados de cartão de crédito nos nossos servidores. As tuas informações pessoais são protegidas com medidas de segurança técnicas e organizacionais adequadas.',
      },
      {
        heading: '5. Os Teus Direitos',
        text: 'Ao abrigo do RGPD, tens o direito de aceder, retificar, apagar ou limitar o tratamento dos teus dados pessoais. Para exercer qualquer um destes direitos, contacta-nos em privacy@divoc.pt.',
      },
      {
        heading: '6. Contacto',
        text: 'Para questões relacionadas com privacidade, envia um email para privacy@divoc.pt ou utiliza o formulário na nossa página de contacto.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    sections: [
      {
        heading: '1. Data Collection',
        text: 'DIVOC only collects the personal data necessary to process your orders and improve your shopping experience. This includes: name, email, shipping address, phone number, and payment information. We do not sell or share your data with third parties for marketing purposes.',
      },
      {
        heading: '2. Use of Data',
        text: 'We use your data to: process and ship orders, communicate order status, send newsletters (only with your consent), improve our products and services, and comply with legal obligations.',
      },
      {
        heading: '3. Cookies',
        text: 'Our website uses essential cookies for store functionality, analytics cookies to understand traffic, and preference cookies to save your choices (such as language). You can manage your cookie preferences at any time in your browser settings.',
      },
      {
        heading: '4. Security',
        text: 'All payments are processed securely via SSL encryption. We do not store credit card data on our servers. Your personal information is protected with appropriate technical and organizational security measures.',
      },
      {
        heading: '5. Your Rights',
        text: 'Under GDPR, you have the right to access, rectify, erase, or restrict the processing of your personal data. To exercise any of these rights, contact us at privacy@divoc.pt.',
      },
      {
        heading: '6. Contact',
        text: 'For privacy-related questions, email privacy@divoc.pt or use the form on our contact page.',
      },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Mars 2026',
    sections: [
      {
        heading: '1. Collecte des Données',
        text: 'DIVOC ne collecte que les données personnelles nécessaires au traitement de vos commandes et à l\'amélioration de votre expérience d\'achat. Cela comprend : nom, email, adresse de livraison, numéro de téléphone et informations de paiement. Nous ne vendons ni ne partageons vos données avec des tiers à des fins marketing.',
      },
      {
        heading: '2. Utilisation des Données',
        text: 'Nous utilisons vos données pour : traiter et expédier les commandes, communiquer le statut des commandes, envoyer la newsletter (uniquement avec votre consentement), améliorer nos produits et services, et respecter les obligations légales.',
      },
      {
        heading: '3. Cookies',
        text: 'Notre site utilise des cookies essentiels pour le fonctionnement de la boutique, des cookies analytiques pour comprendre le trafic et des cookies de préférences pour sauvegarder vos choix (comme la langue). Vous pouvez gérer vos préférences de cookies à tout moment dans les paramètres de votre navigateur.',
      },
      {
        heading: '4. Sécurité',
        text: 'Tous les paiements sont traités de manière sécurisée via le cryptage SSL. Nous ne stockons pas les données de carte de crédit sur nos serveurs. Vos informations personnelles sont protégées par des mesures de sécurité techniques et organisationnelles appropriées.',
      },
      {
        heading: '5. Vos Droits',
        text: 'En vertu du RGPD, vous avez le droit d\'accéder, de rectifier, d\'effacer ou de limiter le traitement de vos données personnelles. Pour exercer l\'un de ces droits, contactez-nous à privacy@divoc.pt.',
      },
      {
        heading: '6. Contact',
        text: 'Pour toute question relative à la confidentialité, envoyez un email à privacy@divoc.pt ou utilisez le formulaire sur notre page de contact.',
      },
    ],
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <Layout>
      <SEO title="Política de Privacidade" description="Política de privacidade da DIVOC. Como recolhemos e protegemos os teus dados." canonical="/privacy" noindex />
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
              {c.sections.map((section, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
