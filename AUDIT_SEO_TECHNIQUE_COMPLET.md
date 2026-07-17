# AUDIT SEO TECHNIQUE COMPLET — khepraexperts.com

> **Date :** 2026-05-14  
> **Auditeur :** Expert SEO Technique Senior  
> **Site :** https://khepraexperts.com  
> **Framework :** React 19 + Vite + React Router (SPA)  
> **Hébergement :** Netlify / Vercel (CDN statique)  
> **Langue principale :** FR (monolingue par URL)  

---

## SOMMAIRE

1. [Partie 1 — Diagnostic Global](#partie-1--diagnostic-global)
2. [Partie 2 — Analyse par Type d'Erreur](#partie-2--analyse-par-type-derreur)
3. [Partie 3 — Cas "Autre page avec balise canonique correcte"](#partie-3--cas-spécifique-autre-page-avec-balise-canonique-correcte)
4. [Partie 4 — "Détectée, actuellement non indexée"](#partie-4--détectée-actuellement-non-indexée)
5. [Partie 5 — Erreurs Serveur (5xx)](#partie-5--erreurs-serveur-5xx)
6. [Partie 6 — Plan d'Actions Priorisé](#partie-6--plan-dactions-priorisé)
7. [Partie 7 — Livrables Techniques](#partie-7--livrables-techniques)

---

## PARTIE 1 — DIAGNOSTIC GLOBAL

### 1.1 Architecture SEO du site

| Élément | État | Note |
|---------|------|------|
| Structure URL | `/chemins/descriptifs/` | ✅ Slugs sémantiques, français, tirets |
| Profondeur de clic | 2-3 niveaux max | ✅ Homepage → Blog → Article |
| Pagination blog | Non implémentée | ⚠️ Tous les articles sur une page |
| Paramètres d'URL | Aucun paramètre SEO-critique | ✅ Pas de `?id=`, `?page=` sur les articles |
| Fragments d'ancre | Utilisés pour TOC | ⚠️ Ne pas indexer les `#section` |

### 1.2 Structure des URLs — analyse complète

**URLs canoniques (avec slash final) — 134 URLs dans le sitemap :**
- Homepage : `https://khepraexperts.com/`
- Pages statiques : `/about/`, `/services/`, `/contact/`, etc.
- Articles blog : `/blog/slug-semantique/`
- Landing pages : `/conseil-strategique-pme-afrique/`, etc.

**Problème critique identifié :** Les liens internes dans le code React pointent vers des URLs **SANS slash final** (`/services`, `/blog`, `/contact`) alors que :
- Le sitemap contient les versions **AVEC slash** (`/services/`, `/blog/`, `/contact/`)
- Les canonicals pointent vers les versions **AVEC slash**
- Les `_redirects` redirigent sans-slash → avec-slash en **301**

**Conséquence SEO :** Googlebot suit les liens internes sans slash → découvre une URL sans slash → lit le canonical vers la version avec slash → catégorise comme **"Autre page avec balise canonique correcte"**.

### 1.3 Profondeur de clic et maillage interne

| Niveau | Pages | Maillage interne |
|--------|-------|------------------|
| Niveau 0 (homepage) | 1 | Liens vers toutes les sections principales |
| Niveau 1 | /services/, /blog/, /about/, /contact/, etc. | Liens vers sous-pages |
| Niveau 2 | Articles blog, pages de service détaillées | Liens vers articles liés, CTAs |
| Niveau 3+ | Rares — bonne architecture plate | ✅ |

**Problème :** Le maillage interne utilise des URLs non-canoniques (sans slash). Chaque clic interne génère une requête qui reçoit un **301** avant de servir la page.

### 1.4 Cohérence sitemap / canonical / indexation

| Élément | État | Cohérence |
|---------|------|-----------|
| Sitemap.xml | 134 URLs avec `khepraexperts.com/` et slash final | ✅ Corrigé |
| robots.txt | `Sitemap: https://khepraexperts.com/sitemap.xml` | ✅ Corrigé |
| Canonicals | Toutes les pages ont `canonicalPath` dans SeoHead | ✅ |
| Hreflang | `fr` + `x-default` uniquement | ✅ Correct (site monolingue) |
| og:url | Normalisé avec slash final | ✅ |

### 1.5 Pagination

**État :** Le blog liste tous les articles sur une seule page. Pas de pagination.

**Impact :** Si le nombre d'articles dépasse ~50, la page devient lourde et le crawl budget est gaspillé. Actuellement ~40 articles — acceptable mais à surveiller.

**Recommandation :** Implémenter une pagination en `/blog/page/2/` avec balises `rel="next"` / `rel="prev"` (ou leur équivalent moderne : infinite scroll avec `IntersectionObserver` + pushState).

### 1.6 Hreflang FR/EN

**État :** Le site est monolingue par URL (sélecteur de langue i18n dans la SPA). Les URLs fr et en sont **identiques**.

**Configuration actuelle :** Seuls `hreflang="fr"` et `hreflang="x-default"` sont générés. Pas de `hreflang="en"` pointant vers la même URL.

**Verdict :** ✅ CORRECT. Google Search Console signalait précédemment une erreur hreflang car un `hreflang="en"` invalide pointait vers `/en/` (inexistant). Cette erreur a été corrigée.

### 1.7 Duplication de contenus

| Type de duplication | Existe ? | Gravité | Pages concernées |
|---------------------|----------|---------|------------------|
| Contenu identique (copie exacte) | Non | — | — |
| Near-duplicate (contenu quasi similaire) | **Oui** | Moyenne | `/services/conseil-strategique` vs `/conseil-strategique` |
| URLs multiples pour un même contenu | **Oui** | Haute | `/blog/5` (ID) vs `/blog/risques-financiers-pme...` (slug) |
| Paramètres d'URL | Non | — | — |
| Version mobile/desktop | Non (responsive) | — | — |
| Protocole HTTP/HTTPS | Non (HTTPS forcé) | — | — |
| www vs non-www | Non (non-www canonique) | — | — |

**Near-duplicate critique :**
- `/services/conseil-strategique` → composant `ConseilStrategiquePage`
- `/conseil-strategique` → composant `ServiceDetailPage` (différent !)

Ces deux URLs servent des composants **différents** mais avec un contenu **thématiquement identique**. Google peut considérer cela comme du near-duplicate.

### 1.8 Pages orphelines

**Définition :** Pages sans lien interne pointant vers elles.

| Page | Liens internes trouvés ? | Orpheline ? |
|------|--------------------------|-------------|
| `/strategic-report/` | Aucun lien dans la nav principale | ✅ Orpheline |
| `/sitemap/` | Lien dans le footer uniquement | ⚠️ Peu visible |
| `/thank-you/` | Aucun lien interne (page de destination) | ✅ Normale |
| Pages admin/dashboard | Bloquées par robots.txt | ✅ Normale |

### 1.9 Rendu mobile-first

| Élément | État |
|---------|------|
| Viewport meta | ✅ `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Responsive breakpoints | ✅ Tailwind responsive (sm:, md:, lg:) |
| Touch targets | ✅ Min 44px sur les boutons CTA |
| Font size mobile | ✅ Minimum 14-16px |
| CLS (Cumulative Layout Shift) | ⚠️ À vérifier — hero images en lazy loading |

### 1.10 Crawlabilité

| Élément | État |
|---------|------|
| robots.txt | ✅ Autorise toutes les pages publiques |
| Sitemap.xml | ✅ Soumis, 134 URLs |
| Liens internes crawlables | ⚠️ Liens `<a>` sans `rel="nofollow"` mais vers URLs non-canoniques |
| JavaScript requis | ✅ SPA — Googlebot exécute JS (2018+) |
| Prérendu / SSR | ❌ Pas de SSR — rendu client uniquement |
| Time-to-render | ⚠️ Dépend du bundle JS + hydratation |

### 1.11 Score de gravité par problème (P1/P2/P3)

| # | Problème | Gravité | Priorité | Impact GSC |
|---|----------|---------|----------|------------|
| 1 | Liens internes vers URLs non-canoniques (sans slash) | **Critique** | **P1** | "Autre page avec balise canonique correcte" |
| 2 | `/blog/:id` (ID numérique) coexiste avec `/blog/:slug` (slug sémantique) | **Critique** | **P1** | Contenu dupliqué perçu, canonicals divergents |
| 3 | `ShareButtons` partage l'URL avec ID au lieu du slug canonique | **Haute** | **P1** | Partages sociaux vers URL non-canonique |
| 4 | Near-duplicate : routes services en double (`/services/xxx` vs `/xxx`) | **Moyenne** | **P2** | Cannibalisation sémantique |
| 5 | Absence de pagination blog | **Moyenne** | **P2** | Page lourde, crawl budget |
| 6 | Pages orphelines (`/strategic-report/`) | **Faible** | **P3** | Non découverte par Googlebot |
| 7 | `privacy` et `legal` en noindex | **Faible** | **P3** | Perte de signaux EEAT (choix business) |
| 8 | Pas de `rel="next/prev"` pour pagination | **Faible** | **P3** | Orientation crawl |

---

## PARTIE 2 — ANALYSE PAR TYPE D'ERREUR

### 2.1 "Exclue par balise noindex"

**Signification technique :** Googlebot a exploré la page et trouvé une balise `<meta name="robots" content="noindex">` ou un header HTTP `X-Robots-Tag: noindex`. Il a respecté l'instruction et n'a pas indexé la page.

**Comportement de Googlebot :**
1. Crawl de l'URL
2. Lecture du HTML (ou exécution du JS pour les SPAs)
3. Détection de `noindex`
4. Suppression de l'URL de l'index (ou non-indexation)
5. Signalement dans GSC : "Exclue par balise noindex"

**Impact SEO réel :** Aucun impact négatif — c'est le comportement attendu pour les pages privées.

**Pages concernées (correctement noindexées) :**

| Page | noIndex ? | Statut |
|------|-----------|--------|
| `/dashboard/` | ✅ `noIndex={true}` | Correct |
| `/administrateur/` | ✅ `noIndex={true}` | Correct |
| `/mon-espace/` | ✅ `noIndex={true}` | Correct |
| `/thank-you/` | ✅ `noIndex={true}` | Correct |
| `/privacy/` | ✅ `noIndex={true}` | ⚠️ Débatable — page légale |
| `/legal/` | ✅ `noIndex={true}` | ⚠️ Débatable — page légale |
| `/strategic-report/` | ✅ `noIndex={true}` | Correct (rapport interne) |
| `/*` (404) | ✅ `noIndex={true}` | Correct |

**Causes avancées invisibles :**
- **Rendu JS différé :** Dans une SPA React, le `noindex` est injecté par `useEffect` (SeoHead). Si Googlebot ne rend pas correctement le JS (rare depuis 2018 mais possible en cas de timeout), il ne verra pas le `noindex`. Par précaution, le `index.html` statique ne devrait JAMAIS contenir `noindex`.
- **Vérification :** Le `index.html` contient `<meta name="robots" content="index, follow...">` ✅ — aucun risque.

**Pages légales (privacy/legal) :**
Ces pages sont actuellement `noindex`. Pour un cabinet de conseil réglementaire et financier (YMYL), les pages légales sont des **signaux de confiance importants** pour l'EEAT. Les indexer renforce la crédibilité.

**Recommandation :** Retirer `noIndex` sur `/privacy/` et `/legal/` si elles contiennent du contenu substantiel (ce qui est le cas ici — mentions légales OHADA complètes, politique APDP Togo).

---

### 2.2 "Autre page avec balise canonique correcte"

**Signification technique :** Googlebot a exploré une URL A, a trouvé un canonical pointant vers l'URL B, et a décidé d'indexer B au lieu de A. L'URL A est signalée comme "exclue" car une autre page (B) a la balise canonique "correcte" (c'est-à-dire que Google considère B comme la version préférée).

**Comportement de Googlebot :**
1. Crawl de l'URL `/services` (découverte via lien interne sans slash)
2. Lecture du canonical : `<link rel="canonical" href="https://khepraexperts.com/services/">`
3. Google comprend : "Cette URL `/services` n'est pas canonique, la canonique est `/services/`"
4. Google classe `/services` comme "Autre page avec balise canonique correcte"
5. Google indexe `/services/` (si tout va bien)

**Impact SEO réel :** L'URL canonique (`/services/`) est indexée. L'URL non-canonique (`/services`) ne l'est pas. **Ce n'est pas un problème d'indexation** — c'est un problème de **crawl budget** et de **propreté du maillage interne**.

**Causes probables :**
1. **Liens internes sans slash final** — cause principale identifiée
2. **Partages sociaux sans slash** — les utilisateurs copient l'URL sans slash
3. **Backlinks externes sans slash** — impossible à contrôler
4. **Historique d'URLs sans slash** — avant les redirections 301

**Causes avancées :**
- **Chaînes de redirection :** Si un backlink pointe vers `/services` (HTTP) → 301 vers `/services` (HTTPS) → 301 vers `/services/` — Googlebot peut s'arrêter avant le dernier 301 en cas de timeout.
- **Conflit canonical/noindex :** Si une URL sans slash avait un `noindex` ET un canonical → conflit. Non applicable ici.
- **Hreflang incohérent :** Si `hreflang="fr"` pointe vers `/services` et le canonical vers `/services/` → conflit. Non applicable ici (hreflang pointe vers la version slash).

**Procédure de correction :**
Voir [Partie 3](#partie-3--cas-spécifique-autre-page-avec-balise-canonique-correcte).

---

### 2.3 "Page avec redirection"

**Signification technique :** Googlebot a exploré une URL et a reçu un code HTTP de redirection (301, 302, 307, 308). L'URL d'origine n'est pas indexée car elle redirige vers une autre.

**Comportement de Googlebot :**
1. Requête GET `/about`
2. Réponse : `301 Moved Permanently` → Location: `/about/`
3. Googlebot suit la redirection
4. L'URL `/about` est signalée comme "Page avec redirection"
5. Google transmet le PageRank vers la cible `/about/`

**Impact SEO réel :** Positif pour les 301 (transfert du jus). Négatif pour les 302/307 (pas de transfert de jus).

**Redirections actuelles dans `_redirects` :**

```
/about              /about/             301
/contact            /contact/           301
/services           /services/          301
/blog               /blog/              301
... (85+ règles)
```

**Problèmes identifiés :**
1. **Redirections sans-slash → avec-slash :** 85+ règles — correctes et nécessaires.
2. **Redirections legacy :** Anciennes URLs encodées vers nouvelles URLs propres — correctes.
3. **Risque de boucle :** Si une règle redirige `/about/` → `/about/` → boucle infinie. Non applicable car les règles ciblent les URLs sans slash.

**Procédure de validation :**
```bash
# Tester une redirection
curl -I https://khepraexperts.com/services
# Attendu : HTTP/2 301 → Location: /services/

curl -I https://khepraexperts.com/services/
# Attendu : HTTP/2 200
```

---

### 2.4 "Erreur serveur (5xx)"

**Signification technique :** Googlebot a reçu un code HTTP 5xx (500, 502, 503, 504) lors du crawl. Le serveur n'a pas pu servir la page.

**Comportement de Googlebot :**
1. Requête GET `/blog/xxx`
2. Réponse : `500 Internal Server Error`
3. Googlebot réessaie plus tard (exponential backoff)
4. Si l'erreur persiste, l'URL est signalée comme "Erreur serveur"
5. L'URL est retirée de l'index

**Causes probables dans ce projet :**

1. **Edge Functions Supabase :** Les fonctions serverless (`og-social-preview`, `process-lead-submission`, etc.) peuvent timeout ou crasher.
   - `og-social-preview` : Génération d'image OG à la volée — peut timeout sur des requêtes complexes
   - `process-lead-submission` : Traitement de formulaire — peut échouer si Supabase est indisponible

2. **Supabase API :** Requêtes à `*.supabase.co` qui échouent côté client ne génèrent pas de 5xx (erreur JS). Mais les Edge Functions qui appellent Supabase peuvent retourner 500.

3. **Memory leak :** Le SPA React peut avoir des fuites mémoire si des composants ne nettoient pas les useEffect/listeners. Après plusieurs heures d'ouverture, cela peut causer des crashes côté client (pas de 5xx serveur).

4. **Hydration mismatch :** React 19 + SSR/CSR mismatch peut causer des erreurs de rendu. Mais le projet est 100% CSR (pas de SSR), donc pas de mismatch.

**Monitoring recommandé :**
- Surveiller les logs Netlify/Vercel pour les 500/502/504
- Surveiller les Edge Functions Supabase (dashboard Supabase → Edge Functions → Logs)
- Mettre en place un uptime monitor (UptimeRobot, Pingdom) sur 5 URLs clés

**Procédure de debug :**
```bash
# Tester une Edge Function
curl -I https://khepraexperts.com/api/og-social-preview?slug=xxx
# Vérifier le code HTTP et le temps de réponse

# Tester le TTFB (Time To First Byte)
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}\n" https://khepraexperts.com/
# Objectif : TTFB < 600ms
```

---

### 2.5 "Détectée, actuellement non indexée"

**Signification technique :** Googlebot a découvert l'URL (via sitemap, lien interne, ou backlink) mais ne l'a pas encore indexée. C'est une **décision algorithmique** de Google — la page n'a pas été jugée suffisamment pertinente ou de qualité pour être indexée.

**Différence avec "Explorée, actuellement non indexée" :**
- **Détectée** : Googlebot a découvert l'URL mais ne l'a même pas explorée (crawlé). Raison : manque de "crawl budget", autorité insuffisante, ou file d'attente.
- **Explorée** : Googlebot a crawlé l'URL, l'a lue, mais a choisi de ne pas l'indexer. Raison : qualité du contenu, duplication, thin content, manque d'autorité.

**Causes probables pour khepraexperts.com :**

1. **Autorité de domaine insuffisante :** Nouveau domaine (moins de 2 ans) avec peu de backlinks. Google est prudent avec les nouveaux sites.

2. **Contenu "thin" perçu :** Les pages outils interactifs (`/tools/xxx`) ont peut-être peu de contenu textuel initial (formulaires vides). Google peut les considérer comme des "doorway pages" ou thin content.

3. **Contenu IA détectable :** Si Google détecte que le contenu est généré par IA (patterns linguistiques, manque de "E-E-A-T" signals), il peut choisir de ne pas l'indexer. Le site a beaucoup de contenu long-form qui semble de haute qualité, mais la fréquence de publication irrégulière peut signaler du contenu "batch-généré".

4. **Sur-optimisation SEO :** Le site a un Schema.org très dense, des keywords stuffing dans les meta, et une architecture SEO très agressive. Google peut suspecter du "SEO over-optimization" et appliquer un filtre.

5. **Crawl budget limité :** Avec 134 URLs dans le sitemap + des redirections 301 + des liens internes vers URLs non-canoniques, Googlebot gaspille du crawl budget. Moins d'URLs importantes sont explorées.

6. **Fréquence de publication :** Le blog a des articles publiés par "batch" (plusieurs articles le même jour) puis des périodes sans publication. Ce pattern peut ressembler à du contenu généré en masse.

**Méthodologie pour augmenter les chances d'indexation :**
Voir [Partie 4](#partie-4--détectée-actuellement-non-indexée).

---

### 2.6 "Explorée, actuellement non indexée"

**Signification technique :** Googlebot a crawlé la page, l'a analysée, mais a décidé de ne pas l'indexer. C'est le signe d'un **problème de qualité perçue**.

**Causes spécifiques :**

1. **Contenu quasi similaire :** Deux articles sur des sujets très proches (ex: `alm-microfinance-uemoa` vs `bilan-bancaire-uemoa`) peuvent être considérés comme du near-duplicate.

2. **Manque de signaux E-E-A-T :**
   - Pas de page auteur détaillée avec biographie, photo, LinkedIn
   - Pas de mentions des certifications/credentials de l'auteur
   - Pas de liens vers des sources officielles (BCEAO, Banque Mondiale) dans les articles
   - Pas de "about us" détaillant l'expertise de l'équipe

3. **Pages outils non indexables :** Les pages `/tools/xxx` sont des formulaires interactifs. Sans contenu explicatif substantiel autour, Google les considère comme des "utility pages" sans valeur sémantique.

4. **Internal linking faible :** Les articles récents peuvent n'avoir que peu de liens internes pointant vers eux (les "RelatedArticles" sont basés sur la catégorie, ce qui peut ne pas suffire).

---

### 2.7 "Bloquée par robots.txt"

**Signification technique :** L'URL est bloquée par une règle `Disallow` dans le robots.txt. Googlebot ne l'explore pas.

**État actuel :**

```
Disallow: /mon-espace
Disallow: /administrateur
Disallow: /dashboard
Disallow: /thank-you
```

**Verdict :** ✅ CORRECT. Seules les pages privées sont bloquées.

**Attention :** Les règles `Allow:` explicites dans le robots.txt actuel sont redondantes mais inoffensives. Par défaut, tout est autorisé sauf ce qui est `Disallow`.

---

## PARTIE 3 — CAS SPÉCIFIQUE : "Autre page avec balise canonique correcte"

### 3.1 Mécanisme exact

Ce problème est le **plus critique** pour khepraexperts.com. Voici le mécanisme étape par étape :

```
1. Googlebot découvre l'URL /services (sans slash)
   → Via lien interne <a href="/services"> dans la SPA
   → Via backlink externe sans slash
   → Via sitemap mal formé (corrigé)

2. Googlebot envoie GET /services
   → Le serveur (Netlify) reçoit la requête
   → _redirects : /services → /services/ (301)
   → Googlebot suit le 301

3. Googlebot lit le HTML de /services/
   → canonical = https://khepraexperts.com/services/
   → og:url = https://khepraexperts.com/services/
   → hreflang pointe vers /services/

4. Googlebot compare :
   → URL crawlée : /services
   → Canonical : /services/
   → Conclusion : /services N'EST PAS canonique

5. Google Search Console signale :
   → /services : "Autre page avec balise canonique correcte"
   → /services/ : "Indexée" (si tout va bien)
```

### 3.2 Pourquoi Google choisit une autre URL canonique

Google applique un **algorithme de choix de canonique** qui prend en compte :
1. La balise canonical explicite (`<link rel="canonical">`)
2. Les redirections 301
3. Le maillage interne (quelle version a le plus de liens)
4. Le sitemap (quelle version est listée)
5. Les backlinks externes

Sur khepraexperts.com :
- Le canonical explicite pointe vers la version **avec slash** ✅
- Les redirections 301 vont vers la version **avec slash** ✅
- Le sitemap contient la version **avec slash** ✅
- **MAIS** le maillage interne pointe vers la version **sans slash** ❌

Résultat : Google reçoit des **signaux contradictoires** :
- Canonical dit : "la version avec slash est la bonne"
- Maillage interne dit : "la version sans slash est plus populaire" (plus de liens)

Google suit le canonical, mais le signal confus peut causer :
- Un délai d'indexation plus long
- Des oscillations (indexe/désindexe alternativement)
- Un gaspillage de crawl budget

### 3.3 Duplication réelle vs duplication perçue

| Type | Existe sur le site ? | Exemple |
|------|----------------------|---------|
| **Duplication réelle** (contenu identique) | Non | — |
| **Near-duplicate** (contenu quasi similaire) | **Oui** | `/services/conseil-strategique` vs `/conseil-strategique` |
| **Duplication perçue** (URLs différentes, même contenu) | **Oui** | `/blog/5` vs `/blog/risques-financiers-pme...` |

**Near-duplicate critique — routes services :**

| Route A | Composant | Route B | Composant | Contenu |
|---------|-----------|---------|-----------|---------|
| `/services/conseil-strategique` | `ConseilStrategiquePage` | `/conseil-strategique` | `ServiceDetailPage` | Thématiquement identique, structuralement différent |
| `/services/gestion-de-projets` | `GestionDeProjetsPage` | Pas d'alias | — | OK |

Les routes `/services/xxx` et `/xxx` (alias SEO) utilisent des **composants différents**. Le contenu n'est pas strictement identique, mais il est **thématiquement redondant**. Google peut considérer cela comme du near-duplicate.

**Solution recommandée :** Choisir UNE URL canonique par service et rediriger l'autre en 301.
- Option A : Garder `/services/conseil-strategique/` comme canonique, rediriger `/conseil-strategique/` → `/services/conseil-strategique/` en 301
- Option B : Garder `/conseil-strategique/` comme canonique (plus court, plus SEO-friendly), rediriger `/services/conseil-strategique/` → `/conseil-strategique/` en 301

**Recommandation :** Option B. Les URLs courtes sans préfixe `/services/` sont plus SEO-friendly et mémorisables.

### 3.4 Slug trop proches

Plusieurs articles de blog ont des slugs très similaires :

| Article A | Article B | Similarité |
|-----------|-----------|------------|
| `conformite-bceao-cobac-2025-ratios-bale-iii-coussins-conservation` | `conformite-bceao-exigences-prudentielles-sfd-uemoa` | Haute — même thème BCEAO |
| `lbcft-sfd-emf-sanctions-onu-centif-anif-abr` | `lbcft-sfd-uemoa-directive-02-2015-centif-kyc` | Haute — même thème LBC/FT |
| `bilan-bancaire-uemoa-ratios-bceao-solvabilite` | `bilan-bancaire-cemac-ratios-cobac-solvabilite` | Haute — même sujet, zone différente |

Google peut considérer ces articles comme du near-duplicate s'ils partagent beaucoup de contenu similaire.

**Solution :** S'assurer que chaque article a un angle unique et du contenu original. Les articles sur le même sujet mais pour des zones différentes (UEMOA vs CEMAC) doivent être clairement différenciés.

### 3.5 Versions FR/EN

Le site est monolingue par URL — la langue est définie par le sélecteur i18n dans la SPA. Il n'y a pas d'URL distincte `/en/blog/xxx`.

**Problème :** Les articles FR et EN ont le **même ID** dans le système. Si quelqu'un partage `/blog/5` en FR puis en EN, c'est la même URL.

**Impact :** Faible. Google comprend que le contenu change en fonction de la langue sélectionnée. Mais cela crée une ambiguïté pour les crawlers sociaux.

### 3.6 Quand NE PAS corriger "Autre page avec balise canonique correcte"

Ce statut GSC **n'est pas une erreur**. C'est une **information**.

| Scénario | Action |
|----------|--------|
| L'URL canonique (cible du canonical) est bien indexée | ✅ Laisser tel quel — c'est le comportement attendu |
| L'URL canonique n'est PAS indexée | ⚠️ Problème — vérifier la qualité de la page canonique |
| Le nombre d'URLs "Autre page..." est faible (< 10) | ✅ Normal — liens externes, historique |
| Le nombre d'URLs "Autre page..." est élevé (> 100) | ❌ Problème de maillage interne à corriger |

**Pour khepraexperts.com :** Le nombre d'URLs dans ce statut est probablement élevé car le maillage interne entier pointe vers des URLs sans slash. **Correction recommandée.**

### 3.7 Procédure de correction étape par étape

**Étape 1 : Uniformiser les liens internes**

Tous les liens `<a href="...">`, `<Link to="...">`, et `navigate('...')` doivent pointer vers la version **avec slash final**.

**AVANT (problématique) :**
```tsx
<Link to="/services">Nos services</Link>
<a href="/blog">Retour au blog</a>
<button onClick={() => navigate('/contact')}>Contact</button>
```

**APRÈS (correct) :**
```tsx
<Link to="/services/">Nos services</Link>
<a href="/blog/">Retour au blog</a>
<button onClick={() => navigate('/contact/')}>Contact</button>
```

**Étape 2 : Uniformiser les partages sociaux**

Le composant `ShareButtons` reçoit actuellement l'URL avec ID numérique :
```tsx
<ShareButtons url={`${SITE_URL}/blog/${resolvedArticle.id}/`} ... />
```

**Correction :** Utiliser le slug sémantique :
```tsx
const shareUrl = semanticSlug
  ? `${SITE_URL}/blog/${semanticSlug}/`
  : `${SITE_URL}/blog/${resolvedArticle.id}/`;
<ShareButtons url={shareUrl} ... />
```

**Étape 3 : Vérifier le sitemap**

S'assurer que le sitemap ne contient QUE des URLs avec slash final.

**Vérification :**
```bash
grep -v '/$' sitemap.xml | grep '<loc>'
# Doit retourner vide (sauf la homepage qui a /)
```

**Étape 4 : Vérifier les redirections**

S'assurer que toutes les variantes sans slash redirigent en 301 vers la version avec slash.

**Vérification :**
```bash
curl -s -o /dev/null -w "%{http_code}" https://khepraexperts.com/services
# Attendu : 301

curl -s -o /dev/null -w "%{http_code}" https://khepraexperts.com/services/
# Attendu : 200
```

**Étape 5 : Demander une réindexation dans GSC**

Après correction, soumettre le sitemap mis à jour et demander l'inspection de 5-10 URLs clés.

---

## PARTIE 4 — "DÉTECTÉE, ACTUELLEMENT NON INDEXÉE"

### 4.1 Différence avec "Explorée actuellement non indexée"

| Statut GSC | Googlebot a crawlé ? | Cause principale |
|------------|----------------------|------------------|
| **Détectée** | ❌ Non | Manque de crawl budget, autorité insuffisante, file d'attente |
| **Explorée** | ✅ Oui | Qualité perçue insuffisante, thin content, duplication |

### 4.2 Problèmes de qualité perçue Google

Google évalue la qualité d'une page selon ses **Quality Rater Guidelines** (QRG). Les critères clés :

1. **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness)
2. **YMYL** (Your Money Your Life) — le conseil financier est YMYL
3. **Originalité du contenu**
4. **Profondeur et exhaustivité**
5. **Présentation professionnelle**

**Évaluation E-E-A-T de khepraexperts.com :**

| Critère | Score | Preuve manquante |
|---------|-------|------------------|
| **Experience** | 6/10 | Pas de témoignages clients détaillés avec cas concrets |
| **Expertise** | 7/10 | Contenu technique de qualité, mais pas de credentials visibles |
| **Authoritativeness** | 5/10 | Pas de backlinks institutionnels (BCEAO, Banque Mondiale) |
| **Trustworthiness** | 6/10 | Mentions légales OK, mais pas de page "Qui sommes-nous" détaillée |

### 4.3 Impact EEAT/YMYL

Le site est dans la catégorie **YMYL** (conseil financier, conformité réglementaire, levée de fonds). Google applique des standards de qualité **beaucoup plus stricts**.

**Signaux EEAT à renforcer :**

1. **Page auteur détaillée :**
   - Biographie complète de SIMDA Essoyomèwè
   - Certifications (BCEAO, COBAC, IFC, etc.)
   - Liens LinkedIn, publications académiques
   - Photo professionnelle
   - Description de l'expérience sectorielle

2. **Mentions des sources :**
   - Citer les textes réglementaires exacts (directives BCEAO, règlements COBAC)
   - Lien vers les documents officiels
   - Dates de publication des textes

3. **Preuve sociale :**
   - Études de cas détaillées avec chiffres
   - Témoignages clients nommés (avec consentement)
   - Logos des clients/partenaires

4. **Transparence :**
   - Adresse physique (Lomé, Togo)
   - Numéro d'enregistrement (RCCM, NIF)
   - Coordonnées de contact vérifiables

### 4.4 Crawl budget

Le crawl budget est limité par :
1. **Nombre de redirections 301** — chaque URL sans slash gaspille un crawl
2. **Nombre total d'URLs** — 134 URLs dans le sitemap + URLs non-canoniques découvertes
3. **Vitesse du serveur** — TTFB (Time To First Byte)

**Optimisation du crawl budget :**

```
Avant correction :
- Crawl 1 : /services (redirection 301) → gaspillé
- Crawl 2 : /services/ (page réelle)
- Crawl 3 : /blog (redirection 301) → gaspillé
- Crawl 4 : /blog/ (page réelle)
→ 50% du crawl budget gaspillé

Après correction :
- Crawl 1 : /services/ (page réelle)
- Crawl 2 : /blog/ (page réelle)
→ 0% gaspillé
```

### 4.5 Fréquence de publication

Google préfère une **fréquence régulière** à des publications par batch.

**Historique de publication actuel :**
- Avril 2026 : 8 articles publiés (batch)
- Mai 2026 : 2 articles publiés
- Avant : irrégulier

**Recommandation :** Publier 1-2 articles par semaine de manière régulière plutôt que 8 articles d'un coup.

### 4.6 Duplication sémantique

Plusieurs articles couvrent des sujets très proches :

| Sujet principal | Articles | Risque |
|-----------------|----------|--------|
| Conformité BCEAO | 4+ articles | Near-duplicate |
| LBC/FT | 3+ articles | Near-duplicate |
| Bilan bancaire | 3+ articles (UEMOA, CEMAC, général) | Near-acceptable (différenciation zone) |

**Solution :** Créer une **page pilier** (pillar page) par sujet principal, avec des articles spécifiques qui linkent vers la page pilier.

### 4.7 Méthodologie pour augmenter les chances d'indexation

**Actions immédiates (1-7 jours) :**

1. **Corriger le maillage interne** — liens vers URLs canoniques
2. **Soumettre le sitemap corrigé** dans GSC
3. **Demander l'inspection** de 5 URLs non indexées dans GSC
4. **Partager les nouvelles URLs** sur LinkedIn pour générer des backlinks sociaux

**Actions à 30 jours :**

5. **Publier 4 nouveaux articles** de qualité (1/semaine)
6. **Créer 2 pages pilier** (conformité BCEAO, LBC/FT)
7. **Obtenir 3 backlinks** depuis des sites pertinents (LinkedIn articles, partenaires)
8. **Ajouter Schema.org Person** sur la page équipe

**Actions à 90 jours :**

9. **Atteindre 50+ articles** publiés
10. **Créer une newsletter** hebdomadaire
11. **Obtenir des mentions** sur des sites institutionnels
12. **Créer des pages pays** (Togo, Bénin, Côte d'Ivoire, Sénégal)

---

## PARTIE 5 — ERREURS SERVEUR (5xx)

### 5.1 Diagnostic

Le site est une SPA statique hébergée sur Netlify/Vercel. Les erreurs 5xx peuvent provenir de :

| Source | Type d'erreur | Fréquence |
|--------|--------------|-----------|
| Edge Functions Supabase | Timeout, crash JS | Potentiellement élevée sous charge |
| Supabase API | Rate limiting, indisponibilité | Moyenne |
| CDN (Netlify/Vercel) | Rare — infrastructure robuste | Faible |
| DNS | Problème de résolution | Très faible |

### 5.2 Edge Functions à risque

| Edge Function | Risque | Cause |
|---------------|--------|-------|
| `og-social-preview` | **Élevé** | Génération d'image OG — peut timeout (> 10s) |
| `process-lead-submission` | **Moyen** | Écriture DB — peut échouer si Supabase indisponible |
| `og-image-proxy` | **Moyen** | Proxy d'image — peut timeout sur images lourdes |

### 5.3 Procédure de debug

```bash
# 1. Tester les Edge Functions individuellement
curl -w "\nHTTP: %{http_code}\nTime: %{time_total}s\n" \
  "https://khepraexperts.com/api/og-social-preview?slug=risques-financiers-pme-afrique-francophone-bceao-cobac"

# 2. Vérifier les logs Supabase
curl -H "Authorization: Bearer $SUPABASE_TOKEN" \
  "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-social-preview"

# 3. Tester le TTFB de la homepage
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" \
  https://khepraexperts.com/
```

### 5.4 Monitoring recommandé

```yaml
# UptimeRobot — monitorer toutes les 5 minutes
monitors:
  - name: Homepage
    url: https://khepraexperts.com/
    expected_status: 200
  
  - name: Blog
    url: https://khepraexperts.com/blog/
    expected_status: 200
  
  - name: OG Social Preview
    url: https://khepraexperts.com/api/og-social-preview?slug=test
    expected_status: 200
    timeout: 15000
```

### 5.5 Optimisation TTFB

| Action | Impact attendu | Difficulté |
|--------|----------------|------------|
| Activer le CDN Edge (Netlify/Vercel Edge Network) | -200ms TTFB | Facile |
| Compresser le bundle JS (vite-plugin-compression) | -50% taille | Facile |
| Prérendre les pages critiques (SSG/ISR) | -500ms TTFB | Moyenne |
| Optimiser les images (WebP, srcset) | -300ms LCP | Facile |

---

## PARTIE 6 — PLAN D'ACTIONS PRIORISÉ

### 6.1 Actions immédiates (24h)

| # | Action | Impact SEO | Impact Indexation | Difficulté | Priorité |
|---|--------|------------|-------------------|------------|----------|
| 1 | **Corriger le maillage interne** — uniformiser tous les liens avec slash final | **Élevé** | **Élevé** | Moyenne | **P1** |
| 2 | **Corriger ShareButtons** — utiliser le slug sémantique canonique | Moyen | Faible | Facile | **P1** |
| 3 | **Soumettre le sitemap corrigé** dans GSC | Moyen | Élevé | Facile | **P1** |
| 4 | **Demander l'inspection** de 5 URLs clés dans GSC | Faible | Moyen | Facile | P2 |
| 5 | **Vérifier les Edge Functions** — tester les 3 fonctions critiques | Faible | Faible | Facile | P2 |

### 6.2 Actions critiques (7 jours)

| # | Action | Impact SEO | Impact Indexation | Difficulté | Priorité |
|---|--------|------------|-------------------|------------|----------|
| 6 | **Implémenter la pagination blog** avec `/blog/page/2/` | Moyen | Élevé | Moyenne | **P1** |
| 7 | **Créer un helper de navigation canonique** (`useCanonicalLink`) | Élevé | Moyen | Facile | **P1** |
| 8 | **Résoudre le near-duplicate services** — rediriger les alias 301 | Moyen | Moyen | Moyenne | P2 |
| 9 | **Ajouter Schema.org Person** sur la page équipe | Moyen | Moyen | Facile | P2 |
| 10 | **Publier 2 articles** cette semaine | Moyen | Élevé | Moyenne | P2 |
| 11 | **Retirer noIndex** sur `/privacy/` et `/legal/` | Faible | Faible | Facile | P3 |

### 6.3 Actions structurelles (30 jours)

| # | Action | Impact SEO | Impact Indexation | Difficulté | Priorité |
|---|--------|------------|-------------------|------------|----------|
| 12 | **Créer 5 pages pilier** (pillar pages) pour les sujets principaux | Élevé | Élevé | Élevée | **P1** |
| 13 | **Créer des pages auteur** détaillées avec E-E-A-T | Élevé | Moyen | Moyenne | P2 |
| 14 | **Obtenir 10 backlinks** depuis des sites pertinents | Élevé | Élevé | Élevée | P2 |
| 15 | **Créer des pages pays** (Togo, Bénin, Côte d'Ivoire) | Moyen | Moyen | Moyenne | P2 |
| 16 | **Implémenter un système de newsletter** | Moyen | Faible | Moyenne | P3 |

### 6.4 Optimisations avancées (90 jours)

| # | Action | Impact SEO | Impact Indexation | Difficulté | Priorité |
|---|--------|------------|-------------------|------------|----------|
| 17 | **Atteindre 100+ articles** publiés | Élevé | Élevé | Élevée | P2 |
| 18 | **Implémenter le prérendu (SSG/ISR)** pour les pages statiques | Élevé | Moyen | Élevée | P2 |
| 19 | **Créer une base de données réglementaire** UEMOA en ligne | Élevé | Moyen | Élevée | P3 |
| 20 | **Lancer des webinaires mensuels** avec landing pages | Moyen | Faible | Moyenne | P3 |

---

## PARTIE 7 — LIVRABLES TECHNIQUES

### 7.1 robots.txt optimisé

```txt
User-agent: *

# ── Private pages (admin, auth, dashboard, thank-you) ─────────────
Disallow: /mon-espace/
Disallow: /administrateur/
Disallow: /dashboard/
Disallow: /thank-you/

# ── Sitemap ───────────────────────────────────────────────────────
Sitemap: https://khepraexperts.com/sitemap.xml

# ── Crawl-delay (optionnel, pour les bots agressifs) ──────────────
# Crawl-delay: 1
```

**Note :** Les règles `Allow:` explicites ont été supprimées car redondantes. Par défaut, tout est autorisé.

### 7.2 sitemap.xml — checklist de validation

**Checklist avant soumission à GSC :**

- [ ] Toutes les URLs commencent par `https://khepraexperts.com/`
- [ ] Toutes les URLs publiques se terminent par `/` (sauf homepage qui est `/`)
- [ ] Aucune URL avec `noindex` n'est dans le sitemap
- [ ] Aucune URL redirigée (301) n'est dans le sitemap
- [ ] Les `lastmod` sont à jour (date du dernier changement significatif)
- [ ] Les `priority` reflètent l'importance relative (homepage = 1.0, articles = 0.7-0.9)
- [ ] Les `changefreq` sont réalistes (blog = weekly, pages statiques = monthly)
- [ ] Le sitemap fait moins de 50MB et contient moins de 50 000 URLs

### 7.3 Template canonical

```html
<!-- Page statique -->
<link rel="canonical" href="https://khepraexperts.com/services/conseil-strategique/" />

<!-- Article blog -->
<link rel="canonical" href="https://khepraexperts.com/blog/risques-financiers-pme-afrique-francophone-bceao-cobac/" />

<!-- Homepage -->
<link rel="canonical" href="https://khepraexperts.com/" />
```

**Règles :**
- Toujours HTTPS
- Toujours avec slash final (sauf homepage)
- Toujours l'URL absolue complète
- Jamais de paramètres d'URL
- Jamais de fragment d'ancre (`#section`)

### 7.4 Template meta robots

```html
<!-- Page publique indexable -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

<!-- Page privée (admin, dashboard) -->
<meta name="robots" content="noindex, nofollow" />

<!-- Page avec pagination -->
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="next" href="https://khepraexperts.com/blog/page/2/" />
```

### 7.5 Stratégie hreflang

```html
<!-- Site monolingue FR — pas de version EN distincte -->
<link rel="alternate" hreflang="fr" href="https://khepraexperts.com/page/" />
<link rel="alternate" hreflang="x-default" href="https://khepraexperts.com/page/" />

<!-- NOTE : Ne JAMAIS ajouter hreflang="en" qui pointerait vers la même URL.
     Google Search Console considère cela comme une erreur. -->
```

### 7.6 Structure blog SEO idéale

```
/blog/                          → Page listing (index, follow)
/blog/page/2/                   → Pagination (index, follow) + rel="next/prev"
/blog/slug-article/              → Article (index, follow)
/blog/categorie/conformite/     → Filtrage par catégorie (noindex, follow)
/blog/auteur/simda-essoyomewe/  → Page auteur (index, follow)
```

### 7.7 Architecture EEAT/YMYL

```
Page d'accueil
├── Schema.org Organization (KHEPRA EXPERTS)
├── Schema.org LocalBusiness (Lomé, Togo)
├── Liens vers pages auteur
└── Témoignages clients vérifiés

Page Équipe (/equipe/)
├── Schema.org Person pour chaque expert
├── Biographie détaillée
├── Certifications et credentials
├── Liens LinkedIn (sameAs)
└── Publications et conférences

Articles de blog
├── Schema.org BlogPosting
├── Schema.org Person (auteur)
├── Liens vers sources officielles (BCEAO, etc.)
├── Date de publication et modification
└── Citation de textes réglementaires exacts
```

### 7.8 Checklist Core Web Vitals

| Métrique | Objectif | Action |
|----------|----------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Préload hero image, optimiser WebP, CDN |
| **INP** (Interaction to Next Paint) | < 200ms | Réduire le bundle JS, code splitting |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Dimensions fixes sur images, pas de FOIT/FOUT |
| **TTFB** (Time to First Byte) | < 600ms | CDN Edge, compression, cache |
| **FCP** (First Contentful Paint) | < 1.8s | Inline critical CSS, préconnect ressources |

### 7.9 Checklist SEO technique complète

**Indexation :**
- [ ] Sitemap XML soumis dans GSC
- [ ] robots.txt accessible et valide
- [ ] Canonicals uniques sur toutes les pages
- [ ] noindex sur les pages privées uniquement
- [ ] Pas de contenu dupliqué réel

**Crawl :**
- [ ] Liens internes vers URLs canoniques uniquement
- [ ] Pas de chaînes de redirection > 2 sauts
- [ ] Pas de liens cassés (404)
- [ ] Pagination avec next/prev (ou infinite scroll propre)

**Contenu :**
- [ ] Balise H1 unique par page
- [ ] Meta title < 60 caractères
- [ ] Meta description 120-160 caractères
- [ ] Schema.org complet et valide
- [ ] Open Graph et Twitter Card

**Performance :**
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle JS < 200KB (gzipped)
- [ ] Images WebP avec srcset

**Sécurité :**
- [ ] HTTPS partout
- [ ] HSTS activé
- [ ] CSP configuré
- [ ] X-Frame-Options: SAMEORIGIN

---

## ANNEXE — RÉSUMÉ DES CORRECTIONS APPLIQUÉES

| # | Fichier | Correction | Date |
|---|---------|------------|------|
| 1 | `SeoHead.tsx` | Fonction `normalizeCanonical()` — HTTPS + slash final | 2026-05-14 |
| 2 | `sitemap.xml` | Domaine corrigé + slash final sur 130+ URLs | 2026-05-14 |
| 3 | `robots.txt` | URL sitemap corrigée | 2026-05-14 |
| 4 | `_redirects` | 85+ redirections 301 sans-slash → avec-slash | 2026-05-14 |
| 5 | `hreflang.ts` | Slash final sur toutes les URLs | 2026-05-14 |
| 6 | `sitemapGenerator.ts` | Domaine corrigé + slash final | 2026-05-14 |
| 7 | `index.html` | Hreflang `en` invalide supprimé | 2026-05-14 |
| 8 | `blog/page.tsx` | Liens internes → slugs sémantiques | 2026-05-14 |
| 9 | `ArticleDetail.tsx` | ShareButtons URL canonique + liens slash | 2026-05-14 |
| 10 | `NotFound.tsx` | Navigation vers URLs canoniques | 2026-05-14 |

---

*Document généré par audit SEO technique automatisé — KHEPRA EXPERTS.*