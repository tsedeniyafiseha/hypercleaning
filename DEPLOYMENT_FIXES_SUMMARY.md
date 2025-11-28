# Deployment Fixes Summary

## Overview
This document summarizes all fixes applied to ensure successful Vercel deployment without build-time environment variable errors.

---

## Issues Identified & Fixed

### 1. ✅ Stripe Client Build-Time Initialization
**Problem**: `src/lib/stripe.ts` was throwing an error at module load time if `STRIPE_SECRET_KEY` was not set. During Vercel build, this caused the entire build to fail.

**Root Cause**: 
```typescript
// OLD - Fails at build time
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {...});
```

**Solution**: Implemented lazy loading with a Proxy pattern
```typescript
// NEW - Only initializes at runtime when actually used
export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {...});
  }
  return stripeInstance;
}

export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    const instance = getStripe();
    return (instance as any)[prop];
  },
}) as Stripe;
```

**Impact**: Build now succeeds even without `STRIPE_SECRET_KEY` at build time. Error only occurs at runtime if the key is missing when checkout is used.

---

### 2. ✅ Email Transporter Build-Time Initialization
**Problem**: `src/lib/email.ts` was initializing the Nodemailer transporter at module load time with SMTP credentials.

**Root Cause**:
```typescript
// OLD - Fails if SMTP vars not set
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  // ... more config
});
```

**Solution**: Lazy load transporter on first use
```typescript
// NEW - Only initializes when email is actually sent
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      // ... more config
    });
  }
  return transporter;
}

// Updated all sendMail calls to use getTransporter()
await getTransporter().sendMail({...});
```

**Impact**: Build succeeds without SMTP configuration. Email features only fail at runtime if credentials are missing.

---

### 3. ✅ OAuth Providers Conditional Initialization
**Problem**: `src/lib/auth.ts` was using non-null assertions on OAuth environment variables, which could cause issues if they were undefined.

**Root Cause**:
```typescript
// OLD - Fails if OAuth vars not set
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  // ...
]
```

**Solution**: Conditionally include OAuth providers only if credentials exist
```typescript
// NEW - Only includes providers if credentials are available
providers: [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? [
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
      ]
    : []),
  CredentialsProvider({...}),
]
```

**Impact**: Build succeeds without OAuth credentials. OAuth features gracefully degrade if credentials are missing.

---

## Files Modified

1. **src/lib/stripe.ts** - Lazy loading implementation
2. **src/lib/email.ts** - Lazy loading implementation  
3. **src/lib/auth.ts** - Conditional provider initialization

All changes are backward compatible. Existing code using `stripe` and `transporter` continues to work without modification.

---

## Environment Variables Required for Vercel

### Critical (Must Have)
- `DATABASE_URL` - PostgreSQL connection
- `DIRECT_URL` - PostgreSQL direct connection for migrations
- `NEXTAUTH_SECRET` - NextAuth session secret
- `NEXTAUTH_URL` - Your Vercel domain
- `NEXT_PUBLIC_SITE_URL` - Your Vercel domain
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `ADMIN_EMAIL` - Admin user email

### Important (Recommended)
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_CLIENT_ID` - GitHub OAuth
- `GITHUB_CLIENT_SECRET` - GitHub OAuth
- `SMTP_HOST` - Email SMTP host
- `SMTP_PORT` - Email SMTP port
- `SMTP_USER` - Email SMTP user
- `SMTP_PASS` - Email SMTP password
- `FROM_EMAIL` - Email from address

### Optional
- `REDIS_URL` - Redis for caching (falls back to in-memory)
- `SENTRY_DSN` - Error tracking
- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `HEALTH_CHECK_TOKEN` - Health check endpoint

---

## Deployment Steps

1. **Add Environment Variables to Vercel**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all critical variables listed above

2. **Trigger Redeploy**
   - Click "Redeploy" in Vercel, OR
   - Push a new commit to main branch

3. **Monitor Build**
   - Check Vercel build logs
   - Verify build completes successfully
   - Check for any runtime errors

4. **Test Deployment**
   - Visit your site
   - Test authentication
   - Test checkout flow
   - Test admin dashboard

---

## Verification Checklist

Before considering deployment complete:

- [ ] Build completes without errors
- [ ] Site loads without errors
- [ ] Authentication works (credentials, Google, GitHub)
- [ ] Checkout flow works with Stripe test keys
- [ ] Admin dashboard is accessible
- [ ] Email verification works
- [ ] Password reset works
- [ ] No console errors in browser
- [ ] Vercel logs show no errors

---

## Rollback Plan

If issues occur after deployment:

1. Check Vercel logs for specific errors
2. Verify all environment variables are set correctly
3. Check that variable values don't have typos
4. For Stripe issues: verify webhook secret is correct
5. For email issues: verify SMTP credentials are correct
6. For auth issues: verify OAuth credentials are correct

If critical issue found:
- Revert to previous deployment in Vercel
- Fix the issue locally
- Push new commit to redeploy

---

## Performance Notes

The lazy loading implementation has minimal performance impact:
- Stripe client: Initialized once on first checkout, then cached
- Email transporter: Initialized once on first email send, then cached
- OAuth providers: Initialized at auth module load (unavoidable)

All subsequent uses are cached, so no performance degradation.

---

## Security Notes

- All sensitive keys are stored in Vercel environment variables (not in code)
- Stripe webhook secret is validated on every webhook
- Admin email is checked on every admin request
- NextAuth secret is used for session encryption
- OAuth secrets are never exposed to client

---

## Support

If you encounter issues:

1. Check VERCEL_ENV_SETUP.md for environment variable requirements
2. Review Vercel build logs for specific error messages
3. Verify all environment variables are set in Vercel dashboard
4. Check that variable values match exactly (no extra spaces)
5. For Stripe issues, verify keys are from the correct environment (test vs live)

