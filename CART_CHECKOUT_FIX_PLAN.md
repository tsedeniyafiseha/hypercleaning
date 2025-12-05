# 🚨 CART & CHECKOUT 404 FIX PLAN

## Problem Identified

Users are getting **404 errors** when trying to checkout because:

1. **NEXTAUTH_URL is incorrect** in Vercel environment variables
2. Your `.env.vercel` shows: `NEXTAUTH_URL="https://hypercleaning.vercel.app"`
3. Your actual domain is: `https://www.hypercleaningsupplies.co.nz`
4. The checkout API returns a redirect URL using `process.env.NEXTAUTH_URL`
5. When the URL is wrong, the redirect fails with 404

## Root Cause

In `src/app/api/checkout/route.ts` line 103:
```typescript
url: `${process.env.NEXTAUTH_URL}/order-success?order_id=${order.id}`
```

This creates: `https://hypercleaning.vercel.app/order-success` (WRONG!)
Should be: `https://www.hypercleaningsupplies.co.nz/order-success` (CORRECT!)

---

## 🔧 IMMEDIATE FIX (Do This Now!)

### Step 1: Update Vercel Environment Variables

1. Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n/settings/environment-variables

2. **Find and UPDATE these variables:**

   ```
   NEXTAUTH_URL=https://www.hypercleaningsupplies.co.nz
   NEXT_PUBLIC_SITE_URL=https://www.hypercleaningsupplies.co.nz
   ```

   ⚠️ **IMPORTANT:** 
   - Use the EXACT domain with `www.`
   - Use `https://` (not `http://`)
   - NO trailing slash at the end

3. **Click "Save"** for each variable

### Step 2: Redeploy

After updating environment variables:

1. Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n
2. Click **"Deployments"** tab
3. Click the **three dots** on the latest deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-3 minutes)

### Step 3: Test the Fix

1. Visit: https://www.hypercleaningsupplies.co.nz
2. Add a product to cart
3. Click "Go to Checkout"
4. Fill in shipping information
5. Click "Submit Order Request"
6. You should see the success page (not 404!)

---

## 🔍 Additional Issues to Fix

### Issue 2: OAuth Callback URLs

If users are using Google/GitHub login, update callback URLs:

**Google OAuth:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Edit "Authorized redirect URIs"
4. Add: `https://www.hypercleaningsupplies.co.nz/api/auth/callback/google`
5. Save

**GitHub OAuth:**
1. Go to: https://github.com/settings/developers
2. Find your OAuth App
3. Update "Authorization callback URL"
4. Set to: `https://www.hypercleaningsupplies.co.nz/api/auth/callback/github`
5. Save

### Issue 3: Stripe Webhook (If Using Payments)

If you enable Stripe payments later:

1. Go to: https://dashboard.stripe.com/webhooks
2. Edit your webhook endpoint
3. Update URL to: `https://www.hypercleaningsupplies.co.nz/api/checkout/webhook`
4. Copy the new signing secret
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel

---

## 🧪 Testing Checklist

After redeployment, test these flows:

- [ ] Homepage loads correctly
- [ ] Products page loads
- [ ] Add product to cart
- [ ] View cart page
- [ ] Click "Go to Checkout" (should NOT get 404)
- [ ] Fill shipping form
- [ ] Submit order request
- [ ] See success page with order details
- [ ] Check admin dashboard for new order
- [ ] Test user login/signup
- [ ] Test guest checkout

---

## 📋 Environment Variables Reference

Here's what your Vercel environment variables should look like:

```bash
# Core URLs (MUST MATCH YOUR DOMAIN!)
NEXTAUTH_URL=https://www.hypercleaningsupplies.co.nz
NEXT_PUBLIC_SITE_URL=https://www.hypercleaningsupplies.co.nz

# Database (Keep as is)
DATABASE_URL=postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# Auth (Keep as is)
NEXTAUTH_SECRET=yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k=

# Admin (Keep as is)
ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=tsedeniyafisehaw@gmail.com

# Stripe (Keep as is for now - test keys)
STRIPE_SECRET_KEY=sk_test_51SY951RySto3MgFUKeEnEBEDEjY13HcGTnwtRMCWpOmvtq9ALU5YcRquSQBOQyvrBFCPyCZIYKSC7A5Q1gkUK4G000jGxoXk3K
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SY951RySto3MgFU8dPH9S0cjvenM4cegZ5A6Fmm15VMrItyshavjDnvUAIWtBzgR50dTH7PC7GRYV0gocqoyZIy00eSea6Ot1
STRIPE_WEBHOOK_SECRET=whsec_9ef9c8a5005306500bfc2ccb931ec479836af2fab33ff9771789cee31c0

# Email (Keep as is)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tsedeniyafisehaw@gmail.com
SMTP_PASS=zpuq dknd bxii xaxz
FROM_EMAIL=noreply@hypercleaning.com

# Cloudinary (Keep as is)
CLOUDINARY_CLOUD_NAME=dl2gatvda
CLOUDINARY_API_KEY=169637298546927
CLOUDINARY_API_SECRET=DJD-OL8amniUtyio2tfPFxsDdsM

# OAuth (Keep as is)
GOOGLE_CLIENT_ID=880233503072-e9rvdi9ek9eu3hvc7dc25flm3vdoj274.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GITHUB_CLIENT_ID=Ov23litG3MK2TgMH8BWj
GITHUB_CLIENT_SECRET=7e38521381c00491c9942589e4224923dc961d8f

# Sentry (Keep as is)
SENTRY_DSN=https://10c9af94a4fe74388af73e7a20b61821@o4510439047757824.ingest.de.sentry.io/4510439050641488
NEXT_PUBLIC_SENTRY_DSN=https://10c9af94a4fe74388af73e7a20b61821@o4510439047757824.ingest.de.sentry.io/4510439050641488
```

---

## 🚀 Quick Fix Summary

**The ONE thing causing your 404 error:**

❌ **Wrong:** `NEXTAUTH_URL=https://hypercleaning.vercel.app`  
✅ **Correct:** `NEXTAUTH_URL=https://www.hypercleaningsupplies.co.nz`

**Fix it in 3 steps:**
1. Update `NEXTAUTH_URL` in Vercel dashboard
2. Update `NEXT_PUBLIC_SITE_URL` in Vercel dashboard  
3. Redeploy

**Time to fix:** 5 minutes  
**Downtime:** None (just redeploy)

---

## 📞 Need Help?

If the issue persists after following these steps:

1. Check Vercel function logs for errors
2. Check browser console (F12) for errors
3. Verify the environment variables saved correctly
4. Try clearing browser cache/cookies
5. Test in incognito mode

The fix should work immediately after redeployment!
