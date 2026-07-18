'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { PLANS, OVERAGE_PRICE, CURRENCY } from '@/lib/billing';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Subscription {
  org_id: string;
  plan: 'STARTER' | 'BUSINESS' | 'ENTERPRISE';
  status: 'active' | 'pending' | 'cancelled';
  quota: number;
  agents_allowed: number;
  started_at: string;
}

interface UsageData {
  date: string;
  calls: number;
  amount_xaf: number;
}

export default function BillingDashboard() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<UsageData[]>([]);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      // Simuler org_id depuis auth context
      const org_id = 'bank_bicec_cm';
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/kos-billing-hub/subscription-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ org_id })
      });
      
      const sub = await res.json();
      setSubscription(sub);
      
      // Mock usage data - à remplacer par vrai fetch
      setUsage([
        { date: '2026-07-01', calls: 1200, amount_xaf: 0 },
        { date: '2026-07-08', calls: 8500, amount_xaf: 0 },
        { date: '2026-07-15', calls: 11200, amount_xaf: 60000 },
        { date: '2026-07-17', calls: 13100, amount_xaf: 155000 },
      ]);
      setCurrentUsage(13100);
      
    } catch (e) {
      console.error('Erreur chargement billing:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (newPlan: 'BUSINESS' | 'ENTERPRISE') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/kos-billing-hub/create-subscription`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        plan: newPlan, 
        org_id: subscription?.org_id,
        email: 'cfo@bicec.cm'
      })
    });
    
    const data = await res.json();
    window.location.href = data.checkout_url; // Redirection PayDunya
  };

  if (loading) return <div className="p-8">Chargement...</div>;
  if (!subscription) return <div className="p-8">Aucun abonnement actif</div>;

  const planData = PLANS[subscription.plan];
  const quotaUsedPct = subscription.quota > 0 ? (currentUsage / subscription.quota) * 100 : 0;
  const overage = currentUsage > subscription.quota ? currentUsage - subscription.quota : 0;
  const overageAmount = overage * OVERAGE_PRICE;
  const totalBill = planData.price + overageAmount;

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing KOS Platform</h1>
          <p className="text-gray-600">Facturation souveraine CEMAC - Conforme COBAC</p>
        </div>
        <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
          {subscription.status.toUpperCase()}
        </Badge>
      </div>

      {/* Plan actuel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Plan Actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{planData.name}</div>
            <p className="text-xs text-gray-500">{planData.target}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Prix Mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{planData.price.toLocaleString()} {CURRENCY}</div>
            <p className="text-xs text-gray-500">Base</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Utilisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUsage.toLocaleString()}</div>
            <p className="text-xs text-gray-500">/ {subscription.quota > 0 ? subscription.quota.toLocaleString() : '∞'} calls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Facture Estimée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalBill.toLocaleString()} {CURRENCY}</div>
            <p className="text-xs text-gray-500">+ {overageAmount.toLocaleString()} dépassement</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphique consommation */}
      <Card>
        <CardHeader>
          <CardTitle>Consommation API - 30 derniers jours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} name="Appels API" />
              {subscription.quota > 0 && (
                <Line type="monotone" dataKey={() => subscription.quota} stroke="#ef4444" strokeDasharray="5 5" name="Quota" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Répartition agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quota vs Dépassement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Inclus', value: Math.min(currentUsage, subscription.quota) },
                    { name: 'Dépassement', value: overage }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agents IA Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Agents autorisés</span>
                <span className="font-bold">{subscription.agents_allowed}/17</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(subscription.agents_allowed / 17) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-4">
                SLA garanti : {planData.sla}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade */}
      {subscription.plan !== 'ENTERPRISE' && (
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Disponible</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            {subscription.plan === 'STARTER' && (
              <Button onClick={() => handleUpgrade('BUSINESS')}>
                Passer à Business - 2.5M XAF/mois
              </Button>
            )}
            <Button onClick={() => handleUpgrade('ENTERPRISE')} variant="outline">
              Passer à Enterprise - 15M XAF/mois
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
