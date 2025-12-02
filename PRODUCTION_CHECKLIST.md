# Production Deployment Checklist

## 🎯 Quick Summary

Your payment system **works perfectly** in test mode. Before going live, you need to change **4 critical environment variables**.

---

## 🔴 MUST CHANGE (4 items)

### 1. Stripe Secret Key
```bash
# ❌ Current (TEST mode)
STRIPE_SECRET_KEY="sk_test_51SY951RySto3MgFU..."

# ✅ Change to (LIVE mode)
STRIPE_SECRET_KEY="sk_live_XXXXXXXXXXXXXXXX"
```
📍 Get from: https://dashboard.stripe.com → Switch to "Live mode" → Developers → API keys

---

### 2. Stripe Publishable Key
```bash
# ❌ Current (TEST mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51SY951RySto3MgFU..."

# ✅ Change to (LIVE mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_XXXXXXXXXXXXXXXX"
```
📍 Get from: Same place as secret key above

---

### 3. Stripe Webhook Secret
```bash
# ❌ Current (TEST webhook)
STRIPE_WEBHOOK_SECRET="whsec_9ef9c8a5005306500bfc2ccb931ec479836af2fab33ff9771789cee31c0"

# ✅ Change to (PRODUCTION webhook)
STRIPE_WEBHOOK_SECRET="whsec_XXXXXXXXXXXXXXXX"
```
📍 Create new webhook:
1. Go to https://dashboard.stripe.com (LIVE mode)
2. Developers → Webhooks → Add endpoint
3. URL: `https://yourdomain.com/api/checkout/webhook`
4. Event: `checkout.session.completed`
5. Copy the signing secret

---

### 4. NextAuth Secret
```bash
# ❌ Current (INSECURE)
NEXTAUTH_SECRET="development-secret-key-change-in-production"

# ✅ Change to (SECURE RANDOM)
NEXTAUTH_SECRET="<paste-output-from-command-below>"
```
📍 Generate with:
```bash
openssl rand -base64 32
```

---

## ⚠️ SHOULD CHANGE (2 items)

### 5. Production URLs
```bash
# Current
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Change to your domain
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### 6. Email From Address
```bash
# Current
FROM_EMAIL="noreply@localhost.com"

# Change to your domain
FROM_EMAIL="noreply@yourdomain.com"
```

---

## ✅ NO CHANGES NEEDED (Already Configured)

- ✅ Database (Supabase connection working)
- ✅ Email SMTP (Gmail configured)
- ✅ Google OAuth (configured)
- ✅ GitHub OAuth (configured)
- ✅ Admin email (configured)
- ✅ Sentry (configured)

---

## 📋 Step-by-Step Deployment

### Step 1: Get Stripe LIVE Keys (5 minutes)

1. Go to https://dashboard.stripe.com
2. **Toggle from "Test mode" to "Live mode"** (top right corner)
3. Click "Developers" in left sidebar
4. Click "API keys"
5. Copy both:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`) - Click "Reveal test key"

### Step 2: Create Production Webhook (3 minutes)

1. Still in Stripe Dashboard (LIVE mode)
2. Click "Webhooks" (under Developers)
3. Click "Add endpoint" button
4. Enter URL: `https://yourdomain.com/api/checkout/webhook`
5. Click "Select events"
6. Search for and select: `checkout.session.completed`
7. Click "Add endpoint"
8. Copy the **Signing secret** (starts with `whsec_`)

### Step 3: Generate Secure Secret (1 minute)

Open terminal and run:
```bash
openssl rand -base64 32
```
Copy the output (should be ~44 characters)

### Step 4: Update Environment Variables

**If deploying to Vercel:**
1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Update these 4 variables:
   - `STRIPE_SECRET_KEY` → paste LIVE secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → paste LIVE publishable key
   - `STRIPE_WEBHOOK_SECRET` → paste production webhook secret
   - `NEXTAUTH_SECRET` → paste generated secret
   - `NEXTAUTH_URL` → your production URL
   - `NEXT_PUBLIC_SITE_URL` → your production URL
   - `FROM_EMAIL` → noreply@yourdomain.com

4. Redeploy your application

**If deploying to Netlify:**
1. Go to Site settings → Environment variables
2. Update the same variables as above
3. Redeploy

**If using other platform:**
Follow their environment variable setup guide

### Step 5: Test Production Payment (5 minutes)

⚠️ **Use a real card with a small amount first!**

1. Go to your production site
2. Add a product to cart
3. Proceed to checkout
4. Fill in real shipping address
5. Use a real credit card
6. Complete payment
7. Verify:
   - ✅ Redirected to success page
   - ✅ Order appears in admin dashboard
   - ✅ Email confirmation received
   - ✅ Payment shows in Stripe Dashboard

### Step 6: Monitor (Ongoing)

Check these regularly:
- Stripe Dashboard → Payments (for successful payments)
- Stripe Dashboard → Webhooks (for webhook delivery status)
- Your admin dashboard → Orders (for order status)
- Server logs (for any errors)

---

## 🧪 Test Before Production

Run this command to verify everything:
```bash
npm run test:payment
```

Expected output:
- ✅ 5 passed
- ⚠️ 5 warnings (about test mode - expected)

---

## 🚨 Security Reminders

1. **Never commit production keys to git**
2. **Always use environment variables**
3. **Keep webhook secret secure**
4. **Use HTTPS in production** (required by Stripe)
5. **Monitor for suspicious activity**

---

## 📞 Need Help?

### Stripe Issues
- Support: https://support.stripe.com
- Docs: https://stripe.com/docs
- Status: https://status.stripe.com

### Application Issues
- Check server logs
- Check Sentry dashboard
- Review webhook delivery in Stripe

---

## ✅ Final Checklist

Before going live, verify:

- [ ] Switched to Stripe LIVE keys
- [ ] Created production webhook endpoint
- [ ] Generated secure NEXTAUTH_SECRET
- [ ] Updated all URLs to production domain
- [ ] Tested with real payment (small amount)
- [ ] Verified order appears in admin
- [ ] Verified email confirmation sent
- [ ] Webhook shows successful delivery in Stripe
- [ ] SSL certificate is valid (https://)
- [ ] Monitoring is set up

---

**Current Status**: ✅ Working in TEST mode
**Production Ready**: 🔴 After updating 4 environment variables
**Estimated Time**: ~15 minutes to switch to production
