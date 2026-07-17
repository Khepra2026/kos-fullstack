import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { instrumentsPreQualification, statistiquesPortail } from '@/mocks/ultraLeadMagnets';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const TYPE_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  diagnostic: { label: 'Diagnostic', icon: 'ri-stethoscope-line', color: '#86BC25' },
  simulation: { label: 'Simulation', icon: 'ri-computer-line', color: '#D4AF37' },
  benchmark: { label: 'Benchmark', icon: 'ri-bar-chart-grouped-line', color: '#6b7280' },
  observatoire: { label: 'Observatoire', icon: 'ri-radar-line', color: '#6b7280' },
};

export default function UltraLeadMagnetsHome() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [filterDomaine, setFilterDomaine] = useState<string>('tous');
  const [filterType, setFilterType] = useState<string>('tous');

  const instruments = instrumentsPreQualification.filter((inst) => {
    if (filterDomaine !== 'tous' && inst.domaine !== filterDomaine) return false;
    if (filterType !== 'tous' && inst.typeInstrument !== filterType) return false;
    return true;
  });

  const domaines = ['tous', ...Array.from(new Set(instrumentsPreQualification.map((i) => i.domaine)))];

  return (
    <section id="ultra-lead-magnets" className="py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label={isEn ? 'Institutional Pre-Qualification Instruments' : 'Instruments de Pré-qualification Institutionnelle'}
                variant="left-accent"
                icon="ri-file-search-line"
                accentColor="accent"
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), Georgia, serif', letterSpacing: '-0.02em' }}>
              {isEn
                ? 'Votre analyse réglementaire commence ici'
                : 'Votre analyse réglementaire commence ici'}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed text-justify">
              {isEn
                ? 'Instruments d\'analyse et d\'évaluation structurés pour dirigeants, investisseurs et institutions financières en Afrique francophone. Chaque instrument donne lieu à un entretien de qualification confidentiel — devis sur mesure, sans engagement.'
                : 'Instruments d\'analyse et d\'évaluation structurés pour dirigeants, investisseurs et institutions financières en Afrique francophone. Chaque instrument donne lieu à un entretien de qualification confidentiel — devis sur mesure, sans engagement.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {/* Domaine Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {domaines.map((domaine) => (
                <button
                  key={domaine}
                  onClick={() => setFilterDomaine(domaine)}
                  className="px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all duration-300"
                  style={{
                    background: filterDomaine === domaine ? '#86BC25' : 'transparent',
                    color: filterDomaine === domaine ? '#ffffff' : '#6b7280',
                    border: `1.5px solid ${filterDomaine === domaine ? '#86BC25' : '#e5e7eb'}`,
                  }}
                >
                  {domaine === 'tous' ? (isEn ? 'All' : 'Tous') : domaine}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-200 hidden sm:block" />

            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterType('tous')}
                className="px-3 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all duration-300"
                style={{
                  background: filterType === 'tous' ? '#1f2937' : 'transparent',
                  color: filterType === 'tous' ? '#ffffff' : '#6b7280',
                  border: `1.5px solid ${filterType === 'tous' ? '#1f2937' : '#e5e7eb'}`,
                }}
              >
                {isEn ? 'All' : 'Tous'}
              </button>
              {(['diagnostic', 'simulation', 'benchmark'] as const).map((type) => {
                const cfg = TYPE_CONFIG[type];
                return (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className="px-3 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all duration-300"
                    style={{
                      background: filterType === type ? `${cfg.color}15` : 'transparent',
                      color: filterType === type ? cfg.color : '#6b7280',
                      border: `1.5px solid ${filterType === type ? `${cfg.color}40` : '#e5e7eb'}`,
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Instruments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {instruments.slice(0, 9).map((inst, i) => {
            const typeCfg = TYPE_CONFIG[inst.typeInstrument] || TYPE_CONFIG.diagnostic;
            return (
              <ScrollReveal key={inst.id} delay={i * 60}>
                <div
                  className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                  }}
                  onClick={() => navigate(inst.landingPageSlug)}
                >
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: `${typeCfg.color}15`, color: typeCfg.color }}
                    >
                      <i className={`${typeCfg.icon} text-[8px]`} />
                      {typeCfg.label}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">{inst.domaine}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#86BC25] transition-colors">
                    {inst.name}
                  </h3>

                  {/* Enjeu snippet */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
                    {inst.enjeu.slice(0, 120)}...
                  </p>

                  {/* Thématiques */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {inst.thematiques.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-gray-50 rounded-full text-[10px] text-gray-500">{t}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{inst.format.split('+')[0].trim()}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#86BC25] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {isEn ? 'Qualification' : 'Qualification'}
                      <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Stats Bar */}
        <ScrollReveal delay={200}>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{statistiquesPortail.totalInstruments}</div>
                <div className="text-xs text-gray-400 mt-1">{isEn ? 'Instruments' : 'Instruments'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#86BC25', fontFamily: 'var(--font-heading)' }}>{statistiquesPortail.repartitionParType.diagnostic}</div>
                <div className="text-xs text-gray-400 mt-1">{isEn ? 'Diagnostics' : 'Diagnostics'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#D4AF37', fontFamily: 'var(--font-heading)' }}>{statistiquesPortail.repartitionParType.simulation + statistiquesPortail.repartitionParType.benchmark}</div>
                <div className="text-xs text-gray-400 mt-1">{isEn ? 'Simulations & Benchmarks' : 'Simulations & Benchmarks'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{statistiquesPortail.zonesCouvertes}</div>
                <div className="text-xs text-gray-400 mt-1">{isEn ? 'Coverage' : 'Couverture'}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={250}>
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/kos-ultra-lead-magnets')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #a5d936)',
                color: '#ffffff',
                boxShadow: '0 6px 28px rgba(134,188,37,0.35)',
              }}
            >
              <i className="ri-file-search-line text-lg" />
              {isEn ? 'Portail de Pré-qualification' : 'Portail de Pré-qualification'}
            </button>
            <p className="text-xs text-gray-400 mt-3">
              {isEn
                ? 'Entretien confidentiel · Devis sur mesure · Sans engagement'
                : 'Entretien confidentiel · Devis sur mesure · Sans engagement'}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}