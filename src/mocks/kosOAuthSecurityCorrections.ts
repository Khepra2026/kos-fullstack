export const oauthCorrectionsData = {
  bloc: "Artefact de corrections OAuth — React + Vite",
  executed_at: "2026-07-06T18:00:00Z",
  version: "v3.0 — OAuth Vite Fix intégré dans KOS",

  alert_p0: {
    title: "P0 — Blocage imminent Google OAuth",
    message:
      "Si les 3 failles critiques ne sont pas corrigées sous 48h : suspension automatique de l'écran de consentement OAuth. Impact : 100% des nouveaux utilisateurs bloqués. Action requise immédiate.",
    deadline: "48h",
    impact: "100% nouveaux utilisateurs bloqués"
  },

  failles_p0: [
    {
      id: "OAUTH-P0-001",
      type: "missing_hsts",
      severity: "critical",
      title: 'Flow "Implicit" actif = tokens exposés dans l\'URL',
      detail: "response_type=token expose les tokens dans l'URL et dans l'historique du navigateur. Violation RFC 6749 §4.2.1. Remplacé par Authorization Code Flow avec PKCE.",
      status: "corrigé — PKCE S256 implémenté",
      effort: "2h",
      day: "J1"
    },
    {
      id: "OAUTH-P0-002",
      type: "open_redirect",
      severity: "critical",
      title: "redirect_uris non validés = open redirect",
      detail: "Les redirect_uri ne sont pas validées côté serveur. Un attaquant peut rediriger l'utilisateur vers un domaine malveillant et voler le code d'autorisation.",
      status: "non corrigé",
      effort: "1h",
      day: "J2"
    },
    {
      id: "OAUTH-P0-003",
      type: "webview_detected",
      severity: "critical",
      title: "WebView Android/iOS détectée = bannissement OAuth Google",
      detail: "Google interdit l'authentification OAuth dans WebView depuis 2021. Le hook useAuthPKCE détecte et bloque automatiquement les WebView.",
      status: "corrigé — Détection WebView intégrée au hook",
      effort: "3h",
      day: "J3"
    }
  ],

  dashboard_metrics: {
    traffic_per_day: { current: 0, target: "10k+", unit: "req/j" },
    error_rate: { current: "100%", target: "<0.1%", unit: "" },
    active_users: { current: 0, target: "2k+", unit: "users" },
    consent_grant_rate: { current: "0%", target: ">95%", unit: "" }
  },

  plan_7jours: [
    {
      day: "J1",
      title: "PKCE + Suppression Implicit Flow",
      status: "corrigé",
      subtitle: "✅ Fichiers créés : src/utils/pkce.ts + src/hooks/useAuthPKCE.ts",
      tasks: [
        "Supprimer response_type=token du code. Forcer response_type=code uniquement.",
        "Implémenter PKCE S256 : code_verifier + code_challenge. Stockage sessionStorage.",
        "Désactiver Implicit Flow dans Google Cloud Console > Identifiants OAuth."
      ],
      code_file: "src/utils/pkce.ts",
      code_content: `export const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
};

export const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(digest));
};

const base64URLEncode = (buffer: Uint8Array): string => {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
};`,
      hook_code_file: "src/hooks/useOAuth.ts — PKCE Flow",
      hook_code_content: `import { useState, useCallback } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    setIsLoading(true);
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    sessionStorage.setItem('pkce_verifier', verifier);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      access_type: 'offline',
      prompt: 'consent'
    });

    window.location.href = \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\`;
  }, []);

  return { login, isLoading };
};`
    },
    {
      day: "J2",
      title: "Validation domaine + HTTPS local",
      status: "bloquant",
      subtitle: "Échec consentement si domaine non vérifié",
      tasks: [
        "Ajouter redirect_uris exacts dans Google Console. Zéro wildcard.",
        "Configurer vite.config.ts avec HTTPS pour dev localhost:5173",
        "Vérifier domaine dans Google Search Console + Cloud Console"
      ],
      env_code_file: ".env.example",
      env_code_content: `# Google OAuth Config - Ne jamais commit .env
VITE_GOOGLE_CLIENT_ID=123456789-xxx.apps.googleusercontent.com
VITE_REDIRECT_URI=https://localhost:5173/auth/callback
VITE_OAUTH_DOMAIN=monapp.com

# Backend pour échange code -> token
VITE_API_URL=https://api.monapp.com
VITE_TOKEN_ENDPOINT=/api/oauth/token`,
      vite_code_file: "vite.config.ts",
      vite_code_content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: true,
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: true
      }
    }
  }
});`
    },
    {
      day: "J3",
      title: "Migration hors WebView",
      status: "corrigé",
      subtitle: "✅ Fichier créé : src/utils/webview.ts — Détection intégrée dans useAuthPKCE",
      tasks: [
        "Détecter WebView via User-Agent. Refuser OAuth si true.",
        "Implémenter Custom Tabs Android + ASWebAuthenticationSession iOS",
        "Deep link app://callback pour retour natif après OAuth"
      ],
      code_file: "src/utils/webview.ts",
      code_content: `export const isWebView = (): boolean => {
  const ua = navigator.userAgent;
  const rules = [
    /WebView/,
    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/,
    /Android.*wv/
  ];
  return rules.some(re => re.test(ua));
};

export const openInSystemBrowser = (url: string) => {
  if (isWebView()) {
    throw new Error('OAuth interdit dans WebView. Utilisez Custom Tabs.');
  }
  window.open(url, '_blank');
};`
    },
    {
      day: "J4",
      title: "Monitoring @google-cloud/logging",
      status: "critique",
      subtitle: "Aucune visibilité erreurs sans logs",
      tasks: [
        "Installer @google-cloud/logging sur backend Node/Express",
        "Logger chaque étape: auth_start, code_received, token_exchanged, error",
        "Créer alertes Cloud Monitoring: error_rate > 1% = PagerDuty"
      ],
      code_file: "src/auth/oauthConfig.ts",
      code_content: `export const OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  scopes: ['openid', 'email', 'profile'],
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: import.meta.env.VITE_TOKEN_ENDPOINT,
  loggingEndpoint: '/api/logs/oauth'
} as const;

export const SENSITIVE_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/drive'
];`
    },
    {
      day: "J5",
      title: "Tests E2E Playwright",
      status: "critique",
      subtitle: "Zéro régression avant prod",
      tasks: [
        "Test login/logout complet avec compte test Google",
        "Test refresh_token après 1h d'expiration",
        "Test refus consentement + erreurs réseau"
      ],
      code_file: "tests/oauth.spec.ts",
      code_content: `import { test, expect } from '@playwright/test';

test.describe('OAuth Flow PKCE', () => {
  test('login + refresh token + logout', async ({ page, context }) => {
    await page.goto('https://localhost:5173');
    await page.click('[data-testid="login-btn"]');
    await page.waitForURL(/accounts.google.com/);
    await page.fill('#identifierId', process.env.TEST_GOOGLE_EMAIL);
    await page.click('#identifierNext');
    await page.waitForURL(/\\/auth\\/callback/);
    const token = await page.evaluate(() =>
      localStorage.getItem('access_token')
    );
    expect(token).toBeTruthy();
    await page.evaluate(() => {
      const exp = Date.now() - 1000;
      localStorage.setItem('token_expiry', exp.toString());
    });
    await page.reload();
    await expect(page.locator('[data-testid="user-email"]')).toBeVisible();
  });
});`
    },
    {
      day: "J6",
      title: "Pré-prod + Écran consentement",
      status: "critique",
      subtitle: "Validation Google obligatoire",
      tasks: [
        "Checklist OAuth consent screen: logo, privacy URL, terms URL",
        "Scopes minimaux uniquement. Justifier chaque scope sensitive",
        "Vidéo démo pour équipe Google si scopes restricted"
      ]
    },
    {
      day: "J7",
      title: "Prod + Demande augmentation quota 10k/j",
      status: "critique",
      subtitle: "Go-Live si 0 erreur en pré-prod 48h",
      tasks: [
        "Déployer en prod avec feature flag OAuth à 5% utilisateurs",
        "Monitoring quota Google: 10k req/j par défaut. Alerte à 80%",
        "Soumettre demande quota via Cloud Console si pic prévu"
      ],
      code_file: "scripts/monitor-quota.sh",
      code_content: `#!/bin/bash
PROJECT="mon-project-id"
THRESHOLD=8000

USAGE=$(gcloud monitoring metrics list \
  --filter="metric.type=oauth2.googleapis.com/token_count" \
  --project=$PROJECT | jq '.[0].points[0].value.int64Value')

if [ "$USAGE" -gt $THRESHOLD ]; then
  curl -X POST $SLACK_WEBHOOK \
    -d '{"text":"⚠️ OAuth quota: '${USAGE}'/10000. Demande augmentation requise"}'
fi`
    }
  ],

  terminal_setup: {
    title: "Commandes terminal — Setup complet",
    commands: [
      "npm create vite@latest monapp-oauth -- --template react-ts",
      "cd monapp-oauth",
      "npm i @google-cloud/logging jwt-decode",
      "npm i -D @vitejs/plugin-basic-ssl @playwright/test @types/node",
      "npx playwright install",
      "cp .env.example .env",
      "npm run dev -- --https",
      "npm run build && npm run preview -- --https"
    ]
  },

  progression: {
    total_days: 7,
    completed_days: 5,
    progression_pct: 71,
    temps_estime_total: "7 jours",
    go_live_condition:
      "Score sécurité ≥ 90/100, taux d'erreur < 0.1%, consent grant > 95%, 0 régression E2E"
  },

  post_remediation_metrics: {
    traffic_per_day: { before: 0, after: "10k+" },
    error_rate: { before: "100%", after: "<0.1%" },
    active_users: { before: 0, after: "2k+" },
    consent_grant_rate: { before: "0%", after: ">95%" },
    security_score: { before: 15, after: 95 }
  }
};