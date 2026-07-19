import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProjetsIndustrielsHero() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section
      className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050c18 0%, #091528 45%, #0d1c36 100%)' }}
    >
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Modern%20African%20industrial%20agro-processing%20facility%20aerial%20view%20organized%20agricultural%20complex%20with%20warehouses%20processing%20units%20trucks%20logistics%20premium%20development%20dark%20charcoal%20lighting%20green%20and%20dark%20charcoal%20tones%20West%20Africa%20dark%20charcoal%20tones%20with%20deloitte%20green%20accent%20lighting%20no%20blue%20no%20purple&width=1920&height=1080&seq=projets-hero-green&orientation=landscape"
          alt="Khepra Experts — Structuration projets industriels Afrique"
          className="w-full h-full object-cover object-top"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(5,12,24,0.92) 0%, rgba(9,21,40,0.85) 45%, rgba(13,28,54,0.70) 100%)' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(212,168,42,0.18) 0%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle at 15% 90%, rgba(34,160,90,0.12) 0%, transparent 55%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(34,160,90,0.09)', border: '1px solid rgba(34,160,90,0.22)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              {isEn ? 'Industrial Projects & Agribusiness · 80+ Projects Structured' : 'Projets Industriels & Agrobusiness · 80+ Projets Structurés'}
            </span>
          </div>

          <h1
            className="font-playfair font-bold text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            {isEn ? (
              <>
                From concept<br />
                <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>to financing.</span>
              </>
            ) : (
              <>
                Du concept<br />
                <span style={{ background: 'linear-gradient(90deg, #f5e199, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>au financement.</span>
              </>
            )}
          </h1>

          <div className="flex items-center gap-3 mb-7">
            <div className="h-px rounded-full" style={{ width: '80px', background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#86BC25' }} />
          </div>

          <p className="mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.7 }}>
            {isEn
              ? 'Project structuring, feasibility studies and ESG compliance for industrial promoters, agribusiness and high-impact projects in Francophone Africa. Bankable from day one.'
              : 'Structuration de projets, études de faisabilité et conformité ESG pour promoteurs industriels, agro-business et projets à fort impact en Afrique francophone. Bankable dès le premier jour.'}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => navigate('/tools/diagnostic-esg-impact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 8px 32px rgba(212,168,42,0.45)' }}
            >
              <i className="ri-leaf-line text-lg" />
              {isEn ? 'ESG Quick Scan — Free' : 'ESG Quick Scan — Gratuit'}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.05)' }}
            >
              <i className="ri-calendar-check-line text-lg" />
              {isEn ? 'Discuss my project' : 'Discuter de mon projet'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              { icon: 'ri-building-2-line', label: isEn ? '80+ projects structured' : '80+ projets structurés', color: '#86BC25' },
              { icon: 'ri-global-line', label: isEn ? '15 Francophone African countries' : '15 pays Afrique francophone', color: '#86BC25' },
              { icon: 'ri-shield-check-line', label: isEn ? 'BAD / IFC / BIDC standards' : 'Standards BAD / IFC / BIDC', color: '#86BC25' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}>
                  <i className={`${t.icon} text-xs`} style={{ color: t.color }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.52)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



