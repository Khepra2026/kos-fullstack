import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---- COMPETENCY MODULE DEFINITIONS ----
const MODULE_DEFINITIONS = {
  shadow_ai_audit: {
    titre: "Cartographie de l'Essaim Transversal (Shadow AI Audit)",
    objectif: "Rendre visible l'invisible sans installer d'agents invasifs.",
    livrable_attendu: "Un framework pour identifier où les décisions divergent (Ventes via Modèle A vs Ingénierie via Modèle B) et mesurer l'impact de cette fédération involontaire sur le comportement de l'entreprise.",
    pilier_bigfour: ["Gouvernance & Risques", "Psychologie Comportementale"],
    approche_cible: "Gouvernance KOS/Décisionnelle : Cartographie comportementale non-invasive, détection de divergences décisionnelles par analyse des outputs, mesure de l'impact de la fédération involontaire sur la cohérence stratégique.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Blocage des outils, listes noires d'URLs, interdictions IT qui poussent les employés vers des solutions encore plus invisibles (Shadow IT aggravé).",
    protocoles_action: [
      { etape: 1, action: "Analyse des métadonnées documentaires", description: "Scanner les propriétés des documents produits (auteur, outil de création, modèle utilisé) pour identifier les signatures d'IA", outil: "Document Metadata Scanner", delai: "72h" },
      { etape: 2, action: "Détection des patterns de langage IA", description: "Analyser la structure linguistique des outputs pour identifier les modèles sous-jacents (GPT-4o vs Claude vs Gemini vs Copilot)", outil: "Linguistic Fingerprint Analyzer", delai: "48h" },
      { etape: 3, action: "Cartographie des divergences inter-départements", description: "Comparer les décisions prises par différents départements sur des sujets similaires pour identifier les conflits de modèles", outil: "Cross-Department Divergence Matrix", delai: "1 semaine" },
      { etape: 4, action: "Quantification de l'impact décisionnel", description: "Mesurer l'écart entre les décisions fédérées involontaires et la stratégie officielle de l'entreprise", outil: "Decision Impact Scoring Engine", delai: "72h" },
      { etape: 5, action: "Rapport de visibilité Shadow AI", description: "Produire un dashboard exécutif montrant où, quand et comment l'IA non-gouvernée est utilisée, sans jamais nommer les individus", outil: "Executive Shadow AI Dashboard", delai: "24h" },
    ],
  },
  decision_layer: {
    titre: "Design de la Couche Décisionnelle (The Decision Layer Architecture)",
    objectif: "Remplacer la roulette des LLM par des points de contrôle architecturaux.",
    livrable_attendu: "Schéma fonctionnel d'une passerelle KOS (Knowledge Gateway) qui harmonise les prompts, les bases de connaissances (RAG) et les règles d'affaires, quel que soit le modèle final cliqué par l'utilisateur.",
    pilier_bigfour: ["Architecture des Systèmes de Connaissances (KOS)", "Ingénierie de la Confiance & Auditabilité"],
    approche_cible: "Couche Décisionnelle Unifiée : Knowledge Gateway qui intercepte, harmonise, enrichit et audite chaque requête avant qu'elle n'atteigne un LLM. L'utilisateur choisit son outil, la Gateway impose la cohérence.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Pare-feu réseau, blocage de domaines, interdiction des LLM publics — inefficace car les employés utilisent leurs appareils personnels.",
    protocoles_action: [
      { etape: 1, action: "Définition du schéma de la Knowledge Gateway", description: "Concevoir l'architecture en couches (Prompt Harmonization → RAG Enrichment → Business Rules → Model Routing → Audit Logging)", outil: "KOS Gateway Blueprint", delai: "1 semaine" },
      { etape: 2, action: "Implémentation du Prompt Harmonizer", description: "Couche qui normalise, complète et sécurise les prompts avant envoi au LLM, en injectant le contexte réglementaire et les politiques internes", outil: "Prompt Harmonization Engine", delai: "2 semaines" },
      { etape: 3, action: "Déploiement du RAG Enrichment Layer", description: "Base de connaissances unifiée qui enrichit chaque requête avec les documents officiels, les précédents validés et les règles d'affaires applicables", outil: "RAG Enrichment Layer", delai: "2 semaines" },
      { etape: 4, action: "Configuration du Business Rules Engine", description: "Moteur de règles qui valide les outputs contre les politiques internes, les contraintes réglementaires et les standards de qualité avant diffusion", outil: "Business Rules Validator", delai: "1 semaine" },
      { etape: 5, action: "Mise en place du Model Router", description: "Routeur intelligent qui sélectionne le modèle le plus approprié en fonction de la sensibilité de la tâche, du besoin de précision et du coût", outil: "Intelligent Model Router", delai: "1 semaine" },
    ],
  },
  trust_provenance: {
    titre: "Protocoles d'Intégrité des Artéfacts (Trust & Provenance)",
    objectif: "Savoir jusqu'à quel point l'organisation peut faire confiance aux contrats redessinés, aux architectures API et aux messages marketing générés.",
    livrable_attendu: "Un système de marquage, de métadonnées et d'auditabilité pour valider l'alignement d'un artéfact avec les politiques réelles de l'entreprise.",
    pilier_bigfour: ["Ingénierie de la Confiance & Auditabilité", "Gouvernance & Risques"],
    approche_cible: "Système de Provenance Intégré : Chaque artéfact porte un filigrane numérique (watermark) décrivant le modèle utilisé, les sources consultées, le niveau de confiance et si une revue humaine est requise.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Confiance binaire (approuvé ou non), absence de granularité sur la provenance, pas de traçabilité de la chaîne de génération.",
    protocoles_action: [
      { etape: 1, action: "Définition du schéma de métadonnées de provenance", description: "Standardiser les métadonnées obligatoires : modèle IA, date, sources, niveau de confiance (A à E), validateur humain", outil: "Provenance Metadata Schema", delai: "72h" },
      { etape: 2, action: "Implémentation du Watermark Engine", description: "Moteur qui insère automatiquement les métadonnées de provenance dans chaque artéfact généré, de manière lisible par machine et par humain", outil: "Digital Watermark Engine", delai: "1 semaine" },
      { etape: 3, action: "Mise en place du Policy Alignment Checker", description: "Système qui compare automatiquement le contenu de l'artéfact avec les politiques internes et les exigences réglementaires", outil: "Policy Alignment Checker", delai: "1 semaine" },
      { etape: 4, action: "Déploiement du Confidence Classifier", description: "Classification automatique du niveau de confiance (A: sources officielles multiples, B: source officielle unique, C: littérature pro, D: pratique observée, E: hypothèse)", outil: "Confidence Classifier Engine", delai: "48h" },
      { etape: 5, action: "Création du Audit Trail Ledger", description: "Registre immuable de tous les artéfacts, leur provenance, les validations et les corrections — consultable par les auditeurs", outil: "Trust Provenance Ledger", delai: "1 semaine" },
    ],
  },
  curiosity_safe: {
    titre: "Cadre d'Incitation à l'Alignement (Curiosity-Safe Governance)",
    objectif: "Canaliser la curiosité des employés au lieu de la broyer sous des interdictions IT.",
    livrable_attendu: "Une stratégie de Nudge (incitation douce) et de bacs à sable internes rendant la solution gouvernée plus rapide, plus performante et plus attrayante que n'importe quel onglet grand public gratuit.",
    pilier_bigfour: ["Psychologie Comportementale", "Architecture des Systèmes de Connaissances (KOS)"],
    approche_cible: "Curiosity-Safe Governance : Sandboxes internes plus rapides que ChatGPT, nudges qui montrent les bénéfices de la gouvernance (meilleure qualité, moins de corrections), reconnaissance des early adopters internes.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Interdiction totale des IA grand public, sanctions, surveillance — génère du ressentiment et pousse à la clandestinité.",
    protocoles_action: [
      { etape: 1, action: "Création du Sandbox Interne KOS", description: "Environnement sécurisé où les employés peuvent utiliser l'IA avec toutes les données internes, plus rapide que n'importe quelle solution grand public", outil: "KOS Internal Sandbox", delai: "2 semaines" },
      { etape: 2, action: "Déploiement des Nudges Comportementaux", description: "Messages contextuels qui montrent la valeur ajoutée de la solution gouvernée (temps gagné, qualité supérieure, conformité automatique)", outil: "Behavioral Nudge Engine", delai: "1 semaine" },
      { etape: 3, action: "Programme Early Adopter Champion", description: "Identifier et récompenser les premiers utilisateurs de la solution gouvernée, qui deviennent des ambassadeurs internes", outil: "Champion Recognition Program", delai: "En continu" },
      { etape: 4, action: "Mise en place des Métriques d'Adoption", description: "Tableau de bord montrant le taux d'adoption de la solution gouvernée vs shadow AI, avec objectifs progressifs (50% à 3 mois, 80% à 6 mois)", outil: "Adoption Analytics Dashboard", delai: "72h" },
      { etape: 5, action: "Boucle de Feedback Continue", description: "Système permettant aux employés de suggérer des améliorations de la solution gouvernée, créant un sentiment de co-construction", outil: "Continuous Feedback Loop", delai: "En continu" },
    ],
  },
};

// ---- CROSS-PILLAR EVOLUTION LOGIC ----
function crossPillarEvolution(modules: any[]) {
  const evolutions: any[] = [];
  
  for (const mod of modules) {
    const relatedPillars = (mod.pilier_bigfour || []);
    // Find other modules that share pillars
    const crossRefs = modules
      .filter((m: any) => m.module_key !== mod.module_key)
      .filter((m: any) => (m.pilier_bigfour || []).some((p: string) => relatedPillars.includes(p)));
    
    if (crossRefs.length > 0) {
      evolutions.push({
        module_key: mod.module_key,
        cross_references: crossRefs.map((m: any) => m.module_key),
        shared_pillars: relatedPillars.filter((p: string) => 
          crossRefs.some((m: any) => (m.pilier_bigfour || []).includes(p))
        ),
        evolution_potential: Math.min(100, (mod.maturite_score || 50) + crossRefs.length * 5),
      });
    }
  }
  
  return evolutions;
}

// ---- MAIN HANDLER ----
async function handleRequest(req: Request, supabaseClient: any) {
  const body = await req.json();
  const { action, module_key } = body;
  
  switch (action) {
    case "full_seed": {
      // Seed all 4 competency modules
      const results: any[] = [];
      for (const [key, def] of Object.entries(MODULE_DEFINITIONS)) {
        // Upsert module
        const { data: existing } = await supabaseClient
          .from("kos_competency_modules")
          .select("id,version,maturite_score")
          .eq("module_key", key)
          .maybeSingle();

        const newVersion = existing ? (existing.version || 1) + 1 : 1;
        const baseScore = existing ? (existing.maturite_score || 50) : 50;

        const modulePayload = {
          module_key: key,
          titre: def.titre,
          objectif: def.objectif,
          livrable_attendu: def.livrable_attendu,
          pilier_bigfour: def.pilier_bigfour,
          approche_cible: def.approche_cible,
          approche_obsolete: def.approche_obsolete,
          protocoles_action: def.protocoles_action,
          maturite_score: baseScore,
          statut: "seeded",
          version: newVersion,
          updated_at: new Date().toISOString(),
        };

        if (existing) {
          await supabaseClient
            .from("kos_competency_modules")
            .update(modulePayload)
            .eq("module_key", key);
        } else {
          await supabaseClient
            .from("kos_competency_modules")
            .insert(modulePayload);
        }

        // Seed decision layer artifacts for decision_layer module
        if (key === "decision_layer") {
          const layerArtifacts = [
            { layer_name: "Prompt Harmonization Layer", layer_type: "harmonization", description: "Normalise, complète et sécurise les prompts avant envoi au LLM. Injecte le contexte réglementaire et les politiques internes automatiquement.", control_points: [{ point: "Validation de sécurité", check: "Pas d'injection de prompt malveillante" }, { point: "Enrichissement contexte", check: "Injection du cadre réglementaire applicable" }, { point: "Complétion intelligente", check: "Ajout des contraintes manquantes" }], trust_score: 95 },
            { layer_name: "RAG Enrichment Layer", layer_type: "enrichment", description: "Base de connaissances unifiée enrichissant chaque requête avec les documents officiels, précédents validés et règles d'affaires.", control_points: [{ point: "Recherche sémantique", check: "Documents pertinents identifiés" }, { point: "Fraîcheur des sources", check: "Sources mises à jour < 30 jours" }, { point: "Pertinence contextuelle", check: "Score de similarité > 0.85" }], trust_score: 90 },
            { layer_name: "Business Rules Engine", layer_type: "validation", description: "Valide les outputs contre les politiques internes, contraintes réglementaires et standards de qualité avant diffusion.", control_points: [{ point: "Conformité réglementaire", check: "Aucune violation détectée" }, { point: "Cohérence stratégique", check: "Aligné avec la stratégie officielle" }, { point: "Qualité rédactionnelle", check: "Score Big Four > 8/10" }], trust_score: 98 },
            { layer_name: "Intelligent Model Router", layer_type: "routing", description: "Sélectionne le modèle optimal (GPT-4o, Claude, Gemini, Copilot) selon la sensibilité de la tâche, le besoin de précision et le coût.", control_points: [{ point: "Classification de sensibilité", check: "Niveau de sensibilité correctement évalué" }, { point: "Sélection optimale", check: "Meilleur rapport précision/coût" }, { point: "Fallback automatique", check: "Modèle alternatif si indisponible" }], trust_score: 88 },
            { layer_name: "Audit Logging Layer", layer_type: "audit", description: "Enregistre chaque transaction (prompt, modèle, output, validation) pour traçabilité complète et audits réglementaires.", control_points: [{ point: "Traçabilité complète", check: "Toute transaction enregistrée" }, { point: "Immuabilité", check: "Logs non modifiables" }, { point: "Rétention réglementaire", check: "Conservation 7 ans minimum" }], trust_score: 99 },
          ];
          
          for (const artifact of layerArtifacts) {
            await supabaseClient.from("kos_decision_layer_artifacts").upsert({
              ...artifact,
              parent_module_key: key,
              updated_at: new Date().toISOString(),
            }, { onConflict: "layer_name,parent_module_key" });
          }
        }

        // Seed shadow AI audit methods
        if (key === "shadow_ai_audit") {
          const auditMethods = [
            { detection_method: "linguistic_fingerprinting", model_signature: "GPT-4o", source_tool: "Document Metadata Scanner", departement: "Cross-functional", divergence_type: "style_variation", impact_score: 75, remediation: "Rediriger vers KOS Gateway pour harmonisation du ton institutionnel", statut: "detected" },
            { detection_method: "document_metadata_analysis", model_signature: "Claude 3.5", source_tool: "Metadata Extractor", departement: "Juridique", divergence_type: "decision_divergence", impact_score: 90, remediation: "Appliquer Business Rules Engine avant validation finale", statut: "detected" },
            { detection_method: "behavior_pattern", model_signature: "Gemini 1.5", source_tool: "Usage Pattern Analyzer", departement: "Marketing", divergence_type: "output_conflict", impact_score: 60, remediation: "Activer le Prompt Harmonizer pour aligner le ton et les claims", statut: "detected" },
          ];
          
          for (const audit of auditMethods) {
            await supabaseClient.from("kos_shadow_ai_audits").insert({
              ...audit,
              competency_module_key: key,
            });
          }
        }

        // Seed trust provenance ledger entries
        if (key === "trust_provenance") {
          const trustEntries = [
            { artifact_type: "contrat_commercial", artifact_id: "CTR-2026-001", generation_model: "Claude 3.5 Sonnet", confidence_level: "B", source_count: 3, official_sources: ["Code civil", "Acte uniforme OHADA", "Jurisprudence CCJA"], professional_sources: ["Doctrine juridique", "Guide contractuel KHEPRA"], policy_alignment_score: 92, human_review_required: true, validation_status: "validated" },
            { artifact_type: "rapport_audit", artifact_id: "AUD-2026-042", generation_model: "GPT-4o", confidence_level: "A", source_count: 5, official_sources: ["Instruction BCEAO n°008-2015", "Circulaire COBAC R-2016/01", "Normes ISA", "Code des assurances CIMA", "Règlement UEMOA n°09-2010"], professional_sources: ["Guide d'audit KHEPRA", "Manuel IFACI"], policy_alignment_score: 98, human_review_required: false, validation_status: "validated" },
            { artifact_type: "post_linkedin", artifact_id: "SOC-2026-789", generation_model: "Gemini 1.5 Pro", confidence_level: "D", source_count: 1, official_sources: [], professional_sources: ["Best practices réseaux sociaux"], policy_alignment_score: 65, human_review_required: true, validation_status: "pending" },
          ];
          
          for (const entry of trustEntries) {
            await supabaseClient.from("kos_trust_provenance_ledger").insert({
              ...entry,
              competency_module_key: key,
            });
          }
        }

        // Seed curiosity-safe nudges
        if (key === "curiosity_safe") {
          const nudges = [
            { nudge_name: "Speed Advantage Nudge", nudge_type: "performance_boost", trigger_condition: "L'utilisateur ouvre un onglet ChatGPT/Claude externe", target_behavior: "Rediriger vers le KOS Internal Sandbox", alternative_offered: "KOS Sandbox — 3x plus rapide avec toutes les données internes pré-chargées", success_metric: "Taux de redirection > 70%", is_active: true },
            { nudge_name: "Quality Comparison Badge", nudge_type: "social_proof", trigger_condition: "L'utilisateur colle du contenu généré par une IA externe", target_behavior: "Comparer avec la qualité du KOS Gateway", alternative_offered: "Ce contenu a un score de confiance D. La Gateway KOS produit du contenu de score A avec vérification automatique.", success_metric: "Taux de conversion > 50%", is_active: true },
            { nudge_name: "Compliance Auto-Check Teaser", nudge_type: "progressive_disclosure", trigger_condition: "L'utilisateur commence à rédiger un document sensible", target_behavior: "Utiliser le Business Rules Engine", alternative_offered: "Pssst... la Gateway vérifie automatiquement la conformité BCEAO/COBAC. Pas besoin de relire 200 pages de réglementation.", success_metric: "Taux d'activation > 80%", is_active: true },
            { nudge_name: "Champion Spotlight", nudge_type: "gamification", trigger_condition: "Un utilisateur atteint 10 utilisations de la Gateway", target_behavior: "Devenir un ambassadeur interne", alternative_offered: "Badge KOS Champion débloqué ! Tu fais partie du top 5% des utilisateurs les plus productifs. Partage ton expérience ?", success_metric: "Taux de partage > 30%", is_active: true },
            { nudge_name: "Sandbox Premium Preview", nudge_type: "sandbox_invite", trigger_condition: "Nouvel employé détecté utilisant une IA externe", target_behavior: "Découvrir le KOS Sandbox", alternative_offered: "Bienvenue ! Ici tu as accès à tous les modèles d'IA avec les données internes — zero risque conformité. Essaie en 1 clic.", success_metric: "Activation J+7 > 90%", is_active: true },
          ];
          
          for (const nudge of nudges) {
            await supabaseClient.from("kos_curiosity_safe_nudges").insert({
              ...nudge,
              competency_module_key: key,
            });
          }
        }

        results.push({ module_key: key, status: existing ? "updated" : "created", version: newVersion });
      }
      
      // Run cross-pillar evolution
      const { data: allModules } = await supabaseClient
        .from("kos_competency_modules")
        .select("*");
      
      const evolutions = crossPillarEvolution(allModules || []);
      
      // Update maturity scores based on cross-pillar insights
      for (const ev of evolutions) {
        await supabaseClient
          .from("kos_competency_modules")
          .update({
            maturite_score: ev.evolution_potential,
            references_json: ev,
            updated_at: new Date().toISOString(),
          })
          .eq("module_key", ev.module_key);
      }
      
      // Log to universal audit log
      await supabaseClient.from("kos_universal_audit_log").insert({
        event_type: "competency_full_seed",
        entity_type: "kos_competency_modules",
        action: "FULL_SEED_COMPLETED",
        actor: "kos-auto-development-seed",
        new_state: {
          modules_seeded: results.length,
          cross_pillar_evolutions: evolutions,
        },
        correlation_id: crypto.randomUUID(),
      });
      
      return { success: true, modules: results, cross_pillar_evolutions: evolutions };
    }
    
    case "seed_module": {
      if (!module_key || !MODULE_DEFINITIONS[module_key as keyof typeof MODULE_DEFINITIONS]) {
        return { success: false, error: `Module key "${module_key}" invalide. Utiliser: shadow_ai_audit, decision_layer, trust_provenance, curiosity_safe` };
      }
      
      // Reuse full_seed logic for single module
      return handleRequest(new Request(req.url, {
        method: "POST",
        body: JSON.stringify({ action: "full_seed" }),
      }), supabaseClient);
    }
    
    case "auto_evolve": {
      const { data: modules } = await supabaseClient
        .from("kos_competency_modules")
        .select("*");
      
      if (!modules || modules.length === 0) {
        return { success: false, error: "Aucun module trouvé. Lance d'abord un full_seed." };
      }
      
      const evolutions = crossPillarEvolution(modules);
      
      // Apply evolutions
      for (const ev of evolutions) {
        const newScore = ev.evolution_potential;
        await supabaseClient
          .from("kos_competency_modules")
          .update({
            maturite_score: newScore,
            version: (modules.find((m: any) => m.module_key === ev.module_key)?.version || 1) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("module_key", ev.module_key);
      }
      
      await supabaseClient.from("kos_universal_audit_log").insert({
        event_type: "competency_auto_evolve",
        entity_type: "kos_competency_modules",
        action: "AUTO_EVOLVE_COMPLETED",
        actor: "kos-auto-development-seed",
        new_state: { evolutions },
        correlation_id: crypto.randomUUID(),
      });
      
      return { success: true, evolutions };
    }
    
    case "cross_pillar_audit": {
      const { data: modules } = await supabaseClient
        .from("kos_competency_modules")
        .select("*");
      
      if (!modules || modules.length < 2) {
        return { success: false, error: "Besoin d'au moins 2 modules pour un cross-pillar audit." };
      }
      
      const gaps: any[] = [];
      const allPillars = ["Gouvernance & Risques", "Architecture des Systèmes de Connaissances (KOS)", "Psychologie Comportementale", "Ingénierie de la Confiance & Auditabilité"];
      
      for (const pillar of allPillars) {
        const coveredBy = modules.filter((m: any) => (m.pilier_bigfour || []).includes(pillar));
        if (coveredBy.length === 0) {
          gaps.push({ pillar, status: "uncovered", recommendation: "Créer un module couvrant ce pilier" });
        } else if (coveredBy.length === 1) {
          gaps.push({ pillar, status: "weak_coverage", covered_by: coveredBy[0].module_key, recommendation: "Renforcer avec cross-reference depuis un autre module" });
        } else {
          gaps.push({ pillar, status: "strong_coverage", covered_by: coveredBy.map((m: any) => m.module_key) });
        }
      }
      
      return { success: true, pillar_coverage: gaps };
    }
    
    default:
      return { success: false, error: `Action "${action}" inconnue. Utiliser: full_seed, seed_module, auto_evolve, cross_pillar_audit` };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const result = await handleRequest(req, supabaseClient);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("KOS Auto-Development Seed error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
