# 🔄 Switch to Direct Connection (Faster Performance)

## Current Status

✅ **Prisma IS Connected** - Connection is working  
⚠️ **Using Pooler (Port 6543)** - Very slow (8+ seconds)  
✅ **All Tables Exist** - 13 tables found  
✅ **Database Working** - All queries successful

## Why Switch to Direct Connection?

- **Pooler (6543):** 8+ seconds latency - Very slow
- **Direct (5432):** ~1 second latency - Much faster

**Recommendation:** Use direct connection for development, pooler for production.

---

## How to Switch

### Step 1: Get Your Direct Connection String

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Find **Connection string** section
5. Select **Direct connection** (not Transaction pooler)
6. Copy the connection string

**Format:**
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].supabase.com:5432/postgres
```

**Note:** 
- Port should be **5432** (not 6543)
- Host should be `aws-0-[region].supabase.com` (not `pooler.supabase.com`)
- No `?pgbouncer=true` parameter

---

### Step 2: Update .env.local

Open `.env.local` and update:

```env
# Change from pooler (slow):
DATABASE_URL="postgresql://...@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# To direct connection (fast):
DATABASE_URL="postgresql://...@aws-0-eu-west-1.supabase.com:5432/postgres"

# Also update DIRECT_URL (for migrations):
DIRECT_URL="postgresql://...@aws-0-eu-west-1.supabase.com:5432/postgres"
```

**Key Changes:**
- Port: `6543` → `5432`
- Host: `pooler.supabase.com` → `supabase.com` (remove "pooler")
- Remove: `?pgbouncer=true` parameter
- Use `aws-0-` instead of `aws-1-` (if available)

---

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

### Step 4: Verify Connection

```bash
# Check connection speed
npm run check:db
```

You should see:
- ✅ Latency: ~500-1000ms (instead of 8000ms+)
- ✅ Performance: Good/Excellent (instead of Very Slow)

---

## Quick Switch Script

I've created a helper script to check your connection string format:

```bash
# Check current connection
npm run check:db
```

This will show you:
- Current connection type (pooler vs direct)
- Current latency
- Recommendations

---

## Connection String Examples

### ❌ Pooler (Slow - Current)
```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### ✅ Direct (Fast - Recommended)
```env
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu-west-1.supabase.com:5432/postgres"
```

**Differences:**
- `pooler.supabase.com` → `supabase.com`
- Port `6543` → `5432`
- Remove `?pgbouncer=true`
- `aws-1-` → `aws-0-` (if available)

---

## When to Use Each

### Direct Connection (Port 5432) - Development
- ✅ Faster queries (~1 second)
- ✅ Better for development
- ✅ No connection pool limits
- ⚠️ Not recommended for production with high traffic

### Pooler Connection (Port 6543) - Production
- ✅ Better connection management
- ✅ Handles high traffic
- ✅ Connection pooling
- ⚠️ Slower (~8 seconds)

**Recommendation:**
- **Development:** Use direct connection (5432)
- **Production:** Use pooler connection (6543)

---

## Troubleshooting

### Issue: "Can't reach database server"

**Solution:**
1. Check if you're using the correct host (`aws-0-` vs `aws-1-`)
2. Verify port is 5432 (not 6543)
3. Check if password is URL-encoded
4. Try the connection string from Supabase dashboard

### Issue: "Connection timeout"

**Solution:**
1. Check network connection
2. Try different network (mobile hotspot)
3. Check firewall settings
4. Verify Supabase project is active

### Issue: "Authentication failed"

**Solution:**
1. Regenerate connection string in Supabase
2. Check password encoding
3. Verify username is correct

---

## Verification

After switching, run:

```bash
npm run check:db
```

Expected results:
- ✅ Latency: 500-2000ms (much better!)
- ✅ Performance: Good/Excellent
- ✅ All tests passing

---

## Current Connection Status

**From last check:**
- ✅ Prisma Connected: Yes
- ⚠️ Connection Type: Pooler (6543)
- ⚠️ Latency: 8+ seconds (Very Slow)
- ✅ Tables: 13 tables found
- ✅ Database: Working

**After switching to direct:**
- ✅ Prisma Connected: Yes
- ✅ Connection Type: Direct (5432)
- ✅ Latency: ~1 second (Much Faster!)
- ✅ Tables: 13 tables found
- ✅ Database: Working

---

**Status:** Ready to switch  
**Action Required:** Update DATABASE_URL in .env.local  
**Expected Improvement:** 8x faster queries (8s → 1s)

