import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function DefenseFiscalePrixTransfertPage() {
  const navigate = useNavigate();

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Défense en Contrôle Fiscal Prix de Transfert — UEMOA/CEMAC',
        provider: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        description: 'Stratégie de défense en contrôle fiscal prix de transfert pour les groupes multinationaux opérant en Afrique. Réduction moyenne de 87% des redressements. Benchmarking indépendant, documentation de défense, négociation APA.',
        areaServed: ['UEMOA', 'CEMAC'],
        serviceType: 'Défense Fiscale Prix de Transfert',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Que faire en cas de notification de redressement fiscal pour prix de transfert ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dès réception d\'une notification de redressement, il est crucial d\'agir dans les 30 jours : analyser la notification en détail, identifier les transactions contestées, préparer la documentation de défense (analyse fonctionnelle actualisée, benchmarking, comparables), et élaborer une stratégie de négociation. KHEPRA mobilise une équipe dédiée sous 48h pour déconstruire l\'argumentation fiscale et élaborer la contre-argumentation économique.',
            },
          },
          {
            '@type': 'Question',
            name: 'Un redressement fiscal prix de transfert peut-il être réduit par la négociation ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, la quasi-totalité des redressements prix de transfert peuvent être réduits significativement par une défense technique solide. Notre taux de réduction moyen est de 87%. La clé est de produire une documentation économique robuste (benchmarking indépendant, analyse fonctionnelle approfondie, comparables sectoriels) qui démontre la conformité des prix pratiqués avec le principe de pleine concurrence OCDE.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qu\'est-ce qu\'un APA (Accord Préalable de Prix) et comment l\'obtenir ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'L\'APA est un accord négocié avec l\'administration fiscale qui fixe à l\'avance la méthode de détermination des prix de transfert pour les transactions intragroupe, offrant une sécurité juridique sur 3 à 5 ans. Son obtention requiert la soumission d\'un dossier documenté (analyse fonctionnelle, méthode retenue, comparables, hypothèses), suivie de négociations avec l\'administration. KHEPRA accompagne l\'intégralité du processus, de la documentation initiale à la signature de l\'accord.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les délais pour répondre à un redressement fiscal en zone UEMOA ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les délais varient selon les pays. En général, le contribuable dispose de 30 jours pour formuler ses observations suite à une notification de redressement. Une réponse technique solide produite dans ce délai est déterminante pour la suite de la procédure. Au-delà, des pénalités de retard (10% à 25% du montant redressé) peuvent s\'appliquer. Il est impératif de mobiliser une équipe de défense dès la réception de la notification.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Défense Fiscale Prix de Transfert | Contentieux & Négociation | KHEPRA"
        description="Stratégie de défense en contrôle fiscal prix de transfert pour groupes multinationaux en Afrique. Analyse du redressement, documentation de défense, négociation avec l'administration fiscale, APA. -87% de redressement moyen."
        keywords="défense fiscale prix de transfert, contrôle fiscal Afrique, contentieux fiscal UEMOA, APA accord préalable prix, négociation fiscale, BEPS Afrique, redressement fiscal Afrique"
        canonicalPath="/services/defense-fiscale-prix-transfert"
        ogType="website"
        schemaJson={schemaData}
      />
      <Navigation />
      <main id="main-content" className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Défense Fiscale Prix de Transfert' }]} />
        </div>

        <section className="py-16 md:py-20" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-scales-3-line">
              Défense Fiscale Prix de Transfert · BU2 · Service Spécialisé
            </BigFourSubtitleBar>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.035em' }}>
              Défense en Contrôle Fiscal
              <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #f0d060 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Prix de Transfert</span>
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 350 }}>
              Votre entreprise fait l'objet d'un contrôle fiscal prix de transfert ? Nous déployons une stratégie de défense complète : analyse du redressement, documentation de défense, benchmarking indépendant, négociation avec l'administration fiscale et sécurisation par APA.
            </p>
            <div className="flex items-center gap-4 mb-8 p-4 rounded-xl" style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)' }}>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>-87%</div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>Redressement réduit (cas réel)</div>
              </div>
              <div className="w-px h-10" style={{ background: 'rgba(212,175,55,0.15)' }} />
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>4,2 Mds</div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>FCFA économisés</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/tools/diagnostic-prix-transfert')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #D4AF37, #f0d060)', color: '#080c14' }}>
                <i className="ri-flashlight-line text-lg" />Diagnostic Prix de Transfert gratuit
              </button>
              <button onClick={() => navigate('/case-studies/prix-transfert-microfinance-groupe-panafricain')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all" style={{ color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}>
                Voir une étude de cas <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: '#fafaf8' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-10">
                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-alert-line">
                    La Situation
                  </BigFourSubtitleBar>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.60)' }}>
                    Un contrôle fiscal prix de transfert peut aboutir à des notifications de redressement de plusieurs milliards FCFA. Les administrations fiscales UEMOA/CEMAC renforcent leurs capacités de contrôle, avec des redressements types contestant : les redevances de marque, les management fees, les taux d'intérêt des prêts intragroupe, et les prix de cession de biens. Sans documentation solide, la charge de la preuve est défavorable au contribuable.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-tools-line">
                    Notre Stratégie — 4 Axes
                  </BigFourSubtitleBar>
                  <div className="space-y-4">
                    {[
                      { title: 'Axe 1 — Analyse du Redressement', desc: 'Déconstruction détaillée de la notification, identification des faiblesses juridiques et économiques de l\'argumentation fiscale. Qualification des transactions contestées selon le principe de pleine concurrence OCDE.', icon: 'ri-search-eye-line' },
                      { title: 'Axe 2 — Documentation de Défense', desc: 'Production d\'une analyse fonctionnelle actualisée (FAR), benchmarking indépendant démontrant la conformité des prix pratiqués, documentation des services rendus (timesheets, livrables, contrats), comparative des taux de marge sectoriels.', icon: 'ri-file-text-line' },
                      { title: 'Axe 3 — Négociation', desc: 'Préparation des réunions avec l\'administration fiscale, argumentaires techniques et économiques, propositions transactionnelles, médiation. Notre taux de réduction moyen : 87%.', icon: 'ri-chat-3-line' },
                      { title: 'Axe 4 — Sécurisation (APA)', desc: 'Négociation d\'un Accord Préalable de Prix (APA) pour les exercices futurs, offrant une sécurité juridique sur 3 à 5 ans et éliminant le risque de redressement pour les transactions couvertes.', icon: 'ri-shield-check-line' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(212,175,55,0.08)' }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(212,175,55,0.10)' }}>
                          <i className={`${item.icon} text-lg`} style={{ color: '#b8941e' }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1" style={{ color: '#0a0a0a' }}>{item.title}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="accent" icon="ri-trophy-line">
                    Résultats Attendus
                  </BigFourSubtitleBar>
                  <div className="grid grid-cols-2 gap-3">
                    {['Réduction significative du redressement', 'Documentation défendable produite', 'Risque fiscal futur sécurisé (APA)', 'Coût total maîtrisé vs contentieux'].map((r, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(212,175,55,0.08)' }}>
                        <i className="ri-check-line text-sm flex-shrink-0" style={{ color: '#D4AF37' }} />
                        <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.65)' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl p-5 sticky top-28" style={{ background: '#ffffff', border: '1px solid rgba(212,175,55,0.10)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: '#0a0a0a' }}>Cadre Réglementaire</h4>
                  <div className="space-y-2 mb-5">
                    {['OCDE BEPS Action 13 (2023)', 'Directive UEMOA 01/2011/CM/UEMOA', 'Règlement CEMAC 01/18', 'Modèle Convention Fiscale OCDE 2017', 'Principes OCDE PT 2022'].map((ref, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(0,0,0,0.55)' }}>
                        <i className="ri-file-text-line text-xs" style={{ color: '#D4AF37' }} />
                        <span>{ref}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/contact')} className="w-full py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #D4AF37, #f0d060)', color: '#080c14' }}>
                    <i className="ri-calendar-line" />Urgence — Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}