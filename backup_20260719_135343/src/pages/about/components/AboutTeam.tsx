import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';

export function AboutTeam() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <section id="about-team" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fadeSlideUp" delay={0}>
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">
              <i className="ri-team-line"></i>
              {lang === 'fr' ? "Réseau d'Experts" : 'Expert Network'}
            </span>
            <h2 className="section-title">
              {lang === 'fr' ? "Un réseau d'experts mobilisables" : 'A Network of Mobilizable Experts'}
            </h2>
            <div className="section-divider">
              <span className="section-divider-dot"></span>
            </div>
            <p className="section-subtitle">
              {lang === 'fr'
                ? "Au-delà de nos partenaires en consortium, nous mobilisons un réseau étendu d'experts sectoriels pour répondre aux besoins spécifiques de chaque mission."
                : 'Beyond our consortium partners, we mobilize an extensive network of sectoral experts to meet the specific needs of each assignment.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Expertise areas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: 'ri-bank-line',
              title: { fr: 'Finance & Banque', en: 'Finance & Banking' },
              description: { fr: 'Experts en finance d\'entreprise, banque digitale et inclusion financière', en: 'Experts in corporate finance, digital banking and financial inclusion' }
            },
            {
              icon: 'ri-shield-check-line',
              title: { fr: 'Conformité & Risques', en: 'Compliance & Risk' },
              description: { fr: 'Spécialistes en conformité réglementaire, gestion des risques et audit', en: 'Specialists in regulatory compliance, risk management and audit' }
            },
            {
              icon: 'ri-code-s-slash-line',
              title: { fr: 'Technologies & Digital', en: 'Technology & Digital' },
              description: { fr: 'Experts en transformation digitale, cybersécurité et systèmes d\'information', en: 'Experts in digital transformation, cybersecurity and information systems' }
            },
            {
              icon: 'ri-scales-3-line',
              title: { fr: 'Juridique & Réglementaire', en: 'Legal & Regulatory' },
              description: { fr: 'Avocats spécialisés en droit des affaires et conformité réglementaire', en: 'Lawyers specialized in business law and regulatory compliance' }
            },
            {
              icon: 'ri-leaf-line',
              title: { fr: 'ESG & Développement Durable', en: 'ESG & Sustainable Development' },
              description: { fr: 'Experts en sauvegarde environnementale, sociale et gouvernance', en: 'Experts in environmental, social and governance safeguards' }
            },
            {
              icon: 'ri-line-chart-line',
              title: { fr: 'Stratégie & Management', en: 'Strategy & Management' },
              description: { fr: 'Consultants en stratégie d\'entreprise et transformation organisationnelle', en: 'Consultants in corporate strategy and organizational transformation' }
            }
          ].map((area, idx) => (
            <ScrollReveal key={idx} animation="fadeSlideUp" delay={idx * 100}>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-md group-hover:scale-110 transition-transform mb-4">
                  <i className={`${area.icon} text-white text-xl`}></i>
                </div>
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                  {area.title[lang]}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {area.description[lang]}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal animation="fadeSlideUp" delay={200}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              {lang === 'fr'
                ? "Besoin d'une expertise spécifique pour votre projet ?"
                : 'Need specific expertise for your project?'}
            </p>
            <a
              href="/#contact"
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
            >
              {lang === 'fr' ? "Discutons de votre projet" : "Let's discuss your project"}
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}



