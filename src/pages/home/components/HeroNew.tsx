import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/base/OptimizedImage';

const CALENDLY_URL = 'https://calendly.com/essochamanu/consultation-strategique-30min';

function openCalendly() {
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}

const POLES = [
  {
    id: 'bu1-regulation',
    icon: 'ri-shield-check-line',
    labelFr: 'Régulation Financière & Conformité',
    labelEn: 'Financial Regulation & Compliance',
    hookFr: 'BCEAO · COBAC · LBC/FT · Agrément · Veille 24/7 — Bouclier Réglementaire',
    hookEn: 'BCEAO · COBAC · AML/CFT · Licensing · 24/7 Watch — Regulatory Shield',
    href: '/kos-bu1-financial-regulation',
    accent: '#D4AF37',
  },
  {
    id: 'bu2-governance',
    icon: 'ri-government-line',
    labelFr: 'Gouvernance & Due Diligence',
    labelEn: 'Governance & Due Diligence',
    hookFr: 'Performance Boards · DD Full Scope · Conseil CA · KOS REGTECH AI Investability Score™',
    hookEn: 'Board Performance · Full Scope DD · Board Advisory · KOS REGTECH AI Investability Score™',
    href: '/kos-bu2-governance-due-diligence',
    accent: '#86BC25',
  },
  {
    id: 'bu3-climate',
    icon: 'ri-leaf-line',
    labelFr: 'Climat, Transition & ESG',
    labelEn: 'Climate, Transition & ESG',
    hookFr: 'Bilan Carbone · ISSB/GRI/CSRD · Financements Verts — Ingénierie de Décarbonation',
    hookEn: 'Carbon Footprint · ISSB/GRI/CSRD · Green Finance — Decarbonation Engineering',
    href: '/kos-bu3-climate-esg',
    accent: '#2E8B57',
  },
  {
    id: 'bu4-kbr',
    icon: 'ri-line-chart-line',
    labelFr: 'KBR-Model & Intelligence d\'Affaires',
    labelEn: 'KBR-Model & Business Intelligence',
    hookFr: 'Études Sectorielles · Monographies · Rapports High-Ticket — 3 Niveaux KBR',
    hookEn: 'Sector Studies · Monographs · High-Ticket Reports — 3 KBR Levels',
    href: '/kos-bu4-kbr-model',
    accent: '#c9a227',
  },
];

const STATS = [
  { value: '22', suffix: '', unit: '', labelFr: 'ans d\'expertise', labelEn: 'years expertise', icon: 'ri-time-line' },
  { value: 'UEMOA', suffix: '', unit: '', labelFr: '+ zone CEMAC', labelEn: '+ CEMAC zone', icon: 'ri-global-line' },
  { value: 'OHADA', suffix: '', unit: '', labelFr: 'cadre juridique', labelEn: 'legal framework', icon: 'ri-shield-check-line' },
  { value: 'Intl.', suffix: '', unit: '', labelFr: 'standards adaptés', labelEn: 'adapted standards', icon: 'ri-award-line' },
];

export default function HeroNew() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterStarted = useRef(false);

  useEffect(() => {
    const targets = [22, 0, 0, 0];
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !counterStarted.current) {
        counterStarted.current = true;
        targets.forEach((target, i) => {
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCounters(prev => {
              const next = [...prev];
              next[i] = Math.floor(current);
              return next;
            });
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        });
      }
    }, { threshold: 0.3 });
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #080c14 0%, #0c1420 30%, #111b2a 60%, #0a101c 100%)' }}
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://readdy.ai/api/search-image?query=Premium%20corporate%20law%20firm%20boardroom%20gold%20accents%20dark%20charcoal%20walls%20African%20financial%20district%20skyline%20viewed%20through%20panoramic%20floor%20to%20ceiling%20windows%20senior%20partners%20reviewing%20regulatory%20compliance%20documents%20green%20and%20gold%20color%20palette%20institutional%20photography%20professional%20atmosphere%20no%20people%20visible%20focused%20on%20architecture%20lighting%20and%20luxury%20materials&width=1920&height=1080&seq=khepra-hero-4bu-v2&orientation=landscape"
          alt="KHEPRA EXPERTS — 4 Business Units — Standards Internationaux adaptés à l'Afrique : Régulation Financière, Gouvernance, Climat ESG, KBR-Model"
          className="w-full h-full"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          responsive
          sizes="100vw"
          placeholder="none"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, rgba(4,8,18,0.94) 0%, rgba(6,12,24,0.88) 40%, rgba(8,16,32,0.78) 100%)' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 15%, rgba(134,188,37,0.15) 0%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 90%, rgba(212,175,55,0.10) 0%, transparent 55%)' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(212,175,55,0.9) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full animate-fadeIn" style={{ background: 'rgba(134,188,37,0.08)', border: '1px solid rgba(134,188,37,0.18)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>
              {isEn ? 'International Standards — UEMOA · CEMAC · OHADA' : 'Standards Internationaux — UEMOA · CEMAC · OHADA'}
            </span>
          </div>

          <h1
            className="font-playfair font-bold text-white mb-5 max-w-4xl animate-fadeIn leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4.2vw, 3.2rem)', letterSpacing: '-0.025em', lineHeight: 1.12 }}
          >
            {isEn ? (
              <>
                {'Financial regulation, '}
                <span style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 60%, #a5d936 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  governance, climate ESG
                </span>
                {' and KBR-Model intelligence in Francophone Africa'}
              </>
            ) : (
              <>
                {'Régulation financière, '}
                <span style={{ background: 'linear-gradient(135deg, #86BC25 0%, #D4AF37 60%, #a5d936 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  gouvernance, climat ESG
                </span>
                {' et intelligence KBR-Model en Afrique francophone'}
              </>
            )}
          </h1>

          <p
            className="mb-10 text-base md:text-lg font-medium max-w-3xl animate-fadeIn leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', animationDelay: '0.15s' }}
          >
            {isEn
              ? 'Advisory for banks, microfinance institutions, fintechs and family groups — 4 reconfigured Business Units. Financial Regulation, Governance, Climate ESG and KBR-Model. No public pricing — everything is on confidential quote.'
              : 'Conseil aux banques, institutions de microfinance, fintechs et groupes familiaux — 4 Business Units reconfigurées. Régulation Financière, Gouvernance, Climat ESG et KBR-Model. Aucun prix public — tout est sur devis confidentiel.'}
          </p>

          {/* 4 BUs */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            {POLES.map((pole) => (
              <button
                key={pole.id}
                onClick={() => navigate(pole.href)}
                className="group relative rounded-2xl p-5 text-left cursor-pointer transition-all duration-500 hover:-translate-y-1 flex flex-col gap-3"
                aria-label={isEn ? pole.labelEn : pole.labelFr}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = `${pole.accent}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: `${pole.accent}15`, border: `1px solid ${pole.accent}25` }}>
                  <i className={`${pole.icon} text-lg`} style={{ color: pole.accent }} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block mb-1 group-hover:underline">
                    {isEn ? pole.labelEn : pole.labelFr}
                  </span>
                  <span className="text-xs leading-relaxed block" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {isEn ? pole.hookEn : pole.hookFr}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                  <span className="text-xs font-semibold" style={{ color: pole.accent }}>
                    {isEn ? 'Explore' : 'Explorer'}
                  </span>
                  <i className="ri-arrow-right-line text-xs" style={{ color: pole.accent }} />
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 mb-10 animate-fadeIn" style={{ animationDelay: '0.45s' }}>
            <button
              onClick={openCalendly}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #86BC25 0%, #a5d936 50%, #86BC25 100%)',
                color: '#080c14',
                boxShadow: '0 8px 32px rgba(134,188,37,0.45)',
              }}
              aria-label={isEn ? 'Book a strategic consultation' : 'Réserver un entretien stratégique'}
            >
              <i className="ri-calendar-check-line text-lg" />
              <span>{isEn ? 'Book a strategic consultation' : 'Réserver un entretien stratégique'}</span>
            </button>
          </div>

          <p className="text-xs animate-fadeIn" style={{ color: 'rgba(255,255,255,0.60)', animationDelay: '0.55s' }}>
            {isEn
              ? 'Confidential · Free consultation · Senior expert · 22 years of expertise · International Standards'
              : 'Confidentiel · Consultation offerte · Expert senior · 22 ans d\'expertise · Standards Internationaux'}
          </p>

          <div className="w-full max-w-4xl mt-12 mb-0 flex items-center gap-3 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.18))' }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {isEn ? 'Key Figures' : 'Chiffres clés'}
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(134,188,37,0.18), transparent)' }} />
          </div>

          <div ref={counterRef} className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 animate-fadeIn" style={{ animationDelay: '0.65s' }}>
            {STATS.map((s, i) => (
              <div key={i} className="rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="font-playfair text-2xl md:text-3xl font-bold mb-1" style={{ color: '#86BC25' }}>
                  {typeof s.value === 'number' ? <>{counters[i]}{s.suffix}</> : <>{s.value}{s.suffix}</>}
                  {s.unit && <span className="text-sm font-medium ml-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.unit}</span>}
                </div>
                <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {isEn ? s.labelEn : s.labelFr}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {isEn ? 'Discover' : 'Découvrir'}
        </span>
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(134,188,37,0.2)' }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#86BC25' }} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(134,188,37,0.28) 38.2%, rgba(212,175,55,0.20) 61.8%, transparent 100%)' }}
      />
    </section>
  );
}