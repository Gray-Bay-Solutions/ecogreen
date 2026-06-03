/** Set NEXT_PUBLIC_PAYMENTS_ENABLED=true to re-enable PayPal checkout. */
export const PAYMENTS_ENABLED =
  process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true';
