import paydunya from 'paydunya';

export function getPayDunyaSetup() {
  return new paydunya.Setup({
    masterKey: process.env.PAYDUNYA_MASTER_KEY,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
    token: process.env.PAYDUNYA_TOKEN,
    mode: process.env.PAYDUNYA_MODE || 'test', // 'live' en prod
  });
}

export function getPayDunyaStore() {
  return new paydunya.Store({
    name: process.env.PAYDUNYA_STORE_NAME || 'Khepra Experts - KOS',
    tagline: 'PAC KOS - Expertise comptable automatisée',
    phoneNumber: process.env.PAYDUNYA_STORE_PHONE || '22890000000',
    postalAddress: process.env.PAYDUNYA_STORE_ADDRESS || 'Lomé, Togo',
    logoURL: process.env.PAYDUNYA_STORE_LOGO || 'https://kos.khepraexperts.com/images/logo.png',
    returnURL: process.env.PAYDUNYA_RETURN_URL || 'https://kos.khepraexperts.com/kos/payment-success',
    cancelURL: process.env.PAYDUNYA_CANCEL_URL || 'https://kos.khepraexperts.com/kos/payment-cancel',
    callbackURL: process.env.PAYDUNYA_CALLBACK_URL || 'https://api.khepraexperts.com/api/paydunya/ipn',
  });
}

export async function createCheckoutInvoice({ amount, description, items, customData }) {
  const setup = getPayDunyaSetup();
  const store = getPayDunyaStore();
  const invoice = new paydunya.CheckoutInvoice(setup, store);

  // Items PAC
  if (items && items.length) {
    items.forEach(i => invoice.addItem(i.name, i.quantity, i.unitPrice, i.totalPrice));
  } else {
    invoice.addItem(description || 'Abonnement KOS PAC', 1, amount, amount);
  }

  invoice.totalAmount = amount;
  invoice.description = description || 'Abonnement KOS';

  if (customData) {
    Object.entries(customData).forEach(([k, v]) => invoice.addCustomData(k, v));
  }

  await invoice.create();

  if (invoice.responseText && invoice.status!== 'success') {
    throw new Error(`PayDunya create failed: ${invoice.responseText} - status: ${invoice.status}`);
  }

  return {
    token: invoice.token,
    url: invoice.url, // redirect user here
    responseText: invoice.responseText,
  };
}

export async function confirmInvoice(token) {
  const setup = getPayDunyaSetup();
  const store = getPayDunyaStore();
  const invoice = new paydunya.CheckoutInvoice(setup, store);

  await invoice.confirm(token);

  return {
    status: invoice.status, // completed, pending, canceled, fail
    customer: invoice.customer,
    receiptURL: invoice.receiptURL,
    responseText: invoice.responseText,
    token,
  };
}