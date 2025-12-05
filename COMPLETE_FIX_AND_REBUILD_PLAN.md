# 🚀 COMPLETE FIX & REBUILD PLAN
## Cart Checkout 404 Error - www.hypercleaningsupplies.co.nz

---

## 🎯 EXECUTIVE SUMMARY

**Problem:** Users get 404 error when clicking "Go to Checkout" from cart page.

**Root Cause:** Environment variable `NEXTAUTH_URL` points to old Vercel domain instead of your custom domain.

**Impact:** 
- ❌ Cart checkout broken
- ❌ Order submission fails
- ❌ Users cannot complete purchases
- ❌ Email verification links may be broken
- ❌ Password reset links may be broken

**Solution:** Update 2 environment variables in Vercel and redeploy.

**Time to Fix:** 5-10 minutes  
**Downtime:** None (zero downtime deployment)

---

## 📋 PHASE 1: IMMEDIATE FIX (DO THIS NOW!)

### Step 1: Update Vercel Environment Variables

1. **Open Vercel Dashboard:**
   - Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n/settings/environment-variables

2. **Update NEXTAUTH_URL:**
   - Find: `NEXTAUTH_URL`
   - Click the three dots (⋯) → Edit
   - Change from: `https://hypercleaning.vercel.app`
   - Change to: `https://www.hypercleaningsupplies.co.nz`
   - Ensure it's enabled for: **Production, Preview, Development**
   - Click **Save**

3. **Update NEXT_PUBLIC_SITE_URL:**
   - Find: `NEXT_PUBLIC_SITE_URL`
   - Click the three dots (⋯) → Edit
   - Change from: `https://hypercleaning.vercel.app`
   - Change to: `https://www.hypercleaningsupplies.co.nz`
   - Ensure it's enabled for: **Production, Preview, Development**
   - Click **Save**

### Step 2: Redeploy Application

1. **Go to Deployments:**
   - Navigate to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n
   - Click **"Deployments"** tab

2. **Trigger Redeploy:**
   - Find the latest deployment (top of list)
   - Click three dots (⋯) → **Redeploy**
   - Click **Redeploy** again to confirm
   - Wait 2-3 minutes for completion

3. **Verify Deployment:**
   - Wait for status to show **"Ready"** (green checkmark)
   - If it shows error, click to view logs

### Step 3: Test the Fix

1. **Clear Browser Cache:**
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"
   - OR use Incognito mode (`Ctrl + Shift + N`)

2. **Test Cart Flow:**
   ```
   ✓ Visit: https://www.hypercleaningsupplies.co.nz
   ✓ Browse to any product
   ✓ Click "Add to Cart"
   ✓ Click cart icon or "View Cart"
   ✓ Click "Go to Checkout" → Should see checkout form (NOT 404!)
   ✓ Fill in shipping information
   ✓ Click "Submit Order Request" → Should see success page (NOT 404!)
   ```

---

## 🔍 PHASE 2: VERIFY ALL SYSTEMS

### Test Checklist

Run through these tests to ensure everything works:

#### Core E-commerce Flow
- [ ] Homepage loads correctly
- [ ] Product listing page loads
- [ ] Individual product pages load
- [ ] Add product to cart (check cart icon updates)
- [ ] View cart page
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] **Click "Go to Checkout" (CRITICAL - should NOT be 404)**
- [ ] Fill shipping form
- [ ] Submit order request
- [ ] **See order success page (CRITICAL - should NOT be 404)**
- [ ] Order appears in account/orders page

#### Authentication Flow
- [ ] Sign up new account
- [ ] Receive verification email
- [ ] Click verification link (should NOT be 404)
- [ ] Sign in with credentials
- [ ] Sign out
- [ ] Forgot password
- [ ] Receive reset email
- [ ] Click reset link (should NOT be 404)
- [ ] Reset password successfully

#### OAuth (if enabled)
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] OAuth redirects work correctly

#### Admin Dashboard
- [ ] Access admin dashboard: https://www.hypercleaningsupplies.co.nz/admin
- [ ] View orders list
- [ ] View order details
- [ ] Update order status
- [ ] View products list
- [ ] Add new product
- [ ] Edit existing product
- [ ] Upload product images

#### Guest Checkout
- [ ] Add items to cart without signing in
- [ ] Proceed to checkout as guest
- [ ] Fill shipping information
- [ ] Submit order successfully

---

## 🔧 PHASE 3: ADDITIONAL FIXES (OPTIONAL BUT RECOMMENDED)

### Fix 1: Update OAuth Callback URLs

If users are using Google/GitHub login, update these:

#### Google OAuth Console
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID: `880233503072-e9rvdi9ek9eu3hvc7dc25flm3vdoj274.apps.googleusercontent.com`
3. Click to edit
4. Under "Authorized redirect URIs", add:
   ```
   https://www.hypercleaningsupplies.co.nz/api/auth/callback/google
   ```
5. Remove old URI if present:
   ```
   https://hypercleaning.vercel.app/api/auth/callback/google
   ```
6. Click **Save**

#### GitHub OAuth Settings
1. Go to: https://github.com/settings/developers
2. Find your OAuth App: `Ov23litG3MK2TgMH8BWj`
3. Click to edit
4. Update "Authorization callback URL" to:
   ```
   https://www.hypercleaningsupplies.co.nz/api/auth/callback/github
   ```
5. Click **Update application**

### Fix 2: Update Stripe Webhook (When Ready for Payments)

Currently using test mode - update when going live:

1. Go to: https://dashboard.stripe.com/webhooks
2. Find your webhook endpoint
3. Edit endpoint URL to:
   ```
   https://www.hypercleaningsupplies.co.nz/api/checkout/webhook
   ```
4. Copy the new **Signing Secret**
5. Update in Vercel:
   - Go to Environment Variables
   - Find `STRIPE_WEBHOOK_SECRET`
   - Update with new secret
   - Save and redeploy

### Fix 3: Update Email Templates

Your email templates use `NEXT_PUBLIC_SITE_URL` which is now correct. Test:

1. **Test Verification Email:**
   - Sign up with new email
   - Check email received
   - Verify link points to: `https://www.hypercleaningsupplies.co.nz/api/auth/verify-email?token=...`

2. **Test Password Reset Email:**
   - Click "Forgot Password"
   - Enter email
   - Check email received
   - Verify link points to: `https://www.hypercleaningsupplies.co.nz/reset-password?token=...`

---

## 🐛 PHASE 4: TROUBLESHOOTING

### If Checkout Still Shows 404

1. **Verify Environment Variables Saved:**
   - Go back to Vercel → Settings → Environment Variables
   - Confirm `NEXTAUTH_URL` shows: `https://www.hypercleaningsupplies.co.nz`
   - Confirm `NEXT_PUBLIC_SITE_URL` shows: `https://www.hypercleaningsupplies.co.nz`
   - Confirm both are enabled for "Production"

2. **Check Deployment Status:**
   - Go to Deployments tab
   - Latest deployment should show "Ready" status
   - If "Error", click to view build logs
   - Look for any errors in the logs

3. **Check Function Logs:**
   - Go to Deployments → Click latest deployment
   - Click **"Functions"** tab
   - Look for `/api/checkout` function
   - Check for any error messages

4. **Test API Directly:**
   - Open browser DevTools (F12)
   - Go to **Network** tab
   - Try checkout again
   - Find the `/api/checkout` request
   - Click on it to see:
     - Request payload
     - Response status
     - Response body
   - Look for error messages

5. **Clear Everything:**
   - Clear browser cache completely
   - Clear cookies for your domain
   - Close and reopen browser
   - Try in Incognito mode
   - Try different browser

### If Orders Not Saving

1. **Check Database Connection:**
   - Go to: https://supabase.com/dashboard/project/tgdfkmtwwyrzkgtcjdaf
   - Verify project is active (not paused)
   - Check database is accessible

2. **Check Prisma Client:**
   - Vercel should auto-generate Prisma client during build
   - Check build logs for "Prisma generate" step
   - Should see: "✓ Generated Prisma Client"

3. **Check API Logs:**
   - Go to Vercel → Deployments → Functions
   - Look for `/api/checkout` errors
   - Look for database connection errors

### If Images Not Loading

1. **Check Cloudinary:**
   - Verify credentials are correct in Vercel
   - `CLOUDINARY_CLOUD_NAME=dl2gatvda`
   - `CLOUDINARY_API_KEY=169637298546927`
   - `CLOUDINARY_API_SECRET=DJD-OL8amniUtyio2tfPFxsDdsM`

2. **Check Image URLs:**
   - Open browser DevTools → Network tab
   - Filter by "Img"
   - Look for failed image requests
   - Check if URLs are correct

---

## 📊 PHASE 5: MONITORING & VALIDATION

### Monitor These Metrics

After deployment, monitor for 24-48 hours:

1. **Checkout Completion Rate:**
   - Track how many users complete checkout
   - Should increase significantly after fix

2. **404 Errors:**
   - Check Vercel Analytics for 404s
   - Should see dramatic decrease

3. **Order Creation:**
   - Monitor admin dashboard for new orders
   - Verify orders are being created successfully

4. **User Feedback:**
   - Watch for customer complaints
   - Monitor support emails

### Vercel Analytics

1. Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n/analytics
2. Check:
   - Page views
   - 404 errors (should decrease)
   - Function errors (should decrease)
   - Response times

---

## 📝 PHASE 6: DOCUMENTATION UPDATE

### Update Internal Documentation

1. **Update .env.vercel file** (already done ✓)
2. **Update deployment docs** with correct domain
3. **Document the fix** for future reference
4. **Update team** on the changes

### Create Runbook

Document this process for future domain changes:

```markdown
# Domain Change Checklist

When changing domains:
1. Update NEXTAUTH_URL in Vercel
2. Update NEXT_PUBLIC_SITE_URL in Vercel
3. Update OAuth callback URLs (Google, GitHub)
4. Update Stripe webhook URL
5. Redeploy application
6. Test all authentication flows
7. Test checkout flow
8. Test email links
9. Monitor for 24 hours
```

---

## ✅ SUCCESS CRITERIA

Your fix is successful when:

- ✅ Users can add items to cart
- ✅ Users can view cart page
- ✅ Users can click "Go to Checkout" without 404
- ✅ Users can fill shipping form
- ✅ Users can submit order request without 404
- ✅ Users see success page after order
- ✅ Orders appear in admin dashboard
- ✅ Email verification links work
- ✅ Password reset links work
- ✅ No 404 errors in Vercel logs
- ✅ OAuth login works (if enabled)

---

## 🎯 QUICK REFERENCE

### Critical Environment Variables

```bash
# MUST BE CORRECT
NEXTAUTH_URL=https://www.hypercleaningsupplies.co.nz
NEXT_PUBLIC_SITE_URL=https://www.hypercleaningsupplies.co.nz

# Database (keep as is)
DATABASE_URL=postgresql://postgres.tgdfkmtwwyrzkgtcjdaf:NewVersion%241321%25@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# Auth (keep as is)
NEXTAUTH_SECRET=yxVoBPu5Exp7wjIlhcK9b+Lljx3TawMAq4hXO5J3s9k=
ADMIN_EMAIL=tsedeniyafisehaw@gmail.com
```

### Key URLs

- **Production Site:** https://www.hypercleaningsupplies.co.nz
- **Vercel Dashboard:** https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n
- **Admin Dashboard:** https://www.hypercleaningsupplies.co.nz/admin
- **Supabase Dashboard:** https://supabase.com/dashboard/project/tgdfkmtwwyrzkgtcjdaf

### Support Contacts

- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/dashboard/support
- **Stripe Support:** https://support.stripe.com

---

## 🚨 EMERGENCY ROLLBACK

If something goes wrong:

1. **Rollback Deployment:**
   - Go to Vercel → Deployments
   - Find previous working deployment
   - Click three dots → "Promote to Production"

2. **Revert Environment Variables:**
   - Change URLs back to old values
   - Redeploy

3. **Contact Support:**
   - Vercel support for deployment issues
   - Check Vercel status page: https://www.vercel-status.com

---

## 📞 NEED HELP?

If you encounter issues:

1. **Check this document first** - most issues are covered
2. **Check Vercel logs** - Deployments → Functions tab
3. **Check browser console** - F12 → Console tab
4. **Check network requests** - F12 → Network tab
5. **Contact Vercel support** if deployment fails

---

## 🎉 EXPECTED OUTCOME

After completing Phase 1 (5-10 minutes):

✅ **Checkout works perfectly**  
✅ **Orders are created successfully**  
✅ **Users can complete purchases**  
✅ **No more 404 errors**  
✅ **Email links work correctly**  
✅ **Business is back to normal**

**The fix is simple, fast, and effective. You'll be back in business in minutes!**

---

## 📅 TIMELINE

- **Phase 1 (Immediate Fix):** 5-10 minutes
- **Phase 2 (Verification):** 15-20 minutes
- **Phase 3 (Optional Fixes):** 30-45 minutes
- **Phase 4 (Troubleshooting):** Only if needed
- **Phase 5 (Monitoring):** 24-48 hours
- **Phase 6 (Documentation):** 15-30 minutes

**Total Active Time:** 1-2 hours  
**Total Monitoring Time:** 24-48 hours

---

**START WITH PHASE 1 NOW - IT WILL FIX YOUR IMMEDIATE PROBLEM!**
