# Local PostgreSQL Setup - Quick Start

## ✅ Environment Variables Updated

Your `.env.local` and `.env` files have been updated to use local PostgreSQL.

## 📥 Install PostgreSQL

### Option 1: Official Installer (Recommended)
1. Download: https://www.postgresql.org/download/windows/
2. Run installer (PostgreSQL 16 recommended)
3. During installation:
   - **Port**: 5432 (default)
   - **Password**: `postgres` (or remember your choice)
   - **Locale**: Default
   - Install all components including pgAdmin

### Option 2: Using Chocolatey
```bash
choco install postgresql
```

### Option 3: Using Docker
```bash
docker run --name postgres-shopco -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=shopco -p 5432:5432 -d postgres:16
```

## 🔧 Setup Database

After PostgreSQL is installed, run these commands:

### 1. Create Database
```bash
# Connect to PostgreSQL (password: postgres)
psql -U postgres

# In psql prompt:
CREATE DATABASE shopco;
\q
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Run Migrations
```bash
npx prisma migrate dev --name init
```

This creates all tables (User, Product, Category, Order, Cart, etc.)

### 4. Seed Database with Sample Data
```bash
npm run prisma:seed
```

This adds:
- Sample categories (Cleaning Chemicals, Bathroom Care, etc.)
- Sample products with images and prices
- Test data for development

### 5. Create Admin User
```bash
npx tsx scripts/create-admin.ts
```

Creates admin account:
- Email: `admin@localhost.com`
- Password: `admin123`

## 🚀 Start Development

```bash
npm run dev
```

Visit: http://localhost:3000

## ✅ Verify Setup

1. **Homepage loads** - should show products
2. **Sign in works** - http://localhost:3000/signin
3. **Admin dashboard** - http://localhost:3000/admin (login as admin)
4. **Database has data** - Open pgAdmin and check tables

## 🔍 Troubleshooting

### PostgreSQL not running?
```bash
# Check service status
sc query postgresql-x64-16

# Start service
net start postgresql-x64-16
```

### Wrong password?
If you used a different password during installation, update `.env.local`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/shopco"
```

### Port 5432 in use?
Check what's using it:
```bash
netstat -ano | findstr :5432
```

### Can't connect?
Verify PostgreSQL is installed:
```bash
psql --version
```

Should show: `psql (PostgreSQL) 16.x`

## 📊 Database Management

### Using pgAdmin (GUI)
- Open pgAdmin (installed with PostgreSQL)
- Connect to localhost
- Browse database: shopco
- View tables, run queries, inspect data

### Using Command Line
```bash
# Connect to database
psql -U postgres -d shopco

# List tables
\dt

# Query products
SELECT * FROM "Product";

# Exit
\q
```

## 🌐 Production Deployment

For production (Vercel/Netlify), use Supabase:
- Set `DATABASE_URL` to your Supabase connection string in hosting platform
- Local PostgreSQL is only for development
- Production builds work fine with Supabase

## 📝 Summary

✅ Local PostgreSQL eliminates network/firewall issues
✅ Faster development with instant queries
✅ Full control over your data
✅ Works offline
✅ Easy to inspect and debug

Your app is now configured for local development!
