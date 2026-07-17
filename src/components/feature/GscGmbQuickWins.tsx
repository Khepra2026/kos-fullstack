import { useState } from 'react';
import { Link } from 'react-router-dom';
import { avisClients } from '@/mocks/avisClients';

interface GscGmbQuickWinsProps {
  compact?: boolean;
}

const GSC_STEPS = [
  {
    id: 1,
    title: "Aller sur Search Console",
    action: "Ouvrir Google Search Console",
    url: "https://search.google.com/search-console",
    icon: "ri-external-link-line",
    detail: "Se connecter avec le compte Google propriétaire du domaine",
    status: "ready",
  },
  {
    id: 2,
    title: "Vérifier le domaine khepraexperts.com",
    action: "Ajouter comme propriété",
    icon: "ri-global-line",
    detail: "Choisir \"Propriété de domaine\" > entrer khepraexperts.com > Vérifier via DNS ou Fichier HTML",
    status: "ready",
  },
  {
    id: 3,
    title: "Meta tag déjà présente",
    action: "Vérification auto",
    icon: "ri-code-line",
    detail: "La meta tag google-site-verification est déjà dans index.html — vérification en un clic",
    code: "CS2aP1AtCjtnyo6B5vSrliyc_tt64j6AfMhpfogjzko",
    status: "done",
  },
  {
    id: 4,
    title: "Soumettre le sitemap",
    action: "Soumettre sitemap.xml",
    icon: "ri-map-2-line",
    detail: "Dans GSC > Sitemaps > Ajouter : https://khepraexperts.com/sitemap.xml",
    status: "ready",
  },

  {
    id: 5,
    title: "Suivre les métriques SEO",
    action: "Activer les rapports",
    icon: "ri-bar-chart-2-line",
    detail: "Core Web Vitals, Couverture, Performances > 3 à 7 jours pour les premières données",
    status: "ready",
  },
];

const GMB_STEPS = [
  {
    id: 1,
    title: "Créer/Réclamer le profil",
    action: "Ouvrir Google Business Profile",
    url: "https://business.google.com",
    icon: "ri-google-fill",
    detail: "Rechercher 'KHEPRA EXPERTS Lomé' — si le profil existe, le réclamer. Sinon, créer un nouveau.",
    status: "todo",
  },
  {
    id: 2,
    title: "Compléter les informations",
    action: "Informations essentielles",
    icon: "ri-file-edit-line",
    detail: "Nom: KHEPRA EXPERTS | Téléphone: +228 93 98 49 09 | Email: contact@khepraexperts.com | Adresse: LOGOGOMÈ, Rue Carrefour AISED, Lomé",
    status: "todo",
  },
  {
    id: 3,
    title: "Ajouter les horaires",
    action: "Lundi–Vendredi 08h–18h",
    icon: "ri-time-line",
    detail: "Horaires standards + option 'Heure de fermeture prolongée pour les urgences'",
    status: "todo",
  },
  {
    id: 4,
    title: "Recueillir 10 avis Google",
    action: "Demander aux clients",
    icon: "ri-star-line",
    detail: `${avisClients.stats.totalClients} clients peuvent laisser un avis. Envoyer le lien direct GMB par WhatsApp/Email à vos 10 meilleurs clients.`,
    status: "todo",
  },
  {
    id: 5,
    title: "Publier des posts GMB",
    action: "1 post / semaine",
    icon: "ri-calendar-event-line",
    detail: "Partager les nouvelles réglementaires, études de cas, événements KBR — référencement local boosté",
    status: "todo",
  },
];

export default function GscGmbQuickWins({ compact = false }: GscGmbQuickWinsProps) {
  const [activeTab, setActiveTab] = useState<'gsc' | 'gmb'>('gsc');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (compact) {
    return (
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
            <i className="ri-google-fill text-lg" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground-950 font-heading">GSC &amp; GMB Status</h3>
            <p className="text-xs text-foreground-500 font-body">Google Search Console &amp; My Business</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-radar-line text-amber-500 text-xs" />
              <span className="text-xs font-semibold text-amber-800 font-body">GSC</span>
            </div>
            <div className="text-[10px] text-amber-700 font-body">Meta tag ✅ prête — Connexion à effectuer</div>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-google-fill text-red-500 text-xs" />
              <span className="text-xs font-semibold text-red-800 font-body">GMB</span>
            </div>
            <div className="text-[10px] text-red-700 font-body">Profil à créer / réclamer</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-primary-50 border border-primary-100 hover:bg-primary-100 transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold text-primary-700 font-body">Connecter GSC →</span>
            <i className="ri-external-link-line text-xs text-primary-500" />
          </a>
          <a
            href="https://business.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent-50 border border-accent-100 hover:bg-accent-100 transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold text-accent-700 font-body">Créer profil GMB →</span>
            <i className="ri-external-link-line text-xs text-accent-500" />
          </a>
          <Link
            to="/avis-clients"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary-50 border border-secondary-100 hover:bg-secondary-100 transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold text-secondary-700 font-body">Voir les 10 avis →</span>
            <i className="ri-star-fill text-xs text-amber-400" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-background-200/70 bg-background-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
            <i className="ri-google-fill text-lg" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground-950 font-heading">Quick Wins — GSC &amp; GMB</h2>
            <p className="text-xs text-foreground-500 font-body">J+2 : Connecter Google Search Console · J+5 : Google My Business actif avec 10 avis</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 font-body">En cours — J+2 / J+5</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-background-50 rounded-lg border border-background-200/70 w-fit">
          <button
            onClick={() => setActiveTab('gsc')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'gsc' ? 'bg-white text-foreground-950' : 'text-foreground-500 hover:text-foreground-700'
            }`}
          >
            <i className="ri-radar-line mr-1" />
            Google Search Console
          </button>
          <button
            onClick={() => setActiveTab('gmb')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'gmb' ? 'bg-white text-foreground-950' : 'text-foreground-500 hover:text-foreground-700'
            }`}
          >
            <i className="ri-google-fill mr-1" />
            Google My Business
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        {activeTab === 'gsc' && (
          <>
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-start gap-2">
                <i className="ri-checkbox-circle-fill text-emerald-600 mt-0.5" />
                <p className="text-xs text-emerald-800 font-body">
                  <strong>Bonne nouvelle :</strong> La meta tag de vérification GSC est <strong>déjà présente</strong> dans le code. Aucun déploiement nécessaire — il suffit de cliquer &quot;Vérifier&quot; dans GSC.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {GSC_STEPS.map(step => (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    step.status === 'done'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-background-50 border-background-200/70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-heading ${
                    step.status === 'done' ? 'bg-emerald-500 text-white' : 'bg-background-200 text-foreground-600'
                  }`}>
                    {step.status === 'done' ? <i className="ri-check-line" /> : step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-foreground-950 font-heading">{step.title}</h4>
                      {step.status === 'done' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 font-body">Déjà fait ✓</span>
                      )}
                    </div>
                    <p className="text-xs text-foreground-500 font-body mt-0.5">{step.detail}</p>
                    {step.code && (
                      <div className="mt-2 flex items-center gap-2">
                        <code className="text-[10px] bg-background-200 px-2 py-1 rounded font-mono text-foreground-700">{step.code}</code>
                        <button
                          onClick={() => handleCopy(step.code!)}
                          className="text-[10px] text-primary-500 hover:text-primary-600 cursor-pointer font-body whitespace-nowrap"
                        >
                          {copied ? 'Copié !' : 'Copier'}
                        </button>
                      </div>
                    )}
                  </div>
                  {step.url && (
                    <a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className={`${step.icon} mr-1`} />
                      {step.action}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-lg bg-background-100 border border-background-200/70">
              <h4 className="text-xs font-semibold text-foreground-700 font-heading mb-2">Impact attendu à J+7</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Mots-clés trackés', value: '~280 URLs', icon: 'ri-key-2-line' },
                  { label: 'Couverture index', value: '100%', icon: 'ri-google-line' },
                  { label: 'CWV monitoring', value: 'Actif', icon: 'ri-speed-line' },
                  { label: 'Impressions/jour', value: 'Visible', icon: 'ri-bar-chart-line' },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <i className={`${m.icon} text-primary-500 text-base mb-1`} />
                    <div className="text-sm font-bold text-foreground-950 font-heading">{m.value}</div>
                    <div className="text-[10px] text-foreground-500 font-body">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'gmb' && (
          <>
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-2">
                <i className="ri-information-line text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800 font-body">
                  <strong>Action requise :</strong> Créer ou réclamer le profil Google Business sur{' '}
                  <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                    business.google.com
                  </a>
                  . Le LocalBusiness Schema.org est déjà déployé — Google sera préparé dès la vérification.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {GMB_STEPS.map(step => (
                <div key={step.id} className="flex items-start gap-4 p-4 rounded-lg bg-background-50 border border-background-200/70">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-heading bg-background-200 text-foreground-600">
                    {step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground-950 font-heading">{step.title}</h4>
                    <p className="text-xs text-foreground-500 font-body mt-0.5">{step.detail}</p>
                  </div>
                  {step.url && (
                    <a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className={`${step.icon} mr-1`} />
                      {step.action}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Avis preview */}
            <div className="mt-4 p-4 rounded-lg bg-background-100 border border-background-200/70">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-foreground-700 font-heading">
                  Vos 10 avis clients sont prêts
                </h4>
                <Link
                  to="/avis-clients"
                  className="text-xs text-primary-500 hover:text-primary-600 font-body cursor-pointer"
                >
                  Voir tous les avis →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {avisClients.reviews.slice(0, 4).map(r => (
                  <div key={r.id} className="flex items-start gap-2 p-2.5 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary-700 font-heading">{r.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <i key={i} className="ri-star-fill text-amber-400 text-[10px]" />
                        ))}
                      </div>
                      <p className="text-[10px] text-foreground-600 font-body line-clamp-2">&ldquo;{r.body}&rdquo;</p>
                      <p className="text-[10px] text-foreground-400 font-body mt-0.5">{r.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <span className="text-[10px] text-foreground-400 font-body">
                  Score moyen : {avisClients.rating.average}/5 · {avisClients.rating.total} avis · NPS {avisClients.stats.nps}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}