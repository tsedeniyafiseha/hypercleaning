# Pre-Deployment Checklist

## Code Quality Checks ✅

- [x] All TypeScript errors fixed
- [x] No build-time environment variable errors
- [x] Lazy loading implemented for Stripe client
- [x] Lazy loading implemented for Email transporter
- [x] OAuth providers conditionally initialized
- [x] All imports are correct
- [x] No console errors in development

---

## Environment Variables Setup

### Step 1: Gather All Required Variables

You have these variables ready:
```
✅ DATABASE_URL (Supabase)
✅ DIRECT_URL (Supabase)
✅ STRIPE_SECRET_KEY (Test key provided)
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (Test key provided)
✅ STRIPE_WEBHOOK_SECRET (Provided)
✅ GOOGLE_CLIENT_ID (Configured)
✅ GOOGLE_CLIENT_SECRET (Configured)
✅ GITHUB_CLIENT_ID (Configured)
✅ GITHUB_CLIENT_SECRET (Configured)
✅ SMTP_HOST (Gmail)
✅ SMTP_PORT (587)
✅ SMTP_USER (Gmail)
✅ SMTP_PASS (App password)
✅ FROM_EMAIL (Configured)
✅ SENTRY_DSN (Configured)
✅ NEXT_PUBLIC_SENTRY_DSN (Configured)
```

You need to create/update:
```
⚠️ NEXTAUTH_SECRET - Generate new secure secret
⚠️ NEXTAUTH_URL - Set to your Vercel domain
⚠️ NEXT_PUBLIC_SITE_URL - Set to your Vercel domain
⚠️ ADMIN_EMAIL - Set to your email address
```

### Step 2: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

Copy the output and save it for Vercel setup.

### Step 3: Determine Your Vercel Domain

Your Vercel domain will be one of:
- `https://hyper-clean-supplies.vercel.app` (if project name is "hyper-clean-supplies")
- `https://your-custom-domain.com` (if you have a custom domain)

Check your Vercel project settings to confirm the exact domain.

---

## Vercel Setup Instructions

### 1. Access Vercel Dashboard
- Go to https://vercel.com/dashboard
- Click on your project "hyper-clean-supplies"

### 2. Navigate to Environment Variables
- Click **Settings** in the top menu
- Click **Environment Variables** in the left sidebar

### 3. Add Environment Variables

Add each variable one by one:

| Variable Name | Value | Notes |
|---|---|---|
| `DATABASE_URL` | Your Supabase pooler URL | From .env.local |
| `DIRECT_URL` | Your Supabase direct URL | From .env.local |
| `NEXTAUTH_SECRET` | Generated 32-char secret | Generate new one |
| `NEXTAUTH_URL` | https://your-vercel-domain.app | Your Vercel domain |
| `NEXT_PUBLIC_SITE_URL` | https://your-vercel-domain.app | Your Vercel domain |
| `STRIPE_SECRET_KEY` | sk_test_... | From .env.local |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | pk_test_... | From .env.local |
| `STRIPE_WEBHOOK_SECRET` | whsec_... | From .env.local |
| `GOOGLE_CLIENT_ID` | 880233503072-... | From .env.local |
| `GOOGLE_CLIENT_SECRET` | GOCSPX-... | From .env.local |
| `GITHUB_CLIENT_ID` | Ov23litG3MK2TgMH8BWj | From .env.local |
| `GITHUB_CLIENT_SECRET` | 7e38521381c00491... | From .env.local |
| `SMTP_HOST` | smtp.gmail.com | From .env.local |
| `SMTP_PORT` | 587 | From .env.local |
| `SMTP_USER` | tsedeniyafisehaw@gmail.com | From .env.local |
| `SMTP_PASS` | zpuq dknd bxii xaxz | From .env.local (app password) |
| `FROM_EMAIL` | noreply@localhost.com | From .env.local |
| `ADMIN_EMAIL` | your-email@gmail.com | Your email address |
| `SENTRY_DSN` | https://10c9af94a4fe74388... | From .env.local |
| `NEXT_PUBLIC_SENTRY_DSN` | https://10c9af94a4fe74388... | From .env.local |

### 4. For Each Variable:
1. Click **Add New**
2. Enter the **Name** (e.g., `DATABASE_URL`)
3. Enter the **Value** (e.g., your database URL)
4. Select **Production** (or all environments)
5. Click **Save**

### 5. Verify All Variables Are Added
- Scroll through the list
- Confirm all 20 variables are present
- Check that no values are truncated

---

## Deployment

### Option A: Manual Redeploy (Recommended)
1. In Vercel dashboard, click **Deployments** tab
2. Find the latest deployment
3. Click the **...** menu
4. Click **Redeploy**
5. Confirm redeploy

### Option B: Git Push (Automatic)
```bash
# Make a small change to trigger redeploy
echo "# Deployment" >> README.md

# Commit and push
git add README.md
git commit -m "Trigger deployment with environment variables"
git push origin main
```

---

## Monitor Build

### 1. Watch Build Progress
- In Vercel dashboard, click **Deployments** tab
- Click the latest deployment
- Watch the build logs in real-time

### 2. Check for Errors
Look for these specific errors:
- ❌ "STRIPE_SECRET_KEY is not set" → Add the variable
- ❌ "NEXTAUTH_SECRET is not set" → Add the variable
- ❌ "DATABASE_URL is not set" → Add the variable
- ❌ "NEXTAUTH_URL is not set" → Add the variable

### 3. Build Success
You should see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing deployment
```

---

## Post-Deployment Testing

### 1. Visit Your Site
- Go to your Vercel domain
- Verify the site loads without errors
- Check browser console for errors (F12)

### 2. Test Authentication
- Click "Sign In"
- Test credentials login (if you have test account)
- Test Google OAuth (if configured)
- Test GitHub OAuth (if configured)

### 3. Test Checkout Flow
- Add products to cart
- Go to checkout
- Verify Stripe payment form loads
- **DO NOT complete payment** (use test card if you do)
- Test card: `4242 4242 4242 4242` (test mode only)

### 4. Test Admin Dashboard
- Sign in with your admin email
- Go to `/admin`
- Verify you can access admin dashboard
- Check products, categories, orders pages

### 5. Test Email Features
- Try password reset
- Check your email for reset link
- Try email verification (if applicable)

### 6. Check Logs
- In Vercel dashboard, click **Deployments**
- Click your deployment
- Click **Logs** tab
- Look for any errors or warnings

---

## Troubleshooting

### Build Fails with "STRIPE_SECRET_KEY is not set"
**Solution**: 
1. Go to Vercel Settings → Environment Variables
2. Add `STRIPE_SECRET_KEY` with your test key
3. Click Redeploy

### Build Fails with "NEXTAUTH_SECRET is not set"
**Solution**:
1. Generate a new secret: `openssl rand -base64 32`
2. Go to Vercel Settings → Environment Variables
3. Add `NEXTAUTH_SECRET` with the generated value
4. Click Redeploy

### Site Loads but Shows Errors
**Solution**:
1. Check Vercel deployment logs for errors
2. Check browser console (F12) for errors
3. Verify all environment variables are set correctly
4. Check that variable values don't have typos or extra spaces

### Stripe Checkout Not Working
**Solution**:
1. Verify `STRIPE_SECRET_KEY` is set correctly
2. Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly
3. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
4. Check Stripe dashboard for webhook errors

### Email Not Sending
**Solution**:
1. Verify `SMTP_USER` and `SMTP_PASS` are correct
2. Verify you're using Gmail app password (not regular password)
3. Check Gmail account for "Less secure app access" settings
4. Check Vercel logs for email errors

### Admin Dashboard Not Accessible
**Solution**:
1. Verify `ADMIN_EMAIL` is set to your email
2. Sign in with that email address
3. Go to `/admin`
4. Check browser console for errors

---

## Rollback Plan

If critical issues occur:

1. **Identify the problem** from Vercel logs
2. **Revert deployment**:
   - Go to Vercel Deployments tab
   - Find the previous working deployment
   - Click **...** menu
   - Click **Promote to Production**
3. **Fix locally**:
   - Update the problematic code
   - Test locally
   - Commit and push
4. **Redeploy**:
   - New deployment will be created automatically
   - Monitor build logs

---

## Success Criteria

Your deployment is successful when:

- ✅ Build completes without errors
- ✅ Site loads at your Vercel domain
- ✅ No console errors in browser
- ✅ Authentication works (at least credentials)
- ✅ Admin dashboard is accessible
- ✅ Checkout page loads (Stripe form visible)
- ✅ No errors in Vercel deployment logs

---

## Next Steps After Deployment

1. **Monitor for 24 hours**
   - Check Vercel logs for errors
   - Monitor Sentry for exceptions
   - Test key features periodically

2. **Set up custom domain** (optional)
   - Go to Vercel Settings → Domains
   - Add your custom domain
   - Update DNS records

3. **Switch to Stripe Live Keys** (when ready)
   - Get live keys from Stripe dashboard
   - Update `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Update `STRIPE_WEBHOOK_SECRET` for live webhook
   - Redeploy

4. **Set up monitoring**
   - Configure Sentry alerts
   - Set up uptime monitoring
   - Configure email alerts

5. **Backup database**
   - Set up automated backups in Supabase
   - Test restore procedure

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- NextAuth.js Docs: https://next-auth.js.org
- Stripe Docs: https://stripe.com/docs
- Prisma Docs: https://www.prisma.io/docs

