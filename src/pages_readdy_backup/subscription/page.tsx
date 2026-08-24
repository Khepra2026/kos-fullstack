import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import {
  subscriptionPlan,
  creditUsage,
  paymentMethod,
  monthlyUsageHistory,
  invoiceHistory,
} from '@/mocks/subscriptionDashboard';

function generateInvoiceText(inv: { id: string; date: string; amount: number; status: string }) {
  const dateStr = new Date(inv.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  return [
    '═══════════════════════════════════════════',
    '           KHEPRA EXPERTS SARL U',
    '               FACTURE',
    '═══════════════════════════════════════════',
    '',
    `  Numéro       : ${inv.id}`,
    `  Date         : ${dateStr}`,
    `  Échéance     : ${dateStr}`,
    '',
    '───────────────────────────────────────────',
    '  Désignation                      Montant',
    '───────────────────────────────────────────',
    `  Abonnement Readdy — Plan Pro      ${inv.amount.toFixed(2)} €`,
    '',
    '───────────────────────────────────────────',
    `  Total HT                          ${inv.amount.toFixed(2)} €`,
    '',
    `  Statut        : ${inv.status.toUpperCase()}`,
    '',
    '═══════════════════════════════════════════',
    '  KHEPRA EXPERTS SARL U',
    '  RC: BF-OUA-2024-B-1234',
    '  IFU: 00123456Z',
    '  Email: facturation@khepra-experts.com',
    '═══════════════════════════════════════════',
  ].join('\n');
}

function CircularGauge({ percent, size = 200, strokeWidth = 14 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const getColor = (p: number) => {
    if (p < 50) return '#86BC25';
    if (p < 80) return '#e8c547';
    return '#dc9e5e';
  };

  const gaugeColor = getColor(percent);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90" shapeRendering="geometricPrecision">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(var(--background-200) / 1)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          shapeRendering="geometricPrecision"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl font-bold text-foreground-950">{percent}%</span>
        <span className="text-xs text-foreground-600 mt-1">consommés</span>
      </div>
    </div>
  );
}

function MiniBar({ value, max, color = '#86BC25', height = 8 }: { value: number; max: number; color?: string; height?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-background-200 rounded-full overflow-hidden" style={{ height }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
    </div>
  );
}

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [renewalConfirmed, setRenewalConfirmed] = useState(false);
  const [downloadedInvoices, setDownloadedInvoices] = useState<Set<string>>(new Set());

  const handleDownloadInvoice = useCallback((inv: { id: string; date: string; amount: number; status: string }) => {
    const content = generateInvoiceText(inv);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Facture_${inv.id}_KHEPRA.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedInvoices(prev => {
      const next = new Set(prev);
      next.add(inv.id);
      return next;
    });
  }, []);

  const usageProjectionColor = creditUsage.projectedPercent > 90 ? '#dc9e5e' : creditUsage.projectedPercent > 75 ? '#e8c547' : '#86BC25';

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen bg-background-50" style={{ paddingTop: '80px' }}>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background-950 to-background-900">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-px bg-primary-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">Mon Espace Client</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-500/20 text-primary-400">ACTIF</span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Plan <span className="text-primary-400">{subscriptionPlan.planName}</span>
                </h1>
                <p className="text-sm md:text-base text-foreground-300 max-w-lg" style={{ textAlign: 'justify' }}>
                  {subscriptionPlan.planLabel} · Depuis le {new Date(subscriptionPlan.since).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="inline-flex items-baseline gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/10">
                  <span className="text-2xl font-heading font-bold text-white">Sur devis</span>
                  <span className="text-sm text-foreground-400">confidentiel</span>
                </div>
                <p className="text-xs text-foreground-300 mt-2 max-w-[200px]">Aucun prix public. Chaque mission donne lieu à un devis sur mesure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ALERTE : PAS DE RENOUVELLEMENT AUTO ============ */}
        <section className="bg-accent-50 border-b border-accent-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-200 flex-shrink-0">
                <i className="ri-alert-line text-accent-700 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-accent-800">
                  Aucun renouvellement automatique n'est actif sur votre compte.
                </p>
                <p className="text-xs text-accent-600 mt-0.5">
                  Vous devez valider manuellement votre réabonnement avant le {new Date(subscriptionPlan.renewalDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} pour conserver votre plan et vos crédits.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-accent-100 text-accent-700 whitespace-nowrap">
                  <i className="ri-close-circle-line" />
                  Renouvellement auto : OFF
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CRÉDITS + DÉTAILS ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Colonne gauche : Jauge crédits */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-background-200/80 p-6 md:p-8 h-full flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6 self-start">
                  <i className="ri-flashlight-line text-primary-500 text-lg" />
                  <h2 className="font-heading text-lg font-bold text-foreground-950">Crédits consommés</h2>
                </div>
                <CircularGauge percent={creditUsage.usagePercent} size={200} />
                <div className="mt-6 text-center space-y-2 w-full">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-600">Utilisés</span>
                    <span className="font-bold text-foreground-950">{creditUsage.used.toLocaleString('fr-FR')}</span>
                  </div>
                  <MiniBar value={creditUsage.used} max={creditUsage.total} color="#86BC25" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-600">Restants</span>
                    <span className="font-bold text-primary-600">{creditUsage.remaining.toLocaleString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-600">Total</span>
                    <span className="font-semibold text-foreground-950">{creditUsage.total.toLocaleString('fr-FR')}</span>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-background-200 w-full space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground-500">Moyenne quotidienne</span>
                    <span className="font-semibold text-foreground-800">{creditUsage.dailyAverage} crédits/jour</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground-500">Projeté fin de cycle</span>
                    <span className="font-semibold" style={{ color: usageProjectionColor }}>{creditUsage.projectedUsage.toLocaleString('fr-FR')} crédits</span>
                  </div>
                  <MiniBar value={creditUsage.projectedUsage} max={creditUsage.total} color={usageProjectionColor} height={6} />
                  {creditUsage.projectedPercent > 90 && (
                    <div className="flex items-center gap-2 text-xs text-accent-700 bg-accent-50 rounded-lg p-2.5">
                      <i className="ri-error-warning-line flex-shrink-0" />
                      <span>Vous risquez d'atteindre la limite avant la fin du cycle. Pensez à anticiper.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne centrale : Détails abonnement */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-background-200/80 p-6 md:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <i className="ri-settings-3-line text-primary-500 text-lg" />
                  <h2 className="font-heading text-lg font-bold text-foreground-950">Détails du plan</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Plan actuel</span>
                    <span className="text-sm font-bold text-foreground-950 bg-primary-100 text-primary-700 px-2.5 py-1 rounded-lg">{subscriptionPlan.planName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Prochaine échéance</span>
                    <span className="text-sm font-semibold text-foreground-950">{new Date(subscriptionPlan.renewalDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Jours restants</span>
                    <span className="text-sm font-bold text-primary-600">{subscriptionPlan.daysUntilRenewal} jours</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Prix</span>
                    <span className="text-sm font-bold text-foreground-950">Sur devis confidentiel</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Client depuis</span>
                    <span className="text-sm font-semibold text-foreground-800">{new Date(subscriptionPlan.since).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-background-100">
                    <span className="text-sm text-foreground-600">Crédits / mois</span>
                    <span className="text-sm font-bold text-foreground-950">{creditUsage.total.toLocaleString('fr-FR')}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-400 mb-3">Inclus dans votre plan</h3>
                  <ul className="space-y-2">
                    {subscriptionPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-foreground-700">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 flex-shrink-0">
                          <i className="ri-check-line text-xs text-primary-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5 border-2 border-foreground-900 text-foreground-950 hover:bg-foreground-900 hover:text-white"
                >
                  <i className="ri-mail-send-line" />
                  Nous contacter pour un devis
                </button>
                <p className="text-[11px] text-foreground-400 mt-2 text-center">
                  Tous nos services sont sur devis confidentiel. Contactez-nous pour une proposition sur mesure.
                </p>
              </div>
            </div>

            {/* Colonne droite : Paiement + Réabonnement */}
            <div className="lg:col-span-1 space-y-6">
              {/* Facturation — Sur Devis */}
              <div className="bg-white rounded-2xl border border-background-200/80 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <i className="ri-bank-line text-primary-500 text-lg" />
                  <h2 className="font-heading text-lg font-bold text-foreground-950">Facturation</h2>
                </div>

                <div className="bg-background-100 rounded-xl p-5 mb-5 border border-background-200/60">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-7 flex items-center justify-center rounded bg-emerald-700">
                        <span className="text-[10px] font-bold text-white tracking-wider">BANK</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Virement</span>
                    </div>
                    <div className="w-7 h-7 flex items-center justify-center">
                      <i className="ri-checkbox-circle-fill text-emerald-500 text-lg" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-700 mb-1">
                    <i className="ri-exchange-funds-line text-sm" />
                    <span className="text-sm">Paiement par virement bancaire</span>
                  </div>
                  <div className="text-xs text-foreground-500 space-y-0.5">
                    <div>Délai de paiement : 30 jours date de facture</div>
                    <div>{paymentMethod.holderName}</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5 bg-foreground-950 text-white hover:bg-foreground-800"
                >
                  <i className="ri-mail-send-line" />
                  Demander un devis
                </button>
                <p className="text-[11px] text-foreground-400 mt-2 text-center">
                  Tous nos services sont facturés sur devis accepté. Aucun prélèvement automatique.
                </p>
              </div>

              {/* Renouvellement — Sur Devis */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/60 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <i className="ri-calendar-check-line text-emerald-600 text-lg" />
                  <h2 className="font-heading text-lg font-bold text-foreground-950">Renouvellement — Sur Devis</h2>
                </div>
                <p className="text-sm text-foreground-600 mb-5" style={{ textAlign: 'justify' }}>
                  Votre contrat <strong>ne se renouvelle pas automatiquement</strong>. Chaque période donne lieu à un nouveau devis adapté à l'évolution de vos besoins. Prochaine échéance :{' '}
                  {new Date(subscriptionPlan.renewalDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </p>

                {!renewalConfirmed ? (
                  <button
                    onClick={() => setRenewalConfirmed(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <i className="ri-check-double-line text-lg" />
                    Demander un devis de renouvellement
                  </button>
                ) : (
                  <div className="bg-emerald-600 rounded-xl p-5 text-white text-center">
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/20">
                      <i className="ri-check-double-line text-2xl" />
                    </div>
                    <p className="font-bold text-base mb-1">Demande envoyée !</p>
                    <p className="text-sm text-white/80">
                      Votre demande de devis sera traitée sous 24h.
                      Vous recevrez une proposition par email.
                    </p>
                    <button
                      onClick={() => setRenewalConfirmed(false)}
                      className="mt-4 text-sm underline text-white/80 hover:text-white cursor-pointer"
                    >
                      Annuler cette validation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HISTORIQUE CONSOMMATION ============ */}
        <section className="bg-background-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <i className="ri-bar-chart-grouped-line text-primary-500 text-xl" />
              <h2 className="font-heading text-2xl font-bold text-foreground-950">Historique de consommation</h2>
            </div>

            <div className="bg-white rounded-2xl border border-background-200/80 p-6 md:p-8 overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Barres mensuelles */}
                <div className="flex items-end gap-4 md:gap-6 h-56 mb-6 px-2">
                  {monthlyUsageHistory.map((item, i) => {
                    const heightPct = (item.credits / creditUsage.total) * 100;
                    const isCurrent = i === monthlyUsageHistory.length - 1;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 min-w-[50px]">
                        <span className="text-xs font-bold text-foreground-800">{item.credits.toLocaleString('fr-FR')}</span>
                        <div className="w-full relative flex-1 flex items-end">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-500 ${isCurrent ? 'bg-primary-500' : 'bg-primary-300/60 hover:bg-primary-400/60'}`}
                            style={{ height: `${Math.max(heightPct, 4)}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-foreground-500 whitespace-nowrap">{item.month.split(' ')[0]} {item.month.split(' ')[1]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Légende */}
                <div className="flex items-center gap-6 text-xs text-foreground-500 border-t border-background-200 pt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-primary-500" />
                    <span>Mois en cours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-primary-300/60" />
                    <span>Mois précédents</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <i className="ri-information-line text-foreground-400" />
                    <span>Plafond : {creditUsage.total.toLocaleString('fr-FR')} crédits</span>
                  </div>
                </div>
              </div>

              {/* Mini-stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-background-200">
                {[
                  { label: 'Moyenne mensuelle', value: '3 877', icon: 'ri-line-chart-line' },
                  { label: 'Mois le plus actif', value: 'Mai (5 100)', icon: 'ri-fire-line' },
                  { label: 'Total 6 mois', value: '23 260', icon: 'ri-stack-line' },
                  { label: 'Marge moyenne', value: '2 123', icon: 'ri-survey-line' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-foreground-500 mb-1 flex items-center justify-center gap-1">
                      <i className={`${stat.icon} text-primary-500`} />
                      {stat.label}
                    </div>
                    <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FACTURES ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-8">
            <i className="ri-file-list-3-line text-primary-500 text-xl" />
            <h2 className="font-heading text-2xl font-bold text-foreground-950">Historique de facturation</h2>
          </div>

          <div className="bg-white rounded-2xl border border-background-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-foreground-500">Facture</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-foreground-500">Date</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-foreground-500">Montant</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-foreground-500">Statut</th>
                    <th className="text-right py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-foreground-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceHistory.map((inv, i) => (
                    <tr key={i} className="border-b border-background-100 hover:bg-background-50/60 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-foreground-900">{inv.id}</td>
                      <td className="py-3.5 px-5 text-foreground-600">{new Date(inv.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      <td className="py-3.5 px-5 font-semibold text-foreground-950">{inv.amount.toFixed(2)} €</td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-700">
                          <i className="ri-check-line" />
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        {downloadedInvoices.has(inv.id) ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 whitespace-nowrap">
                            <i className="ri-check-double-line" />
                            Téléchargé
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDownloadInvoice(inv)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-600 hover:text-primary-600 cursor-pointer transition-colors whitespace-nowrap"
                          >
                            <i className="ri-download-line" />
                            Télécharger
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============ SECTION DEVIS ============ */}
        <section className="bg-background-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <i className="ri-file-text-line text-primary-500 text-xl" />
                <h2 className="font-heading text-2xl font-bold text-foreground-950">Tous nos services sont sur devis</h2>
              </div>
              <p className="text-sm text-foreground-500 max-w-lg mx-auto">
                Chaque mission est unique. Nous établissons un <strong>devis confidentiel sur mesure</strong> après un diagnostic gratuit de vos besoins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Diagnostic', desc: 'Évaluation gratuite de vos besoins', icon: 'ri-stethoscope-line', highlight: false },
                { name: 'Mission', desc: 'Devis sur mesure après diagnostic', icon: 'ri-file-text-line', highlight: true },
                { name: 'Suivi', desc: 'Accompagnement continu sur contrat', icon: 'ri-user-star-line', highlight: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                    item.highlight
                      ? 'bg-white border-2 border-primary-500 shadow-lg'
                      : 'bg-white border border-background-200/80 hover:border-primary-300/60 hover:shadow-md'
                  }`}
                >
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-primary-100">
                      <i className={`${item.icon} text-2xl text-primary-600`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground-950 mb-1">{item.name}</h3>
                    <p className="text-sm text-foreground-500">{item.desc}</p>
                  </div>
                  <div className="w-full py-3 rounded-xl text-center text-sm font-bold bg-primary-100 text-primary-700 cursor-default">
                    Sur devis
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-foreground-400 text-center mt-6">
              Contactez-nous pour un <strong>diagnostic gratuit</strong> et un devis confidentiel adapté à vos besoins.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}



