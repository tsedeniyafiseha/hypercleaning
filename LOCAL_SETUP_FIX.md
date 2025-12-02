# Local Development Setup - Quick Fix

## The Problem

You're getting "Can't reach database server" error locally. This means:
1. Supabase is down/unreachable
2. Your connection string is wrong
3. Network is blocking the connection
4. Prisma client isn't initialized

## Quick Fixes (Try in Order)

### Fix 1: Restart Everything (30 seconds)
```bash
# Stop dev server (Ctrl+C)

# Clear cache
rm -r .next
rm -r node_modules/.cache

# Restart
npm run dev
```

**Why**: Sometimes Prisma client doesn't initialize properly on first run.

---

### Fix 2: Regenerate Prisma Client (1 minute)
```bash
npm run prisma:generate
```

**Why**: Prisma needs to generate the client from your schema.

---

### Fix 3: Test Supabase Connection (2 minutes)

Check if Supabase is actually running:

```bash
# Try to open Prisma Studio
npm run prisma:studio
```

If this opens a browser window with your database, Supabase is working.

If it fails, Supabase is down or unreachable.

---

### Fix 4: Use Local PostgreSQL Instead (5 minutes)

If Supabase keeps failing, use local PostgreSQL:

**Step 1: Install PostgreSQL**
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql
```

**Step 2: Start PostgreSQL**
```bash
# Windows: Services → PostgreSQL (should auto-start)
# Mac: brew services start postgresql
# Linux: sudo service postgresql start
```

**Step 3: Create Database**
```bash
createdb hyperclean
```

**Step 4: Update .env.local**

Replace these lines:
```env
DATABASE_URL="postgresql://postgres.mfgcdgugpestoseatiuy:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.mfgcdgugpestoseatiuy:NewVersion%241321%25@aws-1-eu-west-1.supabase.com:5432/postgres"
```

With:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/hyperclean"
DIRECT_URL="postgresql://postgres:password@localhost:5432/hyperclean"
```

**Step 5: Run Migrations**
```bash
npm run prisma:migrate
```

**Step 6: Restart Dev Server**
```bash
npm run dev
```

---

## Which Fix to Use?

| Situation | Fix |
|-----------|-----|
| First time running | Fix 1 (Restart) |
| After pulling code | Fix 2 (Generate) |
| Want to verify DB | Fix 3 (Test) |
| Supabase keeps failing | Fix 4 (Local DB) |

---

## My Recommendation

**For now, use Fix 4 (Local PostgreSQL)** because:
- ✅ Faster development (no network latency)
- ✅ Works offline
- ✅ No Supabase issues
- ✅ Easy to reset/clear data
- ✅ Same as production (PostgreSQL)

Then when you deploy, just switch back to Supabase.

---

## Testing After Fix

Once you get it working:

```bash
# 1. Start dev server
npm run dev

# 2. Go to http://localhost:3000

# 3. Try signup
# - Go to /signup
# - Create account
# - Should work without errors

# 4. Check profile
# - Go to /account/profile
# - Should load your profile

# 5. Check database
# - Run: npm run prisma:studio
# - Should see your user in database
```

---

## If Still Not Working

Check these in order:

1. **Is dev server running?**
   ```bash
   npm run dev
   ```
   Should show: "ready - started server on 0.0.0.0:3000"

2. **Is database running?**
   ```bash
   npm run prisma:studio
   ```
   Should open browser window

3. **Are env variables loaded?**
   - Check `.env.local` exists
   - Check DATABASE_URL is set
   - Restart dev server

4. **Is port 3000 available?**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Mac/Linux
   lsof -i :3000
   ```
   If something is using it, kill it or use different port

5. **Clear everything and restart**
   ```bash
   rm -r .next node_modules/.cache
   npm run dev
   ```

---

## For Local Development Only

You don't need to worry about:
- ❌ Production environment variables
- ❌ Deployment settings
- ❌ NEXTAUTH_SECRET (dev value is fine)
- ❌ NEXTAUTH_URL (localhost:3000 is fine)
- ❌ Email sending (can test without)
- ❌ OAuth (can test without)

Just focus on:
- ✅ Database connection
- ✅ Signup/login
- ✅ Profile page
- ✅ Orders

---

## Next Steps

1. Try Fix 1 (Restart)
2. If fails, try Fix 2 (Generate)
3. If fails, try Fix 3 (Test)
4. If fails, use Fix 4 (Local DB)
5. Test signup/login
6. Test profile page
7. You're done for local dev!

---

## When You Deploy Later

Just set environment variables on Vercel/Netlify and it will work with Supabase.

For now, focus on local development and testing.
