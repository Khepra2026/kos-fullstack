interface CadreBlock {
  id: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  title: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  sourceNote?: string;
  intro?: string;
  bullets?: string[];
}

interface CadreReglementaireData {
  heading: string;
  blocks: CadreBlock[];
}

interface ArticleCadreReglementaireProps {
  data: CadreReglementaireData;
}

export function ArticleCadreReglementaire({ data }: ArticleCadreReglementaireProps) {
  return (
    <section className="mb-14 scroll-mt-28" id="cadre-reglementaire">
      <h2
        id="cadre-reglementaire-heading"
        className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
        style={{ fontFamily: 'var(--font-heading), serif' }}
      >
        <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
          I
        </span>
        {data.heading}
      </h2>

      {data.blocks.map((block) => (
        <div
          key={block.id}
          className={`rounded-2xl border-2 ${block.border} overflow-hidden mb-6`}
        >
          <div
            className={`flex items-center gap-3 px-5 sm:px-6 py-4 ${block.bg} border-b-2 ${block.border}`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-xl border-2 ${block.border} bg-background-50 flex-shrink-0`}
            >
              <i className={`${block.icon} ${block.color} text-base`}></i>
            </div>
            <h3 className="font-bold text-foreground-950 text-base leading-snug">
              {block.title}
            </h3>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-4">
            {block.tableHeaders && block.tableRows ? (
              <>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  Le dispositif de contrôle interne et de gestion des risques repose sur un corpus normatif à trois niveaux :
                </p>
                <div className="overflow-x-auto rounded-xl border border-secondary-200">
                  <table className="w-full text-xs min-w-[600px]">
                    <thead>
                      <tr className="bg-secondary-50 border-b border-secondary-200">
                        {block.tableHeaders.map((h, hi) => (
                          <th
                            key={hi}
                            className="px-3 py-3 text-left font-bold text-foreground-600 uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {block.tableRows.map((row, ri) => (
                        <tr key={ri} className="hover:bg-secondary-50/50 transition-colors">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-3 py-2.5 text-foreground-700 align-top text-xs leading-snug ${
                                ci === 0 ? 'font-semibold text-foreground-950' : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.sourceNote && (
                  <p className="text-xs text-foreground-400 italic">{block.sourceNote}</p>
                )}
              </>
            ) : (
              <>
                {block.intro && (
                  <p className="text-sm text-foreground-600 leading-relaxed">{block.intro}</p>
                )}
                {block.bullets && (
                  <ul className="space-y-2.5">
                    {block.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-2.5 bg-secondary-100 rounded-xl p-3 border border-secondary-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-accent-500"></span>
                        <p className="text-sm text-foreground-700 leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {block.sourceNote && (
                  <p className="text-xs text-foreground-400 italic">{block.sourceNote}</p>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}



