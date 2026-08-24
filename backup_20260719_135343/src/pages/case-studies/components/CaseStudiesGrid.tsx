import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CaseStudyCard } from '';
import { CaseStudiesFilters } from '';
import { caseStudies } from '@/mocks/caseStudies';
import { CaseStudyDetailModal } from '';
import type { CaseStudy } from '@/mocks/caseStudies';

const BU_LABELS: Record<string, { fr: string; en: string; accent: string }> = {
  regulation: { fr: 'Régulation Financière', en: 'Financial Regulation', accent: '#86BC25' },
  'prix-transfert': { fr: 'Prix de Transfert', en: 'Transfer Pricing', accent: '#D4AF37' },
  grc: { fr: 'Gouvernance & Risques', en: 'Governance & Risk', accent: '#6B9B1F' },
  multi: { fr: 'Multi-BU', en: 'Multi-BU', accent: '#525252' },
};

export function CaseStudiesGrid() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [selectedBU, setSelectedBU] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedModal, setSelectedModal] = useState<CaseStudy | null>(null);

  const filteredCases = useMemo(() => {
    let result = caseStudies;
    if (selectedBU !== 'all') {
      result = result.filter((cs) => cs.businessUnit === selectedBU || cs.businessUnit === 'multi');
    }
    if (selectedSector !== 'all') {
      result = result.filter((cs) => cs.sector === selectedSector);
    }
    if (selectedCountry !== 'all') {
      result = result.filter((cs) => cs.country.includes(selectedCountry));
    }
    return result;
  }, [selectedBU, selectedSector, selectedCountry]);

  // Group by BU when "all" BU is selected
  const groupedCases = useMemo(() => {
    if (selectedBU !== 'all') return null;

    const groups: Record<string, CaseStudy[]> = {
      regulation: [],
      'prix-transfert': [],
      grc: [],
      multi: [],
    };

    filteredCases.forEach((cs) => {
      if (groups[cs.businessUnit]) {
        groups[cs.businessUnit].push(cs);
      }
    });

    return groups;
  }, [filteredCases, selectedBU]);

  return (
    <>
      <section className="py-16 sm:py-20 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaseStudiesFilters
            selectedBU={selectedBU}
            selectedSector={selectedSector}
            selectedCountry={selectedCountry}
            onBUChange={setSelectedBU}
            onSectorChange={setSelectedSector}
            onCountryChange={setSelectedCountry}
          />

          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-gray-500">
              {filteredCases.length === 0
                ? (isEn ? 'No results' : 'Aucun résultat')
                : isEn
                  ? `${filteredCases.length} case ${filteredCases.length > 1 ? 'studies' : 'study'}`
                  : `${filteredCases.length} étude${filteredCases.length > 1 ? 's' : ''} de cas`}
            </p>
          </div>

          {filteredCases.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-100 mx-auto mb-4">
                <i className="ri-folder-open-line text-3xl text-gray-300" />
              </div>
              <p className="text-gray-400 text-lg font-medium">
                {isEn ? 'No case studies match your filters.' : 'Aucune étude de cas ne correspond à vos filtres.'}
              </p>
              <button
                onClick={() => { setSelectedBU('all'); setSelectedSector('all'); setSelectedCountry('all'); }}
                className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-600 border border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
              >
                {isEn ? 'Reset filters' : 'Réinitialiser les filtres'}
              </button>
            </div>
          ) : groupedCases && selectedBU === 'all' ? (
            /* ── Grouped by BU view ── */
            <div className="space-y-16">
              {Object.entries(groupedCases).map(([buKey, cases]) => {
                if (cases.length === 0) return null;
                const bu = BU_LABELS[buKey];
                return (
                  <div key={buKey}>
                    {/* BU Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-1.5 h-8 rounded-full flex-shrink-0"
                        style={{ background: bu.accent }}
                      />
                      <h2 className="text-xl font-bold text-foreground-900 font-display tracking-tight">
                        {isEn ? bu.en : bu.fr}
                      </h2>
                      <span className="text-sm text-gray-400 font-medium ml-1">
                        ({cases.length})
                      </span>
                    </div>
                    {/* Cases grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {cases.map((cs) => (
                        <CaseStudyCard
                          key={cs.id}
                          caseStudy={cs}
                          onClick={() => setSelectedModal(cs)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Flat grid for filtered view ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCases.map((cs) => (
                <CaseStudyCard
                  key={cs.id}
                  caseStudy={cs}
                  onClick={() => setSelectedModal(cs)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CaseStudyDetailModal
        caseStudy={selectedModal}
        onClose={() => setSelectedModal(null)}
      />
    </>
  );
}



