# Email SMTP Connection Error - Fix Guide

## The Error
```
connect ECONNREFUSED 127.0.0.1:587
```

This means your app is trying to connect to **localhost (127.0.0.1)** instead of **smtp.gmail.com**.

## Why This Happens

Your `.env.local` file is **not being loaded** by Next.js, so environment variables default to undefined, and the email config falls back to localhost.

## Quick Fix (5 Minutes)

### Step 1: Verify .env.local Exists
```bash
# Check if file exists in root directory
ls -la .env.local

# Should show:
# -rw-r--r-- ... .env.local
```

If it doesn't exist, create it with the correct content.

### Step 2: Verify File Location
Your `.env.local` must be in the **project root**, not in a subfolder:
```
/next-ecommerce-shopco/.env.local  ✅ CORRECT
/next-ecommerce-shopco/src/.env.local  ❌ WRONG
```

### Step 3: Restart Dev Server
```bash
# Stop current server (Ctrl+C)

# Clear Next.js cache
rm -r .next

# Restart
npm run dev
```

**Important**: Environment variables only load on startup. You MUST restart after editing `.env.local`.

### Step 4: Test Environment Variables
```bash
# Run this test
node test-env.js
```

You should see:
```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: tsedeniyafisehaw@gmail.com
SMTP_PASS: ***
DATABASE_URL: SET
NEXTAUTH_SECRET: SET
```

If you see `undefined` or `NOT SET`, your `.env.local` is not being loaded.

---

## If Still Not Working

### Check 1: File Name
Make sure it's exactly `.env.local`, not:
- ❌ `.env`
- ❌ `.env.example`
- ❌ `env.local`
- ❌ `.env.local.txt`

### Check 2: File Content
Your `.env.local` should have:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tsedeniyafisehaw@gmail.com"
SMTP_PASS="zpuq dknd bxii xaxz"
```

### Check 3: No Quotes Around Values
❌ WRONG:
```env
SMTP_HOST='"smtp.gmail.com"'
```

✅ CORRECT:
```env
SMTP_HOST="smtp.gmail.com"
```

### Check 4: Restart Everything
```bash
# Stop dev server (Ctrl+C)

# Delete cache
rm -r .next
rm -r node_modules/.cache

# Reinstall dependencies
npm install

# Restart
npm run dev
```

### Check 5: Check .gitignore
Make sure `.env.local` is in `.gitignore` (it should be):
```bash
cat .gitignore | grep env.local
```

Should show:
```
.env.local
```

---

## For Development Only

Since we added auto-verification in development mode, **email doesn't need to work** for signup/login to work.

But if you want email to work:

### Option 1: Use Gmail (Recommended)
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password
3. Use it in `.env.local` as `SMTP_PASS`
4. Make sure `SMTP_USER` is your Gmail address

### Option 2: Skip Email Entirely
Since we added auto-verification, you can just:
1. Signup
2. Auto-verified (in development)
3. Login immediately
4. No email needed

---

## Debugging

If email still fails, add this to see what's happening:

In `src/lib/email.ts`, the debug logging will show:
```
[Email Config] {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'tsedeniyafisehaw@gmail.com',
  pass: '***'
}
```

If you see:
```
[Email Config] {
  host: 'undefined',
  port: 587,
  user: 'undefined',
  pass: 'NOT SET'
}
```

→ Your `.env.local` is not being loaded.

---

## Quick Checklist

- [ ] `.env.local` exists in project root
- [ ] File is named exactly `.env.local`
- [ ] SMTP_HOST is set to `smtp.gmail.com`
- [ ] SMTP_PORT is set to `587`
- [ ] SMTP_USER is your Gmail address
- [ ] SMTP_PASS is your app password
- [ ] Dev server restarted after editing `.env.local`
- [ ] `.next` folder deleted before restart
- [ ] `node test-env.js` shows all values

---

## What to Do Now

1. **Run the test**:
   ```bash
   node test-env.js
   ```

2. **If all values show**: Email should work
   - Try signup
   - Check if email is sent

3. **If values are undefined**: 
   - Check `.env.local` location
   - Check file name
   - Restart dev server
   - Run test again

4. **If still failing**:
   - Delete `.next` folder
   - Delete `node_modules/.cache`
   - Restart dev server
   - Run test again

---

## Remember

For **local development**, email verification is **optional** because we added auto-verification. You can signup and login without email working.

For **production**, you'll need proper email configuration on your deployment platform (Vercel, Netlify, etc).
