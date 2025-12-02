# Quick Authentication Testing Guide

## What Was Fixed

Your signup/login system had several issues preventing user registration:

1. **Password validation was too strict** - Required 8+ chars with uppercase, numbers, and special chars, but UI only asked for 6
2. **User ID wasn't being stored in sessions** - Sessions couldn't identify which user was logged in
3. **Signup endpoint lacked proper error handling** - Database errors weren't being caught properly
4. **Email wasn't being normalized** - Different cases could create duplicate accounts

## How to Test

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Test Signup
1. Go to `http://localhost:3000/signup`
2. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123` (simple password now works!)
   - Confirm: `password123`
3. Click "Create Account"
4. Should see: "Account created! Please check your email to verify your account."

### Step 3: Verify Email
1. Check your email inbox (or spam folder)
2. Look for "Verify Your Email Address - Hyper Clean Supplies"
3. Click the verification link
4. Should see: "Email verified successfully"

### Step 4: Test Signin
1. Go to `http://localhost:3000/signin`
2. Enter:
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Sign In"
4. Should redirect to home page and show you're logged in

### Step 5: Test OAuth (Optional)
1. Click "Google" or "GitHub" button
2. Follow OAuth provider's login flow
3. Should create account and log you in automatically

## What Each Fix Does

### Fix 1: Password Validation
- **File**: `src/lib/validation.ts`
- **Change**: Reduced minimum password length from 8 to 6 characters
- **Why**: Matches what the UI asks for

### Fix 2: Session Management
- **File**: `src/lib/auth.ts`
- **Change**: Properly store user ID and role in JWT token
- **Why**: Without this, the system doesn't know who's logged in

### Fix 3: Signup Robustness
- **File**: `src/app/api/auth/signup/route.ts`
- **Changes**:
  - Added Zod validation
  - Normalize email (lowercase, trim)
  - Better error messages
  - Transaction with timeout
- **Why**: Prevents duplicate accounts and provides better error feedback

### Fix 4: Frontend Validation
- **File**: `src/app/signup/page.tsx`
- **Changes**:
  - Validate email format
  - Normalize input data
  - Clear form after success
- **Why**: Better UX and consistent data handling

## Database Check

The database automatically creates users with unique IDs. Each user gets:
- Unique auto-increment ID (1, 2, 3, etc.)
- Unique email address
- Hashed password
- Created timestamp
- Verification token for email confirmation

## Troubleshooting

### "Email already registered"
- You already signed up with that email
- Use a different email or check if you're already logged in

### "Please verify your email before signing in"
- You haven't clicked the verification link yet
- Check your email (including spam folder)
- Click the verification link

### "Invalid email or password"
- Wrong email or password
- Make sure you verified your email first

### Email not arriving
- Check spam/junk folder
- Verify SMTP settings in `.env.local`
- Check `FROM_EMAIL` is set

### Still having issues?
- Check browser console for errors (F12)
- Check server logs in terminal
- Verify `.env.local` has all required variables
- Make sure database is connected (check `DATABASE_URL`)

## Next: Test with Real Data

Once basic signup/login works:
1. Create a few test accounts
2. Add products to cart
3. Test checkout with Stripe
4. Verify orders are saved with correct user ID
5. Check admin dashboard shows orders

## Production Checklist

Before deploying:
- [ ] Change `NEXTAUTH_SECRET` to a strong random value
- [ ] Update `NEXTAUTH_URL` to your production domain
- [ ] Update `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Use production Stripe keys
- [ ] Use production email service
- [ ] Test signup/login on production
- [ ] Monitor error logs for issues
