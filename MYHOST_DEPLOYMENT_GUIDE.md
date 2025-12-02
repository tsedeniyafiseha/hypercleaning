# 🚀 Complete Deployment Guide for MyHost (cPanel/Shared Hosting)

## Overview
This guide will help you deploy your Next.js e-commerce application to a shared hosting provider like MyHost that uses cPanel.

**Important Note:** Next.js requires Node.js runtime, which most shared hosting doesn't support well. You have two options:

### Option A: Deploy to Vercel (Recommended - FREE)
Vercel is made by the creators of Next.js and offers the best performance. Then point your MyHost domain to Vercel.

### Option B: Deploy to MyHost VPS/Cloud
If MyHost offers VPS or cloud hosting with Node.js support.

---

## 🎯 OPTION A: Deploy to Vercel + Use MyHost Domain (RECOMMENDED)

This is the easiest and most reliable option. Vercel is free for hobby projects.

### Step 1: Prepare Your Code

1. **Create a GitHub repository** (if you haven't already):
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

2. **Create `.gitignore`** (ensure these are NOT committed):
```
node_modules/
.next/
.env
.env.local
.env.production
*.log
.DS_Store
```

### Step 2: Set Up Production Database

**Option 1: Use Supabase (FREE)**
1. Go to https://supabase.com
2. Create new project
3. Wait for database to provision
4. Go to Settings → Database
5. Copy the connection string (Connection pooling → Transaction mode)
6. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`

**Option 2: Use Railway (FREE tier available)**
1. Go to https://railway.app
2. Create new project → Provision PostgreSQL
3. Copy the DATABASE_URL

**Option 3: Use MyHost Database (if they offer PostgreSQL)**
1. Log into cPanel
2. Create PostgreSQL database
3. Note the connection details

### Step 3: Deploy to Vercel

1. **Go to https://vercel.com**
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables** (click "Environment Variables"):

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth
NEXTAUTH_SECRET=generate-a-random-32-char-string
NEXTAUTH_URL=https://yourdomain.com

# Admin
ADMIN_EMAIL=admin@yourdomain.com

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FROM_EMAIL=noreply@yourdomain.com

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

7. Click **"Deploy"**

8. Wait for deployment (2-5 minutes)

### Step 4: Run Database Migrations

After first deployment:

1. Go to your Vercel project → Settings → General
2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Link your project:
```bash
vercel link
```

5. Run migrations:
```bash
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

### Step 5: Point Your MyHost Domain to Vercel

1. **Get Vercel's DNS records:**
   - Go to your Vercel project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain: `yourdomain.com`
   - Vercel will show you DNS records to add

2. **Configure DNS in MyHost cPanel:**
   - Log into MyHost cPanel
   - Go to "Zone Editor" or "DNS Management"
   - Add these records (Vercel will provide exact values):

   **For root domain (yourdomain.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel's IP)
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5 minutes to 48 hours, usually ~1 hour)

4. **Verify in Vercel:**
   - Go back to Vercel → Domains
   - Click "Verify" on your domain
   - Once verified, Vercel will automatically provision SSL certificate

### Step 6: Create Admin User

1. SSH into your local machine or use Vercel CLI:
```bash
# Update scripts/create-admin.ts with your admin email
# Then run:
vercel env pull
npx tsx scripts/create-admin.ts
```

Or manually create in database:
```sql
INSERT INTO "User" (email, name, "passwordHash", role, "emailVerified")
VALUES (
  'admin@yourdomain.com',
  'Admin',
  '$2a$10$hashed-password-here',
  'admin',
  NOW()
);
```

### Step 7: Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/checkout/webhook`
4. Select events: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add to Vercel environment variables:
   - Go to Vercel → Settings → Environment Variables
   - Add `STRIPE_WEBHOOK_SECRET=whsec_...`
   - Redeploy

### Step 8: Test Your Deployment

Visit these URLs:
- `https://yourdomain.com` - Homepage
- `https://yourdomain.com/shop` - Products
- `https://yourdomain.com/signin` - Login
- `https://yourdomain.com/admin` - Admin (use admin credentials)

---

## 🖥️ OPTION B: Deploy to MyHost VPS/Cloud Server

If MyHost offers VPS with SSH access and Node.js support:

### Step 1: Server Requirements

Your server needs:
- Ubuntu 20.04+ or similar Linux
- Node.js 18+ 
- PostgreSQL 14+
- Nginx (reverse proxy)
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

### Step 2: Connect to Server

```bash
ssh username@your-server-ip
```

### Step 3: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### Step 4: Set Up PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
\q
```

### Step 5: Clone and Set Up Application

```bash
# Create app directory
sudo mkdir -p /var/www/ecommerce
sudo chown $USER:$USER /var/www/ecommerce
cd /var/www/ecommerce

# Clone your repository
git clone https://github.com/yourusername/your-repo.git .

# Install dependencies
npm install

# Create production environment file
nano .env.production
```

Add your environment variables:
```env
DATABASE_URL=postgresql://ecommerce_user:your-secure-password@localhost:5432/ecommerce_db
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
# ... add all other variables
```

### Step 6: Build and Run

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Build application
npm run build

# Start with PM2
pm2 start npm --name "ecommerce" -- start
pm2 save
pm2 startup
```

### Step 7: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/ecommerce
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

### Step 9: Configure Domain DNS

In MyHost cPanel:
1. Go to DNS Management
2. Add A record:
   ```
   Type: A
   Name: @
   Value: your-server-ip
   TTL: 3600
   ```
3. Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   TTL: 3600
   ```

---

## 📋 Post-Deployment Checklist

- [ ] Application accessible at your domain
- [ ] SSL certificate working (https://)
- [ ] Database migrations completed
- [ ] Admin user created
- [ ] Stripe webhook configured
- [ ] Email sending working
- [ ] Test user registration
- [ ] Test product browsing
- [ ] Test checkout flow
- [ ] Test admin dashboard

---

## 🔧 Troubleshooting

### Issue: "Application Error" on Vercel
- Check Vercel logs: Project → Deployments → Click deployment → View Function Logs
- Verify all environment variables are set
- Check DATABASE_URL is correct

### Issue: Database connection failed
- Verify DATABASE_URL format
- Check database is accessible from Vercel (whitelist Vercel IPs if needed)
- For Supabase: Use connection pooling URL

### Issue: Domain not pointing to Vercel
- Wait for DNS propagation (up to 48 hours)
- Check DNS records are correct: `dig yourdomain.com`
- Clear browser cache

### Issue: Stripe webhook not working
- Verify webhook URL is correct
- Check STRIPE_WEBHOOK_SECRET is set
- Test webhook in Stripe dashboard

---

## 💡 Recommendations

1. **Use Vercel** - It's free, fast, and made for Next.js
2. **Use Supabase** for database - Free tier is generous
3. **Use Cloudinary** for images - Free tier available
4. **Set up monitoring** - Use Vercel Analytics or Sentry
5. **Enable automatic deployments** - Push to GitHub = auto deploy

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs

Your application is production-ready and can be deployed following this guide!
