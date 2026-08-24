import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface ScanResult {
  scanned: number;
  new_logs: number;
  skipped: number;
  emails_sent: number;
  errors: { reference: string; error: string }[];
}

interface ScanConfig {
  notify_email?: string;
}

export function useRegulatoryAutoScanner(config?: ScanConfig) {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [lastRunAt, setLastRunAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendEmailNotification = async (count: number, details: string[]) => {
    try {
      const notifyFn = supabase.functions.invoke('submit-form', {
        body: {
          action: 'notify',
          type: 'regulatory_auto_correction',
          to: config?.notify_email || 'contact@khepraexperts.com',
          subject: `KOS Regulatory — ${count} correction(s) automatique(s) générée(s)`,
          message: `Le scanner réglementaire automatique a généré ${count} nouvelles corrections.\n\n${details.join('\n')}`,
        },
      });
      await notifyFn;
    } catch (e) {
      console.warn('Notification email non envoyée (non bloquant):', e);
    }
  };

  const runScan = useCallback(async (): Promise<ScanResult> => {
    setLoading(true);
    setError(null);

    const results: ScanResult = {
      scanned: 0,
      new_logs: 0,
      skipped: 0,
      emails_sent: 0,
      errors: [],
    };

    try {
      // 1. Récupérer les textes obsolètes ou remplacés
      const { data: obsoleteTexts, error: fetchError } = await supabase
        .from('regulatory_register')
        .select('*')
        .in('statut_texte', ['abroge', 'remplace']);

      if (fetchError) throw new Error(`Erreur récupération textes: ${fetchError.message}`);
      if (!obsoleteTexts || obsoleteTexts.length === 0) {
        setLastResult(results);
        setLastRunAt(new Date());
        return results;
      }

      results.scanned = obsoleteTexts.length;

      // 2. Récupérer les logs existants pour éviter les doublons
      const { data: existingLogs } = await supabase
        .from('remediation_logs')
        .select('reference_id')
        .in('reference_id', obsoleteTexts.map((t: { id: string }) => t.id));

      const existingRefIds = new Set((existingLogs || []).map((l: { reference_id: string }) => l.reference_id));

      const newCorrectionDetails: string[] = [];

      // 3. Pour chaque texte obsolète sans log, créer un log
      for (const text of obsoleteTexts) {
        try {
          if (existingRefIds.has(text.id)) {
            results.skipped++;
            continue;
          }

          const isAbroge = text.statut_texte === 'abroge';
          const nouveauTexte = isAbroge
            ? `${text.reference} (ABROGÉ — archivage obligatoire, suppression des références actives)`
            : `${text.reference} (REMPLACÉ — mise à jour requise vers le nouveau texte)`;

          const { error: insertError } = await supabase
            .from('remediation_logs')
            .insert({
              reference_id: text.id,
              ancien_texte: text.reference,
              nouveau_texte: nouveauTexte,
              type_correction: 'remplacement',
              fichier_source: (text.composants_kos || []).join(', ') || 'regulatory_register',
              date_correction: new Date().toISOString(),
              statut: 'en_attente',
              verifie_par: null,
              preuve: text.texte_remplace_par || null,
            });

          if (insertError) throw new Error(`Insert failed: ${insertError.message}`);

          results.new_logs++;
          newCorrectionDetails.push(`• ${text.reference} [${isAbroge ? 'ABROGÉ' : 'REMPLACÉ'}]`);
        } catch (e) {
          const errMsg = e instanceof Error ? e.message : String(e);
          results.errors.push({ reference: text.reference, error: errMsg });
        }
      }

      // 4. Envoyer email si des corrections ont été créées
      if (results.new_logs > 0) {
        await sendEmailNotification(results.new_logs, newCorrectionDetails);
        results.emails_sent = 1;
      }

      setLastResult(results);
      setLastRunAt(new Date());
      return results;
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : 'Erreur inconnue';
      setError(errMsg);
      return { ...results, errors: [...results.errors, { reference: 'Scan global', error: errMsg }] };
    } finally {
      setLoading(false);
    }
  }, [config]);

  return {
    loading,
    lastResult,
    lastRunAt,
    error,
    runScan,
  };
}



