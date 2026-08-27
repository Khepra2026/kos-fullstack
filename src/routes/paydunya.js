import express from 'express';
import { createCheckoutInvoice, confirmInvoice } from '../services/paydunya.js';

const router = express.Router();

// Plans KOS XOF
const PLANS = {
  starter: 15000,
  pro: 35000,
  cabinet: 75000,
  enterprise: 150000,
};

/**
 * POST /api/paydunya/checkout
 * Body: { plan, amount, userId, email }
 * Returns: { success, invoiceUrl, token }
 */
router.post('/checkout', async (req, res) => {
  try {
    const { plan = 'starter', amount, userId, email } = req.body || {};

    const finalAmount = amount || PLANS[plan] || PLANS.starter;

    if (finalAmount < 100) {
      return res.status(400).json({ success: false, error: 'Montant minimum 100 XOF' });
    }

    const result = await createCheckoutInvoice({
      amount: finalAmount,
      description: `KOS PAC - Plan ${plan}`,
      items: [{ name: `KOS ${plan}`, quantity: 1, unitPrice: finalAmount, totalPrice: finalAmount }],
      customData: {
        userId: userId || 'guest',
        plan,
        email: email || 'unknown',
        createdAt: new Date().toISOString()
      },
    });

    // Optionnel: sauvegarde Supabase
    // if (supabase) await supabase.from('kos_payments').insert({ token: result.token, userId, plan, amount: finalAmount, status: 'pending' })

    return res.json({
      success: true,
      plan,
      amount: finalAmount,
      invoiceUrl: result.url,
      token: result.token,
      responseText: result.responseText
    });
  } catch (e) {
    console.error('[PayDunya checkout error]', e);
    return res.status(500).json({ success: false, error: e.message, code: 'CHECKOUT_FAILED' });
  }
});

/**
 * POST /api/paydunya/ipn
 * PayDunya server-to-server callback
 * NE PAS mettre express.json() ici, il est déjà global dans server.js
 */
router.post('/ipn', async (req, res) => {
  try {
    console.log('[PayDunya IPN] payload', JSON.stringify(req.body).slice(0, 1500));

    const body = req.body || {};
    const data = body.data || body;
    const token = data?.invoice?.token || data?.token || req.query.token || body.token;

    if (!token) {
      // PayDunya attend 200 même sans token pour ne pas retry en boucle
      return res.status(200).json({ received: true, warning: 'missing token' });
    }

    const confirmation = await confirmInvoice(token);
    console.log(`[PayDunya IPN] token=${token} status=${confirmation.status}`);

    if (confirmation.status === 'completed') {
      // TODO: Activer abonnement
      // await supabase.from('kos_subscriptions').upsert({ email: confirmation.customer?.email, status: 'active', payment_token: token })
      console.log(`[PayDunya] Payment completed`, confirmation.customer);
    }

    return res.status(200).json({ received: true, token, status: confirmation.status });
  } catch (e) {
    console.error('[PayDunya IPN error]', e);
    // Toujours 200 pour IPN pour éviter retry storm
    return res.status(200).json({ received: true, error: e.message });
  }
});

/**
 * GET /api/paydunya/confirm?token=xxx
 * Vérification côté front après returnURL
 */
router.get('/confirm', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'token required' });

    const result = await confirmInvoice(token);
    return res.json(result);
  } catch (e) {
    console.error('[PayDunya confirm error]', e.message);
    return res.status(500).json({ error: e.message });
  }
});

/**
 * GET /api/paydunya/plans
 */
router.get('/plans', (req, res) => {
  res.json({
    plans: PLANS,
    currency: 'XOF',
    gateway: 'PayDunya',
    description: 'KOS PAC - Paiement Mobile Money & Carte via PayDunya'
  });
});

export default router;