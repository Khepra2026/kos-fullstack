import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import OptimizedImage from '@/components/base/OptimizedImage';

const BENEFITS = [
  {
    icon: 'ri-file-chart-line',
    titleFr: 'Rapport en 30 minutes',
    titleEn: 'Report in 30 minutes',
    descFr: 'Générez un rapport de gouvernance complet avec indicateurs clés, risques et recommandations.',
    descEn: 'Generate a complete governance report with key indicators, risks and recommendations.',
  },
  {
    icon: 'ri-shield-check-line',
    titleFr: 'Conforme BCEAO & IFC',
    titleEn: 'BCEAO & IFC compliant',
    descFr: 'Structurez votre rapport selon les standards des régulateurs et des investisseurs institutionnels.',
    descEn: 'Structure your report according to regulator and institutional investor standards.',
  },
  {
    icon: 'ri-presentation-line',
    titleFr: 'Prêt pour le Conseil',
    titleEn: 'Board-ready',
    descFr: 'Exportez en PDF ou PowerPoint pour présenter directement en Conseil d\'Administration.',
    descEn: 'Export to PDF or PowerPoint to present directly to the Board of Directors.',
  },
];

export default function HomeBoardReport() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section id="board-report" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}>
                <i className="ri-tools-line text-xs" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
                  {isEn ? 'Free tool' : 'Outil gratuit'}
                </span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                {isEn ? (
                  <>
                    Board Report{' '}
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      in 3 minutes
                    </span>
                  </>
                ) : (
                  <>
                    Rapport du Conseil d'Administration{' '}
                    <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      en 3 minutes
                    </span>
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                {isEn
                  ? 'Generate a professional governance report for your Board of Directors in 3 minutes. Structured, compliant, and ready for your next regulatory inspection or investor meeting.'
                  : 'Générez un rapport de gouvernance professionnel pour votre Conseil d\'Administration en 3 minutes. Structuré, conforme, et prêt pour votre prochaine inspection réglementaire ou réunion investisseurs.'}
              </p>
            </ScrollReveal>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {BENEFITS.map((b, index) => (
                <ScrollReveal key={index} delay={index * 80}>
                  <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(212,168,42,0.04)', border: '1px solid rgba(212,168,42,0.12)' }}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.10)', border: '1px solid rgba(134,188,37,0.20)' }}>
                      <i className={`${b.icon} text-lg`} style={{ color: '#86BC25' }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-1">
                        {isEn ? b.titleEn : b.titleFr}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {isEn ? b.descEn : b.descFr}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/board-report')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a', boxShadow: '0 6px 24px rgba(212,168,42,0.35)' }}
                >
                  <i className="ri-play-circle-line text-lg" />
                  {isEn ? 'See the 3-min demo' : 'Voir la démo 3 min'}
                </button>
                <button
                  onClick={() => navigate('/board-report')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
                  style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#6B9B1F', background: 'transparent' }}
                >
                  <i className="ri-file-chart-line" />
                  {isEn ? 'Generate my free report' : 'Générer mon rapport gratuit'}
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Demo visual */}
          <ScrollReveal animation="fadeSlideRight">
            <div className="relative">
              {/* Main mockup */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #050c18 0%, #091528 100%)', border: '1px solid rgba(212,168,42,0.18)' }}
              >
                {/* Mock header */}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#f4d03f' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#22a05a' }} />
                  </div>
                  <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    KHEPRA BOARD REPORT
                  </p>
                  <div className="w-6" />
                </div>

                {/* Mock content */}
                <div className="p-6 space-y-4">
                  {/* Slide 1 mock */}
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(134,188,37,0.15)' }}>
                        <i className="ri-government-line text-sm" style={{ color: '#86BC25' }} />
                      </div>
                      <p className="text-sm font-bold text-white">Gouvernance & Conformité</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Score</p>
                        <p className="text-xl font-bold" style={{ color: '#86BC25' }}>87/100</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Risques</p>
                        <p className="text-xl font-bold" style={{ color: '#f4d03f' }}>3</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Actions</p>
                        <p className="text-xl font-bold text-white">12</p>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2 mock */}
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(244,208,63,0.15)' }}>
                        <i className="ri-bar-chart-line text-sm" style={{ color: '#f4d03f' }} />
                      </div>
                      <p className="text-sm font-bold text-white">Indicateurs Clés</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20" style={{ color: 'rgba(255,255,255,0.45)' }}>Conformité</span>
                        <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full" style={{ width: '92%', background: '#86BC25' }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#86BC25' }}>92%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20" style={{ color: 'rgba(255,255,255,0.45)' }}>Risques</span>
                        <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full" style={{ width: '34%', background: '#f4d03f' }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#f4d03f' }}>34%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20" style={{ color: 'rgba(255,255,255,0.45)' }}>Gouvernance</span>
                        <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full" style={{ width: '78%', background: '#86BC25' }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#86BC25' }}>78%</span>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3 mock */}
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'rgba(34,160,90,0.15)' }}>
                        <i className="ri-list-check text-sm" style={{ color: '#22a05a' }} />
                      </div>
                      <p className="text-sm font-bold text-white">Plan d'Action</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        'Restructurer le Conseil d\'Administration',
                        'Mettre en place les comités spécialisés',
                        'Formaliser le contrôle interne',
                        'Préparer le reporting réglementaire',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ background: 'rgba(134,188,37,0.15)' }}>
                            <i className="ri-check-line text-xs" style={{ color: '#86BC25' }} />
                          </div>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mock footer */}
                <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Khepra Experts · 2025</span>
                  <span className="text-xs font-bold" style={{ color: '#86BC25' }}>PDF · PPT · EXCEL</span>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#fff' }}
              >
                {isEn ? 'Free · No account needed' : 'Gratuit · Sans compte'}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}



