import { useState } from 'react';

export interface GeneratorItem {
  id: string;
  name: string;
  description: string;
  client: string;
  icon: string;
  colorClass: string;
  generating: boolean;
  onGenerate: () => void;
}

export interface GeneratorGroup {
  id: string;
  label: string;
  icon: string;
  color: string;
  items: GeneratorItem[];
}

interface AdminDocumentGeneratorsPanelProps {
  generators: GeneratorGroup[];
}

export default function AdminDocumentGeneratorsPanel({ generators }: AdminDocumentGeneratorsPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'optasia': true });

  const toggleGroup = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = generators.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground-900 flex items-center gap-2">
            <i className="ri-flashlight-line text-amber-500"></i>
            Générateur de Documents
          </h3>
          <p className="text-xs text-foreground-400 mt-0.5">{totalItems} générateurs disponibles — Documents Word, Excel et PDF</p>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-2">
        {generators.map((group) => (
          <div key={group.id} className="bg-white rounded-xl border border-background-200 overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-background-50 transition-colors cursor-pointer text-left"
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${group.color}`}>
                <i className={`${group.icon} text-base`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground-900">{group.label}</p>
                  <span className="px-1.5 py-0.5 bg-background-100 rounded text-xs text-foreground-500 font-medium">
                    {group.items.length}
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                {expanded[group.id] ? (
                  <i className="ri-arrow-up-s-line text-foreground-400 text-sm"></i>
                ) : (
                  <i className="ri-arrow-down-s-line text-foreground-400 text-sm"></i>
                )}
              </div>
            </button>

            {/* Group Items */}
            {expanded[group.id] && (
              <div className="border-t border-background-100 px-5 py-3 space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onGenerate}
                    disabled={item.generating}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-background-50 transition-all cursor-pointer disabled:opacity-50 text-left"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.colorClass} flex-shrink-0`}>
                      {item.generating ? (
                        <i className="ri-loader-4-line animate-spin text-sm"></i>
                      ) : (
                        <i className={`${item.icon} text-sm`}></i>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground-900 truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-foreground-400">{item.client}</span>
                        {item.description && (
                          <span className="text-xs text-foreground-300 truncate hidden sm:inline">· {item.description}</span>
                        )}
                      </div>
                    </div>
                    {item.generating ? (
                      <span className="text-xs text-amber-600 font-medium whitespace-nowrap">En cours...</span>
                    ) : (
                      <i className="ri-download-2-line text-foreground-300 text-sm flex-shrink-0"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <i className="ri-lightbulb-line text-amber-600 mt-0.5"></i>
          <div>
            <p className="text-sm font-semibold text-amber-800">Conseil</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Cliquez sur un groupe pour déplier les générateurs. Les documents sont automatiquement sauvegardés dans l'espace admin après génération.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}