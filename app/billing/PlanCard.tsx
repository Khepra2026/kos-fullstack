// app/billing/PlanCard.tsx
'use client';

import { PLANS } from '@/lib/billing';

interface PlanCardProps {
  planKey: string;
  plan: typeof PLANS[keyof typeof PLANS];
  currentPlan?: string;
  orgId: string;
}

export function PlanCard({ planKey, plan, currentPlan, orgId }: PlanCardProps) {
  const isCurrentPlan = currentPlan === planKey;

  const handleUpgrade = async () => {
    const res = await fetch('https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-billing-hub/create-subscription', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: planKey,
        org_id: orgId,
        email: 'admin@bank.cm' // TODO: depuis session
      })
    });

    const data = await res.json();
    if (data.checkout_url) {
      window.location.href = data.checkout_url; // Redirection PayDunya
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${isCurrentPlan? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-3xl font-bold mt-4">{plan.price.toLocaleString()} <span className="text-sm">XAF/mois</span></p>
      <p className="text-sm text-gray-600 mt-1">{plan.target}</p>

      <ul className="mt-6 space-y-2 text-sm">
        <li>✓ {plan.agents} agents IA</li>
        <li>✓ {plan.quota === -1? 'Calls illimités' : `${plan.quota.toLocaleString()} calls/mois`}</li>
        <li>✓ SLA {plan.sla}%</li>
        <li>✓ Support CEMAC</li>
      </ul>

      <button
        onClick={handleUpgrade}
        disabled={isCurrentPlan}
        className={`w-full mt-6 py-3 rounded-lg font-semibold ${
          isCurrentPlan
           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isCurrentPlan? 'Plan actuel' : 'Passer à ce plan'}
      </button>
    </div>
  );
}
