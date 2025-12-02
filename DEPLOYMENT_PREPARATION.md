# Deployment Preparation Checklist

## ✅ Fixed Issues
- [x] Cleared corrupted `.next` build folder
- [x] Regenerated Prisma client
- [x] Development server ready

## 🚀 Pre-Deployment Steps

### 1. Environment Variables (CRITICAL)
Update `.env.production` with:
- [ ] `NEXTAUTH_SECRET` - Generate new: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Your production domain
- [ ] `STRIPE_SECRET_KEY` - Switch to LIVE keys (not test)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - LIVE publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Create webhook at dashboard.stripe.com
- [ ] `ADMIN_EMAIL` - Your real admin email
- [ ] `FROM_EMAIL` - Your domain email (e.g., noreply@yourdomain.com)

### 2. Database (Supabase - Already Configured)
- [x] Supabase PostgreSQL connection configured
- [ ] Run migrations: `npm run db:migrate:deploy`
- [ ] Seed database: `npm run prisma:seed`

### 3. Build Test
```bash
npm run build
npm start
```

### 4. Deployment Platform Setup

#### Option A: Vercel (Recommended)
1. Connect GitHub repo
2. Add environment variables from `.env.production.template`
3. Deploy automatically

#### Option B: Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables

### 5. Post-Deployment
- [ ] Test authentication (Google, GitHub, Email)
- [ ] Test checkout flow with Stripe
- [ ] Verify email sending works
- [ ] Test admin dashboard access
- [ ] Check image uploads (Cloudinary)

## ⚠️ Known Warnings (Safe to Ignore)
- OpenTelemetry/Sentry webpack warnings - These are normal and don't affect functionality

## 📝 Quick Commands
```bash
# Clean build
npm run build

# Test production locally
npm start

# Database migrations
npm run db:migrate:deploy

# Check production readiness
npm run check:production
```

## 🔗 Important Links
- Stripe Dashboard: https://dashboard.stripe.com
- Supabase Dashboard: https://supabase.com/dashboard
- Cloudinary Dashboard: https://cloudinary.com/console

## Status: ✅ READY FOR DEPLOYMENT
Your app is configured and ready. Just update production environment variables and deploy!
