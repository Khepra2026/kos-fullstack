import { useState } from 'react';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/kos/search',
    description: 'Recherche full-text dans le Knowledge Graph KOS avec ranking Big Four',
    auth: 'API Key (Header X-KOS-API-Key)',
    params: [
      { name: 'q', type: 'string', required: true, desc: 'Terme de recherche (ex: "ratio solvabilité BCEAO 11.5%")' },
      { name: 'lang', type: 'string', required: false, desc: 'Langue: fr ou en. Défaut: fr' },
      { name: 'limit', type: 'integer', required: false, desc: 'Nombre max de résultats. Défaut: 10, Max: 50' },
      { name: 'domain', type: 'string', required: false, desc: 'Filtre domaine: regulatory, methodology, case_study, kbr' },
    ],
    curl: `curl -X GET "https://api.kos.khepra-experts.com/api/v1/kos/search?q=ratio+solvabilit%C3%A9+BCEAO&lang=fr&limit=5" \\\n  -H "X-KOS-API-Key: YOUR_API_KEY"`,
    response: `{
  "results": [
    {
      "id": "kbr-042",
      "title": "Ratio Solvabilité BCEAO 2026 — Guide Conformité",
      "domain": "regulatory",
      "score": 0.97,
      "citation_indice": 98,
      "source": "BCEAO Article 14 — Instruction 008-2016",
      "url": "/kbr/ratio-solvabilite-bceao-2026",
      "highlights": ["Le ratio de solvabilité doit être ≥ 11.5% pour les banques systémiques..."]
    }
  ],
  "meta": {
    "total_results": 42,
    "query_time_ms": 85,
    "calls_remaining": 97,
    "quota_reset": "2026-07-04T00:00:00Z"
  }
}`
  },
  {
    method: 'GET',
    path: '/api/v1/kos/regulators',
    description: 'Liste des régulateurs scannés par kos-regulatory-monitor avec statut',
    auth: 'API Key (Header X-KOS-API-Key)',
    params: [
      { name: 'zone', type: 'string', required: false, desc: 'Zone: UEMOA, CEMAC, OHADA. Défaut: all' },
    ],
    curl: `curl -X GET "https://api.kos.khepra-experts.com/api/v1/kos/regulators?zone=UEMOA" \\\n  -H "X-KOS-API-Key: YOUR_API_KEY"`,
    response: `{
  "regulators": [
    { "id": "bceao", "name": "BCEAO", "zone": "UEMOA", "documents": 2847, "last_scan": "2026-07-03T06:00:00Z" }
  ]
}`
  },
  {
    method: 'GET',
    path: '/api/v1/kos/documents/{id}',
    description: 'Récupère un document réglementaire complet avec métadonnées et citations',
    auth: 'API Key (Header X-KOS-API-Key)',
    params: [
      { name: 'id', type: 'string', required: true, desc: 'ID du document (ex: bceao-instruction-008-2016)' },
      { name: 'format', type: 'string', required: false, desc: 'Format: json ou pdf. Défaut: json' },
    ],
    curl: `curl -X GET "https://api.kos.khepra-experts.com/api/v1/kos/documents/bceao-instruction-008-2016?format=json" \\\n  -H "X-KOS-API-Key: YOUR_API_KEY"`,
    response: `{
  "document": {
    "id": "bceao-instruction-008-2016",
    "title": "Instruction 008-2016 — Dispositif Prudentiel",
    "regulator": "BCEAO",
    "date": "2016-12-20",
    "articles": 45,
    "citations": 128
  }
}`
  }
];

const pricingTiers = [
  { name: 'Freemium', calls: '100/mois', price: '0 FCFA', features: ['3 endpoints', 'Rate limit 10/min', 'Community support', 'Documentation complète'], color: 'secondary', popular: false },
  { name: 'Starter', calls: '1 000/mois', price: '49 000 FCFA', features: ['Tous les endpoints', 'Rate limit 60/min', 'Email support', 'SLA 99.5%', 'Webhooks'], color: 'primary', popular: true },
  { name: 'Business', calls: '10 000/mois', price: '249 000 FCFA', features: ['Tous les endpoints', 'Rate limit 300/min', 'Priority support', 'SLA 99.9%', 'Webhooks + Batch API', 'Accès beta features'], color: 'accent', popular: false },
  { name: 'Enterprise', calls: 'Illimité', price: 'Sur devis', features: ['Tout Business +', 'Rate limit 1000/min', 'Dedicated support', 'SLA 99.95%', 'On-premise possible', 'Custom SLAs', 'Intégration dédiée'], color: 'foreground', popular: false },
];

const activeDevs = 2480;
const targetDevs = 10000;

export default function ApiKosSearchPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <>
      <SeoHead
        title="API KOS Search v1 — Documentation Swagger | Freemium 100 calls/mois"
        description="API publique KOS Search : recherchez dans le Knowledge Graph réglementaire KOS. Freemium 100 appels/mois. 3 endpoints : search, regulators, documents. 2 480 développeurs actifs."
        canonicalPath="/tools/api-kos-search"
      />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative bg-foreground-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground-950 via-foreground-900 to-emerald-950/20"></div>
          <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-semibold text-emerald-300">
                    <i className="ri-code-line"></i>KaaS Public API v1
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE — Freemium
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-heading font-bold mb-3">KOS Search API — Documentation</h1>
                <p className="text-gray-400 text-sm md:text-base max-w-xl mb-3">
                  Accédez au Knowledge Graph réglementaire KOS par API. 
                  Recherche full-text, ranking Big Four, citations vérifiées. 
                  <strong className="text-white"> 100 appels gratuits par mois.</strong>
                </p>
                <p className="text-xs text-gray-500">
                  Base URL: <code className="bg-white/10 px-2 py-0.5 rounded text-emerald-300 font-mono">https://api.kos.khepra-experts.com</code>
                </p>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="px-8 py-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="text-3xl font-heading font-bold text-emerald-400">{activeDevs.toLocaleString()}</div>
                  <div className="text-xs text-emerald-300 mt-1">Développeurs actifs</div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden" style={{ width: 160 }}>
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(activeDevs/targetDevs)*100}%` }}></div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Objectif: {targetDevs.toLocaleString()} devs UEMOA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Développeurs', value: '2 480', icon: 'ri-user-line' },
              { label: 'Actifs/mois', value: '1 842', icon: 'ri-user-star-line' },
              { label: 'Appels/mois', value: '84 500', icon: 'ri-exchange-line' },
              { label: 'Latence moy.', value: '85ms', icon: 'ri-timer-line' },
              { label: 'Uptime', value: '99.95%', icon: 'ri-check-double-line' },
            ].map((s, i) => (
              <div key={i} className="p-3 bg-background-50 rounded-xl border border-background-200/70 text-center">
                <i className={`${s.icon} text-foreground-400 text-sm mb-1 block`}></i>
                <div className="text-sm font-heading font-bold text-foreground-950">{s.value}</div>
                <div className="text-[10px] text-foreground-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* API Key Generator */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <div className="p-6 rounded-2xl bg-background-50 border border-background-200/70">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground-950 mb-1">Votre Clé API Freemium</h2>
                <p className="text-xs text-foreground-500">100 appels/mois gratuits. Rate limit: 10 appels/min. Auth: Header X-KOS-API-Key.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    readOnly
                    value="kos_fm_8a7b3c9d2e1f4567890abcdef123456"
                    className="text-xs font-mono bg-background-100 border border-background-200/70 rounded-lg px-4 py-2.5 pr-10 text-foreground-600 w-72"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-600 cursor-pointer"
                  >
                    <i className={`${showApiKey ? 'ri-eye-off-line' : 'ri-eye-line'} text-sm`}></i>
                  </button>
                </div>
                <button className="whitespace-nowrap px-4 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer">
                  <i className="ri-refresh-line mr-1"></i>Régénérer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints Documentation */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-terminal-box-line text-emerald-500"></i>
            Documentation des Endpoints
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2">
              {endpoints.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                    selectedEndpoint === idx
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    ep.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-accent-100 text-accent-700'
                  }`}>{ep.method}</span>
                  <div className="text-xs font-semibold text-foreground-950 mt-1.5 truncate">{ep.path}</div>
                  <div className="text-[10px] text-foreground-400 mt-0.5 line-clamp-1">{ep.description}</div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-3">
              <div className="p-6 bg-background-50 rounded-xl border border-background-200/70">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-2 py-1 rounded font-bold bg-emerald-100 text-emerald-700">{endpoints[selectedEndpoint].method}</span>
                  <code className="text-sm font-mono text-foreground-950 font-semibold">{endpoints[selectedEndpoint].path}</code>
                </div>
                <p className="text-sm text-foreground-600 mb-4">{endpoints[selectedEndpoint].description}</p>
                <p className="text-xs text-foreground-400 mb-4">Auth: <code className="bg-background-100 px-2 py-0.5 rounded text-foreground-600">{endpoints[selectedEndpoint].auth}</code></p>

                {/* Parameters */}
                <h4 className="text-sm font-semibold text-foreground-950 mb-2">Paramètres</h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-xs">
                    <thead className="bg-background-100">
                      <tr>
                        <th className="text-left p-2 font-semibold text-foreground-950">Nom</th>
                        <th className="text-left p-2 font-semibold text-foreground-950">Type</th>
                        <th className="text-center p-2 font-semibold text-foreground-950">Requis</th>
                        <th className="text-left p-2 font-semibold text-foreground-950">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints[selectedEndpoint].params.map((p, i) => (
                        <tr key={i} className="border-t border-background-200/70">
                          <td className="p-2"><code className="text-emerald-600 font-mono">{p.name}</code></td>
                          <td className="p-2 text-foreground-500">{p.type}</td>
                          <td className="p-2 text-center">{p.required ? <span className="text-red-500 font-bold">●</span> : <span className="text-foreground-400">○</span>}</td>
                          <td className="p-2 text-foreground-500">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* cURL Example */}
                <h4 className="text-sm font-semibold text-foreground-950 mb-2">Exemple cURL</h4>
                <div className="relative mb-4">
                  <pre className="bg-foreground-950 text-emerald-300 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">{endpoints[selectedEndpoint].curl}</pre>
                  <button className="absolute top-2 right-2 px-2 py-1 rounded bg-white/10 text-gray-400 text-[10px] hover:bg-white/20 transition-colors cursor-pointer">
                    <i className="ri-file-copy-line mr-1"></i>Copier
                  </button>
                </div>

                {/* Response */}
                <h4 className="text-sm font-semibold text-foreground-950 mb-2">Réponse</h4>
                <pre className="bg-background-100 text-foreground-700 text-xs p-4 rounded-lg overflow-x-auto font-mono leading-relaxed">{endpoints[selectedEndpoint].response}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4 text-center">Plans Tarifaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border-2 text-center relative ${
                  tier.popular
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-background-200/70 bg-background-50'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold whitespace-nowrap">
                    Populaire
                  </span>
                )}
                <h4 className="text-sm font-heading font-bold text-foreground-950 mb-1">{tier.name}</h4>
                <div className="text-2xl font-heading font-bold text-foreground-950 mb-1">{tier.price}</div>
                <div className="text-xs text-foreground-400 mb-3">{tier.calls}</div>
                <ul className="space-y-1.5 mb-4 text-left">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="text-xs text-foreground-600 flex items-start gap-1.5">
                      <i className="ri-check-line text-emerald-500 text-xs mt-0.5"></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`whitespace-nowrap w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  tier.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-background-100 text-foreground-600 hover:bg-background-200'
                }`}>
                  {tier.name === 'Enterprise' ? 'Nous Contacter' : 'Démarrer Gratuitement'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Effect */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-8">
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-rocket-line text-2xl text-emerald-600"></i>
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground-950 mb-2">Objectif J+90 : 10 000 développeurs UEMOA</h3>
            <p className="text-sm text-foreground-600 max-w-lg mx-auto">
              La KaaS Public API est le seul accès programmatique au Knowledge Graph réglementaire UEMOA.
              Ni EY ni Deloitte n'offrent cela. <strong>Avantage compétitif décisif.</strong>
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/tools/simulateur-solvabilite-uemoa" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-bank-line mr-1.5"></i>Simulateur Solvabilité
            </a>
            <a href="/tools/social-kit-solvabilite" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-linkedin-line mr-1.5"></i>Kit Social LinkedIn
            </a>
            <a href="/" className="whitespace-nowrap px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-sm text-foreground-600 hover:border-amber-200 transition-colors cursor-pointer">
              <i className="ri-home-line mr-1.5"></i>Accueil KOS
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}