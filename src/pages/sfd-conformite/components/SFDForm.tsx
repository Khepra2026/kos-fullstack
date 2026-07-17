import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHoneypot, submitFormSecure } from '@/hooks/useHoneypot';
import { HoneypotField } from '@/components/feature/HoneypotField';

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  organisation: string;
  pays: string;
  typeStructure: string;
  nombreMembres: string;
  totalBilan: string;
  anciennete: string;
  domainesConformite: string[];
  urgence: string;
  situationActuelle: string;
  message: string;
}

export function SFDForm() {
  const { t } = useTranslation();
  const { inputRef, validateHoneypot, checkRateLimit } = useHoneypot('sfd-conformite');

  const DOMAINES = [
    { id: 'gouvernance', label: t('sfdConformite.form.formLabels.domaines.gouvernance'), icon: 'ri-government-line' },
    { id: 'prudentiel', label: t('sfdConformite.form.formLabels.domaines.prudentiel'), icon: 'ri-bar-chart-grouped-line' },
    { id: 'protection', label: t('sfdConformite.form.formLabels.domaines.protection'), icon: 'ri-user-heart-line' },
    { id: 'controle-interne', label: t('sfdConformite.form.formLabels.domaines.controle-interne'), icon: 'ri-shield-check-line' },
    { id: 'monnaie-electronique', label: t('sfdConformite.form.formLabels.domaines.monnaie-electronique'), icon: 'ri-smartphone-line' },
    { id: 'reporting', label: t('sfdConformite.form.formLabels.domaines.reporting'), icon: 'ri-file-chart-line' },
    { id: 'restructuration', label: t('sfdConformite.form.formLabels.domaines.restructuration'), icon: 'ri-merge-cells-horizontal' },
    { id: 'formation', label: t('sfdConformite.form.formLabels.domaines.formation'), icon: 'ri-graduation-cap-line' },
  ];

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
    pays: '',
    typeStructure: '',
    nombreMembres: '',
    totalBilan: '',
    anciennete: '',
    domainesConformite: [],
    urgence: '',
    situationActuelle: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [step, setStep] = useState(1);

  const toggleDomaine = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      domainesConformite: prev.domainesConformite.includes(id)
        ? prev.domainesConformite.filter((d) => d !== id)
        : [...prev.domainesConformite, id],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 500) return;

    if (validateHoneypot()) {
      setSubmitStatus('error');
      return;
    }
    if (checkRateLimit()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        payload[key] = value.join(', ');
      } else {
        payload[key] = value;
      }
    });

    const result = await submitFormSecure(payload, 'https://readdy.ai/api/form/d6morg85dsf7sr1n6e20', {
      honeypotValue: inputRef.current?.value || '',
      formId: 'sfd-conformite',
    });

    if (result.ok) {
      setSubmitStatus('success');
      setFormData({
        nom: '', email: '', telephone: '', organisation: '', pays: '',
        typeStructure: '', nombreMembres: '', totalBilan: '', anciennete: '',
        domainesConformite: [], urgence: '', situationActuelle: '', message: '',
      });
      setStep(1);
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const canGoNext = () => {
    if (step === 1) return formData.nom && formData.email && formData.organisation && formData.pays;
    if (step === 2) return formData.typeStructure && formData.nombreMembres;
    return true;
  };

  const stepLabels = [
    t('sfdConformite.form.formLabels.step1.title'),
    t('sfdConformite.form.formLabels.step2.title'),
    t('sfdConformite.form.formLabels.step3.title'),
  ];

  const situationOptions = [
    { value: 'non-conforme', label: t('sfdConformite.form.formLabels.situationOptions.nonConforme'), color: 'border-red-200 bg-red-50' },
    { value: 'partiellement', label: t('sfdConformite.form.formLabels.situationOptions.partiellement'), color: 'border-amber-200 bg-amber-50' },
    { value: 'en-cours', label: t('sfdConformite.form.formLabels.situationOptions.enCours'), color: 'border-gold-200 bg-gold-50' },
    { value: 'conforme', label: t('sfdConformite.form.formLabels.situationOptions.conforme'), color: 'border-emerald-200 bg-emerald-50' },
  ];

  const urgenceOptions = [
    { value: 'urgent', label: t('sfdConformite.form.formLabels.urgenceOptions.urgent'), color: 'bg-red-100 text-red-700 border-red-200' },
    { value: 'normal', label: t('sfdConformite.form.formLabels.urgenceOptions.normal'), color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { value: 'planifie', label: t('sfdConformite.form.formLabels.urgenceOptions.planifie'), color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  ];

  const leftBenefits = [
    { icon: 'ri-time-line', title: t('sfdConformite.form.formLabels.benefits.response48h.title'), desc: t('sfdConformite.form.formLabels.benefits.response48h.desc') },
    { icon: 'ri-lock-line', title: t('sfdConformite.form.formLabels.benefits.confidentiality.title'), desc: t('sfdConformite.form.formLabels.benefits.confidentiality.desc') },
    { icon: 'ri-gift-line', title: t('sfdConformite.form.formLabels.benefits.freeDiagnosis.title'), desc: t('sfdConformite.form.formLabels.benefits.freeDiagnosis.desc') },
    { icon: 'ri-map-pin-2-line', title: t('sfdConformite.form.formLabels.benefits.expertise.title'), desc: t('sfdConformite.form.formLabels.benefits.expertise.desc') },
  ];

  const countryOptions = [
    { value: 'benin', label: t('sfdConformite.form.fields.countries.benin') },
    { value: 'burkina-faso', label: t('sfdConformite.form.fields.countries.burkina-faso') },
    { value: 'cote-divoire', label: t('sfdConformite.form.fields.countries.cote-divoire') },
    { value: 'guinee-bissau', label: t('sfdConformite.form.fields.countries.guinee-bissau') },
    { value: 'mali', label: t('sfdConformite.form.fields.countries.mali') },
    { value: 'niger', label: t('sfdConformite.form.fields.countries.niger') },
    { value: 'senegal', label: t('sfdConformite.form.fields.countries.senegal') },
    { value: 'togo', label: t('sfdConformite.form.fields.countries.togo') },
    { value: 'autre', label: t('sfdConformite.form.fields.countries.autre') },
  ];

  const structureTypeOptions = [
    { value: 'mutuelle', label: t('sfdConformite.form.fields.structureTypes.mutuelle') },
    { value: 'cooperative', label: t('sfdConformite.form.fields.structureTypes.cooperative') },
    { value: 'association', label: t('sfdConformite.form.fields.structureTypes.association') },
    { value: 'societe-anonyme', label: t('sfdConformite.form.fields.structureTypes.societe-anonyme') },
    { value: 'reseau', label: t('sfdConformite.form.fields.structureTypes.reseau') },
    { value: 'autre', label: t('sfdConformite.form.fields.structureTypes.autre') },
  ];

  const membersCountOptions = [
    { value: 'moins-500', label: t('sfdConformite.form.fields.membersCounts.moins-500') },
    { value: '500-2000', label: t('sfdConformite.form.fields.membersCounts.500-2000') },
    { value: '2000-10000', label: t('sfdConformite.form.fields.membersCounts.2000-10000') },
    { value: '10000-50000', label: t('sfdConformite.form.fields.membersCounts.10000-50000') },
    { value: 'plus-50000', label: t('sfdConformite.form.fields.membersCounts.plus-50000') },
  ];

  const balanceSheetOptions = [
    { value: 'moins-100m', label: t('sfdConformite.form.fields.balanceSheets.moins-100m') },
    { value: '100m-500m', label: t('sfdConformite.form.fields.balanceSheets.100m-500m') },
    { value: '500m-2mrd', label: t('sfdConformite.form.fields.balanceSheets.500m-2mrd') },
    { value: 'plus-2mrd', label: t('sfdConformite.form.fields.balanceSheets.plus-2mrd') },
  ];

  const ageOptions = [
    { value: 'moins-3ans', label: t('sfdConformite.form.fields.ages.moins-3ans') },
    { value: '3-10ans', label: t('sfdConformite.form.fields.ages.3-10ans') },
    { value: '10-20ans', label: t('sfdConformite.form.fields.ages.10-20ans') },
    { value: 'plus-20ans', label: t('sfdConformite.form.fields.ages.plus-20ans') },
  ];

  return (
    <section id="sfd-form" className="py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Colonne gauche */}
          <div className="lg:col-span-2 text-white">
            <p className="text-sm font-semibold text-gold-400 uppercase tracking-widest mb-4">
              {t('sfdConformite.form.formLabels.leftColumn.badge')}
            </p>
            <h2 className="font-playfair text-4xl font-bold mb-6 leading-tight">
              {t('sfdConformite.form.formLabels.leftColumn.title', { highlight: '' })}
              <span className="text-gold-400">{t('sfdConformite.form.formLabels.leftColumn.titleHighlight')}</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              {t('sfdConformite.form.formLabels.leftColumn.subtitle')}
            </p>

            <div className="space-y-5 mb-10">
              {leftBenefits.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0 mt-0.5">
                    <i className={`${item.icon} text-gold-400 text-lg`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-white/60 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Témoignage */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <i key={s} className="ri-star-fill text-gold-400 text-sm"></i>
                ))}
              </div>
              <p className="text-white/80 text-sm italic leading-relaxed mb-4">
                {t('sfdConformite.form.formLabels.testimonial.quote')}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-gold-500/30 rounded-full">
                  <i className="ri-user-line text-gold-400"></i>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {t('sfdConformite.form.formLabels.testimonial.author')}
                  </p>
                  <p className="text-white/50 text-xs">
                    {t('sfdConformite.form.formLabels.testimonial.role')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">

              {/* Indicateur d'étapes */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                      step === s ? 'bg-gold-500 text-white shadow-md' :
                      step > s ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step > s ? <i className="ri-check-line text-sm"></i> : s}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${step >= s ? 'text-brand-900' : 'text-gray-400'}`}>
                        {stepLabels[s - 1]}
                      </p>
                    </div>
                    {s < 3 && <div className={`h-px flex-1 mx-1 ${step > s ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>}
                  </div>
                ))}
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-6">
                    <i className="ri-checkbox-circle-fill text-4xl text-emerald-500"></i>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-brand-900 mb-3">
                    {t('sfdConformite.form.formLabels.success.title')}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                    {t('sfdConformite.form.formLabels.success.message')}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 text-gold-600 hover:text-gold-700 text-sm font-medium cursor-pointer underline underline-offset-2"
                  >
                    {t('sfdConformite.form.formLabels.success.cta')}
                  </button>
                </div>
              ) : (
                <form id="sfd-conformite-form" data-readdy-form onSubmit={handleSubmit} className="relative">
                  <HoneypotField inputRef={inputRef} />

                  {/* Étape 1 */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-brand-900 mb-1">
                          {t('sfdConformite.form.formLabels.step1.title')}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                          {t('sfdConformite.form.formLabels.step1.subtitle')}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.fullName')}
                          </label>
                          <input
                            type="text" name="nom" required
                            value={formData.nom}
                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            placeholder={t('sfdConformite.form.formLabels.labels.fullNamePlaceholder')}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.email')}
                          </label>
                          <input
                            type="email" name="email" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="votre@email.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.phone')}
                          </label>
                          <input
                            type="tel" name="telephone"
                            value={formData.telephone}
                            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                            placeholder={t('sfdConformite.form.formLabels.labels.phonePlaceholder')}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.country')}
                          </label>
                          <select
                            name="pays" required
                            value={formData.pays}
                            onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                          >
                            <option value="">{t('sfdConformite.form.formLabels.labels.countryPlaceholder')}</option>
                            {countryOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('sfdConformite.form.formLabels.labels.institution')}
                        </label>
                        <input
                          type="text" name="organisation" required
                          value={formData.organisation}
                          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                          placeholder={t('sfdConformite.form.formLabels.labels.institutionPlaceholder')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Étape 2 */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-brand-900 mb-1">
                          {t('sfdConformite.form.formLabels.step2.title')}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                          {t('sfdConformite.form.formLabels.step2.subtitle')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('sfdConformite.form.formLabels.labels.type')}
                        </label>
                        <select
                          name="typeStructure" required
                          value={formData.typeStructure}
                          onChange={(e) => setFormData({ ...formData, typeStructure: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                        >
                          <option value="">{t('sfdConformite.form.formLabels.labels.typePlaceholder')}</option>
                          {structureTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.members')}
                          </label>
                          <select
                            name="nombreMembres" required
                            value={formData.nombreMembres}
                            onChange={(e) => setFormData({ ...formData, nombreMembres: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                          >
                            <option value="">{t('sfdConformite.form.formLabels.labels.membersPlaceholder')}</option>
                            {membersCountOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {t('sfdConformite.form.formLabels.labels.balance')}
                          </label>
                          <select
                            name="totalBilan"
                            value={formData.totalBilan}
                            onChange={(e) => setFormData({ ...formData, totalBilan: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                          >
                            <option value="">{t('sfdConformite.form.formLabels.labels.balancePlaceholder')}</option>
                            {balanceSheetOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('sfdConformite.form.formLabels.labels.age')}
                        </label>
                        <select
                          name="anciennete"
                          value={formData.anciennete}
                          onChange={(e) => setFormData({ ...formData, anciennete: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all cursor-pointer"
                        >
                          <option value="">{t('sfdConformite.form.formLabels.labels.agePlaceholder')}</option>
                          {ageOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t('sfdConformite.form.formLabels.labels.complianceStatus')}
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {situationOptions.map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                formData.situationActuelle === opt.value ? opt.color + ' ring-2 ring-gold-400' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio" name="situationActuelle"
                                value={opt.value}
                                checked={formData.situationActuelle === opt.value}
                                onChange={(e) => setFormData({ ...formData, situationActuelle: e.target.value })}
                                className="accent-gold-500"
                              />
                              <span className="text-sm text-gray-700">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 3 */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-brand-900 mb-1">
                          {t('sfdConformite.form.formLabels.step3.title')}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                          {t('sfdConformite.form.formLabels.step3.subtitle')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t('sfdConformite.form.formLabels.labels.domaines')}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {DOMAINES.map((d) => (
                            <label
                              key={d.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                formData.domainesConformite.includes(d.id)
                                  ? 'border-gold-400 bg-gold-50 ring-1 ring-gold-300'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="checkbox" name="domainesConformite"
                                value={d.id}
                                checked={formData.domainesConformite.includes(d.id)}
                                onChange={() => toggleDomaine(d.id)}
                                className="accent-gold-500"
                              />
                              <i className={`${d.icon} text-gold-500 text-base`}></i>
                              <span className="text-sm text-gray-700">{d.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('sfdConformite.form.formLabels.labels.urgence')}
                        </label>
                        <div className="flex gap-3 flex-wrap">
                          {urgenceOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, urgence: opt.value })}
                              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                                formData.urgence === opt.value
                                  ? opt.color + ' ring-2 ring-offset-1 ring-gold-400'
                                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                              }`}
                              dangerouslySetInnerHTML={{ __html: opt.label }}
                            />
                          ))}
                        </div>
                        <input type="hidden" name="urgence" value={formData.urgence} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('sfdConformite.form.formLabels.labels.message')}
                        </label>
                        <textarea
                          name="message" rows={4} maxLength={500}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('sfdConformite.form.formLabels.labels.messagePlaceholder')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none text-sm transition-all resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length}/500</p>
                      </div>

                      {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                          <i className="ri-error-warning-fill text-lg"></i>
                          {t('sfdConformite.form.formLabels.error')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-brand-900 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-arrow-left-line"></i>
                        {t('sfdConformite.form.formLabels.navigation.prev')}
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        disabled={!canGoNext()}
                        className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-7 py-3 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-medium disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                      >
                        {t('sfdConformite.form.formLabels.navigation.next')}
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-7 py-3 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                      >
                        {isSubmitting ? (
                          <><i className="ri-loader-4-line animate-spin"></i> {t('sfdConformite.form.formLabels.navigation.sending')}</>
                        ) : (
                          <><i className="ri-send-plane-line"></i> {t('sfdConformite.form.formLabels.navigation.submit')}</>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}