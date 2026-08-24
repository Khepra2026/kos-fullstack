import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/base/OptimizedImage';

const ROTATING_WORDS_FR = ['Gouvernance', 'Performance', 'Structuration', 'Transformation'];
const ROTATING_WORDS_EN = ['Governance', 'Performance', 'Structuring', 'Transformation'];

export default function AboutHeroNew() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const ROTATING_WORDS = isEn ? ROTATING_WORDS_EN : ROTATING_WORDS_FR;
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % ROTATING_WORDS.length); setVisible(true); }, 300);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const iv = setInterval(() => { n = Math.min(n + 1, 22); setCount(n); if (n >= 22) clearInterval(iv); }, 80);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Subtle background */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://readdy.ai/api/search-image?query=African%20executive%20boardroom%20premium%20dark%20elegant%20minimal%20corporate%20environment%20Lom%C3%A9%20Togo%20strategic%20consulting%20firm%20partners%20discussion%20warm%20amber%20light&width=1920&height=1080&seq=about-hero-v3&orientation=landscape"
          alt=""
          className="w-full h-full opacity-20"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          objectFit="cover"
          loading="eager"
          fetchpriority="high"
          placeholder="none"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.90) 60%, rgba(10,10,10,0.85) 100%)' }} />
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,162,39,0.4), transparent)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* LEFT — 7 cols */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#86BC25' }}>
                {isEn ? 'Pan-African consulting firm' : 'Cabinet de conseil panafricain'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair font-bold text-white mb-8" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {isEn ? <>Your decisions<br />deserve<br /></> : <>Vos décisions<br />méritent une<br /></>}
              <span
                className="transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #f5e199, #86BC25)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: visible ? 1 : 0,
                  display: 'inline-block',
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                {ROTATING_WORDS[wordIdx]}
              </span>
              <br />{isEn ? 'of the highest added value.' : 'à haute valeur ajoutée.'}
            </h1>

            {/* Single sharp statement */}
            <p className="text-lg mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300 }}>
              {isEn
                ? 'Founded in 2026 by an expert with 22 years of field experience in Africa — Khepra Experts structures what your competitors leave to chance.'
                : 'Fondé en 2026 par un expert fort de 22 ans de terrain en Afrique — Khepra Experts structure ce que vos concurrents laissent au hasard.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/tools/diagnostic-organisationnel')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
              >
                <i className="ri-stethoscope-line" />
                {isEn ? 'Free diagnostic' : 'Diagnostic gratuit'}
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                {isEn ? 'Talk to an expert' : 'Parler à un expert'}
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>

          {/* RIGHT — 5 cols */}
          <div className="lg:col-span-5" ref={ref}>
            {/* Stats — minimal cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { n: `${count}`, suffix: isEn ? ' yrs' : ' ans', label: isEn ? 'founder experience' : "d'expérience fondateur", icon: 'ri-user-star-line', accent: '#86BC25' },
                { n: '20+', suffix: '', label: isEn ? 'WAEMU & CEMAC countries' : 'pays UEMOA & CEMAC', icon: 'ri-global-line', accent: '#86BC25' },
                { n: '500+', suffix: '', label: isEn ? 'field missions' : 'missions terrain', icon: 'ri-briefcase-line', accent: '#86BC25' },
                { n: '100%', suffix: '', label: isEn ? 'guaranteed compliance' : 'conformité garantie', icon: 'ri-shield-check-line', accent: '#86BC25' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.accent}18` }}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg mb-3" style={{ background: `${s.accent}15` }}>
                    <i className={`${s.icon} text-base`} style={{ color: s.accent }} />
                  </div>
                  <div className="font-playfair text-3xl font-bold leading-none mb-1.5" style={{ color: s.accent }}>
                    {s.n}{s.suffix}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.40)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Founder strip */}
            <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.18)' }}>
              <div className="w-12 h-12 rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: 'rgba(201,162,39,0.4)' }}>
                <OptimizedImage
                  src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg"
                  alt="SIMDA Essoyomèwè"
                  className="w-full h-full"
                  width={48}
                  height={48}
                  aspectRatio="1/1"
                  objectFit="cover"
                  loading="lazy"
                  placeholder="pulse"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">SIMDA Essoyomèwè</p>
                <p className="text-xs" style={{ color: '#86BC25' }}>{isEn ? 'Associate Director & Founder · MBA Laval · 22 yrs field' : 'Directeur Associé & Fondateur · MBA Laval · 22 ans terrain'}</p>
              </div>
              <a
                href="https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 cursor-pointer transition-all hover:scale-110"
                style={{ background: '#0A66C2' }}
                aria-label="LinkedIn SIMDA Essoyomèwè"
              >
                <i className="ri-linkedin-fill text-sm text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-16 pt-8 border-t flex flex-wrap gap-6 items-center" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          {(isEn ? [
            { icon: 'ri-calendar-line', label: 'Firm founded in 2026' },
            { icon: 'ri-shield-check-line', label: 'BCEAO · BEAC · OHADA compliant' },
            { icon: 'ri-building-line', label: 'SMEs · Banks · NGOs · Public sector' },
            { icon: 'ri-map-pin-2-line', label: 'Lomé, Togo — West & Central Africa' },
          ] : [
            { icon: 'ri-calendar-line', label: 'Cabinet fondé en 2026' },
            { icon: 'ri-shield-check-line', label: 'BCEAO · BEAC · OHADA' },
            { icon: 'ri-building-line', label: 'PME · Banques · ONG · Secteur public' },
            { icon: 'ri-map-pin-2-line', label: 'Lomé, Togo — Afrique de l\'Ouest & Centrale' },
          ]).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className={`${item.icon} text-sm`} style={{ background: 'rgba(201,162,39,0.6)' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




