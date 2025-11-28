# Vercel Environment Variables Setup Guide

## Critical: All Required Environment Variables for Deployment

This document lists ALL environment variables required for successful deployment to Vercel. Missing any of these will cause build or runtime failures.

### 1. Database Configuration (REQUIRED)
```
DATABASE_URL=[Your Supabase pooler connection string]
DIRECT_URL=[Your Supabase direct connection string]
```
**Status**: ✅ Available in your .env.local
**Purpose**: Prisma ORM database connections

---

### 2. NextAuth Configuration (REQUIRED)
```
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```
**Status**: ⚠️ MUST UPDATE for production
**Purpose**: Authentication and session management
**Note**: Generate a secure secret with: `openssl rand -base64 32`

---

### 3. Stripe Payment Processing (REQUIRED)
```
STRIPE_SECRET_KEY=[Your Stripe test secret key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[Your Stripe test publishable key]
STRIPE_WEBHOOK_SECRET=[Your Stripe webhook secret]
```
**Status**: ✅ Test keys available in your .env.local
**Purpose**: Payment processing and webhook handling
**Note**: Switch to live keys in production

---

### 4. OAuth Providers (REQUIRED)
```
GOOGLE_CLIENT_ID=[Your Google OAuth Client ID]
GOOGLE_CLIENT_SECRET=[Your Google OAuth Client Secret]
GITHUB_CLIENT_ID=[Your GitHub OAuth Client ID]
GITHUB_CLIENT_SECRET=[Your GitHub OAuth Client Secret]
```
**Status**: ✅ Available in your .env.local
**Purpose**: Social login authentication
**Note**: These are optional at build time but required for OAuth features

---

### 5. Email Configuration (REQUIRED for email features)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[Your Gmail address]
SMTP_PASS=[Your Gmail app password]
FROM_EMAIL=noreply@localhost.com
```
**Status**: ✅ Available in your .env.local
**Purpose**: Sending verification emails, password resets, order confirmations
**Note**: Gmail requires app-specific password, not regular password

---

### 6. Admin Configuration (REQUIRED)
```
ADMIN_EMAIL=admin@localhost.com
```
**Status**: ⚠️ UPDATE with your admin email
**Purpose**: Admin dashboard access control
**Note**: Only this email can access /admin routes

---

### 7. Sentry Error Tracking (OPTIONAL but recommended)
```
SENTRY_DSN=[Your Sentry DSN]
NEXT_PUBLIC_SENTRY_DSN=[Your Sentry DSN]
```
**Status**: ✅ Available in your .env.local
**Purpose**: Error tracking and monitoring
**Note**: Can be left empty if not using Sentry

---

### 8. Redis Configuration (OPTIONAL)
```
REDIS_URL=redis://localhost:6379
```
**Status**: ⚠️ Optional for production
**Purpose**: Caching and rate limiting
**Note**: Falls back to in-memory store if not provided

---

### 9. Health Check (OPTIONAL)
```
HEALTH_CHECK_TOKEN=your-health-check-token
```
**Status**: ⚠️ Optional
**Purpose**: Health check endpoint authentication
**Note**: Can be any random string

---

## Setup Instructions for Vercel

### Step 1: Go to Vercel Dashboard
1. Navigate to https://vercel.com/dashboard
2. Click on your project "hyper-clean-supplies"

### Step 2: Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add each variable from the sections above
3. For each variable:
   - Enter the **Name** (e.g., `STRIPE_SECRET_KEY`)
   - Enter the **Value** (e.g., `sk_test_...`)
   - Select **Production** (or all environments)
   - Click **Add**

### Step 3: Critical Variables to Add First
These MUST be added before deployment:
- ✅ `STRIPE_SECRET_KEY`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ✅ `STRIPE_WEBHOOK_SECRET`
- ✅ `NEXTAUTH_SECRET` (generate new one)
- ✅ `NEXTAUTH_URL` (your Vercel domain)
- ✅ `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
- ✅ `ADMIN_EMAIL` (your email)

### Step 4: Trigger Redeploy
After adding variables, either:
- Click **Redeploy** button in Vercel, OR
- Push a new commit to trigger automatic redeploy:
  ```bash
  git add .
  git commit -m "Add environment variables for production"
  git push origin main
  ```

---

## Verification Checklist

Before deployment, verify:

- [ ] All REQUIRED variables are set in Vercel
- [ ] `NEXTAUTH_SECRET` is a new secure 32-character string
- [ ] `NEXTAUTH_URL` matches your Vercel domain (e.g., `https://hyper-clean-supplies.vercel.app`)
- [ ] `NEXT_PUBLIC_SITE_URL` matches your Vercel domain
- [ ] `ADMIN_EMAIL` is set to your email address
- [ ] Stripe keys are correct (test keys for staging, live keys for production)
- [ ] Database URLs are correct and accessible from Vercel
- [ ] Email credentials are correct (Gmail app password, not regular password)

---

## Common Issues & Solutions

### Issue: "STRIPE_SECRET_KEY is not set"
**Solution**: Add `STRIPE_SECRET_KEY` to Vercel environment variables

### Issue: "NEXTAUTH_SECRET is not set"
**Solution**: Generate and add `NEXTAUTH_SECRET` to Vercel environment variables

### Issue: "OAuth providers not working"
**Solution**: Ensure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` are all set

### Issue: "Email not sending"
**Solution**: Verify SMTP credentials are correct and Gmail app password is used (not regular password)

### Issue: "Admin dashboard not accessible"
**Solution**: Ensure `ADMIN_EMAIL` matches your email and you're signed in with that email

### Issue: Build succeeds but site shows errors
**Solution**: Check Vercel logs for runtime errors. Most likely missing optional variables like `REDIS_URL`

---

## Code Changes Made for Build Safety

The following files were updated to prevent build-time failures:

1. **src/lib/stripe.ts** - Lazy loading of Stripe client
2. **src/lib/email.ts** - Lazy loading of email transporter
3. **src/lib/auth.ts** - Conditional OAuth provider initialization

These changes ensure environment variables are only accessed at runtime, not during build.

---

## Next Steps

1. ✅ Add all REQUIRED environment variables to Vercel
2. ✅ Trigger a redeploy
3. ✅ Monitor build logs for any errors
4. ✅ Test the deployed site
5. ✅ Verify admin dashboard access
6. ✅ Test payment flow with Stripe test keys
7. ✅ Test email functionality

