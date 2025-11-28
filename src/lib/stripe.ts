import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return stripeInstance;
}

// For backward compatibility, export a lazy getter
export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    const instance = getStripe();
    return (instance as any)[prop];
  },
}) as Stripe;


