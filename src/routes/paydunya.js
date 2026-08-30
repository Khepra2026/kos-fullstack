const express = require('express');
const { createCheckoutInvoice, confirmInvoice } = require('../services/paydunya.js');
const router = express.Router();
const PLANS = { starter: 15000, pro: 35000, cabinet: 75000, enterprise: 150000 };
const processedTokens = new Set();

router.post('/checkout', async (req, res) => {
  try {
    const { plan = 'starter', amount, userId, email } = req.body || {};
    const finalAmount = amount || PLANS[plan] || PLANS.starter;
    if (finalAmount < 100) return res.status(400).json({ success: false, error: 'Montant minimum 100 XOF' });
    const result = await createCheckoutInvoice({
      amount: finalAmount,
      description: `KOS PAC - Plan ${plan}`,
      items: [{ name: `KOS ${plan}`, quantity: 1, unit_price: finalAmount, total_price: finalAmount }],
      customData: { userId: userId || 'guest', plan, email: email || 'unknown', createdAt: new Date().toISOString() },
    });
    return res.json({ success: true, plan, amount: finalAmount, invoiceUrl: result.url, token: result.token });
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
    if (processedTokens.has(token)) return res.status(200).json({ received: true, duplicate: true });
    const confirmation = await confirmInvoice(token);
    if (confirmation.status === 'completed') processedTokens.add(token);
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
  res.json({ plans: PLANS, currency: 'XOF', gateway: 'PayDunya' });
});

module.exports = router;
