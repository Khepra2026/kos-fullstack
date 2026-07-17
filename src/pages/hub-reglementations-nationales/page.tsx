import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SeoHead } from '@/components/feature/SeoHead';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import KOSPublicHubCrossLinks from '@/components/feature/KOSPublicHubCrossLinks';
import {
  hubNationalKPIs,
  paysReglementations,
  domainesReglementaires,
  actualitesReglementaires,
  faqsNational,
} from '@/mocks/hubReglementationsNationales';

const impactBadge = (impact: string) => {
  if (impact === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
  if (impact === 'Élevé') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-foreground-100 text-foreground-600 border-foreground-200';
};

const zoneColor = (zone: string) => {
  if (zone.includes('UEMOA')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (zone.includes('CEMAC')) return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-foreground-100 text-foreground-600 border-foreground-200';
};

export default function HubReglementationsNationalesPage() {
  const navigate = useNavigate();
  const [selectedPays, setSelectedPays] = useState<string>('senegal');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('all');

  const paysData = paysReglementations.find(p => p.id === selectedPays) || paysReglementations[0];

  const filteredPays = useMemo(() => {
    let result = paysReglementations;
    if (zoneFilter !== 'all') {
      result = result.filter(p => p.zone.includes(zoneFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.nom.toLowerCase().includes(q) ||
        p.capitale.toLowerCase().includes(q) ||
        p.actualites.toLowerCase().includes(q)
      );
    }
    return result;
  }, [zoneFilter, searchQuery]);

  const avgScore = Math.round(paysReglementations.reduce((s, p) => s + p.scoreConformite, 0) / paysReglementations.length);

  return (
    <>
      <SeoHead
        title="Hub des Réglementations Nationales — 17 Pays, 54 Régulateurs — KHEPRA EXPERTS"
        description="Hub des Réglementations Nationales KHEPRA : 892 textes nationaux suivis dans 17 pays d'Afrique francophone. Réglementations bancaires, FinTech, LBC/FT, microfinance par pays. Scores de conformité nationaux, alertes législatives, comparatif UEMOA/CEMAC. Indice de fiabilité KOS 91/100."
        keywords="réglementations nationales Afrique, lois bancaires Sénégal, Côte d'Ivoire FinTech, Cameroun COBAC, Gabon régulation, Togo microfinance, conformité nationale UEMOA CEMAC, KHEPRA EXPERTS"
        canonicalPath="/hub-reglementations-nationales/"
      />

      <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Warm%20amber%20and%20emerald%20abstract%20legal%20regulatory%20landscape%20with%20geometric%20patterns%20of%20national%20flags%20blending%20into%20a%20unified%20African%20governance%20architecture%2C%20soft%20natural%20lighting%20through%20modern%20glass%20government%20building%20facade%2C%20elegant%20marble%20textures%20with%20brass%20accents%2C%20institutional%20premium%20corporate%20atmosphere%2C%20editorial%20architecture%20photography%20with%20warm%20neutral%20tones&width=1600&height=720&seq=hub-nat-hero-2026&orientation=landscape"
            alt="Hub des Réglementations Nationales"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-50/90 backdrop-blur-sm text-foreground-950 text-sm font-semibold mb-6">
              <i className="ri-government-line text-emerald-600"></i>
              Hub des Réglementations Nationales — KHEPRA Knowledge Institute™
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight mb-4">
              Hub des Réglementations <span className="text-emerald-300">Nationales</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              17 pays, 54 régulateurs nationaux, {hubNationalKPIs.totalTextesNationaux} textes suivis. La donnée législative au niveau de chaque État.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 mb-10">
            {[
              { label: 'Pays Couverts', value: hubNationalKPIs.totalPaysCouverts, icon: 'ri-flag-line' },
              { label: 'Régulateurs', value: hubNationalKPIs.totalRegulateursNationaux, icon: 'ri-building-line' },
              { label: 'Textes Nationaux', value: hubNationalKPIs.totalTextesNationaux, icon: 'ri-file-text-line' },
              { label: 'Alertes/Mois', value: hubNationalKPIs.alertesCeMois, icon: 'ri-notification-3-line' },
              { label: 'Score Moyen', value: `${avgScore}/100`, icon: 'ri-trophy-line' },
              { label: 'Analyses Impact', value: hubNationalKPIs.analysesImpact, icon: 'ri-bar-chart-line' },
              { label: 'Publications', value: hubNationalKPIs.publications, icon: 'ri-book-open-line' },
              { label: 'Fiabilité KOS', value: `${hubNationalKPIs.indiceFiabilite}/100`, icon: 'ri-check-double-line' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-background-50 border border-background-200/70 text-center">
                <i className={`${s.icon} text-emerald-600 text-lg mb-1 block`}></i>
                <div className="text-xl font-bold text-foreground-950">{s.value}</div>
                <div className="text-xs text-foreground-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Diagnostic Flash */}
          <ScrollReveal>
            <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Votre pays est-il à jour de ses obligations réglementaires ?</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Recevez un diagnostic flash gratuit de 30 minutes avec un expert KHEPRA. Analyse de la transposition des directives BCEAO/COBAC dans votre législation nationale. Offre limitée aux institutions financières.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/diagnostic-flash/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-emerald-700 transition-colors">
                  <i className="ri-flashlight-line"></i>Diagnostic Flash — Gratuit
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Classement des Pays */}
          <ScrollReveal>
            <div className="mb-6">
              <BigFourSubtitleBar label="Classement des Pays — Score de Conformité Nationale" variant="left-accent" icon="ri-trophy-line" accentColor="primary" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
              {[...paysReglementations]
                .sort((a, b) => b.scoreConformite - a.scoreConformite)
                .map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPays(p.id)}
                    className={`p-4 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedPays === p.id
                        ? 'border-emerald-400 bg-emerald-50 shadow-sm'
                        : 'border-background-200 bg-white hover:border-foreground-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-foreground-400 mb-1">#{i + 1}</div>
                    <div className="text-sm font-bold text-foreground-950 mb-1">{p.nom}</div>
                    <div className="text-lg font-bold" style={{ color: p.color }}>{p.scoreConformite}</div>
                    <div className="text-[10px] text-foreground-400">/100</div>
                    <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-full ${
                      p.tendance === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-foreground-600 bg-foreground-100'
                    }`}>
                      <i className={p.tendance === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-right-line'} />
                      {p.tendanceChange}
                    </span>
                  </button>
                ))}
            </div>
          </ScrollReveal>

          {/* Filtres + Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un pays, une capitale..."
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-background-200 bg-white text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-background-200/70 rounded-full p-1">
              <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-widest px-3">Zone</span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'UEMOA', label: 'UEMOA' },
                { id: 'CEMAC', label: 'CEMAC' },
                { id: 'Hors', label: 'Élargie' },
              ].map(z => (
                <button
                  key={z.id}
                  onClick={() => setZoneFilter(z.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    zoneFilter === z.id
                      ? 'text-white'
                      : 'text-foreground-500 hover:bg-background-100'
                  }`}
                  style={zoneFilter === z.id ? { background: 'linear-gradient(135deg, #2d7518, #4a9e5b)' } : {}}
                >
                  {z.label}
                </button>
              ))}
            </div>
            <span className="text-xs text-foreground-400">{filteredPays.length} pays</span>
          </div>

          {/* Fiche Pays Détaillée */}
          <ScrollReveal>
            <div className="rounded-2xl bg-white border border-background-200/70 p-6 mb-10">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Colonne gauche : info pays */}
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-white text-2xl" style={{ background: paysData.color }}>
                      <i className={paysData.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground-950">{paysData.nom}</h3>
                      <div className="flex items-center gap-2 text-xs text-foreground-500 mt-0.5">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${zoneColor(paysData.zone)}`}>{paysData.zone}</span>
                        <span>{paysData.capitale}</span>
                        <span>·</span>
                        <span>{paysData.population}</span>
                        <span>·</span>
                        <span>PIB: {paysData.pib}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">{paysData.actualites}</p>

                  {/* Régulateurs nationaux */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <div className="p-3 rounded-lg bg-background-100 border border-background-200">
                      <div className="text-[10px] text-foreground-400 uppercase tracking-wider mb-1">Régulateur Bancaire</div>
                      <div className="text-xs font-bold text-foreground-900">{paysData.regulateurBancaire}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background-100 border border-background-200">
                      <div className="text-[10px] text-foreground-400 uppercase tracking-wider mb-1">Marchés Financiers</div>
                      <div className="text-xs font-bold text-foreground-900">{paysData.regulateurMarche}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background-100 border border-background-200">
                      <div className="text-[10px] text-foreground-400 uppercase tracking-wider mb-1">Assurance</div>
                      <div className="text-xs font-bold text-foreground-900">{paysData.regulateurAssurance}</div>
                    </div>
                  </div>

                  {/* Textes nationaux */}
                  <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-3">Textes Nationaux Récents</h4>
                  <div className="space-y-2">
                    {paysData.textes.map((texte, j) => (
                      <div key={j} className="p-3 rounded-lg bg-background-100 border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${impactBadge(texte.impact)}`}>{texte.impact}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-foreground-950">{texte.ref}</span>
                          <p className="text-[11px] text-foreground-600">{texte.titre}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-foreground-400 whitespace-nowrap">
                          <span>{texte.date}</span>
                          <span className="px-2 py-0.5 rounded-full bg-background-50 border border-background-200">{texte.domaine}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colonne droite : scores */}
                <div className="lg:w-1/3">
                  <div className="p-5 rounded-xl bg-background-100 border border-background-200 text-center mb-4">
                    <div className="text-[10px] text-foreground-400 uppercase tracking-widest mb-1">Score de Conformité</div>
                    <div className="text-5xl font-bold" style={{ color: paysData.color }}>{paysData.scoreConformite}</div>
                    <div className="text-xs text-foreground-500">/100</div>
                    <div className={`inline-flex items-center gap-1 text-xs font-bold mt-2 px-3 py-1 rounded-full ${
                      paysData.tendance === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-foreground-600 bg-foreground-100'
                    }`}>
                      <i className={paysData.tendance === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-right-line'} />
                      {paysData.tendanceChange} vs mois dernier
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold text-foreground-950">{paysData.textes.length}</div>
                      <div className="text-[10px] text-foreground-500">Textes récents</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold text-foreground-950">{paysData.pib}</div>
                      <div className="text-[10px] text-foreground-500">PIB</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold text-foreground-950">{paysData.population}</div>
                      <div className="text-[10px] text-foreground-500">Population</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background-100 border border-background-200 text-center">
                      <div className="text-2xl font-bold text-foreground-950">{paysData.zone.includes('UEMOA') ? 'FCFA' : paysData.zone.includes('CEMAC') ? 'FCFA' : 'Locale'}</div>
                      <div className="text-[10px] text-foreground-500">Monnaie</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Domaines Réglementaires */}
          <ScrollReveal>
            <div className="mb-6">
              <BigFourSubtitleBar label="Domaines Réglementaires par Pays" variant="left-accent" icon="ri-stack-line" accentColor="accent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {domainesReglementaires.map(d => (
                <div key={d.nom} className="p-5 rounded-xl bg-white border border-background-200 hover:border-emerald-300 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${d.color}15` }}>
                      <i className={`${d.icon} text-lg`} style={{ color: d.color }}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{d.nom}</h3>
                      <div className="text-2xl font-bold" style={{ color: d.color }}>{d.count}</div>
                      <div className="text-[10px] text-foreground-400">textes nationaux</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Actualités Récentes */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">
              <i className="ri-notification-3-line text-red-500 mr-2"></i>Actualités Nationales Récentes
            </h2>
            <div className="space-y-2 mb-10">
              {actualitesReglementaires.map(a => (
                <div key={a.id} className="p-4 rounded-xl bg-white border border-background-200/70 flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-bold whitespace-nowrap ${impactBadge(a.impact)}`}>{a.impact}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap">{a.pays}</span>
                      <span className="text-[10px] text-foreground-400">{a.domaine}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground-950">{a.titre}</p>
                    <p className="text-xs text-foreground-500 mt-0.5">{a.resume}</p>
                  </div>
                  <span className="text-[11px] text-foreground-400 whitespace-nowrap">{new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Tableau Comparatif Multi-Pays */}
          <ScrollReveal>
            <div className="mb-6">
              <BigFourSubtitleBar label="Tableau Comparatif — Textes par Pays et Domaine" variant="left-accent" icon="ri-table-line" accentColor="primary" />
            </div>
            <div className="rounded-2xl bg-white border border-background-200/70 p-5 md:p-6 overflow-x-auto mb-10">
              <table className="w-full text-xs min-w-[900px]">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="text-left py-3 px-3 font-bold text-foreground-500 uppercase tracking-wide">Pays</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Zone</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Score</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Banque</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">LBC/FT</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">FinTech</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Microfi.</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Cyber</th>
                    <th className="text-center py-3 px-2 font-bold text-foreground-500 uppercase tracking-wide">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPays.map(p => {
                    const banqueCount = p.textes.filter(t => t.domaine === 'Banque').length;
                    const lbcftCount = p.textes.filter(t => t.domaine === 'LBC/FT').length;
                    const fintechCount = p.textes.filter(t => t.domaine === 'FinTech').length;
                    const microfiCount = p.textes.filter(t => t.domaine === 'Microfinance' || t.domaine === 'Inclusion Financière').length;
                    const cyberCount = p.textes.filter(t => t.domaine === 'Cybersécurité' || t.domaine === 'Data Privacy' || t.domaine === 'Digital').length;
                    return (
                      <tr key={p.id} className="border-b border-background-100 hover:bg-background-50/50 transition-colors cursor-pointer" onClick={() => setSelectedPays(p.id)}>
                        <td className="py-3 px-3 font-bold text-foreground-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: p.color }}></span>
                          {p.nom}
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${zoneColor(p.zone)}`}>{p.zone.includes('UEMOA') ? 'UEMOA' : p.zone.includes('CEMAC') ? 'CEMAC' : 'Autre'}</span>
                        </td>
                        <td className="text-center py-3 px-2 font-bold" style={{ color: p.scoreConformite >= 80 ? '#059669' : p.scoreConformite >= 70 ? '#d97706' : '#dc2626' }}>{p.scoreConformite}</td>
                        <td className="text-center py-3 px-2 text-foreground-700">{banqueCount || '—'}</td>
                        <td className="text-center py-3 px-2 text-foreground-700">{lbcftCount || '—'}</td>
                        <td className="text-center py-3 px-2 text-foreground-700">{fintechCount || '—'}</td>
                        <td className="text-center py-3 px-2 text-foreground-700">{microfiCount || '—'}</td>
                        <td className="text-center py-3 px-2 text-foreground-700">{cyberCount || '—'}</td>
                        <td className="text-center py-3 px-2 font-bold" style={{ color: '#0D7B5F' }}>{p.textes.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-6">Questions Fréquentes</h2>
            <div className="space-y-3 mb-8">
              {faqsNational.map((faq, i) => (
                <div key={i} className="rounded-xl bg-white border border-background-200/70 overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full text-left p-5 flex items-center justify-between gap-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground-950">{faq.q}</span>
                    <i className={`ri-add-line text-foreground-400 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}></i>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA final */}
          <div className="text-center p-8 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-lg font-bold text-foreground-950 mb-2">Abonnez-vous au Hub des Réglementations Nationales</h3>
            <p className="text-sm text-foreground-600 mb-6 max-w-lg mx-auto">Recevez notre bulletin hebdomadaire de veille législative nationale. Alertes par pays, analyses d'impact et comparatifs UEMOA/CEMAC.</p>
            <Link to="/contact" className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer">
              <i className="ri-mail-line"></i>S'abonner
            </Link>
          </div>

          <KOSPublicHubCrossLinks currentPage="hub-national" />
        </div>
      </div>
    </>
  );
}