# Fix Supabase Connection - Final Solution

## ✅ Good News
Your network CAN reach Supabase (HTTPS works), but PostgreSQL ports are blocked.

## 🔍 Problem Identified
- HTTPS to Supabase: ✅ Works
- PostgreSQL port 5432: ❌ Blocked
- PostgreSQL port 6543: ❌ Blocked

This is a **Windows Firewall or Antivirus** blocking outbound PostgreSQL connections.

## 🛠️ Solution 1: Get Direct Connection String (Try This First)

1. Go to: https://supabase.com/dashboard/project/dhfflpixjzwxexvflpzk
2. Click **Settings** → **Database**
3. Scroll to **Connection String**
4. Copy the **Direct connection** string (NOT pooler)
5. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres
   ```

6. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres"
   ```

## 🛠️ Solution 2: Allow PostgreSQL Through Firewall

### Windows Defender Firewall:
```powershell
# Run PowerShell as Administrator
New-NetFirewallRule -DisplayName "PostgreSQL Outbound" -Direction Outbound -Protocol TCP -RemotePort 5432,6543 -Action Allow
```

### Or manually:
1. Open **Windows Defender Firewall**
2. Click **Advanced settings**
3. Click **Outbound Rules** → **New Rule**
4. Select **Port** → **TCP**
5. Enter ports: `5432,6543`
6. Allow the connection
7. Apply to all profiles

## 🛠️ Solution 3: Disable Antivirus Temporarily

If you have antivirus software (Norton, McAfee, Avast, etc.):
1. Temporarily disable it
2. Test connection
3. If it works, add exception for Node.js/PostgreSQL

## 🛠️ Solution 4: Try IPv6 Connection

Supabase might work better with IPv6:

1. Get your project's IPv6 address from Supabase dashboard
2. Update connection string to use IPv6

## 🛠️ Solution 5: Use Supabase REST API (Alternative)

If PostgreSQL ports remain blocked, use Supabase's REST API:

```typescript
// Instead of Prisma, use Supabase client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dhfflpixjzwxexvflpzk.supabase.co',
  'YOUR_ANON_KEY'
)
```

This uses HTTPS (port 443) which works on your network.

## 🧪 Test After Each Solution

Run this to test:
```bash
npx tsx scripts/test-supabase-connection.ts
```

## 📝 Most Likely Fix

**Get the direct connection string** from Supabase dashboard:
- NOT: `aws-1-eu-west-1.pooler.supabase.com`
- USE: `db.dhfflpixjzwxexvflpzk.supabase.co`

The pooler hostname might be blocked, but the direct hostname should work.

## ⚡ Quick Test

Try this connection string format:
```
postgresql://postgres:YOUR_PASSWORD@db.dhfflpixjzwxexvflpzk.supabase.co:5432/postgres
```

Replace `YOUR_PASSWORD` with your actual Supabase database password (found in Settings → Database).

## 🎯 Action Plan

1. **First**: Get direct connection string from Supabase dashboard
2. **Second**: Allow PostgreSQL ports in firewall
3. **Third**: If still blocked, use local PostgreSQL for dev

The direct connection string should work since HTTPS to Supabase works fine!
