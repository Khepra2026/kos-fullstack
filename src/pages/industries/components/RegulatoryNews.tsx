import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveIdToSlug } from '@/data/articleSlugMap';

interface RegulatoryAlert {
  id: string;
  authority: 'BCEAO' | 'COBAC' | 'UEMOA' | 'CEMAC';
  type: 'directive' | 'circulaire' | 'instruction' | 'alerte';
  title: string;
  summary: string;
  date: string;
  impact: 'élevé' | 'moyen' | 'faible';
  sectors: string[];
  articleId?: string;
}

const regulatoryAlerts: RegulatoryAlert[] = [
  {
    id: '1',
    authority: 'BCEAO',
    type: 'directive',
    title: 'Nouvelles exigences prudentielles 2025 — Ratios de solvabilité renforcés',
    summary: 'Le ratio de solvabilité minimum est relevé à 11,5% pour les banques systémiques. Les SFD de catégorie 2 et 3 sont soumis à des exigences de fonds propres révisées à la hausse.',
    date: '10 avril 2025',
    impact: 'élevé',
    sectors: ['Microfinance', 'Banques', 'SFD'],
    articleId: '20',
  },
  {
    id: '2',
    authority: 'BCEAO',
    type: 'circulaire',
    title: 'Renforcement du dispositif LBC/FT — Obligations KYC et surveillance des transactions',
    summary: 'Nouvelles obligations de connaissance du client (KYC) et de surveillance automatisée des transactions pour les SFD. Désignation obligatoire d\'un responsable conformité LBC/FT.',
    date: '25 avril 2025',
    impact: 'élevé',
    sectors: ['Microfinance', 'SFD', 'Fintech'],
    articleId: '21',
  },
  {
    id: '3',
    authority: 'UEMOA',
    type: 'instruction',
    title: 'Loi uniforme sur la microfinance — Mise en œuvre et gouvernance des SFD',
    summary: 'Entrée en vigueur des nouvelles dispositions de gouvernance pour les SFD : qualification des administrateurs, transparence tarifaire et mécanismes de traitement des réclamations.',
    date: '15 février 2025',
    impact: 'élevé',
    sectors: ['Microfinance', 'SFD'],
    articleId: '15',
  },
  {
    id: '4',
    authority: 'COBAC',
    type: 'alerte',
    title: 'Protection des données clients — Désignation d\'un DPD obligatoire',
    summary: 'Les établissements financiers doivent nommer un Délégué à la Protection des Données (DPD) et mettre en place des politiques de confidentialité conformes aux nouvelles exigences régionales.',
    date: '1 mars 2025',
    impact: 'moyen',
    sectors: ['Banques', 'Microfinance', 'Fintech'],
  },
  {
    id: '5',
    authority: 'BCEAO',
    type: 'instruction',
    title: 'Interopérabilité des systèmes de paiement — Feuille de route UEMOA 2025-2027',
    summary: 'Publication de la feuille de route pour l\'interopérabilité totale des systèmes de paiement dans l\'espace UEMOA. Obligations de connexion aux plateformes régionales pour les opérateurs de monnaie électronique.',
    date: '20 janvier 2025',
    impact: 'moyen',
    sectors: ['Fintech', 'Banques'],
  },
  {
    id: '6',
    authority: 'COBAC',
    type: 'circulaire',
    title: 'Plans de redressement préventifs — Banques systémiques CEMAC',
    summary: 'Les banques systémiques de la zone CEMAC doivent soumettre leurs plans de redressement (recovery plans) avant le 30 juin 2025. Nouvelles exigences de stress tests trimestriels.',
    date: '5 décembre 2024',
    impact: 'moyen',
    sectors: ['Banques', 'Secteur Public'],
  },
];

const authorityConfig = {
  BCEAO: { color: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
  COBAC: { color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' },
  UEMOA: { color: 'bg-orange-100 text-orange-800 border-orange-300', dot: 'bg-orange-500' },
  CEMAC: { color: 'bg-slate-100 text-slate-700 border-slate-300', dot: 'bg-slate-500' },
};

const impactConfig = {
  élevé: { color: 'bg-red-50 text-red-700 border-red-200', icon: 'ri-alarm-warning-line', label: 'Impact élevé' },
  moyen: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'ri-error-warning-line', label: 'Impact moyen' },
  faible: { color: 'bg-green-50 text-green-700 border-green-200', icon: 'ri-information-line', label: 'Impact faible' },
};

const typeLabels: Record<string, string> = {
  directive: 'Directive',
  circulaire: 'Circulaire',
  instruction: 'Instruction',
  alerte: 'Alerte',
};

export default function RegulatoryNews() {
  const [activeFilter, setActiveFilter] = useState<string>('Tous');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters = ['Tous', 'BCEAO', 'COBAC', 'UEMOA', 'CEMAC'];

  const filtered = activeFilter === 'Tous'
    ? regulatoryAlerts
    : regulatoryAlerts.filter((a) => a.authority === activeFilter);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border-2 border-red-200 bg-red-50">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Veille réglementaire</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-3">
              Actualités <span className="text-gold-600">réglementaires</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl">
              Dernières directives et circulaires BCEAO/COBAC impactant les institutions financières en Afrique de l'Ouest et Centrale.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm border border-gold-300 hover:border-gold-500 px-5 py-2.5 rounded-full transition-all whitespace-nowrap cursor-pointer bg-gold-50 hover:bg-gold-100 self-start lg:self-auto"
          >
            <i className="ri-article-line" />
            Toutes les analyses
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f
                  ? 'bg-brand-900 text-white border-brand-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gold-400 hover:text-gold-700'
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 font-medium">
            <i className="ri-refresh-line" />
            Mis à jour : avril 2025
          </div>
        </div>

        {/* Alerts grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          {filtered.map((alert) => {
            const auth = authorityConfig[alert.authority];
            const imp = impactConfig[alert.impact];
            const isOpen = expanded === alert.id;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-gold-400 shadow-xl' : 'border-gray-200 shadow-sm hover:shadow-lg hover:border-gold-300'
                }`}
              >
                {/* Top bar */}
                <div className={`h-1 w-full ${auth.dot}`} />

                <div className="p-6">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${auth.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${auth.dot}`} />
                      {alert.authority}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                      {typeLabels[alert.type]}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${imp.color}`}>
                      <i className={`${imp.icon} text-xs`} />
                      {imp.label}
                    </span>
                    <span className="ml-auto text-xs text-gray-400 font-medium whitespace-nowrap">
                      <i className="ri-calendar-line mr-1" />
                      {alert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-brand-900 text-base leading-snug mb-3 group-hover:text-gold-700 line-clamp-3" title={alert.title}>
                    {alert.title}
                  </h3>

                  {/* Summary — expandable */}
                  <p className={`text-sm text-gray-600 leading-relaxed transition-all ${isOpen ? '' : 'line-clamp-2'}`}>
                    {alert.summary}
                  </p>

                  {/* Sectors */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {alert.sectors.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setExpanded(isOpen ? null : alert.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-900 transition-colors cursor-pointer"
                    >
                      <i className={`${isOpen ? 'ri-eye-off-line' : 'ri-eye-line'}`} />
                      {isOpen ? 'Réduire' : 'Lire plus'}
                    </button>

                    {alert.articleId && (
                      <Link
                        to={`/blog/${resolveIdToSlug(alert.articleId) || alert.articleId}/`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors cursor-pointer ml-auto"
                      >
                        Analyse complète
                        <i className="ri-arrow-right-line" />
                      </Link>
                    )}

                    <Link
                      to="/tools/diagnostic-organisationnel"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-900 hover:bg-brand-800 px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ml-auto"
                    >
                      <i className="ri-stethoscope-line" />
                      Évaluer mon impact
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-10 bg-gradient-to-r from-brand-950 to-brand-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-xl border border-gold-500/30 flex-shrink-0">
              <i className="ri-shield-check-line text-2xl text-gold-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">
                Votre institution est-elle en conformité avec les nouvelles exigences BCEAO/COBAC ?
              </h4>
              <p className="text-sm text-gray-400">
                Nos experts réalisent un audit de conformité réglementaire complet et vous accompagnent dans votre mise en conformité.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link
              to="/tools/diagnostic-organisationnel"
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg whitespace-nowrap cursor-pointer"
            >
              Audit de conformité gratuit
            </Link>
            <Link
              to="/services"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm border border-white/20 transition-all whitespace-nowrap cursor-pointer"
            >
              Nos services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
