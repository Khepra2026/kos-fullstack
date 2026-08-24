import { useState } from 'react';

interface CampaignBuilderProps {
  onClose: () => void;
}

export default function CampaignBuilder({ onClose }: CampaignBuilderProps) {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [selectedSequence, setSelectedSequence] = useState('');
  const [subjectPrefix, setSubjectPrefix] = useState('');
  const [senderName, setSenderName] = useState('KHEPRA EXPERTS');
  const [senderEmail, setSenderEmail] = useState('contact@khepraexperts.com');

  const sequences = [
    { id: 'checklist-conformite-bceao-cobac', name: 'Checklist Conformité BCEAO/COBAC', icon: 'ri-shield-check-line', color: '#6366f1' },
    { id: 'guide-levee-fonds-afrique', name: 'Guide Levée de Fonds Afrique', icon: 'ri-funds-line', color: '#f59e0b' },
    { id: 'simulation-risque-reglementaire', name: 'Simulation Risque Réglementaire', icon: 'ri-alarm-warning-line', color: '#ef4444' },
    { id: 'template-audit-gouvernance', name: 'Template Audit Gouvernance', icon: 'ri-government-line', color: '#10b981' },
    { id: 'mini-rapport-due-diligence', name: 'Mini-Rapport Due Diligence', icon: 'ri-search-eye-line', color: '#8b5cf6' },
    { id: 'diagnostic-esg-maturite', name: 'Diagnostic ESG Maturité', icon: 'ri-leaf-line', color: '#059669' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nouvelle campagne de sensibilisation</h2>
            <p className="text-xs text-slate-500">Créez une campagne sortante avec vos propres templates et boîte mail</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer" type="button">
            <i className="ri-close-line w-4 h-4 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Étapes */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {['Séquence', 'Expéditeur', 'Leads', 'Lancement'].map((label, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step > idx + 1 ? 'bg-emerald-500 text-white'
                  : step === idx + 1 ? 'bg-teal-600 text-white ring-2 ring-teal-300'
                  : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > idx + 1 ? <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i> : idx + 1}
                </div>
                <span className={`text-xs ml-2 font-medium ${step >= idx + 1 ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
                {idx < 3 && <div className="flex-1 h-px mx-3 bg-slate-200"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Nom de la campagne</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Ex: Campagne BCEAO Q2 2026"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Séquence email</label>
                <div className="grid grid-cols-1 gap-2">
                  {sequences.map((seq) => (
                    <button
                      key={seq.id}
                      onClick={() => setSelectedSequence(seq.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer text-left ${
                        selectedSequence === seq.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                      type="button"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${seq.color}15` }}>
                        <i className={`${seq.icon} w-5 h-5 flex items-center justify-center`} style={{ color: seq.color }}></i>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{seq.name}</span>
                      {selectedSequence === seq.id && (
                        <i className="ri-checkbox-circle-fill text-teal-600 w-5 h-5 flex items-center justify-center ml-auto"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Préfixe objet (optionnel)</label>
                <input
                  type="text"
                  value={subjectPrefix}
                  onChange={(e) => setSubjectPrefix(e.target.value)}
                  placeholder="Ex: [KHEPRA] "
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4">
                <div className="flex items-start gap-2">
                  <i className="ri-information-line text-amber-600 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">Configuration SMTP/IMAP</p>
                    <p className="text-xs text-amber-700">
                      Pour envoyer depuis votre domaine, configurez votre boîte mail SMTP. Google Workspace (Gmail) est pré-rempli. Un App Password Google est requis.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Nom d&apos;expéditeur</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email expéditeur</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Serveur SMTP</label>
                  <input type="text" value="smtp.gmail.com" readOnly className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Port SMTP</label>
                  <input type="text" value="587" readOnly className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Serveur IMAP</label>
                  <input type="text" value="imap.gmail.com" readOnly className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Port IMAP</label>
                  <input type="text" value="993" readOnly className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">App Password</label>
                <input
                  type="password"
                  placeholder="Générer depuis Google Account → Security → App Passwords"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 mb-2">Importez vos prospects ou utilisez l&apos;IA pour en trouver automatiquement.</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50/50 transition-all cursor-pointer" type="button">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <i className="ri-upload-line text-teal-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-slate-800 block">Importer CSV/XLSX</span>
                    <span className="text-xs text-slate-500">Fichier .csv ou .xlsx</span>
                  </div>
                </button>
                <button className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer" type="button">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <i className="ri-robot-line text-purple-600 text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-slate-800 block">IA Lead Finder</span>
                    <span className="text-xs text-slate-500">Secteur + zone géographique</span>
                  </div>
                </button>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-database-2-line text-slate-500 w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-xs font-semibold text-slate-600">Leads CRM existants</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Utilisez les leads déjà qualifiés dans votre pipeline CRM.</p>
                <button className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300 transition-colors cursor-pointer" type="button">
                  Sélectionner depuis le CRM
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-start gap-2">
                  <i className="ri-check-double-line text-emerald-600 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800 mb-1">Prêt à lancer</p>
                    <p className="text-xs text-emerald-700">Vérifiez les paramètres avant de lancer votre campagne.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Campagne</span>
                  <span className="font-semibold text-slate-800">{campaignName || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Séquence</span>
                  <span className="font-semibold text-slate-800">{sequences.find(s => s.id === selectedSequence)?.name || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Expéditeur</span>
                  <span className="font-semibold text-slate-800">{senderName} &lt;{senderEmail}&gt;</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Serveur SMTP</span>
                  <span className="font-semibold text-slate-800">smtp.gmail.com:587</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Leads</span>
                  <span className="font-semibold text-slate-800">À importer</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
            }`}
            type="button"
            disabled={step === 1}
          >
            Retour
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
              type="button"
            >
              Continuer
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
              type="button"
            >
              <i className="ri-rocket-line w-4 h-4 flex items-center justify-center"></i>
              Lancer la campagne
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



