# 📧 Système d'Email Automation - Séquence de Conversion

## Vue d'ensemble

Ce système automatise la séquence de conversion post-formulaire pour transformer les visiteurs en clients. Il comprend :

- **3 emails automatiques** espacés stratégiquement
- **Tracking complet** des leads et de leur engagement
- **Lead scoring** automatique
- **Intégration Supabase** pour la persistance des données

---

## 🗄️ Structure de la base de données

### Table `leads`

Stocke tous les prospects et leur statut dans le pipeline de conversion.

**Colonnes principales :**
- `id` : UUID unique
- `full_name`, `email`, `phone`, `organization` : Informations contact
- `subject`, `message` : Contexte de la demande
- `source_page`, `form_type` : Origine du lead
- `status` : Statut actuel (new, email_1_sent, email_2_sent, email_3_sent, meeting_scheduled, qualified, converted, lost)
- `lead_score` : Score calculé automatiquement (0-100)
- `assigned_expert` : Expert assigné (actuellement : Essoyomèwè SIMDA)
- `email_X_sent_at`, `email_X_opened` : Tracking des emails
- `calendar_link_clicked`, `meeting_scheduled_at` : Tracking engagement
- `utm_source`, `utm_medium`, `utm_campaign` : Attribution marketing

### Table `email_templates`

Stocke les templates d'emails de la séquence.

**Templates disponibles :**
1. `welcome_email_1` : Email immédiat de confirmation
2. `strategic_analysis_email_2` : Analyse stratégique (J+1)
3. `meeting_invitation_email_3` : Invitation urgente (J+3)

---

## 🔄 Séquence d'emails automatique

### Email 1 : Confirmation & Présentation (Immédiat)

**Objectif :** Rassurer et établir la relation

**Contenu :**
- Confirmation de réception de la demande
- Présentation de l'expert dédié (Essoyomèwè SIMDA)
- Proposition de diagnostic stratégique 30 min
- Lien calendrier pour réservation
- Annonce de l'email 2 à venir

**Variables :**
- `{{full_name}}` : Nom du prospect
- `{{subject}}` : Sujet de la demande
- `{{assigned_expert}}` : Nom de l'expert
- `{{calendar_link}}` : Lien Calendly

---

### Email 2 : Analyse Stratégique (J+1)

**Objectif :** Apporter de la valeur et démontrer l'expertise

**Contenu :**
- 3 insights stratégiques exclusifs :
  1. Évolution réglementaire BCEAO 2025
  2. Transformation digitale accélérée
  3. Opportunités de financement
- Contextualisation par secteur
- Rappel du diagnostic gratuit
- CTA : Planifier le diagnostic

**Variables :**
- `{{full_name}}` : Nom du prospect
- `{{organization}}` : Nom de l'organisation
- `{{sector}}` : Secteur d'activité
- `{{assigned_expert}}` : Nom de l'expert
- `{{calendar_link}}` : Lien Calendly

---

### Email 3 : Invitation Urgente (J+3)

**Objectif :** Créer l'urgence et convertir

**Contenu :**
- Constat : pas encore de réservation
- Urgence : créneaux limités cette semaine
- Étude de cas similaire avec résultats chiffrés :
  - +42% de rentabilité
  - -68% de risques
  - 100% de conformité
- Bénéfices du diagnostic (3 leviers, risques cachés, plan d'action)
- CTA fort : Réserver maintenant
- Lien de désinscription

**Variables :**
- `{{full_name}}` : Nom du prospect
- `{{organization}}` : Nom de l'organisation
- `{{assigned_expert}}` : Nom de l'expert
- `{{calendar_link}}` : Lien Calendly
- `{{unsubscribe_link}}` : Lien désinscription

---

## 🚀 Edge Functions déployées

### 1. `process-lead-submission`

**URL :** `https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/process-lead-submission`

**Rôle :** Point d'entrée pour tous les formulaires

**Workflow :**
1. Reçoit les données du formulaire
2. Calcule le lead score automatiquement
3. Insère le lead dans la table `leads`
4. Déclenche l'envoi de l'email 1
5. Retourne le `lead_id` au frontend

**Lead Scoring :**
- Organisation renseignée : +20 points
- Téléphone renseigné : +15 points
- Message > 50 caractères : +25 points
- Type formulaire "diagnostic" : +30 points
- Sujet spécifique : +10 points

---

### 2. `send-welcome-email`

**URL :** `https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/send-welcome-email`

**Rôle :** Envoie l'email 1 immédiatement

**Workflow :**
1. Récupère le template `welcome_email_1`
2. Remplace les variables par les données du lead
3. Envoie l'email via Resend API
4. Met à jour le statut du lead : `email_1_sent`
5. Enregistre `email_1_sent_at`

---

### 3. `send-scheduled-emails`

**URL :** `https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/send-scheduled-emails`

**Rôle :** Envoie les emails 2 et 3 selon le timing

**Workflow :**

**Pour l'email 2 (J+1) :**
1. Récupère les leads avec `status = email_1_sent`
2. Filtre ceux dont `email_1_sent_at` > 24h
3. Envoie l'email 2 avec insights stratégiques
4. Met à jour le statut : `email_2_sent`

**Pour l'email 3 (J+3) :**
1. Récupère les leads avec `status = email_2_sent`
2. Filtre ceux dont `email_2_sent_at` > 72h
3. Envoie l'email 3 avec urgence et cas client
4. Met à jour le statut : `email_3_sent`

**⚠️ Important :** Cette fonction doit être appelée par un cron job toutes les heures.

---

## 📊 Tracking et Analytics

### Événements Google Analytics

Le système track automatiquement :

1. **`lead_submission`** : Soumission d'un formulaire
   - Category : Lead
   - Label : Type de formulaire (diagnostic, contact, expert)
   - Value : Page source

2. **`diagnostic_request`** : Demande de diagnostic spécifique
   - Category : Lead
   - Label : Diagnostic Offer
   - Value : Page source

3. **`calendar_click`** : Clic sur le lien calendrier
   - Category : Conversion
   - Label : Diagnostic Booking

4. **`expert_modal_submit`** : Soumission via le bouton flottant
   - Category : Lead
   - Label : Expert Button Modal
   - Value : Page source

### Fonctions de tracking disponibles

```typescript
// Soumettre un lead
await submitLead({
  full_name: 'Jean Dupont',
  email: 'jean@example.com',
  phone: '+228 XX XX XX XX',
  organization: 'Ma Société',
  subject: 'Diagnostic stratégique',
  message: 'Je souhaite...',
  source_page: '/services',
  form_type: 'diagnostic'
});

// Tracker un clic calendrier
await trackCalendarClick('jean@example.com');

// Mettre à jour le statut d'un lead
await updateLeadStatus('jean@example.com', 'meeting_scheduled', 'RDV fixé le 15/06');

// Récupérer les statistiques
const stats = await getLeadStats();
// Retourne : total, new, email_1_sent, email_2_sent, email_3_sent, 
//            meeting_scheduled, qualified, converted, conversion_rate
```

---

## 🔧 Configuration requise

### Variables d'environnement Supabase

Les Edge Functions nécessitent :

```bash
# Automatiquement disponibles
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

# À configurer manuellement
RESEND_API_KEY  # Pour l'envoi d'emails
```

### Configuration Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Obtenir une API key
3. Vérifier le domaine `khepra-experts.com`
4. Ajouter la clé dans Supabase :

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Configuration du Cron Job

Pour automatiser l'envoi des emails 2 et 3, configurer un cron job qui appelle :

```bash
# Toutes les heures
curl -X POST \
  https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/send-scheduled-emails \
  -H "Authorization: Bearer VOTRE_SERVICE_ROLE_KEY"
```

**Options :**
- Supabase Cron (pg_cron)
- GitHub Actions
- Service externe (Zapier, Make, n8n)
- Serveur cron classique

---

## 📈 Métriques de conversion

### Pipeline de conversion

```
Visiteur → Lead (new) → Email 1 → Email 2 → Email 3 → Meeting → Qualified → Converted
```

### KPIs à suivre

1. **Taux de conversion formulaire** : Visiteurs → Leads
2. **Taux d'ouverture emails** : email_X_opened / email_X_sent
3. **Taux de clic calendrier** : calendar_link_clicked / leads
4. **Taux de réservation** : meeting_scheduled / leads
5. **Taux de qualification** : qualified / meeting_scheduled
6. **Taux de conversion final** : converted / leads

### Lead Score

- **0-30** : Lead froid (peu d'informations)
- **31-60** : Lead tiède (informations partielles)
- **61-80** : Lead chaud (informations complètes)
- **81-100** : Lead très chaud (diagnostic + organisation + message détaillé)

---

## 🎯 Intégration dans les formulaires

### Formulaire de contact (Contact.tsx)

```typescript
import { submitLead } from '../../../utils/leadTracking';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const result = await submitLead({
    full_name: formData.name,
    email: formData.email,
    phone: formData.phone,
    organization: formData.organization,
    subject: formData.subject,
    message: formData.message,
    source_page: window.location.pathname,
    form_type: 'contact'
  });
  
  if (result.success) {
    // Afficher message de succès
  }
};
```

### Bouton flottant expert (FloatingExpertButton.tsx)

Déjà intégré avec `form_type: 'expert'`

### Offre diagnostic (DiagnosticOffer.tsx)

Déjà intégré avec `form_type: 'diagnostic'` (lead score +30)

---

## 🔐 Sécurité et RLS

### Policies Row Level Security

**Table `leads` :**
- ✅ INSERT anonyme : Permet la soumission de formulaires
- ✅ SELECT authentifié : Admin uniquement
- ✅ UPDATE authentifié : Admin uniquement

**Table `email_templates` :**
- ✅ Accès complet authentifié : Admin uniquement

### Protection des données

- Les emails sont envoyés via Supabase Edge Functions (backend)
- Les clés API ne sont jamais exposées au frontend
- Les données sensibles sont chiffrées en base
- Conformité RGPD : lien de désinscription dans email 3

---

## 📝 Personnalisation des templates

### Modifier un template

1. Se connecter à Supabase Dashboard
2. Aller dans Table Editor → `email_templates`
3. Modifier le `html_body` ou `text_body`
4. Utiliser les variables : `{{variable_name}}`
5. Sauvegarder

### Variables disponibles par template

**Email 1 :**
- `{{full_name}}`
- `{{subject}}`
- `{{assigned_expert}}`
- `{{calendar_link}}`

**Email 2 :**
- `{{full_name}}`
- `{{organization}}`
- `{{sector}}`
- `{{assigned_expert}}`
- `{{calendar_link}}`

**Email 3 :**
- `{{full_name}}`
- `{{organization}}`
- `{{assigned_expert}}`
- `{{calendar_link}}`
- `{{unsubscribe_link}}`

---

## 🚨 Monitoring et alertes

### Logs à surveiller

1. **Erreurs d'envoi email** : Vérifier les logs Supabase Functions
2. **Leads bloqués** : Leads avec status ancien sans progression
3. **Taux d'ouverture faible** : < 20% → revoir les objets
4. **Taux de conversion faible** : < 5% → revoir le contenu

### Dashboard recommandé

Créer un dashboard avec :
- Nombre de leads par jour/semaine/mois
- Répartition par statut (funnel)
- Taux de conversion par étape
- Lead score moyen
- Sources les plus performantes (source_page)
- Temps moyen entre chaque étape

---

## 🎓 Prochaines étapes

### Améliorations possibles

1. **A/B Testing** : Tester différents objets et contenus
2. **Segmentation** : Adapter les emails selon le secteur
3. **Scoring avancé** : Intégrer le comportement sur le site
4. **Nurturing étendu** : Ajouter des emails 4, 5, 6 pour les non-convertis
5. **SMS** : Ajouter des rappels SMS pour les leads chauds
6. **Intégration CRM** : Synchroniser avec un CRM externe
7. **Webhooks** : Notifier Slack/Teams lors de nouveaux leads chauds

---

## 📞 Support

Pour toute question sur le système d'email automation :
- Consulter les logs Supabase Functions
- Vérifier la configuration RESEND_API_KEY
- Tester manuellement les Edge Functions
- Vérifier les RLS policies

**Fichiers clés :**
- `src/utils/leadTracking.ts` : Fonctions de tracking
- `supabase/functions/process-lead-submission/index.ts` : Traitement des leads
- `supabase/functions/send-welcome-email/index.ts` : Email 1
- `supabase/functions/send-scheduled-emails/index.ts` : Emails 2 et 3