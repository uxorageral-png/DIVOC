import { Layout } from '@/components/layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeIn } from '@/components/animations/FadeIn';

const content = {
  pt: {
    title: 'Termos e Condições',
    lastUpdated: 'Última atualização: Março 2026',
    sections: [
      {
        heading: '1. Disposições Gerais',
        text: 'Ao acederes e utilizares o site divoc.pt, aceitas estar vinculado a estes Termos e Condições. A DIVOC reserva-se o direito de alterar estes termos a qualquer momento, sendo as alterações publicadas nesta página.',
      },
      {
        heading: '2. Produtos e Preços',
        text: 'Todos os preços apresentados incluem IVA à taxa legal em vigor. A DIVOC reserva-se o direito de alterar preços sem aviso prévio. As imagens dos produtos são ilustrativas e podem apresentar ligeiras diferenças em relação ao produto real (cor, textura) devido a variações de ecrã.',
      },
      {
        heading: '3. Encomendas',
        text: 'Ao realizares uma encomenda, estás a fazer uma oferta de compra. A DIVOC reserva-se o direito de recusar ou cancelar qualquer encomenda por motivos de stock, erro de preço ou suspeita de fraude. Receberás um email de confirmação após a validação da encomenda.',
      },
      {
        heading: '4. Pagamento',
        text: 'Aceitamos pagamento por cartão de crédito/débito (Visa, Mastercard), PayPal e MB Way. O pagamento é processado no momento da encomenda. Todos os pagamentos são seguros e encriptados via SSL.',
      },
      {
        heading: '5. Propriedade Intelectual',
        text: 'Todo o conteúdo do site — incluindo logótipos, designs, textos, imagens e gráficos — é propriedade da DIVOC e está protegido por direitos de autor. É proibida a reprodução, distribuição ou utilização sem autorização prévia por escrito.',
      },
      {
        heading: '6. Limitação de Responsabilidade',
        text: 'A DIVOC não será responsável por danos indiretos, incidentais ou consequentes resultantes da utilização do site ou dos produtos. A nossa responsabilidade máxima está limitada ao valor da encomenda em questão.',
      },
      {
        heading: '7. Lei Aplicável',
        text: 'Estes Termos e Condições são regidos pela legislação portuguesa. Qualquer litígio será submetido à jurisdição exclusiva dos tribunais portugueses.',
      },
    ],
  },
  en: {
    title: 'Terms & Conditions',
    lastUpdated: 'Last updated: March 2026',
    sections: [
      {
        heading: '1. General Provisions',
        text: 'By accessing and using the divoc.pt website, you agree to be bound by these Terms and Conditions. DIVOC reserves the right to modify these terms at any time, with changes published on this page.',
      },
      {
        heading: '2. Products and Prices',
        text: 'All prices displayed include VAT at the legal rate in force. DIVOC reserves the right to change prices without prior notice. Product images are illustrative and may show slight differences from the actual product (colour, texture) due to screen variations.',
      },
      {
        heading: '3. Orders',
        text: 'By placing an order, you are making an offer to purchase. DIVOC reserves the right to refuse or cancel any order due to stock issues, pricing errors, or suspected fraud. You will receive a confirmation email once the order is validated.',
      },
      {
        heading: '4. Payment',
        text: 'We accept payment by credit/debit card (Visa, Mastercard), PayPal, and MB Way. Payment is processed at the time of order. All payments are secure and encrypted via SSL.',
      },
      {
        heading: '5. Intellectual Property',
        text: 'All website content — including logos, designs, texts, images, and graphics — is the property of DIVOC and is protected by copyright. Reproduction, distribution, or use without prior written authorization is prohibited.',
      },
      {
        heading: '6. Limitation of Liability',
        text: 'DIVOC shall not be liable for indirect, incidental, or consequential damages resulting from use of the website or products. Our maximum liability is limited to the value of the order in question.',
      },
      {
        heading: '7. Governing Law',
        text: 'These Terms and Conditions are governed by Portuguese law. Any disputes shall be submitted to the exclusive jurisdiction of the Portuguese courts.',
      },
    ],
  },
  fr: {
    title: 'Conditions Générales',
    lastUpdated: 'Dernière mise à jour : Mars 2026',
    sections: [
      {
        heading: '1. Dispositions Générales',
        text: 'En accédant et en utilisant le site divoc.pt, vous acceptez d\'être lié par ces Conditions Générales. DIVOC se réserve le droit de modifier ces conditions à tout moment, les modifications étant publiées sur cette page.',
      },
      {
        heading: '2. Produits et Prix',
        text: 'Tous les prix affichés incluent la TVA au taux légal en vigueur. DIVOC se réserve le droit de modifier les prix sans préavis. Les images des produits sont illustratives et peuvent présenter de légères différences par rapport au produit réel (couleur, texture) en raison des variations d\'écran.',
      },
      {
        heading: '3. Commandes',
        text: 'En passant une commande, vous faites une offre d\'achat. DIVOC se réserve le droit de refuser ou d\'annuler toute commande en raison de problèmes de stock, d\'erreurs de prix ou de suspicion de fraude. Vous recevrez un email de confirmation une fois la commande validée.',
      },
      {
        heading: '4. Paiement',
        text: 'Nous acceptons le paiement par carte de crédit/débit (Visa, Mastercard), PayPal et MB Way. Le paiement est traité au moment de la commande. Tous les paiements sont sécurisés et cryptés via SSL.',
      },
      {
        heading: '5. Propriété Intellectuelle',
        text: 'Tout le contenu du site — y compris les logos, designs, textes, images et graphiques — est la propriété de DIVOC et est protégé par le droit d\'auteur. La reproduction, la distribution ou l\'utilisation sans autorisation écrite préalable est interdite.',
      },
      {
        heading: '6. Limitation de Responsabilité',
        text: 'DIVOC ne sera pas responsable des dommages indirects, accessoires ou consécutifs résultant de l\'utilisation du site ou des produits. Notre responsabilité maximale est limitée à la valeur de la commande en question.',
      },
      {
        heading: '7. Loi Applicable',
        text: 'Ces Conditions Générales sont régies par la législation portugaise. Tout litige sera soumis à la juridiction exclusive des tribunaux portugais.',
      },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <Layout>
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
