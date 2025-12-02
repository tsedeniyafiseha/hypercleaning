# 🚀 Complete Vercel Deployment Guide + MyHost Domain

## Part 1: Prepare Your Code for Deployment

### Step 1: Create .gitignore file

Make sure you have a `.gitignore` file with these entries:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
.vercel

# Environment variables
.env
.env*.local
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
*.pem

# IDE
.vscode/
.idea/

# Misc
*.log
.cache/
```

### Step 2: Update package.json scripts

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "prisma:seed": "tsx prisma/seed.ts"
  }
}
```

### Step 3: Create GitHub Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

2. **Create repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `hyper-cleaning-supplies` (or your choice)
   - Make it Private or Public
   - Don't initialize with README (you already have code)
   - Click "Create repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

---

## Part 2: Set Up Production Database (Supabase - FREE)

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest)

### Step 2: Create New Project

1. Click "New Project"
2. Fill in details:
   - **Name**: `hyper-cleaning-db` (or your choice)
   - **Database Password**: Generate a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
3. Click "Create new project"
4. Wait 2-3 minutes for database to provision

### Step 3: Get Database Connection String

1. In Supabase dashboard, go to **Settings** (gear icon)
2. Click **Database** in left sidebar
3. Scroll to **Connection string** section
4. Select **Connection pooling** tab
5. Mode: **Transaction**
6. Copy the connection string (looks like):
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```
7. Replace `[YOUR-PASSWORD]` with the password you saved earlier
8. **SAVE THIS CONNECTION STRING** - you'll need it for Vercel

---

## Part 3: Set Up Cloudinary (Image Uploads - FREE)

### Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up (free tier is generous)
3. Verify your email

### Step 2: Get API Credentials

1. Go to Dashboard
2. You'll see:
   - **Cloud Name**: `your-cloud-name`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`
3. **SAVE THESE** - you'll need them for Vercel

---

## Part 4: Set Up Stripe (Payments)

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Sign up for account
3. Complete business verification (can use test mode first)

### Step 2: Get API Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key**: `pk_test_...` (for testing) or `pk_live_...` (for production)
   - **Secret key**: `sk_test_...` (for testing) or `sk_live_...` (for production)
3. **SAVE THESE**

### Step 3: Get Webhook Secret (We'll do this after Vercel deployment)

---

## Part 5: Deploy to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Find your repository in the list
3. Click "Import"

### Step 3: Configure Project Settings

**Framework Preset**: Next.js (should auto-detect)
**Root Directory**: `./` (leave as default)
**Build Command**: `npm run build` (default)
**Output Directory**: `.next` (default)
**Install Command**: `npm install` (default)

### Step 4: Add Environment Variables

Click "Environment Variables" and add these one by one:

#### Database
```
DATABASE_URL
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

#### NextAuth
```
NEXTAUTH_SECRET
[Generate random 32-character string - use: https://generate-secret.vercel.app/32]

NEXTAUTH_URL
https://your-vercel-app.vercel.app
(We'll update this with your domain later)
```

#### Admin
```
ADMIN_EMAIL
admin@yourdomain.com
```

#### Stripe
```
STRIPE_SECRET_KEY
sk_test_your_stripe_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_your_stripe_publishable_key

STRIPE_WEBHOOK_SECRET
whsec_placeholder
(We'll update this after setting up webhook)
```

#### Email (Gmail SMTP)
```
EMAIL_HOST
smtp.gmail.com

EMAIL_PORT
587

EMAIL_USER
your-email@gmail.com

EMAIL_PASSWORD
your-gmail-app-password
(Get from: https://myaccount.google.com/apppasswords)

FROM_EMAIL
noreply@yourdomain.com
```

#### Cloudinary
```
CLOUDINARY_CLOUD_NAME
your-cloud-name

CLOUDINARY_API_KEY
your-api-key

CLOUDINARY_API_SECRET
your-api-secret
```

#### OAuth (Optional - can add later)
```
GOOGLE_CLIENT_ID
your-google-client-id

GOOGLE_CLIENT_SECRET
your-google-client-secret

GITHUB_CLIENT_ID
your-github-client-id

GITHUB_CLIENT_SECRET
your-github-client-secret
```

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-5 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your site

Your app is now live at: `https://your-project-name.vercel.app`

---

## Part 6: Run Database Migrations

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login and Link Project

```bash
# Login to Vercel
vercel login

# Link to your project
vercel link
```

Follow prompts:
- Link to existing project? **Yes**
- What's your project name? **[select your project]**

### Step 3: Pull Environment Variables

```bash
vercel env pull .env.production
```

### Step 4: Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database with categories and sample products
npx prisma db seed
```

---

## Part 7: Create Admin User

### Option 1: Using Script

1. Update `scripts/create-admin.ts` with your admin email
2. Run:
```bash
npx tsx scripts/create-admin.ts
```

### Option 2: Manual Database Insert

1. Go to Supabase Dashboard → SQL Editor
2. Run this query (replace with your details):

```sql
INSERT INTO "User" (email, name, "passwordHash", role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  'admin@yourdomain.com',
  'Admin User',
  '$2a$10$YourHashedPasswordHere',
  'admin',
  NOW(),
  NOW(),
  NOW()
);
```

To generate password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

---

## Part 8: Configure Stripe Webhook

### Step 1: Add Webhook in Stripe

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Endpoint URL: `https://your-project-name.vercel.app/api/checkout/webhook`
4. Description: "Order completion webhook"
5. Select events to listen to:
   - ✅ `checkout.session.completed`
6. Click **"Add endpoint"**

### Step 2: Get Webhook Secret

1. Click on your newly created webhook
2. Click **"Reveal"** under "Signing secret"
3. Copy the secret (starts with `whsec_`)

### Step 3: Update Vercel Environment Variable

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `STRIPE_WEBHOOK_SECRET`
3. Click **Edit**
4. Paste the webhook secret
5. Click **Save**
6. Go to **Deployments** tab
7. Click **"..."** on latest deployment → **"Redeploy"**

---

## Part 9: Connect Your MyHost Domain

### Step 1: Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `yourdomain.com`
4. Click **"Add"**

Vercel will show you DNS records to add.

### Step 2: Configure DNS in MyHost cPanel

1. **Login to MyHost cPanel**
2. Find **"Zone Editor"** or **"Advanced DNS Zone Editor"**
3. Select your domain

4. **Add A Record for root domain**:
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP)
   - TTL: `3600` (or Auto)
   - Click **"Add Record"**

5. **Add CNAME Record for www**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com.` (note the dot at the end)
   - TTL: `3600` (or Auto)
   - Click **"Add Record"**

### Step 3: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours
- Usually takes 15-60 minutes
- Check status: https://dnschecker.org

### Step 4: Verify Domain in Vercel

1. Go back to Vercel → Domains
2. Wait for verification (automatic)
3. Once verified, Vercel will provision SSL certificate (automatic)
4. Your site will be live at `https://yourdomain.com`

### Step 5: Update Environment Variables

1. Go to Vercel → Settings → Environment Variables
2. Update `NEXTAUTH_URL`:
   - Old: `https://your-project-name.vercel.app`
   - New: `https://yourdomain.com`
3. Click **Save**
4. Redeploy the application

---

## Part 10: Final Testing

### Test These Features:

1. **Homepage**: Visit `https://yourdomain.com`
2. **Products**: Browse `/shop`
3. **Sign Up**: Create new account
4. **Email Verification**: Check email and verify
5. **Sign In**: Login with credentials
6. **Add to Cart**: Add products
7. **Checkout**: Complete test purchase (use Stripe test card: `4242 4242 4242 4242`)
8. **Order Confirmation**: Check email
9. **Admin Dashboard**: Login at `/admin` with admin credentials
10. **Product Management**: Add/edit products

### Stripe Test Cards:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- Any future expiry date, any CVC

---

## 🎉 Deployment Complete!

Your e-commerce site is now live at:
- **Main Domain**: `https://yourdomain.com`
- **Vercel URL**: `https://your-project-name.vercel.app`

### Automatic Deployments

Every time you push to GitHub `main` branch, Vercel will automatically:
1. Build your app
2. Run tests
3. Deploy to production
4. Update your domain

### Useful Commands

```bash
# Deploy from CLI
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull

# Run migrations on production
npx prisma migrate deploy
```

---

## 📊 Monitoring & Maintenance

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- Manage environment variables

### Supabase Dashboard
- View database tables
- Run SQL queries
- Monitor database performance
- Manage backups

### Stripe Dashboard
- View transactions
- Manage customers
- Handle refunds
- Monitor webhooks

---

## 🆘 Troubleshooting

### Issue: Build Failed
- Check Vercel deployment logs
- Verify all environment variables are set
- Ensure `package.json` scripts are correct

### Issue: Database Connection Error
- Verify DATABASE_URL is correct
- Check Supabase database is running
- Ensure connection pooling is enabled

### Issue: Domain Not Working
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records in MyHost cPanel
- Check domain verification in Vercel

### Issue: Stripe Webhook Not Working
- Verify webhook URL is correct
- Check STRIPE_WEBHOOK_SECRET is set
- Test webhook in Stripe dashboard

### Issue: Emails Not Sending
- Verify Gmail app password is correct
- Check EMAIL_* environment variables
- Enable "Less secure app access" in Gmail (if needed)

---

## 🎯 Next Steps

1. ✅ Test all features thoroughly
2. ✅ Add your products via admin dashboard
3. ✅ Configure shipping rates
4. ✅ Set up Google Analytics (optional)
5. ✅ Enable Sentry error tracking (optional)
6. ✅ Set up automated backups
7. ✅ Configure email templates
8. ✅ Add terms of service and privacy policy

---

**Congratulations! Your e-commerce store is live! 🚀**
