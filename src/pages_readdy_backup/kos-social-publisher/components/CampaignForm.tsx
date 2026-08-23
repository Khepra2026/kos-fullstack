import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const CampaignSchema = z.object({
  kb_page_slug: z.string().min(1, 'Sélectionnez une page KB'),
  title: z.string().min(10, 'Le titre doit faire au moins 10 caractères'),
  hook: z.string().min(10, 'Le hook doit faire au moins 10 caractères').max(100, 'Le hook ne doit pas dépasser 100 caractères'),
  body: z.string().min(50, 'Le corps doit faire au moins 50 caractères'),
  hashtags: z.array(z.string()),
  scheduled_at: z.string().min(1, 'Planifiez une date'),
  networks: z.array(
    z.enum(['facebook', 'instagram', 'linkedin', 'x', 'tiktok', 'youtube', 'google_business'])
  ).min(1, 'Sélectionnez au moins un réseau'),
});

export type CampaignFormData = z.infer<typeof CampaignSchema>;

interface KbPageOption {
  slug: string;
  title: string;
}

interface CampaignFormProps {
  pages: KbPageOption[] | undefined;
}

const NETWORKS = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'x', label: 'X / Twitter' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'google_business', label: 'Google Business' },
] as const;

export default function CampaignForm({ pages }: CampaignFormProps) {
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<CampaignFormData>>({
    networks: ['linkedin', 'x', 'facebook'],
    hashtags: ['BCEAO', 'OHADA', 'Gouvernance', 'aI'],
  });
  const [errors, setErrors] = useState<Record<string, string>>();
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: async (c: CampaignFormData) => {
      const { data: camp, error: campError } = await supabase
        .from('kos_campaigns')
        .insert({
          kb_page_slug: c.kb_page_slug,
          title: c.title,
          hook: c.hook,
          body: c.body,
          hashtags: c.hashtags,
          scheduled_at: c.scheduled_at,
        })
        .select()
        .single();

      if (campError || !camp) throw new Error(campError?.message || 'Échec création campagne');

      const pubs = c.networks.map((n) => ({ campaign_id: camp.id, network: n }));
      const { error: pubError } = await supabase.from('kos_publications').insert(pubs);

      if (pubError) throw new Error(pubError.message);

      return camp;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['campaigns'] });
      setForm({ networks: ['linkedin', 'x', 'facebook'], hashtags: ['BCEAO', 'OHADA', 'Gouvernance', 'aI'] });
      setErrors({});
    },
  });

  const validate = useCallback(() => {
    const parsed = CampaignSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return null;
    }
    setErrors({});
    return parsed.data;
  }, [form]);

  const handleCreate = useCallback(() => {
    const data = validate();
    if (data) createMutation.mutate(data);
  }, [validate, createMutation]);

  const generateByKOS = useCallback(async () => {
    if (!form.kb_page_slug) {
      setErrors((prev) => ({ ...prev, kb_page_slug: 'Sélectionnez une page KB avant de générer' }));
      return;
    }
    setGenerateLoading(true);
    setGenerateError(null);
    try {
      const { data, error } = await supabase.functions.invoke('kos-social-master', {
        body: { action: 'generate_copy', slug: form.kb_page_slug },
      });
      if (error) throw error;
      setForm((prev) => ({
        ...prev,
        hook: data?.hook || prev.hook,
        body: data?.body || prev.body,
        hashtags: data?.hashtags || prev.hashtags,
      }));
    } catch {
      setGenerateError('KOS AI Social Copy non disponible — remplissez manuellement');
    } finally {
      setGenerateLoading(false);
    }
  }, [form.kb_page_slug]);

  const toggleNetwork = useCallback((n: string) => {
    setForm((prev) => {
      const nets = prev.networks || [];
      const has = nets.includes(n as CampaignFormData['networks'][number]);
      return {
        ...prev,
        networks: has ? nets.filter((x) => x !== n) : [...nets, n as CampaignFormData['networks'][number]],
      };
    });
  }, []);

  const handleHashtagChange = useCallback((val: string) => {
    const tags = val
      .split(/[,\s]+/)
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    setForm((prev) => ({ ...prev, hashtags: tags }));
  }, []);

  const statusText = createMutation.isPending
    ? 'Création...'
    : 'Créer + Attente Approbation 4-eyes';

  return (
    <div className="space-y-4">
      <h2 className="text-heading-sm font-heading text-foreground-950">
        1. Créer Campagne
      </h2>

      {/* Sélecteur page KB */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Page Knowledge Base
        </label>
        <select
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none"
          value={form.kb_page_slug || ''}
          onChange={(e) => setForm((p) => ({ ...p, kb_page_slug: e.target.value }))}
        >
          <option value="">Choisir page KB</option>
          {pages?.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        {errors.kb_page_slug && (
          <p className="text-xs text-primary-600 mt-1">{errors.kb_page_slug}</p>
        )}
      </div>

      {/* Bouton génération KOS AI */}
      <button
        onClick={generateByKOS}
        disabled={generateLoading || !form.kb_page_slug}
        className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
      >
        {generateLoading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-background-50 border-t-transparent" />
            Génération...
          </>
        ) : (
          <>
            <span className="flex items-center justify-center w-4 h-4">
              <i className="ri-sparkling-line" />
            </span>
            Générer par KOS AI
          </>
        )}
      </button>
      {generateError && (
        <p className="text-xs text-primary-600">{generateError}</p>
      )}

      {/* Hook */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Hook Big Four ({form.hook?.length || 0}/100)
        </label>
        <input
          type="text"
          placeholder="Ex: Circulaire 03-2017 : 3 erreurs qui coûtent 500M FCFA"
          maxLength={100}
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none"
          value={form.hook || ''}
          onChange={(e) => setForm((p) => ({ ...p, hook: e.target.value }))}
        />
        {errors.hook && <p className="text-xs text-primary-600 mt-1">{errors.hook}</p>}
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Corps du message
        </label>
        <textarea
          placeholder="Corps de la publication..."
          rows={5}
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none resize-none"
          value={form.body || ''}
          onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
        />
        {errors.body && <p className="text-xs text-primary-600 mt-1">{errors.body}</p>}
      </div>

      {/* Title (internal) */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Titre interne
        </label>
        <input
          type="text"
          placeholder="Titre de la campagne (interne)"
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none"
          value={form.title || ''}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
        />
        {errors.title && <p className="text-xs text-primary-600 mt-1">{errors.title}</p>}
      </div>

      {/* Hashtags */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Hashtags (séparés par espaces ou virgules)
        </label>
        <input
          type="text"
          placeholder="#BCEAO #OHADA #Gouvernance"
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none"
          value={form.hashtags?.join(', ') || ''}
          onChange={(e) => handleHashtagChange(e.target.value)}
        />
      </div>

      {/* Scheduled at */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-1">
          Planification
        </label>
        <input
          type="datetime-local"
          className="w-full rounded-md border border-background-300 bg-background-50 px-3 py-2 text-sm text-foreground-950 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none"
          value={form.scheduled_at || ''}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              setForm((p) => ({ ...p, scheduled_at: new Date(val).toISOString() }));
            }
          }}
        />
        {errors.scheduled_at && (
          <p className="text-xs text-primary-600 mt-1">{errors.scheduled_at}</p>
        )}
      </div>

      {/* Networks */}
      <div>
        <label className="block text-sm font-medium text-foreground-700 mb-2">
          Réseaux sociaux
        </label>
        <div className="flex flex-wrap gap-3">
          {NETWORKS.map((n) => {
            const checked = form.networks?.includes(n.key) ?? false;
            return (
              <label
                key={n.key}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm cursor-pointer border transition-colors ${
                  checked
                    ? 'bg-primary-100 border-primary-300 text-primary-900'
                    : 'bg-background-100 border-background-300 text-foreground-700 hover:bg-background-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-background-300 text-primary-500 focus:ring-primary-400"
                  checked={checked}
                  onChange={() => toggleNetwork(n.key)}
                />
                {n.label}
              </label>
            );
          })}
        </div>
        {errors.networks && (
          <p className="text-xs text-primary-600 mt-1">{errors.networks}</p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleCreate}
        disabled={createMutation.isPending}
        className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-background-50 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer shadow-premium"
      >
        {createMutation.isPending && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-background-50 border-t-transparent" />
        )}
        {statusText}
      </button>

      {createMutation.isError && (
        <p className="text-sm text-primary-600">
          Erreur: {createMutation.error instanceof Error ? createMutation.error.message : 'Échec de création'}
        </p>
      )}
    </div>
  );
}



