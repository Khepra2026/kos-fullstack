import express from 'express';
import { createCheckoutInvoice, confirmInvoice } from '../services/paydunya.js';

const router = express.Router();

const PLANS = {
  starter: 15000,
  pro: 35000,
  cabinet: 75000,
  enterprise: 150000,
};

// Idempotency in-memory (à remplacer par Redis en prod)
const processedTokens = new Set();

router.post('/checkout', async (req, res) => {
  try {
    const { plan = 'starter', amount, userId, email } = req.body || {};
    const finalAmount = amount || PLANS[plan] || PLANS.starter;

    if (finalAmount < 100) {
      return res.status(400).json({ success: false, error: 'Montant minimum 100 XOF' });
    }

    const requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    console.log(`[API][${requestId}] checkout plan=${plan} amount=${finalAmount} user=${userId}`);

    const result = await createCheckoutInvoice({
      amount: finalAmount,
      description: `KOS PAC - Plan ${plan}`,
      items: [{ name: `KOS ${plan}`, quantity: 1, unit_price: finalAmount, total_price: finalAmount }],
      customData: { userId: userId || 'guest', plan, email: email || 'unknown', requestId, createdAt: new Date().toISOString() },
    });

    return res.json({ success: true, plan, amount: finalAmount, invoiceUrl: result.url, token: result.token, requestId });
  } catch (e) {
    console.error('[PayDunya checkout error]', e);
    return res.status(500).json({ success: false, error: e.message, code: 'CHECKOUT_FAILED' });
  }
});

router.post('/ipn', async (req, res) => {
  try {
    const body = req.body || {};
    const data = body.data || body;
    const token = data?.invoice?.token || data?.token || req.query.token || body.token;

    if (!token) return res.status(200).json({ received: true, warning: 'missing token' });

    // IDEMPOTENCY §17 - éviter double activation abonnement
    if (processedTokens.has(token)) {
      console.log(`[PayDunya IPN] duplicate token=${token} ignored`);
      return res.status(200).json({ received: true, duplicate: true });
    }

    const confirmation = await confirmInvoice(token);
    console.log(`[PayDunya IPN] token=${token} status=${confirmation.status}`);

    if (confirmation.status === 'completed') {
      processedTokens.add(token);
      // TODO: upsert kos_subscriptions + audit trail
    }

    return res.status(200).json({ received: true, token, status: confirmation.status });
  } catch (e) {
    console.error('[PayDunya IPN error]', e);
    return res.status(200).json({ received: true, error: e.message });
  }
});

router.get('/confirm', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'token required' });
    const result = await confirmInvoice(token);
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get('/plans', (req, res) => {
  res.json({ plans: PLANS, currency: 'XOF', gateway: 'PayDunya', mode: process.env.PAYDUNYA_MODE || 'live' });
});

export default router;