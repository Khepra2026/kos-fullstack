const BASE = process.env.PAYDUNYA_API_BASE || "https://app.paydunya.com/api/v1";

function getHeaders() {
  const m = process.env.PAYDUNYA_MASTER_KEY;
  const p = process.env.PAYDUNYA_PRIVATE_KEY;
  const t = process.env.PAYDUNYA_TOKEN;
  if (!m || !p || !t) throw new Error("PAYDUNYA keys missing");
  return {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": m,
    "PAYDUNYA-PRIVATE-KEY": p,
    "PAYDUNYA-TOKEN": t,
  };
}

function getUrls() {
  return {
    return_url: process.env.PAYDUNYA_RETURN_URL || "https://kos.khepraexperts.com/kos/payment-success",
    cancel_url: process.env.PAYDUNYA_CANCEL_URL || "https://kos.khepraexperts.com/kos/payment-cancel",
    callback_url: process.env.PAYDUNYA_CALLBACK_URL || "https://api.khepraexperts.com/api/paydunya/ipn",
  };
}

function getPayDunyaSetup() {
  return {
    masterKey: process.env.PAYDUNYA_MASTER_KEY,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
    token: process.env.PAYDUNYA_TOKEN,
    mode: process.env.PAYDUNYA_MODE || 'test',
  };
}

function getPayDunyaStore() {
  return {
    name: process.env.PAYDUNYA_STORE_NAME || 'Khepra Experts - KOS',
    tagline: 'PAC KOS - Expertise comptable automatisée',
    phone: process.env.PAYDUNYA_STORE_PHONE || '22890000000',
    address: process.env.PAYDUNYA_STORE_ADDRESS || 'Lomé, Togo',
    logo: process.env.PAYDUNYA_STORE_LOGO || 'https://kos.khepraexperts.com/images/logo.png',
    returnURL: process.env.PAYDUNYA_RETURN_URL || 'https://kos.khepraexperts.com/kos/payment-success',
    cancelURL: process.env.PAYDUNYA_CANCEL_URL || 'https://kos.khepraexperts.com/kos/payment-cancel',
    callbackURL: process.env.PAYDUNYA_CALLBACK_URL || 'https://api.khepraexperts.com/api/paydunya/ipn',
  };
}

async function createCheckoutInvoice({ amount, description, items, customData }) {
  const headers = getHeaders();
  const urls = getUrls();
  const store = getPayDunyaStore();
  const invoiceItems = items && items.length ? items.map(i => ({
    name: i.name, quantity: i.quantity, unit_price: i.unitPrice || i.unit_price, total_price: i.totalPrice || i.total_price
  })) : [{ name: description || 'Abonnement KOS PAC', quantity: 1, unit_price: amount, total_price: amount }];
  const payload = {
    invoice: { total_amount: amount, description: description || 'Abonnement KOS', items: invoiceItems },
    store: { name: store.name, tagline: store.tagline, phone: store.phone, postal_address: store.address, website_url: "https://khepraexperts.com", logo_url: store.logo },
    custom_data: customData || {},
    actions: { return_url: urls.return_url, cancel_url: urls.cancel_url, callback_url: urls.callback_url }
  };
  const res = await fetch(`${BASE}/checkout/invoice`, { method: "POST", headers, body: JSON.stringify(payload) });
  const json = await res.json();
  if (!res.ok) throw new Error(json.response_text || json.message || `PayDunya error ${res.status}`);
  return { token: json.token, url: json.response_text?.startsWith("http") ? json.response_text : json.url || `https://app.paydunya.com/checkout/invoice/${json.token}`, responseText: json.response_text, raw: json };
}

async function confirmInvoice(token) {
  if (!token) throw new Error("token required");
  const res = await fetch(`${BASE}/checkout/invoice/confirm/${token}`, { method: "GET", headers: getHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `confirm failed ${res.status}`);
  return { status: json.status || json.invoice_status || "pending", customer: json.customer || null, receiptURL: json.receipt_url || null, responseText: json.response_text, token, raw: json };
}

module.exports = { getPayDunyaSetup, getPayDunyaStore, createCheckoutInvoice, confirmInvoice };
