import { useNavigate } from 'react-router-dom';
import { thinkTankPublications } from '@/mocks/thinkTankPublications';
import ScrollReveal from '@/components/feature/ScrollReveal';

export default function HomeThinkTank() {
  const navigate = useNavigate();
  const featured = thinkTankPublications.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-16 md:py-20" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.2), rgba(212,175,55,0.15), rgba(134,188,37,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,188,37,0.2), rgba(212,175,55,0.15), rgba(134,188,37,0.2), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.16)' }}>
              <i className="ri-lightbulb-flash-line text-sm" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#D4AF37' }}>KBR-MODEL — BU4</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">KBR-Model & Intelligence d&apos;Affaires</h2>
            <p className="text-sm md:text-base max-w-2xl mx-auto text-justify" style={{ color: 'rgba(255,255,255,0.50)' }}>
              Le KBR-Model produit des études sectorielles, monographies et rapports High-Ticket pour les décideurs, les régulateurs et les investisseurs. 3 niveaux de profondeur — L1, L2, L3. Monétisation de la Propriété Intellectuelle.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {featured.map((pub, i) => (
            <ScrollReveal key={pub.id} animation="fadeSlideUp" delay={i * 100}>
              <div
                onClick={() => navigate('/think-tank')}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(134,188,37,0.06)' }}
              >
                <div className="h-36 relative overflow-hidden">
                  <img src={pub.image} alt={pub.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="144" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)' }}>
                      {pub.type === 'position-paper' ? 'Position Paper' : pub.type === 'policy-brief' ? 'Policy Brief' : pub.type === 'sector-study' ? 'Étude Sectorielle' : 'KBR Report'}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold" style={{ color: '#86BC25' }}>{pub.zone}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.20)' }}>·</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{pub.pages} p.</span>
                  </div>
                  <h3 className="text-sm font-bold mb-2 leading-snug line-clamp-2 group-hover:text-deloitte-300 transition-colors text-white" title={pub.title}>{pub.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {pub.tags.slice(0, 3).map((tag, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(134,188,37,0.08)', color: '#86BC25' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeSlideUp">
          <div className="text-center">
            <button
              onClick={() => navigate('/think-tank')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #a5d936 100%)', color: '#080c14', boxShadow: '0 8px 32px rgba(107,155,31,0.40)' }}
            >
              <i className="ri-book-open-line text-lg" />
              Explorer le KBR-Model — 3 niveaux de profondeur
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}