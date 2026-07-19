export const noteCAMock = {
  resume_exec: {
    titre: "Note au Conseil d'Administration — Banque Régionale UEMOA — 06/2026",
    periode: "06/2026",
    entite: "Banque Régionale UEMOA",
    contexte:
      "La présente note présente l'état de la conformité, des risques et des incidents majeurs pour la période 06/2026. Elle a été élaborée selon les standards COSO et ISO 37000.",
    points_cles: [
      {
        theme: "Conformité Réglementaire",
        niveau: "Satisfaisant avec réserves",
        detail:
          "Taux de conformité global stable, 2 écarts mineurs identifiés sur les ratios prudentiels.",
      },
      {
        theme: "Cartographie des Risques",
        niveau: "À surveiller",
        detail:
          "Risque cybernétique et risque de crédit scoring IA remontent en top 3.",
      },
      {
        theme: "Incidents et Remontées",
        niveau: "Maîtrisé",
        detail:
          "1 incident critique résolu, 3 incidents majeurs en traitement.",
      },
      {
        theme: "Gouvernance et CA",
        niveau: "Conforme",
        detail:
          "Composition du CA alignée sur Circulaire BCEAO 01/2017, indépendance des administrateurs vérifiée.",
      },
    ],
    recommandations_exec: [
      "Valider le renforcement du dispositif LBC/FT suite à la mise à jour GAFI 2026.",
      "Examiner le budget 2026 pour la conformité ESG ISSB (S1/S2 double matérialité).",
      "Approuver le Plan d'Action Corrective sur les 2 écarts ratios prudentiels.",
      "Surveiller la montée en puissance des risques cyber et IA générative.",
    ],
    genere_en: "<90s",
    methodologie: "COSO + ISO 37000 + Référentiel BCEAO/COBAC",
  },
  kpi_cles: {
    conformite: 87.5,
    risque_global: 13.5,
    incidents_critiques: 1,
    ecarts_majeurs: 0,
    recommandations: 5,
    top_risque_score: 20,
  },
  points_attention: [
    {
      rang: 1,
      libelle: "Non-conformité circulaire BCEAO ratios prudentiels SFD",
      famille: "reglementaire",
      score: 20,
      probabilite: 4,
      impact: 5,
      statut: "ouvert",
      echeance: "2026-09-30",
      niveau: "Critique",
      tendance: "Stable",
    },
    {
      rang: 2,
      libelle: "Détérioration qualité crédit SFD (taux NPL > 10%)",
      famille: "financier",
      score: 16,
      probabilite: 4,
      impact: 4,
      statut: "ouvert",
      echeance: "2026-10-31",
      niveau: "Critique",
      tendance: "Stable",
    },
    {
      rang: 3,
      libelle: "Rupture chaîne de refinance BCEAO (liquidité)",
      famille: "operationnel",
      score: 16,
      probabilite: 4,
      impact: 4,
      statut: "ouvert",
      echeance: "2026-08-15",
      niveau: "Critique",
      tendance: "Stable",
    },
  ],
  decisions_requises: [
    {
      id: "a07924ab-6074-48a6-9df8-2d5edf3d3eeb",
      priorite: "Haute",
      titre: "Validation Plan d'Action Corrective — Ratios Prudentiels",
      description:
        "Deux écarts mineurs identifiés sur les ratios prudentiels BCEAO. Soumission du PAC au Comité des Risques avant le 15 du mois.",
      domaine: "Conformité Réglementaire",
      echeance: "2026-07-20",
      responsable: "Directeur des Risques",
      impact_attendu: "Conformité totale aux ratios BCEAO dans 30 jours",
      statut: "En attente CA",
    },
    {
      id: "fe6532fa-6860-491b-ba41-150980e40367",
      priorite: "Haute",
      titre: "Approbation Budget Conformité ESG ISSB 2026",
      description:
        "Budget estimé 450M FCFA pour la mise en conformité double matérialité S1/S2. Nécessite vote CA avant budget annuel.",
      domaine: "ESG & Durabilité",
      echeance: "2026-08-04",
      responsable: "Directeur Financier",
      impact_attendu: "Conformité ISSB d'ici Q2 2027",
      statut: "En attente CA",
    },
    {
      id: "da7f273a-9503-4da6-a396-c5c9c7f44367",
      priorite: "Majeure",
      titre: "Renforcement Dispositif LBC/FT — Mise à jour GAFI 2026",
      description:
        "Mise à jour du dispositif LBC/FT suite aux nouvelles exigences GAFI 2026. Audit externe prévu Q4 2026.",
      domaine: "LBC/FT & Sanctions",
      echeance: "2026-08-19",
      responsable: "Responsable Conformité",
      impact_attendu: "Conformité GAFI renforcée, réduction risque sanction",
      statut: "En préparation",
    },
    {
      id: "6eec8e84-7fba-4692-a35c-8f51a438f4f8",
      priorite: "Majeure",
      titre: "Revue Composition CA — Circulaire BCEAO 01/2017",
      description:
        "Vérification annuelle de l'indépendance des administrateurs et respect des comités spécialisés.",
      domaine: "Gouvernance",
      echeance: "2026-09-03",
      responsable: "Secrétaire du CA",
      impact_attendu: "Conformité BCEAO 01/2017 maintenue",
      statut: "Programmé",
    },
    {
      id: "b100dc99-21ee-4c14-a056-6dedcec5f29a",
      priorite: "Normale",
      titre: "Mise en place Stress Tests Climatiques Pilier 2",
      description:
        "Intégration des stress tests climatiques dans le dispositif Pilier 2 BCEAO/COBAC.",
      domaine: "Risque Climatique",
      echeance: "2026-10-03",
      responsable: "Directeur des Risques",
      impact_attendu: "Préparation inspection BCEAO 2027",
      statut: "Planifié",
    },
  ],
  annexes: [
    {
      titre: "Rapport Trimestriel Conformité BCEAO — T2 2026",
      url: "https://khepra.consulting/rapports/conformite-t2-2026.pdf",
      type: "compliance",
      date: "2026-06-30",
      reference: "BCEAO-REF-2026-T2",
    },
    {
      titre: "Étude Double Matérialité ESG ISSB S1/S2",
      url: "https://khepra.consulting/rapports/esg-issb-materialite-2026.pdf",
      type: "reglementaire",
      date: "2026-06-25",
      reference: "ESG-ISSB-2026-001",
    },
    {
      titre: "Rapport LBC/FT — Revue annuelle GAFI 2026",
      url: "https://khepra.consulting/rapports/lbcft-gafi-2026.pdf",
      type: "reglementaire",
      date: "2026-06-10",
      reference: "GAFI-RAPPORT-2026",
    },
  ],
  genere_en: "<90s",
  methodologie: "COSO + ISO 37000",
  meta: {
    entite_id: "11111111-1111-1111-1111-111111111111",
    periode: "2026-06-01",
    date_generation: "2026-07-05T10:46:18.481898+00:00",
    version_note: "v1.0-KOS",
  },
};





