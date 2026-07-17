import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useUltraLeadMagnets } from '@/hooks/useUltraLeadMagnets';
import type { InstrumentPreQualification } from '@/hooks/useUltraLeadMagnets';

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  diagnostic: { label: 'Diagnostic', icon: 'ri-stethoscope-line' },
  simulation: { label: 'Simulation', icon: 'ri-computer-line' },
  benchmark: { label: 'Benchmark', icon: 'ri-bar-chart-grouped-line' },
  observatoire: { label: 'Observatoire', icon: 'ri-radar-line' },
};

export default function KOSUltraLeadMagnetsPage() {
  const { instruments, stats, parcours, loading, error } = useUltraLeadMagnets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filtreType, setFiltreType] = useState<string>('tous');
  const [filtreDomaine, setFiltreDomaine] = useState<string>('tous');
  const [filtreVisibilite, setFiltreVisibilite] = useState<string>('tous');

  const visibiliteCounts = useMemo(() => {
    const pub = instruments.filter((i) => i.visibilite === 'public').length;
    const interne = instruments.filter((i) => i.visibilite === 'interne').length;
    return { pub, interne };
  }, [instruments]);

  if (loading) {
    return (
      <KOSHubLayout hubId={88}>
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="flex items-center gap-3 text-foreground-500">
            <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            <span className="text-sm">Chargement...</span>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error || !instruments.length) {
    return (
      <KOSHubLayout hubId={88}>
        <div className="min-h-screen bg-background-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto mb-3">
              <i className="ri-error-warning-line text-xl" />
            </div>
            <p className="text-sm text-foreground-600">{error || 'Aucun instrument disponible.'}</p>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  const domaines = ['tous', ...Array.from(new Set(instruments.map((i) => i.domaine)))];
  const typesFiltre = [
    { key: 'tous', label: 'Tous' },
    { key: 'diagnostic', label: 'Diagnostics' },
    { key: 'simulation', label: 'Simulations' },
    { key: 'benchmark', label: 'Benchmarks' },
    { key: 'observatoire', label: 'Observatoires' },
  ];

  const instrumentsFiltres = instruments.filter((inst) => {
    if (filtreType !== 'tous' && inst.typeInstrument !== filtreType) return false;
    if (filtreDomaine !== 'tous' && inst.domaine !== filtreDomaine) return false;
    if (filtreVisibilite !== 'tous' && inst.visibilite !== filtreVisibilite) return false;
    return true;
  });

  return (
    <KOSHubLayout hubId={88}>
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Bandeau de Protection — Badge explicite */}
          <div className="flex flex-wrap items-center gap-3 mb-6 bg-amber-50/80 border border-amber-200/60 rounded-xl p-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full">
              <i className="ri-lock-fill text-amber-700 text-sm w-4 h-4 flex items-center justify-center" />
              <span className="text-xs font-bold text-amber-800 whitespace-nowrap">KOS INTERNE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-amber-800 font-medium">Page protégée — Accès réservé à l'équipe KHEPRA</span>
              <span className="hidden sm:inline text-amber-500">·</span>
              <span className="hidden sm:inline text-xs text-amber-700">
                Contient les instruments de pré-qualification, approches propriétaires, parcours et données stratégiques internes.
              </span>
            </div>
          </div>

          {/* Header — Institutionnel */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap">
                Instruments de Pré-qualification
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                {stats?.totalInstruments} instruments
              </span>
              <span className="px-3 py-1 rounded-full text-xs text-foreground-500 whitespace-nowrap">
                {stats?.zonesCouvertes}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 font-heading">
              Portail de Pré-qualification Institutionnelle
            </h1>
            <p className="text-foreground-600 mt-2 max-w-3xl leading-relaxed">
              Instruments d&apos;analyse et d&apos;évaluation structurés pour dirigeants, investisseurs et institutions financières en Afrique francophone. 
              Chaque instrument donne lieu à un entretien de qualification confidentiel avec un expert KHEPRA.
            </p>
          </div>

          {/* Parcours de Qualification — 5 étapes */}
          {parcours && (
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-foreground-700 uppercase">
                  Parcours de Qualification
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                  🔒 Parcours Interne
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {parcours.etapes.map((etape, idx) => (
                  <div key={idx} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">{idx + 1}</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground-900">{etape.etape}</div>
                      <div className="text-xs text-foreground-500 mt-0.5 hidden sm:block">{etape.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-400 mt-3 text-center">
                Sans engagement · Devis confidentiel · Accompagnement contractuel
              </p>
            </div>
          )}

          {/* Filtres */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-background-100 rounded-full p-1">
              {typesFiltre.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFiltreType(t.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    filtreType === t.key
                      ? 'bg-background-50 text-foreground-950 shadow-sm'
                      : 'text-foreground-500 hover:text-foreground-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 overflow-x-auto">
              {domaines.map((d) => (
                <button
                  key={d}
                  onClick={() => setFiltreDomaine(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    filtreDomaine === d
                      ? 'bg-background-50 text-foreground-950 shadow-sm'
                      : 'text-foreground-500 hover:text-foreground-800'
                  }`}
                >
                  {d === 'tous' ? 'Tous domaines' : d}
                </button>
              ))}
            </div>
            {/* Filtre Visibilité */}
            <div className="flex items-center gap-1 bg-background-100 rounded-full p-1">
              <button
                onClick={() => setFiltreVisibilite('tous')}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  filtreVisibilite === 'tous'
                    ? 'bg-background-50 text-foreground-950 shadow-sm'
                    : 'text-foreground-500 hover:text-foreground-800'
                }`}
              >
                Toute visibilité
              </button>
              <button
                onClick={() => setFiltreVisibilite('public')}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
                  filtreVisibilite === 'public'
                    ? 'bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'text-foreground-500 hover:text-foreground-800'
                }`}
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px]">🌐</span>
                Publics ({visibiliteCounts.pub})
              </button>
              <button
                onClick={() => setFiltreVisibilite('interne')}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  filtreVisibilite === 'interne'
                    ? 'bg-amber-50 text-amber-800 shadow-sm'
                    : 'text-foreground-500 hover:text-foreground-800'
                }`}
              >
                <i className={`ri-lock-fill text-[10px] w-3.5 h-3.5 flex items-center justify-center ${filtreVisibilite === 'interne' ? 'text-amber-600' : 'text-foreground-400'}`} />
                Internes ({visibiliteCounts.interne})
              </button>
            </div>
            <span className="text-xs text-foreground-400">{instrumentsFiltres.length} instrument(s)</span>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <div className="text-xs text-foreground-500 mb-1">Diagnostics</div>
              <div className="text-lg font-bold text-foreground-950">{stats?.repartitionParType.diagnostic}</div>
            </div>
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <div className="text-xs text-foreground-500 mb-1">Simulations</div>
              <div className="text-lg font-bold text-foreground-950">{stats?.repartitionParType.simulation}</div>
            </div>
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <div className="text-xs text-foreground-500 mb-1">Benchmarks</div>
              <div className="text-lg font-bold text-foreground-950">{stats?.repartitionParType.benchmark}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-3 text-center">
              <div className="text-xs text-emerald-700 mb-1">🌐 Publics</div>
              <div className="text-lg font-bold text-emerald-800">{visibiliteCounts.pub}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3 text-center">
              <div className="text-xs text-amber-700 mb-1">🔒 Internes</div>
              <div className="text-lg font-bold text-amber-800">{visibiliteCounts.interne}</div>
            </div>
          </div>

          {/* Instruments — Accordéon */}
          <div className="space-y-3">
            {instrumentsFiltres.map((inst) => {
              const isOpen = selectedId === inst.id;
              const typeInfo = TYPE_LABELS[inst.typeInstrument] || TYPE_LABELS.diagnostic;
              const isPublic = inst.visibilite === 'public';

              return (
                <div
                  key={inst.id}
                  className={`bg-background-50 border rounded-xl overflow-hidden ${
                    isPublic ? 'border-emerald-200/70' : 'border-amber-200/70'
                  }`}
                >
                  <button
                    onClick={() => setSelectedId(isOpen ? null : inst.id)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-background-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isPublic ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                        <i className={`${typeInfo.icon} ${isPublic ? 'text-emerald-700' : 'text-amber-700'}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-background-100 text-foreground-600 whitespace-nowrap">
                            {typeInfo.label}
                          </span>
                          {/* Badge de visibilité */}
                          {isPublic ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap flex items-center gap-1">
                              <span className="text-[10px]">🌐</span>
                              Public
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap flex items-center gap-1">
                              <i className="ri-lock-fill text-[10px] w-3 h-3 flex items-center justify-center" />
                              Interne
                            </span>
                          )}
                          <span className="font-semibold text-foreground-950 text-sm">{inst.name}</span>
                        </div>
                        <div className="text-xs text-foreground-500 mt-0.5 truncate">
                          {inst.domaine} · {inst.format}
                        </div>
                      </div>
                    </div>
                    <i className={`text-foreground-400 flex-shrink-0 ml-3 ${isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                  </button>

                  {isOpen && (
                    <div className={`border-t p-5 space-y-4 ${isPublic ? 'border-emerald-200/40' : 'border-amber-200/40'}`}>
                      {/* Enjeu & Approche */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">Enjeu</div>
                          <p className="text-sm text-foreground-700 leading-relaxed">{inst.enjeu}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">Approche KHEPRA</div>
                          <p className="text-sm text-foreground-700 leading-relaxed">{inst.approche}</p>
                        </div>
                      </div>

                      {/* Public cible */}
                      <div>
                        <div className="text-xs font-semibold text-foreground-500 uppercase mb-1">Public concerné</div>
                        <p className="text-sm text-foreground-600">{inst.publicCible}</p>
                      </div>

                      {/* Thématiques */}
                      <div>
                        <div className="text-xs font-semibold text-foreground-500 uppercase mb-1">Thématiques</div>
                        <div className="flex flex-wrap gap-1">
                          {inst.thematiques.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-background-100 rounded-full text-xs text-foreground-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Landing page info */}
                      <div className={`rounded-lg p-3 ${isPublic ? 'bg-emerald-50/70 border border-emerald-200/60' : 'bg-amber-50/70 border border-amber-200/60'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {isPublic ? (
                            <>
                              <span className="text-sm">🌐</span>
                              <span className="text-xs font-semibold text-emerald-800 uppercase">Landing Page Publique</span>
                            </>
                          ) : (
                            <>
                              <i className="ri-lock-fill text-amber-600 text-sm w-4 h-4 flex items-center justify-center" />
                              <span className="text-xs font-semibold text-amber-800 uppercase">Instrument Interne</span>
                            </>
                          )}
                        </div>
                        {isPublic ? (
                          <p className="text-xs text-emerald-700">
                            Cet instrument dispose d&apos;une landing page accessible au public sur{' '}
                            <code className="bg-emerald-100/70 px-1.5 py-0.5 rounded text-xs font-mono">{inst.landingPageSlug}</code>.
                            Les visiteurs non authentifiés peuvent y accéder librement.
                          </p>
                        ) : (
                          <p className="text-xs text-amber-700">
                            Cet instrument est exclusivement accessible depuis le hub KOS. Il n&apos;a pas de landing page publique.
                            Réservé à l&apos;équipe KHEPRA pour la pré-qualification interne.
                          </p>
                        )}
                      </div>

                      {/* CTA — Entretien de qualification */}
                      <div className="pt-2">
                        <a
                          href={inst.landingPageSlug}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-background-50 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            isPublic ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary-500 hover:bg-primary-600'
                          }`}
                        >
                          <i className="ri-calendar-check-line" />
                          {isPublic ? 'Voir la landing page publique' : 'Solliciter un entretien de qualification'}
                        </a>
                        <p className="text-xs text-foreground-400 mt-2">
                          Entretien confidentiel de 30 minutes avec un expert · Devis sur mesure · Sans engagement
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Section finale — Modèle contractuel */}
          <div className="mt-10 bg-background-50 border border-background-200/70 rounded-xl p-6 text-center">
            <h3 className="text-sm font-semibold text-foreground-700 uppercase mb-3">
              Modalités d&apos;Accompagnement
            </h3>
            <p className="text-sm text-foreground-600 max-w-2xl mx-auto leading-relaxed mb-4">
              Les instruments de pré-qualification sont offerts. L&apos;accompagnement stratégique fait l&apos;objet 
              d&apos;un <strong className="text-foreground-900">devis confidentiel sur mesure</strong>, établi après 
              entretien de qualification avec un expert KHEPRA. Chaque mission est contractuelle, sans engagement 
              préalable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-foreground-500">
              <span className="flex items-center gap-1">
                <i className="ri-shield-check-line text-emerald-500" />
                Devis confidentiel
              </span>
              <span className="text-foreground-300">·</span>
              <span className="flex items-center gap-1">
                <i className="ri-file-text-line text-amber-500" />
                Mission contractuelle
              </span>
              <span className="text-foreground-300">·</span>
              <span className="flex items-center gap-1">
                <i className="ri-user-star-line text-primary-500" />
                Expert dédié
              </span>
              <span className="text-foreground-300">·</span>
              <span className="flex items-center gap-1">
                <i className="ri-lock-line text-foreground-400" />
                Sans engagement
              </span>
            </div>
          </div>

          {/* Stats footer */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-background-100/70 border border-background-200/70 rounded-xl p-3 text-center">
              <div className="text-xs text-foreground-500 mb-1">Instruments</div>
              <div className="text-lg font-bold text-foreground-950">{stats?.totalInstruments}</div>
            </div>
            <div className="bg-background-100/70 border border-background-200/70 rounded-xl p-3 text-center">
              <div className="text-xs text-foreground-500 mb-1">Domaines</div>
              <div className="text-lg font-bold text-foreground-950">4</div>
            </div>
            <div className="bg-emerald-100/70 border border-emerald-200/60 rounded-xl p-3 text-center">
              <div className="text-xs text-emerald-700 mb-1">🌐 Pages Publiques</div>
              <div className="text-lg font-bold text-emerald-800">{visibiliteCounts.pub}</div>
            </div>
            <div className="bg-amber-100/70 border border-amber-200/60 rounded-xl p-3 text-center">
              <div className="text-xs text-amber-700 mb-1">🔒 Instruments Internes</div>
              <div className="text-lg font-bold text-amber-800">{visibiliteCounts.interne}</div>
            </div>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}