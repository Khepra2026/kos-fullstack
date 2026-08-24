import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nomEntreprise: string;
  secteur: string;
  pays: string;
  nomPrenom: string;
  fonction: string;
  email: string;
  telephone: string;
  frequenceConseils: string;
  nombreAdministrateurs: string;
  comites: string[];
  chiffreAffaires: string;
  resultatNet: string;
  croissance: string;
  problemesFinanciers: string;
  projetsCours: string;
  defis: string;
  priorites: string;
  risques: string[];
  niveauConformite: string;
  besoinAccompagnement: string[];
}

interface BoardOutputProps {
  data: FormData;
}

function computeScore(data: FormData): { total: number; sections: { label: string; score: number; color: string; icon: string; comment: string }[] } {
  const gouvernance = Math.min(100, 40 + (data.comites.length * 12) + (data.frequenceConseils === 'Trimestrielle' || data.frequenceConseils === 'Mensuelle' ? 20 : 0) + (parseInt(data.nombreAdministrateurs) >= 5 ? 10 : 0));
  const finance = data.chiffreAffaires.includes('>') ? 85 : data.chiffreAffaires.includes('milliard') ? 78 : data.chiffreAffaires.includes('200') ? 65 : 55;
  const conformite = data.niveauConformite.includes('Excellent') ? 95 : data.niveauConformite.includes('Bon') ? 80 : data.niveauConformite.includes('Moyen') ? 60 : data.niveauConformite.includes('Insuffisant') ? 35 : 50;
  const strategie = data.projetsCours.length > 50 ? 75 : data.projetsCours.length > 20 ? 60 : 45;
  const risques = Math.max(30, 90 - (data.risques.length * 8));

  const sections = [
    { label: 'Gouvernance & Structure', score: Math.min(100, gouvernance), color: '#86BC25', icon: 'ri-building-line', comment: gouvernance >= 70 ? 'Structure solide' : 'Renforcement recommandé' },
    { label: 'Performance Financière', score: finance, color: '#22c55e', icon: 'ri-funds-line', comment: finance >= 70 ? 'Bonne santé financière' : 'Optimisation nécessaire' },
    { label: 'Conformité Réglementaire', score: conformite, color: '#3b82f6', icon: 'ri-shield-check-line', comment: conformite >= 80 ? 'Conforme BCEAO/OHADA' : 'Mise en conformité urgente' },
    { label: 'Stratégie & Opérations', score: strategie, color: '#f59e0b', icon: 'ri-compass-3-line', comment: strategie >= 70 ? 'Vision claire' : 'Structuration stratégique conseillée' },
    { label: 'Gestion des Risques', score: risques, color: '#ef4444', icon: 'ri-error-warning-line', comment: risques >= 70 ? 'Risques maîtrisés' : 'Plan de mitigation requis' },
  ];

  const total = Math.round(sections.reduce((acc, s) => acc + s.score, 0) / sections.length);
  return { total, sections };
}

function getRecommendation(score: number): { label: string; color: string; bg: string; border: string } {
  if (score >= 80) return { label: 'Gouvernance excellente', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.25)' };
  if (score >= 65) return { label: 'Accompagnement conseillé', color: '#86BC25', bg: 'rgba(212,168,42,0.08)', border: 'rgba(212,168,42,0.25)' };
  return { label: 'Restructuration urgente', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', border: 'rgba(220,38,38,0.25)' };
}

export default function BoardOutput({ data }: BoardOutputProps) {
  const navigate = useNavigate();
  const [showConversion, setShowConversion] = useState(false);
  const { total, sections } = computeScore(data);
  const reco = getRecommendation(total);
  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleDownload = () => {
    // Simulation téléchargement — affiche le CTA de conversion
    setShowConversion(true);
    setTimeout(() => {
      document.getElementById('conversion-cta')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f6f0 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Succès header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-6" style={{ background: 'linear-gradient(135deg, rgba(212,168,42,0.15), rgba(212,168,42,0.05))', border: '2px solid rgba(212,168,42,0.3)' }}>
            <i className="ri-check-double-line text-4xl" style={{ color: '#86BC25' }}></i>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">Rapport généré avec succès</span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Votre Board Report est prêt,{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {data.nomPrenom.split(' ')[0]}
            </span>
          </h2>
          <p className="text-gray-500">Rapport Conseil d&apos;Administration — {data.nomEntreprise} — {today}</p>
        </div>

        {/* Rapport card */}
        <div className="rounded-3xl overflow-hidden mb-8" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}>

          {/* En-tête rapport */}
          <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: 'rgba(212,168,42,0.2)', border: '1px solid rgba(212,168,42,0.3)' }}>
                <i className="ri-file-chart-2-line text-xl" style={{ color: '#86BC25' }}></i>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#86BC25' }}>RAPPORT CONSEIL D&apos;ADMINISTRATION</p>
                <p className="font-playfair text-lg font-bold text-white">{data.nomEntreprise}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{data.secteur} · {data.pays} · {today}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                Conforme OHADA
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(212,168,42,0.15)', color: '#86BC25', border: '1px solid rgba(212,168,42,0.3)' }}>
                BCEAO 2025
              </span>
            </div>
          </div>

          {/* Corps rapport */}
          <div className="p-8 bg-white">
            {/* Score global */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #f8f6f0, #fdf9f0)', border: '1px solid rgba(212,168,42,0.15)' }}>
              <div className="text-center flex-shrink-0">
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(212,168,42,0.15)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${total * 2.64} 264`} />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#86BC25" />
                        <stop offset="100%" stopColor="#f0c84a" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-playfair text-3xl font-bold" style={{ color: '#0a1628' }}>{total}</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-700 mt-2">Score global</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold" style={{ background: reco.bg, color: reco.color, border: `1px solid ${reco.border}` }}>
                    {reco.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Votre organisation présente un score de gouvernance de <strong>{total}/100</strong>. 
                  {total >= 80 ? ' Votre structure de gouvernance est solide. Quelques optimisations peuvent encore renforcer votre positionnement.' : total >= 65 ? ' Des améliorations ciblées permettraient de renforcer significativement votre gouvernance et votre conformité.' : ' Une restructuration de votre gouvernance est recommandée pour répondre aux exigences réglementaires et attirer les financements.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.besoinAccompagnement.slice(0, 3).map((b, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(10,22,40,0.06)', color: '#0a1628', border: '1px solid rgba(10,22,40,0.1)' }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scores par section */}
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Analyse détaillée par domaine</h3>
            <div className="space-y-4 mb-8">
              {sections.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${s.color}15` }}>
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-800">{s.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{s.comment}</span>
                        <span className="text-sm font-bold" style={{ color: s.color }}>{s.score}/100</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.score}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}99)` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommandations clés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl" style={{ background: 'rgba(212,168,42,0.06)', border: '1px solid rgba(212,168,42,0.15)' }}>
                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <i className="ri-lightbulb-line" style={{ color: '#86BC25' }}></i>
                  Points forts identifiés
                </h4>
                <ul className="space-y-2">
                  {sections.filter(s => s.score >= 70).slice(0, 3).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="ri-check-line text-green-500 mt-0.5 flex-shrink-0"></i>
                      {s.label} ({s.score}/100)
                    </li>
                  ))}
                  {sections.filter(s => s.score >= 70).length === 0 && (
                    <li className="text-sm text-gray-500 italic">Analyse en cours...</li>
                  )}
                </ul>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-500"></i>
                  Axes d&apos;amélioration prioritaires
                </h4>
                <ul className="space-y-2">
                  {sections.filter(s => s.score < 70).slice(0, 3).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="ri-arrow-right-s-line text-red-400 mt-0.5 flex-shrink-0"></i>
                      {s.label} — {s.comment}
                    </li>
                  ))}
                  {sections.filter(s => s.score < 70).length === 0 && (
                    <li className="text-sm text-gray-500 italic">Excellente performance globale !</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Informations organisation */}
            <div className="p-5 rounded-xl mb-6" style={{ background: '#f8f6f0', border: '1px solid rgba(212,168,42,0.1)' }}>
              <h4 className="font-bold text-gray-900 text-sm mb-4">Informations de l&apos;organisation</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {[
                  { label: 'Organisation', value: data.nomEntreprise },
                  { label: 'Secteur', value: data.secteur },
                  { label: 'Pays', value: data.pays },
                  { label: 'Responsable', value: `${data.nomPrenom} — ${data.fonction}` },
                  { label: 'Fréquence CA', value: data.frequenceConseils || 'Non renseigné' },
                  { label: 'Administrateurs', value: data.nombreAdministrateurs ? `${data.nombreAdministrateurs} membres` : 'Non renseigné' },
                  { label: 'Chiffre d\'affaires', value: data.chiffreAffaires || 'Non renseigné' },
                  { label: 'Croissance', value: data.croissance || 'Non renseigné' },
                  { label: 'Conformité', value: data.niveauConformite || 'Non évalué' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="font-semibold text-gray-800 text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer rapport */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(212,168,42,0.1)' }}>
              <div className="flex items-center gap-2">
                <img src="https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png" alt="KHEPRA" className="h-6 w-6 object-contain" width={24} height={24} />
                <span className="text-xs font-bold" style={{ color: '#0a1628' }}>KHEPRA EXPERTS</span>
                <span className="text-xs text-gray-400">· Lomé, Togo · +228 93 98 49 09</span>
              </div>
              <span className="text-xs text-gray-400">Généré le {today}</span>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e', boxShadow: '0 8px 32px rgba(212,168,42,0.35)' }}
          >
            <i className="ri-download-line text-xl"></i>
            Télécharger mon rapport PDF
          </button>
          <button
            onClick={() => setShowConversion(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0a1628, #1a2d4a)', color: 'white', border: '1px solid rgba(212,168,42,0.3)' }}
          >
            <i className="ri-customer-service-2-line text-xl"></i>
            Demander un accompagnement expert
          </button>
        </div>

        {/* CTA Conversion */}
        {showConversion && (
          <div id="conversion-cta" className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a2d4a 100%)', border: '1px solid rgba(212,168,42,0.25)' }}>
            <div className="p-8 lg:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(212,168,42,0.15)', border: '1px solid rgba(212,168,42,0.3)' }}>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Votre rapport est prêt</span>
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                  Voulez-vous une version professionnelle{' '}
                  <span style={{ background: 'linear-gradient(135deg, #86BC25, #f0c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    validée par un expert ?
                  </span>
                </h3>
                <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
                  Nos experts KHEPRA transforment votre rapport en un document de gouvernance professionnel, validé et prêt à présenter à votre Conseil d&apos;Administration, vos investisseurs et vos régulateurs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: 'ri-search-eye-line', title: 'Audit de gouvernance', desc: 'Analyse complète de votre structure de gouvernance et recommandations personnalisées', price: 'Sur devis' },
                  { icon: 'ri-file-chart-2-line', title: 'Structuration reporting CA', desc: 'Mise en place d\'un système de reporting professionnel conforme BCEAO/OHADA', price: 'Sur devis' },
                  { icon: 'ri-funds-line', title: 'Optimisation financière', desc: 'DAF externalisé pour piloter votre performance et accéder aux financements', price: 'Sur devis' },
                ].map((offer, i) => (
                  <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,168,42,0.2)' }}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(212,168,42,0.15)' }}>
                      <i className={`${offer.icon} text-lg`} style={{ color: '#86BC25' }}></i>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-2">{offer.title}</h4>
                    <p className="text-xs text-white/50 leading-relaxed mb-3">{offer.desc}</p>
                    <span className="text-xs font-bold" style={{ color: '#86BC25' }}>{offer.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', color: '#06111e', boxShadow: '0 8px 32px rgba(212,168,42,0.4)' }}
                >
                  <i className="ri-calendar-check-line text-xl"></i>
                  Demander un accompagnement personnalisé
                </button>
                <button
                  onClick={() => navigate('/offre-commerciale')}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid rgba(212,168,42,0.35)', color: '#86BC25', background: 'rgba(212,168,42,0.06)' }}
                >
                  <i className="ri-arrow-right-line"></i>
                  Voir toutes nos offres
                </button>
              </div>

              <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Réponse sous 24h · Sans engagement · +228 93 98 49 09 · contact@khepraexperts.com
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}




