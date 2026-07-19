import { useState } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

interface BulletinReglementaireNewsletterProps {
  context?: 'observatoire-cobac' | 'observatoire-sfd' | 'observatoire-reglementaire-africain';
}

export default function BulletinReglementaireNewsletter({ context }: BulletinReglementaireNewsletterProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', regulateur_interet: '' });
  const [honeypot, setHoneypot] = useState('');

  const regulateurs = [
    { value: '', label: 'Tous les régulateurs' },
    { value: 'bceao', label: 'BCEAO' },
    { value: 'cobac', label: 'COBAC' },
    { value: 'cima', label: 'CIMA' },
    { value: 'cosumaf', label: 'COSUMAF' },
    { value: 'crepmf', label: 'AMF-UEMOA' },
    { value: 'gafi', label: 'GAFI/GIABA/GABAC' },
    { value: 'banques-centrales', label: 'Banques Centrales Nationales' },
    { value: 'fintech-data', label: 'Autorités FinTech & Data' },
  ];

  const contextTitles: Record<string, string> = {
    'observatoire-cobac': 'Bulletin COBAC CEMAC',
    'observatoire-sfd': 'Bulletin SFD & Inclusion Financière',
    'observatoire-reglementaire-africain': 'Bulletin Réglementaire Africain',
  };

  const title = contextTitles[context || 'observatoire-reglementaire-africain'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) { setStatus('success'); return; }
    if (!formData.email || !formData.email.includes('@')) { setStatus('error'); return; }
    setStatus('submitting');
    try {
      const body = new URLSearchParams();
      body.append('email', formData.email);
      body.append('name', formData.name);
      body.append('organization', formData.organization);
      body.append('regulateur_interet', formData.regulateur_interet);
      await fetch('https://readdy.ai/api/form/d8ugsh0u8fvptuidpvfg', { method: 'POST', body });
      setStatus('success');
      setFormData({ name: '', email: '', organization: '', regulateur_interet: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <ScrollReveal>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 md:p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <i className="ri-radar-line text-lg"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground-950">{title}</h3>
                <span className="text-xs text-emerald-700 font-semibold">Newsletter de Veille Réglementaire</span>
              </div>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed mb-3">
              Recevez chaque mois notre bulletin de veille réglementaire panafricaine. Alertes prioritaires, analyses d'impact, nouveaux textes BCEAO/COBAC/CIMA et recommandations stratégiques pour votre institution.
            </p>
            <ul className="space-y-1.5 text-xs text-foreground-600">
              <li className="flex items-center gap-1.5"><i className="ri-check-line text-emerald-600"></i>43 alertes réglementaires mensuelles</li>
              <li className="flex items-center gap-1.5"><i className="ri-check-line text-emerald-600"></i>Analyses d'impact sectorielles</li>
              <li className="flex items-center gap-1.5"><i className="ri-check-line text-emerald-600"></i>Baromètres UEMOA & CEMAC</li>
              <li className="flex items-center gap-1.5"><i className="ri-check-line text-emerald-600"></i>Accès prioritaire aux rapports</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            {status === 'success' ? (
              <div className="text-center p-6 rounded-xl bg-emerald-100 border border-emerald-200">
                <i className="ri-mail-check-line text-3xl text-emerald-600 mb-3"></i>
                <h4 className="text-sm font-bold text-emerald-800 mb-1">Inscription confirmée !</h4>
                <p className="text-xs text-emerald-700">Vous recevrez le prochain bulletin réglementaire dans votre boîte mail. Merci de votre confiance.</p>
              </div>
            ) : (
              <form data-readdy-form="d8ugsh0u8fvptuidpvfg" onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-foreground-600 uppercase tracking-wider mb-1 block">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-background-200 text-sm bg-background-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="email@institution.com" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground-600 uppercase tracking-wider mb-1 block">Nom complet</label>
                    <input type="text" name="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-background-200 text-sm bg-background-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Prénom Nom" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-foreground-600 uppercase tracking-wider mb-1 block">Organisation</label>
                    <input type="text" name="organization" value={formData.organization} onChange={e => setFormData(p => ({ ...p, organization: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-background-200 text-sm bg-background-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Nom de l'institution" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-foreground-600 uppercase tracking-wider mb-1 block">Régulateur d'intérêt</label>
                    <select name="regulateur_interet" value={formData.regulateur_interet} onChange={e => setFormData(p => ({ ...p, regulateur_interet: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-background-200 text-sm bg-background-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent cursor-pointer">
                      {regulateurs.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                </div>
                <input type="text" name="website_alt" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 w-1 h-1" />
                <button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-foreground-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  <i className="ri-mail-send-line"></i>
                  {status === 'submitting' ? 'Inscription...' : 'S\'abonner au Bulletin'}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-red-600">Veuillez vérifier votre adresse email et réessayer.</p>
                )}
                <p className="text-[10px] text-foreground-400">En vous inscrivant, vous acceptez de recevoir notre newsletter. Désinscription à tout moment.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}



