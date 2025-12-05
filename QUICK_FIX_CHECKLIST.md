# ⚡ QUICK FIX CHECKLIST
## Fix Cart Checkout 404 Error in 5 Minutes

---

## 🎯 THE PROBLEM
- Users click "Go to Checkout" → Get 404 error
- Orders not being saved
- Checkout page not loading

## 🔧 THE FIX
Update 2 environment variables in Vercel

---

## ✅ STEP-BY-STEP (5 MINUTES)

### □ Step 1: Open Vercel Settings (1 min)
```
https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n/settings/environment-variables
```

### □ Step 2: Update NEXTAUTH_URL (1 min)
- Find: `NEXTAUTH_URL`
- Click: ⋯ → Edit
- Change to: `https://www.hypercleaningsupplies.co.nz`
- Click: Save

### □ Step 3: Update NEXT_PUBLIC_SITE_URL (1 min)
- Find: `NEXT_PUBLIC_SITE_URL`
- Click: ⋯ → Edit
- Change to: `https://www.hypercleaningsupplies.co.nz`
- Click: Save

### □ Step 4: Redeploy (2 min)
- Go to: Deployments tab
- Click: ⋯ on latest deployment
- Click: Redeploy
- Wait: 2-3 minutes

### □ Step 5: Test (1 min)
- Visit: https://www.hypercleaningsupplies.co.nz
- Add product to cart
- Click: "Go to Checkout"
- ✅ Should see checkout form (NOT 404!)

---

## 🎉 DONE!

If you see the checkout form, you're fixed!

---

## 🐛 Still Broken?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito mode (Ctrl+Shift+N)
3. Check Vercel deployment status is "Ready"
4. Verify both URLs saved correctly

---

## 📋 FULL TESTING CHECKLIST

After fix, test these:

### Critical (Must Work)
- [ ] Add to cart
- [ ] View cart
- [ ] Go to checkout (no 404!)
- [ ] Submit order (no 404!)
- [ ] See success page

### Important (Should Work)
- [ ] Sign up
- [ ] Sign in
- [ ] View orders
- [ ] Admin dashboard
- [ ] Product pages

### Optional (Nice to Have)
- [ ] Google login
- [ ] GitHub login
- [ ] Password reset
- [ ] Email verification

---

## 🚨 EMERGENCY CONTACTS

**Vercel Dashboard:**
https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n

**Admin Dashboard:**
https://www.hypercleaningsupplies.co.nz/admin

**Database (Supabase):**
https://supabase.com/dashboard/project/tgdfkmtwwyrzkgtcjdaf

---

## 💡 WHY THIS FIXES IT

The checkout API creates a redirect URL using `NEXTAUTH_URL`:

```typescript
// Before (BROKEN):
url: `${process.env.NEXTAUTH_URL}/order-success`
// Returns: https://hypercleaning.vercel.app/order-success
// Result: 404 (domain doesn't exist anymore!)

// After (FIXED):
url: `${process.env.NEXTAUTH_URL}/order-success`
// Returns: https://www.hypercleaningsupplies.co.nz/order-success
// Result: Success page loads! ✅
```

---

## 📊 WHAT TO MONITOR

After fix, watch for:
- ✅ Checkout completion rate increases
- ✅ 404 errors decrease
- ✅ Orders appearing in admin dashboard
- ✅ No customer complaints

---

**TOTAL TIME: 5-10 MINUTES**
**DOWNTIME: ZERO**
**DIFFICULTY: EASY**

🚀 **GO FIX IT NOW!**
