import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useState, useCallback } from 'react';

interface Publication {
  id: number;
  network: string;
  status: string;
  external_id: string | null;
  url: string | null;
  published_at: string | null;
  error: string | null;
}

interface Campaign {
  id: string;
  title: string;
  hook: string;
  body: string;
  status: string;
  created_by: string | null;
  approved_by: string | null;
  scheduled_at: string | null;
  created_at: string;
  kos_publications: Publication[];
}

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  approved: 'bg-accent-100 text-accent-800 border-accent-200',
  published: 'bg-primary-100 text-primary-800 border-primary-200',
  failed: 'bg-primary-100/70 text-primary-700 border-primary-200',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon',
  approved: 'Approuvé',
  published: 'Publié',
  failed: 'Échec',
};

export default function CampaignList() {
  const qc = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery<Campaign[] | null>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data: campaigns, error: err } = await supabase
        .from('kos_campaigns')
        .select('*, kos_publications(*)')
        .order('created_at', { ascending: false });

      if (err) throw new Error(err.message);
      return campaigns as Campaign[] | null;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: userData } = await supabase.auth.getUser();
      const approverEmail = userData.user?.email;
      if (!approverEmail) throw new Error('Utilisateur non authentifié');

      const { error: updateError } = await supabase
        .from('kos_campaigns')
        .update({ status: 'approved', approved_by: approverEmail })
        .eq('id', id);

      if (updateError) throw new Error(updateError.message);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['campaigns'] });
      setActionError(null);
    },
    onError: (err) => {
      setActionError(err instanceof Error ? err.message : 'Échec approbation');
    },
  });

  const handleApprove = useCallback(
    (id: string) => {
      if (approveMutation.isPending) return;
      approveMutation.mutate(id);
    },
    [approveMutation]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-heading-sm font-heading text-foreground-950">
          2. File d&apos;Approbation Big Four
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-full rounded-lg bg-background-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="text-heading-sm font-heading text-foreground-950">
          2. File d&apos;Approbation Big Four
        </h2>
        <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
          <p className="text-sm text-primary-700">
            Erreur chargement: {error instanceof Error ? error.message : 'Inconnue'}
          </p>
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ['campaigns'] })}
            className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700 underline cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const campaigns = data || [];

  return (
    <div className="space-y-4">
      <h2 className="text-heading-sm font-heading text-foreground-950">
        2. File d&apos;Approbation Big Four
      </h2>

      {actionError && (
        <div className="rounded-md border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-primary-700">
          {actionError}
        </div>
      )}

      {campaigns.length === 0 ? (
        <div className="rounded-lg border border-background-300 bg-background-100 p-6 text-center">
          <p className="text-sm text-foreground-600">
            Aucune campagne pour le moment. Créez votre première campagne à gauche.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-background-300 bg-background-50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-300 bg-background-100">
                  <th className="px-4 py-3 text-left font-semibold text-foreground-800">
                    Titre
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground-800">
                    Réseaux
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground-800">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground-800">
                    Créé par
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => {
                  const pubs = c.kos_publications || [];
                  const statusClass =
                    STATUS_STYLES[c.status] || 'bg-background-100 text-foreground-700 border-background-300';
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-background-200 last:border-b-0 hover:bg-background-100/70 transition-colors"
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="font-medium text-foreground-950">{c.title}</div>
                        <div className="mt-1 text-xs text-foreground-600 line-clamp-2">
                          {c.hook}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-1">
                          {pubs.map((p: Publication) => (
                            <span
                              key={p.id}
                              className="inline-block rounded-full bg-secondary-100 px-2 py-0.5 text-xs text-secondary-800 border border-secondary-200"
                            >
                              {p.network}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}
                        >
                          {STATUS_LABELS[c.status] || c.status}
                        </span>
                        {c.approved_by && (
                          <div className="mt-1 text-xs text-foreground-600">
                            Approuvé par: {c.approved_by}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-foreground-700">
                        {c.created_by || '—'}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {c.status === 'draft' && (
                          <button
                            onClick={() => handleApprove(c.id)}
                            disabled={approveMutation.isPending}
                            className="inline-flex items-center gap-1.5 rounded-md bg-primary-500 px-3 py-1.5 text-xs font-semibold text-background-50 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                          >
                            {approveMutation.isPending && approveMutation.variables === c.id && (
                              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-background-50 border-t-transparent" />
                            )}
                            Approuver 4-eyes
                          </button>
                        )}
                        {c.status === 'published' && pubs.some((p: Publication) => p.url) && (
                          <div className="flex flex-col gap-1">
                            {pubs
                              .filter((p: Publication) => p.url)
                              .map((p: Publication) => (
                                <a
                                  key={p.id}
                                  href={p.url!}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 underline"
                                >
                                  <span className="flex items-center justify-center w-3 h-3">
                                    <i className="ri-external-link-line" />
                                  </span>
                                  {p.network}
                                </a>
                              ))}
                          </div>
                        )}
                        {c.status === 'failed' && (
                          <div className="text-xs text-primary-600">
                            {pubs[0]?.error
                              ? pubs[0].error.slice(0, 80)
                              : 'Échec de publication'}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}



