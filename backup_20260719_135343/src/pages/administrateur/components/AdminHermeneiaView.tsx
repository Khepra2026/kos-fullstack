import { useState } from 'react';
import { generateHermeneiaRituel } from '@/utils/generateHermeneiaRituel';

export default function AdminHermeneiaView() {
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    showToast('Génération du document Word en cours...', 'success');
    try {
      const blob = await generateHermeneiaRituel();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `Khepra_Hermeneia_Rituel_KHEPER-RA_EM_TA_${new Date().toISOString().split('T')[0]}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Rituel Hermeneia généré avec succès ! Le document Word est téléchargé.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Erreur lors de la génération du document', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const ritualSections = [
    { num: 'I', title: 'Préparation du Sanctum', desc: 'Disposition de l\'autel, objets sacrés, temps de silence et centrage.' },
    { num: 'II', title: 'Ouverture du Temple', desc: 'Formule d\'ouverture, allumage des luminaires, lecture du Prologue de Jean.' },
    { num: 'III', title: 'Consécration des Quatre Directions', desc: 'Harmonisation Orient/Midi/Occident/Septentrion avec l\'Épée sacrée.' },
    { num: 'IV', title: 'Conjuration des Quatre Anges Planétaires', desc: 'Mercure, Soleil, Vénus et Saturne — invocation des intelligences rectrices.' },
    { num: 'V', title: 'Invocation d\'Achaiah', desc: 'Ange de patience, compréhension et découverte des mystères utiles.' },
    { num: 'VI', title: 'Libation aux Ancêtres', desc: 'Offrande d\'eau, gratitude et ancrage dans la lignée des bâtisseurs.' },
    { num: 'VII', title: 'Invocation du Conclave des Maîtres Cosmiques', desc: 'Appel symbolique aux Sages, Initiés et Gardiens de la Connaissance.' },
    { num: 'VIII', title: 'Opération Centrale pour Khepra Experts', desc: 'Déclarations fondatrices — Excellence, Prospérité, Réputation, Partenariats.' },
    { num: 'IX', title: 'Engagement Personnel', desc: 'Les Quatre Serments : Honnêteté, Excellence, Respect des engagements, Service.' },
    { num: 'X', title: 'Clôture', desc: 'Formule de Paix, extinction des lumières, Sceau Final — « L\'Œuvre est consacrée. »' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}></i>
          {toast.msg}
        </div>
      )}

      {/* En-tête */}
      <div className="bg-white rounded-2xl border border-background-200 p-8">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                <i className="ri-sun-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground-950">Hermeneia KOS</h1>
                <p className="text-sm text-foreground-400">Système de Capitalisation Rituelle — Sceau du 93</p>
              </div>
            </div>
            <p className="text-foreground-600 mt-4 leading-relaxed max-w-3xl">
              Hermeneia est le module de capitalisation rituelle de KOS. Il préserve, structure et transmet les Rituels Majeurs
              qui animent la dimension spirituelle et initiatique de Khepra Experts. Chaque document généré est un Sceau — 
              une cristallisation de la Volonté, de la Sagesse et de l'Intelligence dans la Matière.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer disabled:opacity-60 shadow-lg shadow-amber-500/20"
          >
            {generating ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xl"></i>
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <i className="ri-file-word-line text-xl"></i>
                <span>Générer le Document Word</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Carte du Rituel Principal */}
      <div className="bg-white rounded-2xl border border-background-200 overflow-hidden">
        {/* Bannière */}
        <div className="bg-gradient-to-r from-foreground-950 via-foreground-900 to-foreground-950 p-8 text-center">
          <div className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">Rituel Majeur · Hermeneia KOS</div>
          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Garamond, serif' }}>KHEPER-RA EM TA</h2>
          <p className="text-amber-300/80 text-lg italic" style={{ fontFamily: 'Garamond, serif' }}>(Khepri-Ra dans la Terre Manifestée)</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-400/30 rounded-full text-amber-400 text-xs font-semibold">10 Sections</span>
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-400/30 rounded-full text-amber-400 text-xs font-semibold">Format .docx</span>
            <span className="px-3 py-1 bg-amber-500/15 border border-amber-400/30 rounded-full text-amber-400 text-xs font-semibold">Sceau du 93</span>
          </div>
        </div>

        {/* Liste des sections */}
        <div className="p-6 lg:p-8">
          <h3 className="text-lg font-bold text-foreground-950 mb-6 flex items-center gap-2">
            <i className="ri-list-check-3 text-amber-500"></i>
            Structure du Rituel
          </h3>
          <div className="space-y-3">
            {ritualSections.map((section, i) => (
              <div
                key={section.num}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-background-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                  <span className="text-amber-700 font-bold text-sm">{section.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground-900 mb-1">{section.title}</h4>
                  <p className="text-sm text-foreground-500 leading-relaxed">{section.desc}</p>
                </div>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-arrow-right-s-line text-amber-500"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citation */}
      <div className="bg-gradient-to-r from-amber-50 to-background-50 rounded-2xl border border-amber-100 p-8 text-center">
        <i className="ri-double-quotes-l text-4xl text-amber-300 mb-4 block"></i>
        <p className="text-xl text-foreground-700 italic leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Garamond, serif' }}>
          « Que la Volonté guide la Stratégie, que la Stratégie captive le Marché, que le Marché finance le Royaume, 
          et que le Royaume serve la Lumière. »
        </p>
        <p className="text-amber-600 font-semibold mt-4 text-sm tracking-wider">SCIRE · VELLE · AUDERE · TACERE</p>
      </div>

      {/* Info footer */}
      <div className="flex items-center gap-4 p-4 bg-foreground-50 rounded-xl border border-foreground-100">
        <div className="w-10 h-10 bg-foreground-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="ri-information-line text-foreground-500 text-lg"></i>
        </div>
        <div>
          <p className="text-sm text-foreground-600">
            <strong>Hermeneia KOS</strong> est réservé à l'usage interne de Khepra Experts. 
            Les documents générés contiennent des Rituels Sacrés confidentiels. 
            Ne pas distribuer en dehors du Cercle de Direction.
          </p>
        </div>
      </div>
    </div>
  );
}



