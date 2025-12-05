# 🔧 Vercel Environment Variables Update Instructions

## CRITICAL: Update These Variables NOW

Your checkout is broken because the URLs are wrong. Follow these exact steps:

---

## Step-by-Step Instructions

### 1. Open Vercel Dashboard

Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n/settings/environment-variables

### 2. Update NEXTAUTH_URL

1. Find the variable named: `NEXTAUTH_URL`
2. Click the **three dots** (⋯) on the right
3. Click **"Edit"**
4. Change the value to:
   ```
   https://www.hypercleaningsupplies.co.nz
   ```
5. Make sure it's set for: **Production, Preview, and Development**
6. Click **"Save"**

### 3. Update NEXT_PUBLIC_SITE_URL

1. Find the variable named: `NEXT_PUBLIC_SITE_URL`
2. Click the **three dots** (⋯) on the right
3. Click **"Edit"**
4. Change the value to:
   ```
   https://www.hypercleaningsupplies.co.nz
   ```
5. Make sure it's set for: **Production, Preview, and Development**
6. Click **"Save"**

### 4. Redeploy Your Site

**Option A: From Deployments Tab**
1. Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n
2. Click **"Deployments"** tab
3. Find the latest deployment (top of the list)
4. Click the **three dots** (⋯) on the right
5. Click **"Redeploy"**
6. Click **"Redeploy"** again to confirm
7. Wait 2-3 minutes for deployment to complete

**Option B: From Overview Tab**
1. Go to: https://vercel.com/tsedeniyafisehaw-8496s-projects/hypercleaning-oc5n
2. Click the **"Redeploy"** button at the top
3. Wait 2-3 minutes for deployment to complete

---

## ✅ Verify the Fix

After redeployment completes:

1. Visit: https://www.hypercleaningsupplies.co.nz
2. Browse to any product
3. Click **"Add to Cart"**
4. Click **"View Cart"** or go to cart icon
5. Click **"Go to Checkout"**
6. **You should see the checkout form** (NOT a 404 error!)
7. Fill in the form and submit
8. **You should see the success page** (NOT a 404 error!)

---

## 🎯 What This Fixes

✅ Cart to checkout navigation (no more 404)  
✅ Order submission redirect (no more 404)  
✅ Email verification links  
✅ Password reset links  
✅ OAuth callback URLs  
✅ All internal redirects

---

## ⚠️ Common Mistakes to Avoid

❌ **DON'T** include a trailing slash: `https://www.hypercleaningsupplies.co.nz/`  
✅ **DO** use this format: `https://www.hypercleaningsupplies.co.nz`

❌ **DON'T** forget the `www.` subdomain  
✅ **DO** include it: `https://www.hypercleaningsupplies.co.nz`

❌ **DON'T** use `http://` (insecure)  
✅ **DO** use `https://` (secure)

❌ **DON'T** forget to redeploy after changing variables  
✅ **DO** redeploy immediately after saving changes

---

## 📸 Visual Guide

### Finding Environment Variables:
```
Vercel Dashboard
  └─ Your Project (hypercleaning-oc5n)
      └─ Settings (top menu)
          └─ Environment Variables (left sidebar)
              └─ Find NEXTAUTH_URL
                  └─ Click ⋯ → Edit
                      └─ Change value
                          └─ Save
```

### Redeploying:
```
Vercel Dashboard
  └─ Your Project (hypercleaning-oc5n)
      └─ Deployments (top menu)
          └─ Latest deployment (first in list)
              └─ Click ⋯ → Redeploy
                  └─ Confirm
                      └─ Wait for completion
```

---

## 🆘 Still Having Issues?

If checkout still shows 404 after following these steps:

1. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete → Clear browsing data
   - Or try in Incognito mode (Ctrl+Shift+N)

2. **Check Vercel logs:**
   - Go to Deployments → Click latest → Functions tab
   - Look for errors in `/api/checkout` function

3. **Verify variables saved:**
   - Go back to Environment Variables
   - Confirm both URLs show your domain
   - Make sure they're enabled for "Production"

4. **Check deployment status:**
   - Make sure deployment shows "Ready" status
   - If it shows "Error", click to see build logs

5. **Test the API directly:**
   - Open browser console (F12)
   - Go to Network tab
   - Try checkout again
   - Look for the `/api/checkout` request
   - Check the response for errors

---

## 📞 Contact Support

If you've followed all steps and still have issues, check:

- Vercel deployment logs
- Browser console errors (F12 → Console)
- Network requests (F12 → Network)

The fix should work immediately after redeployment!
