# Gmail SMTP Setup - Complete Guide

## The Problem

Your app is trying to connect to `127.0.0.1:587` (localhost) instead of `smtp.gmail.com`.

This happens because:
1. Environment variables aren't loaded
2. Gmail requires an App Password (not your regular password)
3. Dev server needs to be restarted after `.env.local` changes

---

## Step 1: Generate Gmail App Password

### 1.1 Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Scroll to "2-Step Verification"
3. Click "Enable 2-Step Verification"
4. Follow the prompts

### 1.2 Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select: **Mail** and **Windows Computer** (or your device)
3. Click **Generate**
4. Google will show a 16-character password like: `xxxx xxxx xxxx xxxx`
5. **Copy this password**

---

## Step 2: Update .env.local

Open `.env.local` and verify these exact settings:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tsedeniyafisehaw@gmail.com"
SMTP_PASS="xxxx xxxx xxxx xxxx"
FROM_EMAIL="noreply@localhost.com"
```

**Important:**
- `SMTP_USER` = your Gmail address
- `SMTP_PASS` = the 16-character app password (with spaces)
- `SMTP_PORT` = must be `587` (not 465)
- No quotes around the app password value

---

## Step 3: Restart Dev Server

**This is critical** - environment variables only load on startup:

```bash
# Stop current server
Ctrl+C

# Clear cache
rm -r .next

# Restart
npm run dev
```

---

## Step 4: Check Console Output

When dev server starts, you should see:

```
[Email Config] ✓ SMTP configured: {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'tsedeniyafisehaw@gmail.com',
  secure: false
}
```

If you see:
```
[Email Error] Missing SMTP configuration:
✗ SMTP_HOST missing
✗ SMTP_PORT missing
```

→ Your `.env.local` is not being loaded. Check:
- File is in project root (not in src/)
- File name is exactly `.env.local`
- Dev server was restarted

---

## Step 5: Test Signup

1. Go to http://localhost:3000/signup
2. Create account:
   - Name: Test User
   - Email: your-email@gmail.com
   - Password: password123
3. Click "Create Account"
4. Check console for:
   ```
   Verification email sent successfully
   ```
5. Check your email inbox for verification link

---

## If Email Still Fails

### Check 1: Verify .env.local Content
```bash
cat .env.local | grep SMTP
```

Should show:
```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tsedeniyafisehaw@gmail.com"
SMTP_PASS="xxxx xxxx xxxx xxxx"
```

### Check 2: Check Console Errors
Look for specific error messages:
- `SMTP_HOST missing` → Add to .env.local
- `SMTP_USER missing` → Add to .env.local
- `connect ECONNREFUSED` → Wrong host/port
- `Invalid login` → Wrong password

### Check 3: Verify Gmail Settings
1. Go to https://myaccount.google.com/apppasswords
2. Make sure app password was generated
3. Copy it exactly (with spaces)
4. Update `.env.local`
5. Restart dev server

### Check 4: Check 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Scroll to "2-Step Verification"
3. Make sure it says "On"
4. If not, enable it first

---

## For Development Only

Remember: **In development mode, email verification is optional** because we added auto-verification.

If email fails:
- User is still created
- User is auto-verified
- User can login immediately

So even if Gmail SMTP doesn't work, signup/login still works.

---

## Production Deployment

When you deploy to Vercel/Netlify:
1. Add same environment variables to platform
2. Use production Gmail app password
3. Update `FROM_EMAIL` to your domain
4. Email will work on production

---

## Quick Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App password generated
- [ ] `.env.local` has correct SMTP settings
- [ ] Dev server restarted
- [ ] Console shows `[Email Config] ✓ SMTP configured`
- [ ] Signup creates account
- [ ] Verification email received

---

## Common Issues

| Issue | Solution |
|-------|----------|
| `SMTP_HOST missing` | Add to .env.local, restart |
| `Invalid login` | Use app password, not Gmail password |
| `connect ECONNREFUSED 127.0.0.1` | Env vars not loaded, restart server |
| `Email not received` | Check spam folder, verify email address |
| `2-Step Verification required` | Enable at myaccount.google.com/security |

---

## Done! ✅

Your Gmail SMTP is now configured. Emails will be sent when users signup.
