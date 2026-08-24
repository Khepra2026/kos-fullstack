import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  regtechCountries,
  regtechSectors,
  revenueRanges,
  employeeRanges,
  creationYearRanges,
  diagnosticQuestions,
} from '@/mocks/regtechDiagnostic';

const formSchema = z.object({
  country: z.string().min(1, 'Pays requis'),
  sector: z.string().min(1, 'Secteur requis'),
  revenue: z.string().min(1, 'CA requis'),
  employees: z.string().min(1, 'Effectif requis'),
  creationYear: z.string().min(1, 'Année requise'),
  paymentDelay: z.string().optional(),
  cashReserve: z.string().optional(),
  creditAccess: z.string().optional(),
  financingBarrier: z.string().optional(),
  fundraising: z.string().optional(),
  rccmStatus: z.string().optional(),
  taxDeclarations: z.string().optional(),
  socialDeclarations: z.string().optional(),
  financialStatements: z.string().optional(),
  board: z.string().optional(),
  rbe: z.string().optional(),
  lbft: z.string().optional(),
  contracts: z.string().optional(),
  irritants: z.array(z.string()).max(3, 'Maximum 3 irritants').optional(),
  lastAdminInteraction: z.string().optional(),
  adminComplexity: z.number().min(1).max(5).optional(),
  fiscalControl: z.string().optional(),
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  companyName: z.string().optional(),
  contactConsent: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_SECTIONS = 5;

interface QuestionnaireFormProps {
  onComplete: (
    countryCode: string,
    sectorCode: string,
    revenueValue: string,
    employeeValue: string,
    creationYearValue: string,
    formData: Record<string, string | string[]>,
  ) => void;
}

export default function QuestionnaireForm({ onComplete }: QuestionnaireFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [irritantsSelected, setIrritantsSelected] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      sector: '',
      revenue: '',
      employees: '',
      creationYear: '',
      paymentDelay: '',
      cashReserve: '',
      creditAccess: '',
      financingBarrier: '',
      fundraising: '',
      rccmStatus: '',
      taxDeclarations: '',
      socialDeclarations: '',
      financialStatements: '',
      board: '',
      rbe: '',
      lbft: '',
      contracts: '',
      irritants: [],
      lastAdminInteraction: '',
      adminComplexity: 3,
      fiscalControl: '',
      email: '',
      companyName: '',
      contactConsent: '',
    },
  });

  const sections = diagnosticQuestions;

  const sectionKeys = ['section1', 'section2', 'section3', 'section4', 'section5'] as const;
  const currentSectionKey = sectionKeys[currentSection];
  const currentSectionData = sections[currentSectionKey];

  const sectionFieldMap: Record<string, string[]> = {
    section1: ['country', 'sector', 'revenue', 'employees', 'creationYear'],
    section2: ['paymentDelay', 'cashReserve', 'creditAccess', 'financingBarrier', 'fundraising'],
    section3: ['rccmStatus', 'taxDeclarations', 'socialDeclarations', 'financialStatements', 'board', 'rbe', 'lbft', 'contracts'],
    section4: ['irritants', 'lastAdminInteraction', 'adminComplexity', 'fiscalControl'],
    section5: ['email', 'companyName', 'contactConsent'],
  };

  const handleNext = async () => {
    const fieldsToValidate = sectionFieldMap[currentSectionKey];
    const valid = await trigger(fieldsToValidate as (keyof FormData)[]);
    if (valid && currentSection < TOTAL_SECTIONS - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = (data: FormData) => {
    onComplete(
      data.country,
      data.sector,
      data.revenue,
      data.employees,
      data.creationYear,
      data as unknown as Record<string, string | string[]>,
    );
  };

  const handleIrritantToggle = (value: string) => {
    const current = [...irritantsSelected];
    if (current.includes(value)) {
      const updated = current.filter(v => v !== value);
      setIrritantsSelected(updated);
      setValue('irritants', updated);
    } else if (current.length < 3) {
      const updated = [...current, value];
      setIrritantsSelected(updated);
      setValue('irritants', updated);
    }
  };

  const complexityLabels: Record<number, string> = {
    1: 'Très simple',
    2: 'Plutôt simple',
    3: 'Modérée',
    4: 'Complexe',
    5: 'Bloquante',
  };

  const isLastSection = currentSection === TOTAL_SECTIONS - 1;

  const renderField = (question: typeof currentSectionData.questions[0]) => {
    const fieldId = question.id as keyof FormData;
    const error = errors[fieldId];

    if (question.type === 'select') {
      return (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-foreground-800">
            {question.label}
            {sectionKeys.indexOf(currentSectionKey) === 0 && question.id !== 'creationYear' && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          <select
            {...register(fieldId)}
            className={`w-full px-4 py-3 rounded-lg border bg-background-50 text-foreground-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer ${
              error ? 'border-red-400' : 'border-background-300'
            }`}
          >
            <option value="">Sélectionnez...</option>
            {question.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-xs">{error.message?.toString()}</p>}
        </div>
      );
    }

    if (question.type === 'checkbox') {
      return (
        <div key={question.id} className="space-y-3">
          <label className="block text-sm font-medium text-foreground-800">
            {question.label}
            <span className="text-foreground-500 font-normal ml-2">(max 3)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options?.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleIrritantToggle(opt.value)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm text-left transition-all cursor-pointer whitespace-nowrap ${
                  irritantsSelected.includes(opt.value)
                    ? 'border-accent-500 bg-accent-100 text-accent-900'
                    : 'border-background-300 bg-background-50 text-foreground-700 hover:border-accent-300'
                } ${irritantsSelected.length >= 3 && !irritantsSelected.includes(opt.value) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={irritantsSelected.length >= 3 && !irritantsSelected.includes(opt.value)}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  irritantsSelected.includes(opt.value) ? 'border-accent-500 bg-accent-500' : 'border-background-400'
                }`}>
                  {irritantsSelected.includes(opt.value) && (
                    <i className="ri-check-line text-xs text-background-50" />
                  )}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-foreground-500 text-xs">{irritantsSelected.length}/3 sélectionnés</p>
        </div>
      );
    }

    if (question.type === 'scale') {
      const currentValue = watch('adminComplexity') || 3;
      return (
        <div key={question.id} className="space-y-4">
          <label className="block text-sm font-medium text-foreground-800">
            {question.label}
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setValue('adminComplexity', value)}
                className={`flex-1 py-4 rounded-lg border-2 text-center transition-all cursor-pointer ${
                  currentValue === value
                    ? 'border-accent-500 bg-accent-100 text-accent-900 font-semibold'
                    : 'border-background-300 bg-background-50 text-foreground-600 hover:border-accent-300'
                }`}
              >
                <span className="text-2xl font-bold block">{value}</span>
                <span className="text-xs mt-1 block">{complexityLabels[value]}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (question.type === 'text') {
      const isEmail = question.validation === 'email';
      return (
        <div key={question.id} className="space-y-2">
          <label className="block text-sm font-medium text-foreground-800">
            {question.label}
            {isEmail && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={isEmail ? 'email' : 'text'}
            {...register(fieldId)}
            className={`w-full px-4 py-3 rounded-lg border bg-background-50 text-foreground-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              error ? 'border-red-400' : 'border-background-300'
            }`}
            placeholder={isEmail ? 'votre@email.com' : 'Nom de votre entreprise'}
          />
          {error && <p className="text-red-500 text-xs">{error.message?.toString()}</p>}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-900 rounded-full text-sm font-medium mb-4">
          <i className="ri-shield-check-line" />
          Diagnostic Réglementaire Gratuit
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 mb-3">
          Score de Maturité Conformité PME
        </h1>
        <p className="text-foreground-600 max-w-xl mx-auto">
          Évaluez votre conformité réglementaire en 5 minutes. Benchmark sectoriel, checklist personnalisée, modèles de documents.
        </p>
      </div>

      {/* Step Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < currentSection
                      ? 'bg-primary-500 text-background-50'
                      : i === currentSection
                        ? 'bg-primary-500 text-background-50 ring-4 ring-primary-200'
                        : 'bg-background-200 text-foreground-400'
                  }`}
                >
                  {i < currentSection ? (
                    <i className="ri-check-line" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs mt-2 hidden md:block ${
                  i <= currentSection ? 'text-foreground-700 font-medium' : 'text-foreground-400'
                }`}>
                  {['Profil', 'Trésorerie', 'Conformité', 'Barrières', 'Contact'][i]}
                </span>
              </div>
              {i < TOTAL_SECTIONS - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  i < currentSection ? 'bg-primary-500' : 'bg-background-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-background-50 border border-background-200 rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
            Section {currentSection + 1}/{TOTAL_SECTIONS}
          </span>
          <h2 className="text-xl font-bold text-foreground-900 mt-1">
            {currentSectionData.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentSectionData.questions.map(q => renderField(q))}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-background-200">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentSection === 0}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                currentSection === 0
                  ? 'text-foreground-300 cursor-not-allowed'
                  : 'text-foreground-700 bg-background-100 hover:bg-background-200'
              }`}
            >
              <i className="ri-arrow-left-line mr-2" />
              Précédent
            </button>

            {isLastSection ? (
              <button
                type="submit"
                className="px-8 py-3 bg-primary-500 text-background-50 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                Obtenir mon score
                <i className="ri-arrow-right-line" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-primary-500 text-background-50 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                Suivant
                <i className="ri-arrow-right-line" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Trust indicators */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-foreground-500 text-xs">
        <span className="flex items-center gap-1">
          <i className="ri-lock-line" /> Données chiffrées
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-time-line" /> ~5 minutes
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-global-line" /> 15 pays couverts
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-building-line" /> +127 hubs réglementaires
        </span>
      </div>
    </div>
  );
}



