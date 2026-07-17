# Dossier de Candidature — LinkedIn Marketing Developer Platform (MDP)
## KHEPRA EXPERTS — Juin 2026

> **Objectif** : Obtenir l'approbation MDP LinkedIn pour débloquer les scopes `r_organization_social` et `r_organization_admin` et activer les métriques live de la Page Entreprise KHEPRA EXPERTS sur notre dashboard interne.

---

## 1. Résumé Exécutif

| Élément | Détail |
|---------|--------|
| **App LinkedIn** | KHEPRA EXPERTS API (déjà créée sur le Developer Portal) |
| **Scopes demandés** | `r_organization_social`, `r_organization_admin` |
| **Scopes déjà actifs** | `openid`, `profile`, `email` (OAuth2 standard) |
| **Use case** | Dashboard interne de monitoring des métriques sociales (followers, engagement) de notre Page Entreprise LinkedIn |
| **Volume d'utilisateurs** | Usage interne uniquement — 1 à 3 administrateurs |
| **Produit LinkedIn utilisé** | LinkedIn API — Company Page Analytics |
| **Site web** | https://khepraexperts.com |

---

## 2. Présentation de KHEPRA EXPERTS

**KHEPRA EXPERTS** est un cabinet boutique de conseil stratégique, financier et réglementaire basé à Lomé (Togo), opérant dans 15 pays d'Afrique francophone (UEMOA, CEMAC).

- **Fondation** : 2002
- **Spécialités** : Conformité BCEAO/COBAC, Prix de Transfert BEPS, Gouvernance & Risques, Due Diligence, Investment Readiness
- **Clients** : Banques commerciales, SFD/IMF, Fintechs, Groupes familiaux, Holdings transfrontalières
- **Certifications** : ISO 20700 (Management Consulting), Membre ATAF, Membre IIA
- **Page LinkedIn** : https://www.linkedin.com/company/khepra-experts
- **Fondateur** : https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/

Nous utilisons LinkedIn comme canal principal de communication institutionnelle et de thought leadership en Afrique francophone.

---

## 3. Problème à Résoudre

### Situation actuelle
Notre dashboard interne KHEPRA OS 2 intègre un module **"Digital Communication & Social Networks Performance Audit Engine"** accessible sur `/agents-experts`. Ce module affiche en temps réel :

| Métrique | Source | Statut |
|----------|--------|--------|
| Followers Twitter/X | API Twitter v2 | 🟢 Live |
| Followers Profil Fondateur LinkedIn | API `/v2/me` + `/v2/networkSizes` | 🟢 Live |
| Followers Page Entreprise LinkedIn | API `/v2/organizations` | 🔴 Bloqué — MDP requis |

### Blocage technique
Les endpoints `GET /v2/organizations?q=vanityName` et `GET /v2/organizationalEntityAcls?q=roleAssignee` retournent **HTTP 403** car les scopes `r_organization_social` et `r_organization_admin` nécessitent l'approbation MDP.

En attendant, les données de la Page Entreprise sont affichées avec des données mock enrichies, et le dashboard indique clairement le statut **"Partial"** avec un indicateur visuel ambré.

### Pourquoi c'est important
- **Crédibilité** : Un dashboard qui alterne données réelles et mock n'inspire pas confiance
- **Monitoring continu** : Suivre la croissance de notre audience LinkedIn est stratégique pour notre développement commercial
- **Transparence** : Nos consultants et partenaires consultent ce dashboard pour évaluer notre présence digitale

---

## 4. Architecture Technique de l'Intégration

### Stack technique
```
┌─────────────────────────────────────────────────────┐
│                   KHEPRA OS 2                        │
│                                                      │
│  Frontend (React + TypeScript + TailwindCSS)         │
│  └── SocialMetricsLiveBanner.tsx                     │
│       └── useSocialMetrics.ts (hook React)           │
│            └── supabase.functions.invoke()           │
│                      │                               │
│                      ▼                               │
│  Backend (Supabase Edge Function — Deno/TypeScript)  │
│  └── social-metrics/index.ts                        │
│       ├── GET /v2/organizations?q=vanityName        │
│       ├── GET /v2/organizationalEntityAcls          │
│       ├── GET /v2/networkSizes/{orgId}              │
│       ├── GET /v2/me                                │
│       └── Cache PostgreSQL (social_api_tokens)      │
│                      │                               │
│                      ▼                               │
│  LinkedIn API v2 (OAuth 2.0 + Authorization Header)  │
│  └── Headers: LinkedIn-Version: 202405              │
└─────────────────────────────────────────────────────┘
```

### Flux de données
1. Le frontend appelle l'Edge Function Supabase `social-metrics` via HTTP
2. L'Edge Function lit le token OAuth2 depuis les variables d'environnement ou la table `social_api_tokens`
3. Elle interroge les endpoints LinkedIn et agrège les résultats
4. Les métriques sont renvoyées au frontend au format JSON et affichées dans le bandeau de 6 cartes

### Endpoints LinkedIn appelés
| Endpoint | Scope requis | Usage |
|----------|-------------|-------|
| `GET /v2/me` | `openid`, `profile` | Profil Fondateur (nom, headline) |
| `GET /v2/networkSizes/{id}?edgeType=CompanyFollowedSize` | `r_1st_connections_size` | Nombre de followers |
| `GET /v2/organizations?q=vanityName` | `r_organization_social` | Infos Page Entreprise (nom, industrie, employés) |

### Gestion des tokens
- Token stocké chiffré dans Supabase (table `social_api_tokens`, accès Service Role uniquement)
- Renouvellement automatique via refresh token OAuth2
- Aucun token n'est exposé côté client — tout passe par l'Edge Function

### Volume d'appels API
- **Fréquence** : Rafraîchissement manuel (bouton "Rafraîchir") + 1 appel au chargement de la page
- **Volume estimé** : < 100 appels/jour
- **Utilisateurs** : 1 à 3 administrateurs internes uniquement

---

## 5. Capture d'Écran du Dashboard

Le dashboard est visible publiquement (données mock enrichies en remplacement des données réelles non disponibles) :
- **URL** : https://khepraexperts.com/agents-experts
- Section : "Digital Communication & Social Networks Performance Audit Engine"
- 6 cartes métriques (Twitter Followers, LinkedIn Page, Profil Fondateur, Tweets, Statut APIs, Top Tweet)
- Indicateurs visuels : point vert = données live, point ambré = données mock
- Bouton "Rafraîchir" pour recharger les données
- Panel debug technique (réponse JSON brute) pour diagnostic

---

## 6. Vidéo de Démonstration — Script (2-3 minutes)

### Script pour la vidéo de démonstration MDP

> **IMPORTANT** : LinkedIn exige une vidéo de démonstration de l'intégration. Voici le script à suivre.

---

**[00:00-00:15] — Introduction**
> "Bonjour, je suis [Nom], [Fonction] chez KHEPRA EXPERTS, cabinet de conseil en régulation financière et gouvernance basé à Lomé, opérant dans 15 pays d'Afrique francophone. Cette vidéo présente notre intégration avec l'API LinkedIn pour notre dashboard interne de monitoring des métriques sociales."

**[00:15-00:45] — Présentation du dashboard**
> *(Montrer la page `/agents-experts` et scroller jusqu'au bandeau "Digital Communication & Social Networks Performance Audit Engine")*
> "Voici notre dashboard KHEPRA OS 2. Il intègre un module de monitoring des réseaux sociaux qui affiche en temps réel les métriques de notre présence digitale. Actuellement, nous avons 6 cartes : les followers Twitter, la Page Entreprise LinkedIn, le Profil du Fondateur, les tweets, le statut des APIs, et le top tweet."

**[00:45-01:15] — Démonstration de l'intégration LinkedIn existante**
> *(Pointer les cartes LinkedIn)*
> "Le Profil Fondateur fonctionne en direct via l'API LinkedIn — nous utilisons l'endpoint `/v2/me` pour récupérer le headline et `/v2/networkSizes` pour le nombre de followers. Vous pouvez voir ici le point vert qui indique que les données sont live, et le nombre de followers s'affiche correctement."

**[01:15-01:45] — Le problème : Page Entreprise en mock**
> *(Pointer la carte LinkedIn Page avec le point ambré)*
> "En revanche, la Page Entreprise affiche un point ambré car nous utilisons des données de secours. L'API `/v2/organizations` retourne une erreur 403 parce que notre application n'a pas encore les scopes MDP `r_organization_social` et `r_organization_admin`. Nous avons besoin de ces scopes pour afficher les vrais followers, l'industrie et la description de notre page entreprise."

**[01:45-02:15] — Démonstration du rafraîchissement**
> *(Cliquer sur le bouton "Rafraîchir")*
> "Quand l'utilisateur clique sur Rafraîchir, notre Edge Function Supabase interroge les APIs LinkedIn et Twitter en parallèle, aggrège les résultats, et met à jour le dashboard. Les tokens sont stockés de manière sécurisée côté serveur — jamais exposés au client."

**[02:15-02:45] — Panel debug technique**
> *(Ouvrir le panel "Détails techniques")*
> "Pour la transparence, nous avons un panel de debug qui montre la réponse JSON brute de l'API. Cela permet à notre équipe technique de diagnostiquer rapidement tout problème. Actuellement on voit que la Company Page est en mock à cause de l'absence des scopes MDP."

**[02:45-03:00] — Conclusion**
> "Avec l'approbation MDP, nous pourrons remplacer ces données mock par des données réelles, offrant un dashboard 100% live à notre équipe. L'utilisation est strictement interne, avec un volume d'appels inférieur à 100 par jour pour 1 à 3 administrateurs. Merci de votre attention."

---

### Instructions pour l'enregistrement
1. Utiliser un outil d'enregistrement d'écran (Loom, OBS, ou QuickTime)
2. Montrer l'écran complet du navigateur avec l'URL visible
3. Parler clairement, en français ou en anglais
4. Durée : 2-3 minutes maximum
5. Héberger la vidéo sur YouTube (non listée) ou Loom et fournir le lien dans la candidature

---

## 7. Formulaire de Candidature MDP

### Accès au Developer Portal
1. Aller sur https://developer.linkedin.com/
2. Se connecter avec le compte administrateur de l'app KHEPRA EXPERTS
3. Dans "My Apps", sélectionner l'application existante
4. Cliquer sur l'onglet "Products" ou "Marketing Developer Platform"
5. Cliquer sur **"Request Access"** pour le Marketing Developer Platform

### Informations à fournir dans le formulaire

| Champ | Réponse |
|-------|---------|
| **Company Name** | KHEPRA EXPERTS SARL |
| **App Name** | KHEPRA EXPERTS API |
| **Use Case Title** | Internal Dashboard — Company Page Social Metrics Monitoring |
| **Use Case Description** | We display real-time LinkedIn Company Page follower counts, industry, and description on our internal KHEPRA OS 2 dashboard used by 1-3 administrators. This data helps our consulting team monitor our digital presence in Francophone Africa. We use the `/v2/organizations` and `/v2/networkSizes` endpoints via a secure server-side Edge Function. No user data is shared with third parties. |
| **API Products Requested** | Marketing Developer Platform |
| **Scopes Requested** | `r_organization_social`, `r_organization_admin` |
| **Target Audience** | Internal administrators only (1-3 users) |
| **API Call Volume** | < 100 calls/day |
| **Data Storage** | Displayed in real-time on dashboard only — no persistent storage of LinkedIn data beyond token management |
| **Privacy Policy URL** | https://khepraexperts.com/privacy |
| **Terms of Service URL** | https://khepraexperts.com/cgu |
| **Video Demo URL** | [À fournir — lien YouTube/Loom de la vidéo] |

---

## 8. Checklist de Candidature

- [ ] Vérifier que l'app LinkedIn Developer existe et est active
- [ ] Vérifier que la Privacy Policy et les CGU sont en ligne et accessibles
- [ ] Vérifier que le logo de l'app (174x174px minimum) est téléchargé sur le Developer Portal
- [ ] Enregistrer la vidéo de démonstration (script section 6)
- [ ] Héberger la vidéo (YouTube non listée ou Loom)
- [ ] Remplir le formulaire MDP avec les informations de la section 7
- [ ] Soumettre la candidature
- [ ] Suivre les emails de LinkedIn pour d'éventuelles questions complémentaires
- [ ] Une fois approuvé, mettre à jour les scopes dans l'app LinkedIn Developer Portal
- [ ] Re-générer le token OAuth2 avec les nouveaux scopes
- [ ] Mettre à jour le token dans Supabase (`social_api_tokens`)
- [ ] Tester le dashboard — la Company Page doit passer au vert

---

## 9. Après Approbation — Procédure Technique

Une fois l'approbation MDP obtenue, voici les étapes pour activer la Company Page en live :

### Étape 1 — Ajouter les scopes dans le Developer Portal
Dans l'app LinkedIn, onglet "Auth" → "OAuth 2.0 Scopes" → cocher :
- `r_organization_social`
- `r_organization_admin`

### Étape 2 — Régénérer le token OAuth2
Le token actuel n'inclut pas ces scopes. Il faut refaire le flux OAuth2 pour obtenir un nouveau token avec les scopes MDP.

### Étape 3 — Mettre à jour le token dans Supabase
Remplacer l'ancien token dans la table `social_api_tokens` :
```sql
UPDATE social_api_tokens 
SET token_value = '[NOUVEAU_TOKEN]', 
    updated_at = NOW(), 
    expires_at = NOW() + INTERVAL '60 days'
WHERE provider = 'linkedin' 
  AND token_name = 'access_token_oauth2';
```

### Étape 4 — Tester
Aller sur `/agents-experts`, cliquer sur "Rafraîchir". La carte LinkedIn Page doit afficher :
- Point vert (données live)
- Vrais followers
- Industrie réelle
- Description réelle

Le header du bandeau passera de "Partial" à "Live" (si Twitter est aussi en live).

---

## 10. FAQ

**Q : Pourquoi LinkedIn exige-t-il le MDP pour les données d'organisation ?**
R : LinkedIn a durci l'accès aux données d'organisation en 2023-2024 pour protéger les pages entreprise contre le scraping non autorisé. Le MDP garantit que seules les applications légitimes accèdent à ces données.

**Q : Combien de temps prend l'approbation MDP ?**
R : Typiquement 2 à 4 semaines. LinkedIn peut demander des clarifications, donc surveiller les emails.

**Q : Que faire si la candidature est refusée ?**
R : LinkedIn fournit généralement une raison. Les causes courantes : use case pas assez clair, vidéo de démonstration insuffisante, ou privacy policy manquante. On ajuste et on re-soumet.

**Q : Peut-on utiliser une autre approche sans MDP ?**
R : L'Edge Function essaie déjà deux endpoints alternatifs (`organizations?q=vanityName` et `organizationalEntityAcls?q=roleAssignee`). Les deux sont MDP-gated. Il n'existe pas d'alternative sans MDP pour les données de Page Entreprise.

**Q : L'absence de MDP impacte-t-elle le Profil Fondateur ?**
R : Non. Le Profil Fondateur utilise `/v2/me` qui fonctionne avec OAuth2 standard. Le token actuel (rafraîchi le 13 Juin 2026) fonctionne parfaitement.

---

*Dossier préparé le 13 Juin 2026 — KHEPRA EXPERTS*
*Contact technique : contact@khepraexperts.com*