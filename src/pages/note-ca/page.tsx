import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { noteCAMock } from "@/mocks/noteCA";
import NoteCAStatsCards from "./components/NoteCAStatsCards";
import NoteCAExecutiveSummary from "./components/NoteCAExecutiveSummary";
import NoteCARisksPanel from "./components/NoteCARisksPanel";
import NoteCADecisionsTimeline from "./components/NoteCADecisionsTimeline";
import NoteCAAnnexes from "./components/NoteCAAnnexes";

interface NoteCAData {
  resume_exec: {
    titre: string;
    periode: string;
    entite: string;
    contexte: string;
    points_cles: { theme: string; niveau: string; detail: string }[];
    recommandations_exec: string[];
    genere_en: string;
    methodologie: string;
  };
  kpi_cles: {
    conformite: number;
    risque_global: number;
    incidents_critiques: number;
    ecarts_majeurs: number;
    recommandations: number;
    top_risque_score: number;
  };
  points_attention: {
    rang: number;
    libelle: string;
    famille: string;
    score: number;
    probabilite: number;
    impact: number;
    statut: string;
    echeance: string;
    niveau: string;
    tendance: string;
  }[];
  decisions_requises: {
    id: string;
    priorite: string;
    titre: string;
    description: string;
    domaine: string;
    echeance: string;
    responsable: string;
    impact_attendu: string;
    statut: string;
  }[];
  annexes: { titre: string; url: string; type: string; date: string; reference: string }[];
  genere_en: string;
  methodologie: string;
  meta: {
    entite_id: string;
    periode: string;
    date_generation: string;
    version_note: string;
  };
}

export default function NoteCADashboardPage() {
  const [data, setData] = useState<NoteCAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoteCA() {
      try {
        setLoading(true);
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          "generate_note_ca",
          {
            p_entite_id: "11111111-1111-1111-1111-111111111111",
            p_periode: "2026-06-01",
          }
        );

        if (rpcError || !rpcData) {
          console.warn("[NoteCA] RPC failed, fallback to mock:", rpcError?.message);
          setData(noteCAMock as NoteCAData);
          setError(null);
        } else {
          setData(rpcData as NoteCAData);
        }
      } catch (err) {
        console.warn("[NoteCA] Exception, fallback to mock:", (err as Error).message);
        setData(noteCAMock as NoteCAData);
      } finally {
        setLoading(false);
      }
    }

    fetchNoteCA();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
          <span className="text-sm text-foreground-500 font-body">
            Génération de la Note au CA...
          </span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-3xl text-red-500 mb-2"></i>
          <p className="text-sm text-foreground-500 font-body">
            Impossible de générer la Note au CA.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500 text-white">
              <i className="ri-file-list-3-line text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground-950 font-heading">
                Note au Conseil d'Administration
              </h1>
              <p className="text-xs text-foreground-500 font-body">
                KOS Governance Engine · {data.resume_exec.entite} ·{" "}
                {data.resume_exec.periode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 border border-primary-200 font-body whitespace-nowrap">
              {data.methodologie}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 font-body whitespace-nowrap flex items-center gap-1">
              <i className="ri-flashlight-line"></i> {data.genere_en}
            </span>
          </div>
        </div>

        {/* Stats KPI */}
        <NoteCAStatsCards data={data} />

        {/* Résumé exécutif */}
        <NoteCAExecutiveSummary resume_exec={data.resume_exec} />

        {/* Two columns: Risks + Decisions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NoteCARisksPanel risks={data.points_attention} />
          <NoteCADecisionsTimeline decisions={data.decisions_requises} />
        </div>

        {/* Annexes */}
        <NoteCAAnnexes annexes={data.annexes} />

        {/* Footer meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-foreground-400 font-body pt-4 border-t border-background-200/70">
          <span>
            Version {data.meta.version_note} · Générée le{" "}
            {new Date(data.meta.date_generation).toLocaleString("fr-FR")}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-fingerprint-line"></i> Entité {data.meta.entite_id.slice(0, 8)}...
          </span>
        </div>
      </div>
    </div>
  );
}