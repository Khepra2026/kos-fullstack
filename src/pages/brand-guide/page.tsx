import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import { brandConfig, brandColors, brandIdentity, brandContact, brandEmail, brandTypography } from '@/config/brandConfig';

export default function BrandGuidePage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'colors' | 'typography' | 'email' | 'application'>('identity');

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <SeoHead
          title="Brand Guide — KHEPRA EXPERTS"
          description="Guide de marque institutionnel KHEPRA EXPERTS"
          canonicalPath="/brand-guide"
          noIndex={true}
        />
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-sm border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#c19a6b] to-[#a47c48] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-palette-line text-3xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Brand Guide</h1>
            <p className="text-slate-600">Guide de marque institutionnel KHEPRA</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const pw = fd.get('password') as string;
              if (pw === 'khepra2025') {
                handleLogin();
              }
            }}
            className="space-y-4"
          >
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white py-3 rounded-lg font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-all whitespace-nowrap cursor-pointer"
            >
              Accéder au Brand Guide
            </button>
          </form>
        </div>
      </div>
    );
  }

  const colorKeys = Object.keys(brandColors) as Array<keyof typeof brandColors>;

  return (
    <>
      <SeoHead
        title="Brand Guide — KHEPRA EXPERTS"
        description="Guide de marque institutionnel KHEPRA EXPERTS"
        canonicalPath="/brand-guide"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  type="button"
                  title="Retour au Dashboard"
                >
                  <i className="ri-arrow-left-line text-lg w-5 h-5 flex items-center justify-center"></i>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                    <i className="ri-palette-line text-white w-4 h-4 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">Brand Guide</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Charte Graphique</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('dashboard_auth');
                  setIsAuthenticated(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                type="button"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
              {(
                [
                  ['identity', 'ri-fingerprint-line', 'Identité'],
                  ['colors', 'ri-palette-line', 'Couleurs'],
                  ['typography', 'ri-font-size', 'Typographie'],
                  ['email', 'ri-mail-line', 'Email'],
                  ['application', 'ri-brush-line', 'Application'],
                ] as const
              ).map(([key, icon, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  type="button"
                >
                  <i className={`${icon} w-4 h-4 flex items-center justify-center`}></i>
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* IDENTITY */}
              {activeTab === 'identity' && (
                <div className="space-y-6">
                  <div className="text-center py-8 bg-gradient-to-br from-[#c19a6b] to-[#a47c48] rounded-xl">
                    <h2 className="text-4xl font-extrabold text-white tracking-widest uppercase mb-2">
                      {brandIdentity.name}
                    </h2>
                    <p className="text-white/80 text-sm tracking-wider uppercase">{brandIdentity.tagline}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Identité Légale</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">SIREN</span><span className="font-medium">{brandIdentity.siren}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">SIRET</span><span className="font-medium">{brandIdentity.siret}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Code APE</span><span className="font-medium">{brandIdentity.ape}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Fondée</span><span className="font-medium">{brandIdentity.founded}</span></div>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Coordonnées</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">Adresse</span><span className="font-medium">{brandContact.address}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Ville</span><span className="font-medium">{brandContact.postalCode} {brandContact.city}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Pays</span><span className="font-medium">{brandContact.country}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Téléphone</span><span className="font-medium">{brandContact.phoneFormatted}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Signatures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1">Email from</p>
                        <p className="font-medium">{brandEmail.fromName} &lt;{brandEmail.fromEmail}&gt;</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Reply-To</p>
                        <p className="font-medium">{brandEmail.replyTo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COLORS */}
              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {colorKeys.map((key) => {
                      const value = brandColors[key];
                      return (
                        <div key={key} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                          <div className="h-20 w-full" style={{ backgroundColor: value }}></div>
                          <div className="p-3">
                            <p className="text-xs font-bold text-slate-900 uppercase">{key}</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">{value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Palette Réglementaire</h3>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-2 rounded-full text-xs font-medium bg-[#c19a6b] text-white">Primary #c19a6b</div>
                      <div className="px-3 py-2 rounded-full text-xs font-medium bg-[#1a1a1a] text-white">Secondary #1a1a1a</div>
                      <div className="px-3 py-2 rounded-full text-xs font-medium bg-[#0d9488] text-white">Accent #0d9488</div>
                      <div className="px-3 py-2 rounded-full text-xs font-medium bg-[#faf9f7] text-[#1a1a1a] border border-slate-200">Background #faf9f7</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TYPOGRAPHY */}
              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Familles de polices</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Heading</p>
                        <p className="text-2xl font-bold" style={{ fontFamily: brandTypography.heading }}>
                          KHEPRA EXPERTS
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{brandTypography.heading}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Body</p>
                        <p className="text-base" style={{ fontFamily: brandTypography.body }}>
                          Notre approche s'appuie sur les standards internationaux (BCEAO, COBAC, IFC, GRI, ISSB) et les meilleures pratiques du marché.
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{brandTypography.body}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Label / Boutons</p>
                        <p className="text-sm font-medium" style={{ fontFamily: brandTypography.label }}>
                          RÉSERVER UN CRÉNEAU
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{brandTypography.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Hiérarchie</h3>
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-slate-900">H1 — Titre principal</h1>
                        <h2 className="text-2xl font-bold text-slate-900">H2 — Section</h2>
                        <h3 className="text-xl font-semibold text-slate-900">H3 — Sous-section</h3>
                        <h4 className="text-lg font-medium text-slate-900">H4 — Module</h4>
                        <p className="text-base text-slate-700">Body — Paragraphe standard</p>
                        <p className="text-sm text-slate-600">Small — Métadonnées et légendes</p>
                        <p className="text-xs text-slate-500">XS — Tags et labels</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Styles spéciaux</h3>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-[#c19a6b]">Texte Primary (doré)</p>
                        <p className="text-sm font-bold text-[#1a1a1a]">Texte Secondary (noir)</p>
                        <p className="text-sm font-bold text-[#0d9488]">Texte Accent (teal)</p>
                        <p className="text-sm text-slate-400">Texte Muted</p>
                        <p className="text-sm text-[#dc2626] font-medium">Texte Danger</p>
                        <p className="text-sm text-[#059669] font-medium">Texte Success</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EMAIL */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <div className="bg-[#1a1a1a] text-center py-6 border-b-4 border-[#c19a6b]">
                      <div className="text-2xl font-extrabold text-[#c19a6b] tracking-widest uppercase">KHEPRA EXPERTS</div>
                      <div className="text-xs text-slate-400 tracking-wider mt-1 uppercase">Investment & ESG Advisory Boutique</div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-700 mb-4">
                        Bonjour <strong>&#123;&#123;full_name&#125;&#125;</strong>,
                      </p>
                      <p className="text-sm text-slate-700 mb-4">
                        Notre équipe aimerait savoir si vous avez eu le temps de consulter nos ressources. Votre projet de <strong>&#123;&#123;organization&#125;&#125;</strong> mérite une attention particulière.
                      </p>
                      <div className="bg-[#f5f3f0] border-l-4 border-[#c19a6b] rounded-r-lg p-4 my-4">
                        <p className="text-sm font-semibold text-[#1a1a1a] mb-2">Planifiez un appel stratégique de 15 minutes</p>
                        <button className="px-4 py-2 bg-[#c19a6b] text-white text-sm font-medium rounded-md">Réserver un créneau</button>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-200">
                        <p className="text-sm font-bold text-[#1a1a1a]">KHEPRA EXPERTS</p>
                        <p className="text-xs text-slate-500 mt-1">Investment & ESG Advisory Boutique</p>
                        <p className="text-xs text-slate-500 mt-1">+33 1 83 64 05 75 | contact@khepraexperts.com</p>
                        <p className="text-xs text-slate-500 mt-1">https://khepraexperts.com</p>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] text-center py-4">
                      <p className="text-sm font-bold text-[#c19a6b]">KHEPRA EXPERTS</p>
                      <p className="text-xs text-slate-400 mt-1">26 Rue de la Comète, 75007 Paris — SIREN 882 567 432</p>
                      <p className="text-xs text-slate-500 mt-1">contact@khepraexperts.com | +33 1 83 64 05 75 | khepraexperts.com</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Règles Email</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        Header noir avec bordure dorée de 3px
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        Logo KHEPRA EXPERTS en majuscules, tracking 3px, couleur dorée
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        CTA Calendly en bloc doré avec bordure gauche
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        Signature avec coordonnées complètes
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        Footer noir avec mentions légales RGPD
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="ri-check-line text-[#c19a6b] w-4 h-4 flex items-center justify-center mt-0.5"></i>
                        From : KHEPRA EXPERTS &lt;contact@khepra-experts.com&gt;
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* APPLICATION */}
              {activeTab === 'application' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Boutons</h3>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium whitespace-nowrap">
                          Primary Button
                        </button>
                        <button className="w-full px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-medium whitespace-nowrap">
                          Secondary Button
                        </button>
                        <button className="w-full px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] rounded-lg text-sm font-medium whitespace-nowrap">
                          Outline Button
                        </button>
                        <button className="w-full px-4 py-2 bg-white text-[#c19a6b] border border-[#c19a6b] rounded-lg text-sm font-medium whitespace-nowrap">
                          Ghost Button
                        </button>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 mb-3">Badges</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#c19a6b] text-white">Primary</span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1a1a] text-white">Secondary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#059669] text-white">Success</span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#dc2626] text-white">Danger</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df]">Light</span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5f3f0] text-[#1a1a1a] border border-[#e5e3df]">Neutral</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Cartes et Surfaces</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#faf9f7] rounded-lg p-4 border border-[#e5e3df]">
                        <p className="text-xs text-slate-500 mb-1">Background</p>
                        <p className="text-sm font-medium">#faf9f7</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-[#e5e3df]">
                        <p className="text-xs text-slate-500 mb-1">Surface</p>
                        <p className="text-sm font-medium">#ffffff</p>
                      </div>
                      <div className="bg-[#f5f3f0] rounded-lg p-4 border border-[#e5e3df]">
                        <p className="text-xs text-slate-500 mb-1">Surface Alt</p>
                        <p className="text-sm font-medium">#f5f3f0</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Formulaires</h3>
                    <div className="space-y-3 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Input</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent"
                          placeholder="Placeholder..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent bg-white">
                          <option>Option 1</option>
                          <option>Option 2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Textarea</label>
                        <textarea
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent"
                          rows={3}
                          placeholder="Message..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}