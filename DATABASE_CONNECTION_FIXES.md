# 🔧 Database Connection Fixes Applied

## ✅ Improvements Made

### 1. Enhanced Prisma Client Configuration

**File:** `src/lib/prisma.ts`

**Improvements:**
- ✅ Environment variable validation on startup
- ✅ Production-optimized logging (only errors/warnings in production)
- ✅ Connection health checking
- ✅ Automatic retry logic for connection failures
- ✅ Graceful shutdown handling
- ✅ Error handling for uncaught exceptions
- ✅ Connection retry utility function

**Features:**
- Validates `DATABASE_URL` exists before creating client
- Tests connection on startup (non-blocking)
- Automatically retries failed connections (up to 3 times)
- Properly closes connections on shutdown
- Handles connection errors gracefully

---

### 2. Database Connection Utilities

**File:** `src/lib/db-connection.ts` (NEW)

**Functions Added:**
- `validateDatabaseConnection()` - Validates connection and env vars
- `getDatabaseStatus()` - Gets current connection status
- `closeDatabaseConnection()` - Gracefully closes connection
- `healthCheck()` - Health check with latency measurement

**Usage:**
```typescript
import { validateDatabaseConnection, healthCheck } from '@/lib/db-connection';

// Validate connection
const { connected, error } = await validateDatabaseConnection();

// Health check
const { healthy, latency } = await healthCheck();
```

---

### 3. Enhanced Health Check Endpoint

**File:** `src/app/api/health/route.ts`

**Improvements:**
- ✅ Uses new database connection utilities
- ✅ Returns detailed database status
- ✅ Includes latency metrics
- ✅ Better error handling
- ✅ Standardized API responses

**Response Format:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": {
      "status": "connected",
      "responseTime": "15ms",
      "timestamp": "2024-12-..."
    },
    "latency": 15,
    "timestamp": "2024-12-...",
    "uptime": 12345,
    "environment": "development"
  }
}
```

---

## 🔍 Common Database Connection Issues & Solutions

### Issue 1: "DATABASE_URL is not set"

**Error:**
```
Error: DATABASE_URL environment variable is not set
```

**Solution:**
1. Check `.env.local` file exists
2. Verify `DATABASE_URL` is set:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```
3. Restart dev server after adding variable

---

### Issue 2: "Can't reach database server"

**Error:**
```
P1001: Can't reach database server at host:port
```

**Solutions:**

**A. Check Connection String:**
- Verify host, port, username, password are correct
- Check if password needs URL encoding (`%` for special characters)
- Ensure database name is correct

**B. Try Direct Connection:**
If using Supabase pooler (port 6543), try direct connection (port 5432):
```env
# Pooler (for production)
DATABASE_URL="postgresql://...@host:6543/db?pgbouncer=true"

# Direct (for development)
DATABASE_URL="postgresql://...@host:5432/db"
```

**C. Check Supabase Status:**
- Go to Supabase dashboard
- Verify project is active
- Check if database is paused
- Verify connection string in dashboard

**D. Network/Firewall:**
- Check if port is blocked
- Try different network (mobile hotspot)
- Check firewall settings
- Try VPN if needed

---

### Issue 3: "Connection timeout"

**Error:**
```
P1002: Connection timeout
```

**Solutions:**
1. **Check Network:**
   ```bash
   ping your-database-host.com
   ```

2. **Increase Timeout:**
   Add to connection string:
   ```env
   DATABASE_URL="postgresql://...?connect_timeout=10"
   ```

3. **Check Database Load:**
   - Database might be overloaded
   - Wait and retry
   - Check Supabase dashboard for issues

---

### Issue 4: "Too many connections"

**Error:**
```
P1000: Authentication failed or connection limit exceeded
```

**Solutions:**
1. **Close Existing Connections:**
   - Restart dev server
   - Close Prisma Studio if open
   - Check for multiple server instances

2. **Use Connection Pooling:**
   - Use Supabase pooler (port 6543)
   - Configure pool size in connection string

3. **Check Connection Limits:**
   - Supabase free tier: Limited connections
   - Upgrade plan if needed
   - Monitor connection usage

---

### Issue 5: "Authentication failed"

**Error:**
```
P1000: Authentication failed
```

**Solutions:**
1. **Verify Credentials:**
   - Check username and password
   - Ensure password is URL-encoded
   - Regenerate connection string in Supabase

2. **Check Password Encoding:**
   ```env
   # Special characters need encoding:
   # $ → %24
   # @ → %40
   # % → %25
   # etc.
   ```

3. **Regenerate Connection String:**
   - Go to Supabase dashboard
   - Project Settings → Database
   - Copy new connection string
   - Update `.env.local`

---

## 🛠️ Troubleshooting Steps

### Step 1: Verify Environment Variables

```bash
# Check if .env.local exists
ls .env.local

# Verify DATABASE_URL is set (don't show full value)
node -e "console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')"
```

### Step 2: Test Database Connection

```bash
# Test with Prisma
npx prisma db pull

# Or test with psql (if installed)
psql "your-connection-string"
```

### Step 3: Check Prisma Client

```bash
# Regenerate Prisma client
npm run prisma:generate

# Check Prisma Studio
npm run prisma:studio
```

### Step 4: Test Health Endpoint

```bash
# Test health check (if HEALTH_CHECK_TOKEN is set)
curl -H "x-health-check-token: your-token" http://localhost:3000/api/health

# Or without token (if not set)
curl http://localhost:3000/api/health
```

### Step 5: Check Logs

```bash
# Check server logs for database errors
npm run dev

# Look for:
# - Connection errors
# - Timeout errors
# - Authentication errors
```

---

## 🔧 Connection String Formats

### Supabase Pooler (Recommended for Production)
```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Supabase Direct (Recommended for Development)
```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].supabase.com:5432/postgres"
```

### Local PostgreSQL
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/database_name"
```

### With Connection Pooling Parameters
```env
DATABASE_URL="postgresql://user:pass@host:port/db?connection_limit=10&pool_timeout=20"
```

---

## 📊 Monitoring Database Connection

### Health Check Endpoint

**URL:** `/api/health`

**Response:**
- `status: "healthy"` - Database connected
- `status: "unhealthy"` - Database disconnected
- `latency` - Response time in milliseconds
- `database.status` - Connection status

### Logs

The enhanced Prisma client logs:
- Connection errors
- Query errors
- Warnings
- (In development) All queries

### Prisma Studio

```bash
npm run prisma:studio
```

Opens at `http://localhost:5555` - If it opens, database is connected.

---

## 🚀 Best Practices

### 1. Use Connection Pooling in Production
- Use Supabase pooler (port 6543)
- Configure appropriate pool size
- Monitor connection usage

### 2. Use Direct Connection in Development
- Use direct connection (port 5432)
- Faster for development
- No pool limits

### 3. Environment Variables
- Never commit `.env.local` to git
- Use different credentials for dev/prod
- Rotate passwords regularly

### 4. Error Handling
- Always handle database errors
- Use retry logic for transient errors
- Log errors for debugging

### 5. Connection Management
- Close connections properly
- Don't create multiple Prisma clients
- Use connection pooling

---

## ✅ Verification Checklist

After applying fixes, verify:

- [ ] `.env.local` file exists with `DATABASE_URL`
- [ ] Dev server starts without connection errors
- [ ] Health check endpoint returns `healthy`
- [ ] Can query database (products load on homepage)
- [ ] Can create user accounts
- [ ] Prisma Studio opens successfully
- [ ] No connection errors in logs

---

## 📝 Quick Fix Commands

```bash
# 1. Clear Prisma cache
rm -r node_modules/.prisma
# Windows: rmdir /s /q node_modules\.prisma

# 2. Regenerate Prisma client
npm run prisma:generate

# 3. Test connection
npm run prisma:studio

# 4. Restart dev server
npm run dev
```

---

## 🆘 Still Having Issues?

1. **Check Supabase Dashboard:**
   - Verify project is active
   - Check database status
   - Verify connection string

2. **Test Connection Manually:**
   ```bash
   # With psql
   psql "your-connection-string"
   
   # Or use Supabase SQL Editor
   ```

3. **Check Network:**
   - Try different network
   - Check firewall
   - Try VPN

4. **Contact Support:**
   - Supabase support (if using Supabase)
   - Check Supabase status page
   - Review error logs

---

**Status:** ✅ Database connection improvements applied  
**Last Updated:** December 2024

