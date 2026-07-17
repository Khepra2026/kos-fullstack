export default function GuideFAQ() {
  const faqs = [
    {
      question: 'Qu\'est-ce que le référencement IA (AIO) ?',
      answer: 'Le référencement IA, ou AIO (AI Optimization), consiste à optimiser votre contenu pour être cité par les moteurs d\'intelligence artificielle comme ChatGPT, Gemini et Copilot. Contrairement au SEO classique qui vise le positionnement dans Google, l\'AIO vise la visibilité dans les réponses générées par l\'IA. Le guide explique les techniques concrètes pour structurer vos données et votre contenu afin d\'être reconnu comme source de référence en Afrique francophone.',
    },
    {
      question: 'Le guide est-il vraiment gratuit ?',
      answer: 'Oui, le guide est entièrement gratuit. Il suffit de renseigner votre adresse email professionnelle pour recevoir le PDF immédiatement par email. Aucun paiement ni engagement n\'est requis. C\'est un outil de partage de connaissances que KHEPRA EXPERTS met à disposition des dirigeants et professionnels du digital en Afrique.',
    },
    {
      question: 'Quels pays d\'Afrique francophone sont couverts ?',
      answer: 'Le guide couvre l\'ensemble des marchés francophones africains : UEMOA (Togo, Bénin, Côte d\'Ivoire, Burkina Faso, Sénégal, Mali, Niger, Guinée-Bissau), CEMAC (Cameroun, Gabon, Congo, Tchad, RCA, Guinée Équatoriale), ainsi que la RDC, Madagascar, Maurice et les Comores. Les stratégies sont adaptées aux spécificités de chaque zone réglementaire.',
    },
    {
      question: 'Quel niveau technique faut-il pour appliquer ce guide ?',
      answer: 'Le guide est conçu pour être accessible à tous les niveaux. Les chapitres sont progressifs : du SEO fondamental (accessible aux débutants) aux stratégies avancées d\'AIO (pour les équipes marketing expérimentées). Chaque section contient des checklists actionnables et des outils recommandés.',
    },
    {
      question: 'Puis-je partager ce guide avec mon équipe ?',
      answer: 'Oui, vous pouvez partager le guide au sein de votre entreprise. Cependant, nous vous encourageons à ce que chaque membre de l\'équipe s\'inscrive individuellement pour recevoir les mises à jour futures et les nouvelles éditions du guide.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.35)' }}>
            <i className="ri-questionnaire-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Questions fréquentes</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Tout ce que vous devez savoir avant de télécharger votre guide SEO & IA en Afrique francophone.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,168,42,0.1)' }}
            >
              <h3 className="font-bold text-base text-white mb-3 flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold" style={{ background: 'rgba(212,168,42,0.15)', color: '#86BC25' }}>
                  {i + 1}
                </span>
                {faq.question}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed pl-9">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}