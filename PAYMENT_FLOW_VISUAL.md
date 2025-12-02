# Payment Flow - Visual Guide

## 🔄 Complete Payment Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER SHOPPING JOURNEY                        │
└─────────────────────────────────────────────────────────────────┘

1. BROWSE PRODUCTS
   ┌──────────────┐
   │  /shop       │  User browses products
   │  /shop/      │  Filters by category
   │  category/   │  Views product details
   └──────┬───────┘
          │
          ▼
2. ADD TO CART
   ┌──────────────┐
   │  Redux Store │  Cart state managed client-side
   │  + LocalStorage│ Persisted across sessions
   └──────┬───────┘
          │
          ▼
3. VIEW CART
   ┌──────────────┐
   │  /cart       │  Review items
   │              │  Adjust quantities
   │              │  See total price
   └──────┬───────┘
          │
          ▼ Click "Proceed to Checkout"
          │
4. CHECKOUT PAGE
   ┌──────────────┐
   │  /checkout   │  Fill shipping address
   │              │  Review order summary
   │              │  Click "Place Order"
   └──────┬───────┘
          │
          ▼ POST /api/checkout
          │
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND PROCESSING                           │
└─────────────────────────────────────────────────────────────────┘

5. CREATE ORDER
   ┌──────────────────────────────────────┐
   │  /api/checkout (route.ts)            │
   │                                      │
   │  ✓ Validate cart items               │
   │  ✓ Validate shipping address         │
   │  ✓ Create Stripe checkout session    │
   │  ✓ Create Order (status: "pending")  │
   │  ✓ Create OrderItems                 │
   │  ✓ Store shipping address            │
   │  ✓ Return Stripe checkout URL        │
   └──────────────┬───────────────────────┘
                  │
                  ▼ Redirect to Stripe
                  │
┌─────────────────────────────────────────────────────────────────┐
│                     STRIPE PAYMENT                               │
└─────────────────────────────────────────────────────────────────┘

6. STRIPE CHECKOUT
   ┌──────────────────────────────────────┐
   │  Stripe Hosted Page                  │
   │                                      │
   │  • Secure payment form               │
   │  • Enter card details                │
   │  • 3D Secure if required             │
   │  • Process payment                   │
   └──────────────┬───────────────────────┘
                  │
                  ├─── Success ───┐
                  │                │
                  ▼                ▼
         ┌────────────────┐  ┌────────────────┐
         │ Stripe Webhook │  │ User Redirect  │
         │                │  │                │
         │ POST /api/     │  │ GET /order-    │
         │ checkout/      │  │ success?       │
         │ webhook        │  │ session_id=... │
         └────────┬───────┘  └────────┬───────┘
                  │                   │
                  ▼                   │
┌─────────────────────────────────────────────────────────────────┐
│                     ORDER COMPLETION                             │
└─────────────────────────────────────────────────────────────────┘

7. WEBHOOK PROCESSING
   ┌──────────────────────────────────────┐
   │  /api/checkout/webhook/route.ts      │
   │                                      │
   │  ✓ Verify webhook signature          │
   │  ✓ Update Order status → "paid"      │
   │  ✓ Store payment intent ID           │
   │  ✓ Send order confirmation email     │
   │  ✓ Log success                       │
   └──────────────────────────────────────┘
                  │
                  │
8. SUCCESS PAGE    ▼
   ┌──────────────────────────────────────┐
   │  /order-success/page.tsx             │
   │                                      │
   │  ✓ Fetch order details               │
   │  ✓ Display order summary             │
   │  ✓ Show shipping address             │
   │  ✓ Show order items                  │
   │  ✓ Link to order tracking            │
   └──────────────────────────────────────┘

```

## 📊 Data Flow

```
┌─────────────┐
│   Browser   │
│   (Redux)   │
└──────┬──────┘
       │ Cart Items
       ▼
┌─────────────┐     ┌──────────────┐
│  Next.js    │────▶│   Stripe     │
│  API Route  │     │   Checkout   │
└──────┬──────┘     └──────┬───────┘
       │                   │
       │ Create Order      │ Payment Success
       ▼                   │
┌─────────────┐            │
│  PostgreSQL │◀───────────┘
│  (Supabase) │  Webhook: Update Order
└─────────────┘
       │
       │ Order Data
       ▼
┌─────────────┐
│   Success   │
│    Page     │
└─────────────┘
```

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURITY MEASURES                            │
└─────────────────────────────────────────────────────────────────┘

1. CLIENT SIDE
   ✓ HTTPS only (enforced)
   ✓ No card data stored
   ✓ Stripe.js handles sensitive data
   ✓ CSRF protection (Next.js)

2. SERVER SIDE
   ✓ API route validation
   ✓ Session verification
   ✓ Input sanitization
   ✓ Database transactions

3. STRIPE
   ✓ PCI DSS compliant
   ✓ Webhook signature verification
   ✓ Secure payment processing
   ✓ 3D Secure support

4. DATABASE
   ✓ Parameterized queries (Prisma)
   ✓ Connection pooling
   ✓ Encrypted connections
   ✓ No card data stored
```

## 💳 Test vs Production

```
┌─────────────────────────────────────────────────────────────────┐
│                     TEST MODE (Current)                          │
└─────────────────────────────────────────────────────────────────┘

Keys:
  STRIPE_SECRET_KEY="sk_test_..."
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
  STRIPE_WEBHOOK_SECRET="whsec_..." (test)

Test Cards:
  Success: 4242 4242 4242 4242
  Decline: 4000 0000 0000 0002
  3D Secure: 4000 0025 0000 3155

Behavior:
  ✓ No real money charged
  ✓ Instant processing
  ✓ Full testing capabilities
  ✓ Webhook testing available

┌─────────────────────────────────────────────────────────────────┐
│                     LIVE MODE (Production)                       │
└─────────────────────────────────────────────────────────────────┘

Keys:
  STRIPE_SECRET_KEY="sk_live_..."
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
  STRIPE_WEBHOOK_SECRET="whsec_..." (production)

Cards:
  Real credit/debit cards only
  Real bank accounts
  Real payment methods

Behavior:
  ⚠️ Real money charged
  ⚠️ Real bank transfers
  ⚠️ Real customer charges
  ⚠️ Stripe fees apply (2.9% + $0.30)
```

## 📧 Email Flow

```
Payment Success
       │
       ▼
┌─────────────────┐
│ Webhook Handler │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  sendOrderConf  │  (lib/email.ts)
│  irmation()     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gmail SMTP     │
│  Server         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Customer Email │
│                 │
│  ✓ Order ID     │
│  ✓ Items        │
│  ✓ Total        │
│  ✓ Shipping     │
└─────────────────┘
```

## 🎯 Key Files

```
Payment Processing:
├── src/app/checkout/page.tsx          (Checkout form)
├── src/app/api/checkout/route.ts      (Create session)
├── src/app/api/checkout/webhook/route.ts (Handle payment)
├── src/app/order-success/page.tsx     (Success page)
├── src/lib/stripe.ts                  (Stripe client)
└── src/lib/email.ts                   (Email sender)

Database:
├── prisma/schema.prisma               (Order, OrderItem models)
└── src/lib/prisma.ts                  (Database client)

Configuration:
├── .env.local                         (Development config)
└── .env.production.template           (Production template)
```

## 🔄 Order Status Flow

```
┌──────────┐
│ pending  │  Order created, payment not confirmed
└────┬─────┘
     │
     │ Webhook: checkout.session.completed
     ▼
┌──────────┐
│   paid   │  Payment confirmed, order processing
└────┬─────┘
     │
     │ (Future: shipping integration)
     ▼
┌──────────┐
│ shipped  │  Order shipped to customer
└────┬─────┘
     │
     │ (Future: delivery confirmation)
     ▼
┌──────────┐
│delivered │  Order delivered
└──────────┘
```

## 🚀 Quick Test Commands

```bash
# Test payment system
npm run test:payment

# Seed products
npm run prisma:seed

# Start dev server
npm run dev

# View database
npm run prisma:studio

# Check database connection
npm run test:db
```

---

**Your payment system is production-ready after updating 4 environment variables!**
