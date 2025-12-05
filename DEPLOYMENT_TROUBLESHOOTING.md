# Deployment Troubleshooting Guide

## Issues After Domain Transfer

### Step 1: Update Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Update these variables with your NEW domain:
   ```
   NEXTAUTH_URL=https://your-new-domain.com
   NEXT_PUBLIC_SITE_URL=https://your-new-domain.com
   ```

3. **Redeploy** after changing environment variables

### Step 2: Update OAuth Callback URLs

If using Google/GitHub OAuth, update redirect URIs:

**Google Console:**
- Go to: https://console.cloud.google.com/apis/credentials
- Edit your OAuth 2.0 Client
- Update Authorized redirect URIs:
  ```
  https://your-new-domain.com/api/auth/callback/google
  ```

**GitHub:**
- Go to: https://github.com/settings/developers
- Edit your OAuth App
- Update Authorization callback URL:
  ```
  https://your-new-domain.com/api/auth/callback/github
  ```

### Step 3: Update Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Edit your webhook endpoint
3. Update URL to:
   ```
   https://your-new-domain.com/api/checkout/webhook
   ```
4. Copy the new **Signing Secret**
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

### Step 4: Common Issues & Fixes

#### Issue: "Invalid CSRF Token" or Auth Errors
**Fix:**
- Clear browser cookies
- Ensure `NEXTAUTH_URL` matches your domain exactly (no trailing slash)
- Redeploy after env variable changes

#### Issue: Images Not Loading
**Fix:**
- Check Cloudinary credentials are set correctly
- Verify `next.config.mjs` has correct image domains
- Check browser console for CORS errors

#### Issue: Database Connection Errors
**Fix:**
- Verify `DATABASE_URL` is correct in Vercel
- Check Supabase project is not paused
- Test connection: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/database

#### Issue: Stripe Payments Failing
**Fix:**
- Use **live keys** (not test keys) for production
- Verify webhook is receiving events in Stripe dashboard
- Check webhook secret matches Vercel env variable

#### Issue: 500 Internal Server Error
**Fix:**
- Check Vercel function logs: Dashboard → Deployments → Click deployment → Functions tab
- Look for specific error messages
- Common causes:
  - Missing environment variables
  - Database connection issues
  - Prisma client not generated (should auto-generate on build)

### Step 5: Verify Deployment

Run these checks:

1. **Homepage loads**: https://your-domain.com
2. **Products load**: https://your-domain.com/shop
3. **Auth works**: Try signing in
4. **Cart works**: Add items to cart
5. **Checkout works**: Test with Stripe test card (if using test mode)
6. **Admin access**: https://your-domain.com/admin (with admin email)

### Step 6: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on latest deployment
3. Go to **Functions** tab
4. Look for errors in function logs
5. Check **Build Logs** for build-time errors

### Quick Fixes Checklist

- [ ] Updated `NEXTAUTH_URL` to new domain
- [ ] Updated `NEXT_PUBLIC_SITE_URL` to new domain
- [ ] Updated OAuth callback URLs (Google/GitHub)
- [ ] Updated Stripe webhook URL
- [ ] Updated `STRIPE_WEBHOOK_SECRET` with new webhook secret
- [ ] Cleared browser cookies/cache
- [ ] Redeployed after env variable changes
- [ ] Verified database connection
- [ ] Checked Vercel function logs for errors

## Need More Help?

Tell me:
1. What specific error messages you're seeing
2. Which pages/features are broken
3. Any errors in browser console (F12 → Console tab)
4. Any errors in Vercel function logs

I'll help you fix the specific issues!
