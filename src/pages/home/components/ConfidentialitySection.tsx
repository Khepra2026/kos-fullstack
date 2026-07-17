import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';

export default function ConfidentialitySection() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section
      id="deontologie-confidentialite"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050c18 0%, #0a1525 50%, #050c18 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,42,0.35), rgba(212,168,42,0.15), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Icon & Visual */}
            <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl mb-6"
                style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.25)' }}
              >
                <i className="ri-shield-keyhole-line text-4xl sm:text-5xl" style={{ color: '#86BC25' }} />
              </div>
              <div className="hidden lg:block w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            </div>

            {/* Right: Content */}
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(212,168,42,0.09)', border: '1px solid rgba(212,168,42,0.22)' }}
              >
                <i className="ri-lock-fill text-xs" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                  {isEn ? 'Professional Ethics' : 'Secret professionnel'}
                </span>
              </div>

              <h2
                className="font-playfair font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
              >
                {isEn ? 'Ethics & Strict Confidentiality' : 'Déontologie & Haute Confidentialité'}
              </h2>

              <p className="text-base sm:text-lg leading-relaxed mb-8 text-justify" style={{ color: 'rgba(255,255,255,0.70)' }}>
                {isEn
                  ? 'Due to the strategic, financial, and regulatory nature of the mandates entrusted to Khepra Experts, and in accordance with our code of ethics, we guarantee absolute client anonymity. The non-disclosure of the identity, logos, and operational data of the financial institutions and companies we support is the foundation of our relationship of trust and our professional secrecy commitments.'
                  : "En raison de la nature stratégique, financière et réglementaire des mandats confiés à Khepra Experts, et conformément à notre charte de déontologie, nous garantissons l'anonymat absolu de nos clients. La non-divulgation de l'identité, des logos et des données opérationnelles des institutions financières et entreprises que nous accompagnons est le socle de notre relation de confiance et de nos engagements de secret professionnel."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}
                >
                  <i className="ri-eye-off-line text-sm" style={{ color: '#86BC25' }} />
                  <span className="text-xs font-semibold" style={{ color: '#86BC25' }}>
                    {isEn ? 'No client logos displayed' : 'Aucun logo client exposé'}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}
                >
                  <i className="ri-file-shield-line text-sm" style={{ color: '#86BC25' }} />
                  <span className="text-xs font-semibold" style={{ color: '#86BC25' }}>
                    {isEn ? 'NDA available on request' : 'NDA sur demande'}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}
                >
                  <i className="ri-shield-check-line text-sm" style={{ color: '#86BC25' }} />
                  <span className="text-xs font-semibold" style={{ color: '#86BC25' }}>
                    {isEn ? 'OHADA compliant' : 'Conformité OHADA'}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/charte-deontologique/"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                  style={{ color: '#86BC25' }}
                >
                  {isEn ? 'Read our full Ethics Charter' : 'Consulter la Charte Déontologique complète'}
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}