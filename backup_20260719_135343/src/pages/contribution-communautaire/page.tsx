import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/pages/home/components/Navigation';
import Footer from '@/pages/home/components/Footer';
import TopBanner from '@/pages/home/components/TopBanner';
import Breadcrumb from '@/components/feature/Breadcrumb';
import SeoHead from '@/components/feature/SeoHead';
import { useToast } from '@/components/base/Toast';

const LANGUAGES = [
  { code: 'sw', nameFr: 'Kiswahili (NMT + Communauté)', nameEn: 'Kiswahili (NMT + Community)', native: 'Kiswahili', speakers: '100M+', type: 'nmt' },
  { code: 'ha', nameFr: 'Hausa (NMT + Communauté)', nameEn: 'Hausa (NMT + Community)', native: 'Hausa', speakers: '70M+', type: 'nmt' },
  { code: 'ig', nameFr: 'Igbo (NMT + Communauté)', nameEn: 'Igbo (NMT + Community)', native: 'Igbo', speakers: '40M+', type: 'nmt' },
  { code: 'am', nameFr: 'አማርኛ / Amharique (NMT + Communauté)', nameEn: 'አማርኛ / Amharic (NMT + Community)', native: 'አማርኛ', speakers: '35M+', type: 'nmt' },
  { code: 'wo', nameFr: 'Wolof (Sénégal — Communauté)', nameEn: 'Wolof (Senegal — Community)', native: 'Wolof', speakers: '10M+', type: 'nmt' },
  { code: 'ln', nameFr: 'Lingála (RDC/Congo — Communauté)', nameEn: 'Lingála (DRC/Congo — Community)', native: 'Lingála', speakers: '40M+', type: 'nmt' },
  { code: 'mos', nameFr: 'Mòoré (Burkina Faso)', nameEn: 'Mòoré (Burkina Faso)', native: 'Mòoré', speakers: '8M', type: 'community' },
  { code: 'ewo', nameFr: 'Ewondo (Cameroun)', nameEn: 'Ewondo (Cameroon)', native: 'Ewondo', speakers: '2M', type: 'community' },
  { code: 'dua', nameFr: 'Duálá (Cameroun)', nameEn: 'Duálá (Cameroon)', native: 'Duálá', speakers: '2M', type: 'community' },
  { code: 'fmp', nameFr: 'Fè\'éfě\'è / Nufi (Cameroun)', nameEn: 'Fè\'éfě\'è / Nufi (Cameroon)', native: 'Fè\'éfě\'è', speakers: '400K', type: 'community' },
];

export default function ContributionCommunautairePage() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const honeypot = formData.get('phone_alt') as string;
    if (honeypot && honeypot.trim() !== '') {
      setSubmitted(true);
      return;
    }
    formData.delete('phone_alt');

    fetch('https://readdy.ai/api/form/d96mlu7pg5pqhofcuqmg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    }).then(async (res) => {
      const text = await res.text();
      let parsed: any = {};
      try { parsed = JSON.parse(text); } catch (_) { /* raw response */ }
      if (res.ok && parsed?.code === 'OK') {
        setSubmitted(true);
        showToast(isEn ? 'Thank you! Your contribution has been received.' : 'Merci ! Votre contribution a bien été reçue.', 'success');
        form.reset();
      } else {
        const msg = parsed?.meta?.message || parsed?.message || text || (isEn ? 'Submission failed. Please try again.' : 'Échec de l\'envoi. Veuillez réessayer.');
        setFormError(msg);
        showToast(msg, 'error');
      }
    }).catch(() => {
      setFormError(isEn ? 'Network error. Please try again.' : 'Erreur réseau. Veuillez réessayer.');
      showToast(isEn ? 'Network error.' : 'Erreur réseau.', 'error');
    });
  };

  return (
    <>
      <SeoHead
        title={isEn ? 'Community Translation Contributions — Help KHEPRA EXPERTS in African Languages' : 'Contribution Communautaire — Aidez KHEPRA EXPERTS en Langues Africaines'}
        description={isEn ? 'Native speakers: help us improve translations into Mòoré, Ewondo, Duálá, Fe\'efe\'e and other African languages. Your corrections make KHEPRA EXPERTS more accessible across Africa.' : 'Locuteurs natifs : aidez-nous à améliorer les traductions en Mòoré, Ewondo, Duálá, Fe\'efe\'e et autres langues africaines. Vos corrections rendent KHEPRA EXPERTS plus accessible à travers l\'Afrique.'}
        keywords="traduction communautaire langues africaines, correction traduction Moore, traduction Ewondo, traduction Douala, traduction Fe'efe'e, contribution linguistique Afrique"
        canonicalPath="/contribution-communautaire"
        ogType="website"
        ogLocale={isEn ? 'en_US' : 'fr_FR'}
      />

      <TopBanner />
      <Navigation />

      <main className="min-h-screen bg-background-50">
        <Breadcrumb items={[
          { label: isEn ? 'Home' : 'Accueil', path: '/' },
          { label: isEn ? 'Community Contribution' : 'Contribution Communautaire', path: '/contribution-communautaire/' },
        ]} />

        {/* HERO */}
        <section className="relative bg-foreground-950 text-white overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{isEn ? 'Community Program — 10 Languages' : 'Programme Communautaire — 10 Langues'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                {isEn ? 'Help Us Bring KHEPRA EXPERTS to Every African Language' : 'Aidez-nous à rendre KHEPRA EXPERTS accessible dans toutes les langues africaines'}
              </h1>
              <p className="text-sm text-foreground-400 leading-relaxed max-w-2xl">
                {isEn ? 'Our community-powered translation program is live in 10 African languages: Swahili, Hausa, Igbo, Amharic, Wolof, Lingála, Mòoré, Ewondo, Duálá, and Fe\'éfě\'è. As a native speaker, your corrections directly improve the experience for millions of potential users across Africa. Every suggestion counts.' : 'Notre programme de traduction communautaire est actif dans 10 langues africaines : Swahili, Hausa, Igbo, Amharique, Wolof, Lingála, Mòoré, Ewondo, Duálá et Fe\'éfě\'è. En tant que locuteur natif, vos corrections améliorent directement l\'expérience de millions d\'utilisateurs potentiels à travers l\'Afrique. Chaque suggestion compte.'}
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <h2 className="text-lg font-bold font-heading text-foreground-950 mb-6">{isEn ? 'How It Works' : 'Comment ça marche'}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: 'ri-eye-line', titleFr: '1. Repérez', titleEn: '1. Spot', descFr: 'Naviguez sur khepraexperts.com dans votre langue. Repérez les phrases qui méritent une correction ou une amélioration.', descEn: 'Browse khepraexperts.com in your language. Spot phrases that could use a correction or improvement.' },
              { icon: 'ri-edit-line', titleFr: '2. Suggérez', titleEn: '2. Suggest', descFr: 'Utilisez le formulaire ci-dessous pour soumettre la phrase actuelle et votre suggestion de correction.', descEn: 'Use the form below to submit the current phrase and your suggested correction.' },
              { icon: 'ri-check-double-line', titleFr: '3. Validez', titleEn: '3. Validate', descFr: 'Notre équipe révise votre suggestion et l\'intègre dans la prochaine mise à jour de la langue. Vous recevez un crédit dans le journal des contributeurs.', descEn: 'Our team reviews your suggestion and integrates it into the next language update. You receive credit in the contributor log.' },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-2xl border border-background-200/70 p-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100 mb-4">
                  <i className={`${step.icon} text-lg text-amber-600`} />
                </div>
                <h3 className="text-sm font-bold font-heading text-foreground-950 mb-2">{isEn ? step.titleEn : step.titleFr}</h3>
                <p className="text-xs text-foreground-600 leading-relaxed">{isEn ? step.descEn : step.descFr}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LANGUAGES TABLE */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
          <div className="bg-white rounded-2xl border border-background-200/70 overflow-hidden">
            <div className="px-6 py-4 border-b border-background-100">
              <h2 className="text-sm font-bold font-heading text-foreground-950">{isEn ? 'Active Languages' : 'Langues Actives'}</h2>
              <p className="text-xs text-foreground-500 mt-0.5">{isEn ? '10 African languages in production. All 10 are open to community review — your corrections make a difference.' : '10 langues africaines en production. Toutes les 10 sont ouvertes à la revue communautaire — vos corrections font la différence.'}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-background-100 bg-background-50/50">
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Language' : 'Langue'}</th>
                    <th className="text-left py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Native Name' : 'Nom Natif'}</th>
                    <th className="text-center py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Speakers' : 'Locuteurs'}</th>
                    <th className="text-center py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Type' : 'Type'}</th>
                    <th className="text-center py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Status' : 'Statut'}</th>
                    <th className="text-right py-3 px-4 font-bold text-foreground-500 uppercase tracking-wide">{isEn ? 'Action' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {LANGUAGES.map((lang) => {
                    const isCommunity = lang.type === 'community';
                    const isNmt = lang.type === 'nmt';
                    return (
                      <tr key={lang.code} className="border-b border-background-100 hover:bg-background-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-foreground-900">{isEn ? lang.nameEn : lang.nameFr}</span>
                        </td>
                        <td className="py-3 px-4 text-foreground-600">{lang.native}</td>
                        <td className="py-3 px-4 text-center text-foreground-600">{lang.speakers}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                            {isEn ? 'Community' : 'Communautaire'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isNmt ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {isNmt ? 'NMT + COMMUNITY' : 'BETA'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <a href={`/${lang.code}/`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold cursor-pointer whitespace-nowrap hover:bg-amber-400 transition-colors">
                            <i className="ri-eye-line" />{isEn ? 'Review' : 'Vérifier'}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CONTRIBUTION FORM */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10" id="form">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-background-200/70 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-100">
                  <i className="ri-edit-line text-xl text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-heading text-foreground-950">{isEn ? 'Submit a Correction' : 'Soumettre une Correction'}</h2>
                  <p className="text-xs text-foreground-500">{isEn ? 'Your contribution makes a real difference. Every suggestion is reviewed by our linguistic team.' : 'Votre contribution fait une vraie différence. Chaque suggestion est examinée par notre équipe linguistique.'}</p>
                </div>
              </div>

              {submitted ? (
                <div className="mt-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                    <i className="ri-check-line text-2xl text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold font-heading text-emerald-800 mb-2">{isEn ? 'Thank You! 🇧🇫🇨🇲' : 'Merci ! 🇧🇫🇨🇲'}</h3>
                  <p className="text-xs text-emerald-700 mb-4">{isEn ? 'Your contribution has been received. Our linguistic team will review it within 5 business days. Approved corrections will appear on the site in the next language update.' : 'Votre contribution a bien été reçue. Notre équipe linguistique l\'examinera sous 5 jours ouvrés. Les corrections approuvées apparaîtront sur le site lors de la prochaine mise à jour linguistique.'}</p>
                  <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-emerald-500 transition-colors">
                    {isEn ? 'Submit Another Correction' : 'Soumettre une autre correction'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-readdy-form="" className="mt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Your Name' : 'Votre Nom'} *</label>
                      <input type="text" name="name" required className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50" placeholder={isEn ? 'Your full name' : 'Votre nom complet'} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground-600 mb-1.5">Email *</label>
                      <input type="email" name="email" required className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50" placeholder="vous@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Language to Correct' : 'Langue à Corriger'} *</label>
                    <select name="language" required className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50 text-foreground-950 cursor-pointer">
                      <option value="">{isEn ? '— Select —' : '— Sélectionnez —'}</option>
                      {LANGUAGES.map(l => (
                        <option key={l.code} value={l.code}>{isEn ? l.nameEn : l.nameFr} ({l.native})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Page URL (optional)' : 'URL de la page (optionnel)'}</label>
                    <input type="text" name="page_url" className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50" placeholder="https://khepraexperts.com/mos/..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Current Text (as seen on site)' : 'Texte Actuel (tel qu\'affiché sur le site)'} *</label>
                    <textarea name="current_text" required rows={2} maxLength={500} className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50 resize-none" placeholder={isEn ? 'Copy-paste the current translation from the site...' : 'Copiez-collez la traduction actuelle du site...'} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Suggested Correction' : 'Correction Suggérée'} *</label>
                    <textarea name="suggested_correction" required rows={2} maxLength={500} className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50 resize-none" placeholder={isEn ? 'Write your corrected version here...' : 'Écrivez votre version corrigée ici...'} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground-600 mb-1.5">{isEn ? 'Explanation (optional)' : 'Explication (optionnel)'}</label>
                    <textarea name="explanation" rows={2} maxLength={500} className="w-full px-4 py-2.5 rounded-lg border border-background-200 text-sm outline-none focus:border-amber-500 bg-background-50 resize-none" placeholder={isEn ? 'Why is this correction necessary? (grammar, vocabulary, dialect...)' : 'Pourquoi cette correction est-elle nécessaire ? (grammaire, vocabulaire, dialecte...)'} />
                  </div>
                  <div className="relative overflow-hidden" style={{ height: '1px', width: '1px', position: 'absolute', left: '-9999px' }}>
                    <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
                  </div>

                  {formError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xs text-red-700">{formError}</p>
                    </div>
                  )}

                  <button type="submit" className="w-full px-6 py-3 rounded-full bg-amber-500 text-foreground-950 font-bold text-sm cursor-pointer whitespace-nowrap hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                    <i className="ri-send-plane-line" />
                    {isEn ? 'Submit My Correction' : 'Soumettre Ma Correction'}
                  </button>
                  <p className="text-[10px] text-foreground-400 text-center">
                    {isEn ? 'By submitting, you agree that your contribution becomes part of the KHEPRA EXPERTS translation corpus under CC-BY 4.0. We\'ll credit you in the contributor log.' : 'En soumettant, vous acceptez que votre contribution fasse partie du corpus de traduction KHEPRA EXPERTS sous licence CC-BY 4.0. Nous vous créditerons dans le journal des contributeurs.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* GITHUB LINK */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-foreground-950 rounded-2xl p-6 md:p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-foreground-800 mx-auto mb-4">
                  <i className="ri-github-fill text-2xl text-white" />
                </div>
                <h2 className="text-lg font-bold font-heading mb-2">{isEn ? 'Prefer GitHub?' : 'Vous préférez GitHub ?'}</h2>
                <p className="text-xs text-foreground-400 mb-5 max-w-md mx-auto">
                  {isEn ? 'You can also contribute directly via pull requests on our translation repository. All locale files are open for community review.' : 'Vous pouvez également contribuer directement via des pull requests sur notre dépôt de traduction. Tous les fichiers de locale sont ouverts à la revue communautaire.'}
                </p>
                <a href="https://github.com/khepraexperts/i18n-community" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground-700 text-white font-bold text-xs cursor-pointer whitespace-nowrap hover:bg-foreground-800 transition-colors">
                  <i className="ri-github-fill text-lg" />
                  github.com/khepraexperts/i18n-community
                </a>
                <p className="text-[10px] text-foreground-500 mt-3">
                  {isEn ? 'Files: src/i18n/local/{lang}/common.ts' : 'Fichiers : src/i18n/local/{langue}/common.ts'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



