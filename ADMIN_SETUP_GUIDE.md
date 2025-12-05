# Admin Setup Guide

## Issue
Admin user is not being redirected to the admin dashboard after login.

## Root Cause
The admin user might not exist in the production database, or the authentication flow wasn't properly checking admin status.

## Fixes Applied

1. **Created server-side admin check endpoint** (`/api/auth/check-admin`)
   - Verifies admin status on the server where environment variables are available
   - More secure than client-side checks

2. **Updated signin page** to use the new endpoint
   - After successful login, checks if user is admin
   - Redirects to `/admin` if admin, otherwise to `/`

## Setup Admin User in Production

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI if you haven't:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   vercel link
   ```

4. Run the admin setup script in production:
   ```bash
   vercel env pull .env.production.local
   npx tsx scripts/update-admin-password.ts
   ```

### Option 2: Manual Database Setup

1. Connect to your Supabase database using the SQL Editor

2. Run this SQL query:
   ```sql
   -- Check if admin user exists
   SELECT * FROM "User" WHERE email = 'tsedeniyafisehaw@gmail.com';
   
   -- If not exists, create admin user
   -- Note: You'll need to hash the password using bcrypt first
   INSERT INTO "User" (email, name, "passwordHash", role, "emailVerified", "createdAt", "updatedAt")
   VALUES (
     'tsedeniyafisehaw@gmail.com',
     'Admin User',
     '$2a$10$YOUR_HASHED_PASSWORD_HERE',
     'admin',
     NOW(),
     NOW(),
     NOW()
   );
   ```

### Option 3: Using Local Script with Production Database

1. Temporarily update your `.env.local` with production database URL:
   ```bash
   DATABASE_URL="postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ADMIN_EMAIL="tsedeniyafisehaw@gmail.com"
   ```

2. Run the script:
   ```bash
   npx tsx scripts/update-admin-password.ts
   ```

3. **IMPORTANT**: Revert your `.env.local` back to local database after running

## Admin Credentials

After running the script, you'll see:

```
Email:    tsedeniyafisehaw@gmail.com
Password: Hyper@Clean2024$Secure!
```

## Verify Admin Access

1. Go to: https://www.hypercleaningsupplies.co.nz/signin
2. Login with admin credentials
3. Should redirect to: https://www.hypercleaningsupplies.co.nz/admin

## Environment Variables Required

Make sure these are set in Vercel:

- `ADMIN_EMAIL=tsedeniyafisehaw@gmail.com`
- `NEXT_PUBLIC_ADMIN_EMAIL=tsedeniyafisehaw@gmail.com` (for client-side checks)

## Troubleshooting

### Admin still redirects to homepage

1. Check Vercel environment variables are set correctly
2. Clear browser cache and cookies
3. Try incognito/private browsing mode
4. Check browser console for errors

### Can't login at all

1. Verify admin user exists in database
2. Check password is correct
3. Verify `ADMIN_EMAIL` matches the email you're using to login

### Middleware blocks admin access

1. Verify `ADMIN_EMAIL` environment variable is set in Vercel
2. Check middleware.ts is using correct environment variable
3. Redeploy after setting environment variables

## Security Notes

- Never commit passwords to version control
- Change the default password after first login
- Use strong, unique passwords
- Consider implementing 2FA for admin accounts
