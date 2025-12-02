# Database Connection Issue - Fix Guide

## The Problem

You're seeing this error:
```
Can't reach database server at aws-1-eu-west-1.pooler.supabase.com:6543
Please make sure your database server is running at aws-1-eu-west-1.pooler.supabase.com:6543
```

This means your application can't connect to the Supabase PostgreSQL database.

## Why This Happens

1. **Supabase is down** - Service temporarily unavailable
2. **Wrong connection string** - Credentials or host incorrect
3. **Network issue** - Can't reach the server
4. **Database not running** - Project paused or deleted
5. **Firewall/IP blocking** - Network restrictions

## Quick Fixes

### Fix 1: Restart Everything

```bash
# Stop dev server (Ctrl+C)

# Clear cache
rm -r .next
rm -r node_modules/.cache

# Restart
npm run dev
```

### Fix 2: Check Connection String

Open `.env.local` and verify:

```
DATABASE_URL="postgresql://postgres.mfgcdgugpestoseatiuy:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

Check:
- ✅ Username is correct
- ✅ Password is URL-encoded (% signs)
- ✅ Host is correct
- ✅ Port is 6543 (pooler) or 5432 (direct)
- ✅ Database name is "postgres"

### Fix 3: Test Supabase Connection

1. Go to https://supabase.com
2. Login to your account
3. Check if your project is active
4. Check if database is running
5. Verify connection string in Supabase dashboard

### Fix 4: Use Direct Connection

If pooler connection fails, try direct connection:

```env
# In .env.local, change DATABASE_URL to:
DATABASE_URL="postgresql://postgres.mfgcdgugpestoseatiuy:NewVersion%241321%25@aws-1-eu-west-1.supabase.com:5432/postgres"
```

Note: Change port from 6543 to 5432 and remove `?pgbouncer=true`

### Fix 5: Regenerate Connection String

1. Go to Supabase dashboard
2. Project Settings → Database
3. Copy the connection string
4. Update `.env.local`
5. Restart dev server

## Step-by-Step Troubleshooting

### Step 1: Check Supabase Status
```bash
# Try to connect with psql (if installed)
psql "postgresql://postgres.mfgcdgugpestoseatiuy:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres"

# If this works, database is up
# If not, Supabase might be down
```

### Step 2: Check Environment Variables
```bash
# Verify .env.local is loaded
npm run dev

# In browser console, check if env vars are set
# (They shouldn't be visible for security, but check server logs)
```

### Step 3: Check Prisma Connection
```bash
# Try to generate Prisma client
npm run prisma:generate

# Try to open Prisma Studio
npm run prisma:studio

# If either works, database is connected
```

### Step 4: Check Network
```bash
# Try to ping the host
ping aws-1-eu-west-1.pooler.supabase.com

# If timeout, network issue
# If responds, network is OK
```

### Step 5: Check Firewall
- Check if your ISP blocks port 6543
- Try VPN if blocked
- Try different network (mobile hotspot)
- Contact ISP if needed

## Common Issues & Solutions

### Issue: "Connection refused"
**Cause**: Database server not running
**Solution**: 
- Check Supabase project is active
- Restart Supabase project
- Check if project is paused

### Issue: "Authentication failed"
**Cause**: Wrong password or username
**Solution**:
- Verify credentials in Supabase
- Check password is URL-encoded
- Regenerate connection string

### Issue: "Connection timeout"
**Cause**: Network can't reach server
**Solution**:
- Check internet connection
- Try different network
- Check firewall settings
- Try VPN

### Issue: "Database does not exist"
**Cause**: Wrong database name
**Solution**:
- Check database name is "postgres"
- Verify in Supabase dashboard
- Regenerate connection string

### Issue: "Too many connections"
**Cause**: Connection pool exhausted
**Solution**:
- Restart dev server
- Close other connections
- Increase pool size in connection string

## For Development

### Use Local PostgreSQL (Optional)

If Supabase keeps failing, use local PostgreSQL:

1. **Install PostgreSQL**
   ```bash
   # Windows: Download from postgresql.org
   # Mac: brew install postgresql
   # Linux: sudo apt-get install postgresql
   ```

2. **Start PostgreSQL**
   ```bash
   # Windows: Services → PostgreSQL
   # Mac: brew services start postgresql
   # Linux: sudo service postgresql start
   ```

3. **Create Database**
   ```bash
   createdb hyperclean
   ```

4. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/hyperclean"
   DIRECT_URL="postgresql://postgres:password@localhost:5432/hyperclean"
   ```

5. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```

## For Production

### Use Supabase (Recommended)

1. **Verify Project is Active**
   - Go to Supabase dashboard
   - Check project status
   - Ensure database is running

2. **Use Connection Pooling**
   - Use pooler connection (port 6543)
   - Set pool size appropriately
   - Monitor connection usage

3. **Monitor Connections**
   - Check Supabase dashboard
   - Monitor active connections
   - Set up alerts

4. **Backup Database**
   - Enable automated backups
   - Test restore process
   - Keep backups secure

## Monitoring

### Check Database Health
```bash
# Open Prisma Studio
npm run prisma:studio

# If it opens, database is healthy
# If it fails, database has issues
```

### Check Connection Logs
```bash
# Enable Prisma logging
# In src/lib/prisma.ts, change:
log: ["error", "warn", "info", "query"]

# Restart dev server
npm run dev

# Check console for connection logs
```

### Monitor in Production
- Set up Sentry for error tracking
- Monitor database metrics in Supabase
- Set up alerts for connection failures
- Log all database errors

## When to Contact Support

Contact Supabase support if:
- Database is down for extended period
- Can't access Supabase dashboard
- Connection string is invalid
- Database is corrupted
- Need to restore from backup

## Quick Reference

| Issue | Solution |
|-------|----------|
| Can't connect | Restart dev server |
| Wrong credentials | Check .env.local |
| Database down | Check Supabase status |
| Connection timeout | Check network/firewall |
| Too many connections | Restart server |
| Wrong database | Verify database name |
| Authentication failed | Regenerate connection string |
| Port blocked | Try different port or VPN |

## Next Steps

1. Try Fix 1 (restart everything)
2. If still failing, try Fix 2 (check connection string)
3. If still failing, try Fix 3 (check Supabase)
4. If still failing, try Fix 4 (use direct connection)
5. If still failing, contact Supabase support

Once database is connected:
- Signup/login will work
- Profile page will load
- Orders will be saved
- All features will work
