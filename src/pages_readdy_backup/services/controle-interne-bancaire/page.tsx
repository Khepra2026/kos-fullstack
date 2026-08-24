import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function ControleInterneBancairePage() {
  const navigate = useNavigate();

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Contrôle Interne Bancaire — COSO & Circulaires CB-UMOA',
        provider: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        description: 'Conception et déploiement du dispositif de contrôle interne bancaire conforme aux 3 lignes de défense, COSO Internal Control 2023 et Circulaire 03-2017/CB/C. Cartographie des processus, matrice risques/contrôles, séparation des fonctions.',
        areaServed: ['UEMOA', 'CEMAC'],
        serviceType: 'Contrôle Interne Bancaire',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu\'est-ce que le modèle des 3 lignes de défense en contrôle interne bancaire ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le modèle des 3 lignes de défense est une architecture de contrôle interne imposée par la Circulaire BCEAO 03-2017/CB/C. 1ère ligne : contrôle opérationnel intégré aux processus métier. 2ème ligne : fonctions risques et conformité indépendantes. 3ème ligne : audit interne rattaché fonctionnellement au Conseil d\'Administration. Chaque ligne est distincte, documentée et testée périodiquement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelles sont les exigences de la Circulaire 03-2017/CB/C pour les banques UEMOA ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La Circulaire 03-2017/CB/C impose : une cartographie complète des processus, une matrice risques/contrôles documentée, une séparation stricte des fonctions, 5 comités spécialisés (audit, risques, conformité, nomination, rémunération), un manuel de procédures à jour, des délégations de pouvoirs formalisées, et un reporting trimestriel au Conseil d\'Administration.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de temps prend le déploiement d\'un contrôle interne complet ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le déploiement suit une méthodologie en 4 phases sur 8 à 14 semaines : Diagnostic (2-3 semaines), Conception de l\'architecture cible (3-4 semaines), Déploiement opérationnel (3-4 semaines), Validation par simulation de contrôle BCEAO/COBAC (2-3 semaines). Le délai varie selon la taille de l\'établissement et la maturité du dispositif existant.',
            },
          },
          {
            '@type': 'Question',
            name: 'En quoi KHEPRA se différencie-t-il d\'un auditeur externe traditionnel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Contrairement à un auditeur externe qui certifie les comptes, KHEPRA conçoit et déploie le dispositif de contrôle interne dans sa globalité : cartographie des processus, matrice RCM, rédaction des procédures, formation des équipes, et préparation aux inspections BCEAO/COBAC. Nous livrons un dispositif opérationnel, pas un simple rapport d\'audit.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title="Contrôle Interne Bancaire | COSO 2023 & Circulaire 03-2017 | KHEPRA"
        description="Conception et déploiement du dispositif de contrôle interne pour banques et SFD en zone UEMOA/CEMAC. Architecture 3 lignes de défense, cartographie des processus, matrice risques/contrôles conforme COSO 2023 et Circulaire 03-2017/CB/C."
        keywords="contrôle interne bancaire, COSO 2023, 3 lignes de défense, circulaire 03-2017 CB UMOA, BCEAO, COBAC, matrice risques contrôles, séparation fonctions, audit interne Afrique"
        canonicalPath="/services/controle-interne-bancaire"
        ogType="website"
        schemaJson={schemaData}
      />
      <Navigation />
      <main id="main-content" className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Contrôle Interne Bancaire' }]} />
        </div>

        {/* Hero */}
        <section className="py-16 md:py-20" style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-bank-line">
              Contrôle Interne Bancaire · BU1 — Régulation Financière · Service Spécialisé
            </BigFourSubtitleBar>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.035em' }}>
              Contrôle Interne Bancaire
              <span style={{ background: 'linear-gradient(135deg, #86BC25 0%, #a5d936 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> — COSO 2023 & Circulaires CB-UMOA</span>
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 350 }}>
              Architecture de contrôle interne complète pour banques, SFD et EMF opérant en zones UEMOA et CEMAC. Conforme au COSO Internal Control Framework 2023, à la Circulaire 03-2017/CB/C et aux exigences COBAC R-2016/01.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/sfd-conformite')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#080c14' }}>
                <i className="ri-flashlight-line text-lg" />Auditer mon contrôle interne
              </button>
              <button onClick={() => navigate('/blog/3-lignes-defense-circulaire-03-2017')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all" style={{ color: '#D4AF37', border: '1.5px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}>
                Article — 3 Lignes de Défense <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-16" style={{ background: '#fafaf8' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-10">
                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-error-warning-line">
                    Le Problème
                  </BigFourSubtitleBar>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.60)' }}>
                    L'absence de contrôle interne structuré expose les institutions financières à des risques opérationnels, de non-conformité et de fraude. La Circulaire 03-2017/CB/C impose aux banques UEMOA une architecture de contrôle interne fondée sur le modèle des 3 lignes de défense. En zone CEMAC, le Règlement COBAC R-2016/01 établit des exigences similaires.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.60)' }}>
                    Les inspections de la Commission Bancaire sanctionnent systématiquement les défaillances de contrôle interne : absence de cartographie des processus, confusion des fonctions, procédures non documentées, dispositif 3 lignes de défense non effectif. Le coût moyen d'une mise en demeure est de 50 à 200 millions FCFA.
                  </p>
                </ScrollReveal>

                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-tools-line">
                    Notre Méthodologie — 4 Phases
                  </BigFourSubtitleBar>
                  <div className="space-y-4">
                    {[
                      { phase: 'Phase 1 — Diagnostic', desc: 'Évaluation du dispositif existant : cartographie des processus, identification des risques, analyse de la séparation des fonctions, revue des procédures et délégations de pouvoirs.', icon: 'ri-search-eye-line' },
                      { phase: 'Phase 2 — Conception', desc: 'Architecture cible : cartographie des processus cible, matrice risques/contrôles (RCM), définition des 3 lignes de défense, manuel de procédures, politique de contrôle interne.', icon: 'ri-pencil-ruler-2-line' },
                      { phase: 'Phase 3 — Déploiement', desc: 'Mise en œuvre opérationnelle : rédaction des procédures, formation des équipes, implémentation des contrôles de 1er et 2e niveaux, mise en place du reporting.', icon: 'ri-rocket-line' },
                      { phase: 'Phase 4 — Validation', desc: 'Tests d\'effectivité, simulation de contrôle COBAC/BCEAO, ajustements finaux, remise du dossier de conformité documenté.', icon: 'ri-check-double-line' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(134,188,37,0.06)' }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'rgba(134,188,37,0.08)' }}>
                          <i className={`${item.icon} text-lg`} style={{ color: '#6B9B1F' }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1" style={{ color: '#0a0a0a' }}>{item.phase}</h4>
                          <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.55)' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeSlideUp">
                  <BigFourSubtitleBar variant="left-accent" accentColor="primary" icon="ri-file-list-3-line">
                    Livrables
                  </BigFourSubtitleBar>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cartographie des processus', 'Matrice risques/contrôles (RCM)', 'Manuel de procédures', 'Dispositif 3 lignes de défense', 'Politique de contrôle interne', 'Délégations de pouvoirs', 'Formation des équipes', 'Dossier de conformité'].map((d, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(134,188,37,0.06)' }}>
                        <i className="ri-check-line text-sm flex-shrink-0" style={{ color: '#86BC25' }} />
                        <span className="text-xs font-medium" style={{ color: 'rgba(0,0,0,0.65)' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="rounded-2xl p-5 sticky top-28" style={{ background: '#ffffff', border: '1px solid rgba(134,188,37,0.08)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: '#0a0a0a' }}>Référentiels</h4>
                  <div className="space-y-2 mb-5">
                    {[
                      'Circulaire CB-UMOA 03-2017/CB/C',
                      'COSO Internal Control 2023',
                      'Règlement COBAC R-2016/01',
                      'Bâle II/III — Pilier 2',
                      'IIA — Normes IPPF 2024',
                    ].map((ref, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(0,0,0,0.55)' }}>
                        <i className="ri-file-text-line text-xs flex-shrink-0" style={{ color: '#86BC25' }} />
                        <span>{ref}</span>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-sm font-bold mb-3" style={{ color: '#0a0a0a' }}>Ressources</h4>
                  <div className="space-y-2 mb-5">
                    <button onClick={() => navigate('/blog/3-lignes-defense-circulaire-03-2017')} className="flex items-center gap-2 text-xs font-semibold cursor-pointer hover:underline w-full text-left" style={{ color: '#6B9B1F' }}>
                      <i className="ri-article-line text-xs" />Article — 3 Lignes de Défense
                    </button>
                    <button onClick={() => navigate('/sfd-conformite')} className="flex items-center gap-2 text-xs font-semibold cursor-pointer hover:underline w-full text-left" style={{ color: '#6B9B1F' }}>
                      <i className="ri-shield-check-line text-xs" />Conformité SFD
                    </button>
                  </div>
                  <button onClick={() => navigate('/contact')} className="w-full py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6B9B1F, #86BC25)', color: '#ffffff' }}>
                    <i className="ri-calendar-line" />Prendre rendez-vous
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



