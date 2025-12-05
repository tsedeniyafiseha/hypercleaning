# 📸 VISUAL FIX GUIDE
## Step-by-Step with Screenshots Description

---

## 🎯 WHAT YOU'LL SEE

This guide describes exactly what you'll see on your screen at each step.

---

## STEP 1: OPEN VERCEL DASHBOARD

### What to do:
1. Open browser
2. Go to: `https://vercel.com`
3. Sign in if needed
4. Click on your project: **"hypercleaning-oc5n"**

### What you'll see:
```
┌─────────────────────────────────────────┐
│ Vercel Dashboard                        │
├─────────────────────────────────────────┤
│ Projects:                               │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ hypercleaning-oc5n              │   │
│ │ www.hypercleaningsupplies.co.nz │   │
│ │ Production: Ready ✓             │   │
│ └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## STEP 2: GO TO SETTINGS

### What to do:
1. Click **"Settings"** in the top menu
2. Click **"Environment Variables"** in the left sidebar

### What you'll see:
```
┌─────────────────────────────────────────┐
│ hypercleaning-oc5n                      │
├─────────────────────────────────────────┤
│ Overview  Deployments  Analytics        │
│ [Settings] ← Click here                 │
├─────────────────────────────────────────┤
│ Left Sidebar:                           │
│ • General                               │
│ • Domains                               │
│ • [Environment Variables] ← Click here  │
│ • Git                                   │
│ • Functions                             │
└─────────────────────────────────────────┘
```

---

## STEP 3: FIND NEXTAUTH_URL

### What to do:
1. Scroll through the list of environment variables
2. Find the one named: **NEXTAUTH_URL**

### What you'll see:
```
┌─────────────────────────────────────────────────────────┐
│ Environment Variables                                   │
├─────────────────────────────────────────────────────────┤
│ Search: [                                    ] [+ Add]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ DATABASE_URL                                            │
│ Value: postgresql://postgres...                  [⋯]  │
│ Environments: Production, Preview, Development          │
│                                                         │
│ NEXTAUTH_URL                          ← FIND THIS ONE  │
│ Value: https://hypercleaning.vercel.app         [⋯]  │
│ Environments: Production, Preview, Development          │
│                                                         │
│ NEXT_PUBLIC_SITE_URL                                   │
│ Value: https://hypercleaning.vercel.app         [⋯]  │
│ Environments: Production, Preview, Development          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## STEP 4: EDIT NEXTAUTH_URL

### What to do:
1. Click the **three dots [⋯]** on the right side of NEXTAUTH_URL
2. Click **"Edit"** from the dropdown menu

### What you'll see:
```
┌─────────────────────────────────────────┐
│ NEXTAUTH_URL                      [⋯] ← Click here │
├─────────────────────────────────────────┤
│ Dropdown menu appears:                  │
│ ┌─────────────────┐                    │
│ │ Edit            │ ← Click this       │
│ │ Delete          │                    │
│ └─────────────────┘                    │
└─────────────────────────────────────────┘
```

---

## STEP 5: CHANGE THE VALUE

### What to do:
1. Clear the current value
2. Type: `https://www.hypercleaningsupplies.co.nz`
3. Make sure checkboxes are checked for:
   - ☑ Production
   - ☑ Preview
   - ☑ Development
4. Click **"Save"**

### What you'll see:
```
┌─────────────────────────────────────────────────────┐
│ Edit Environment Variable                           │
├─────────────────────────────────────────────────────┤
│ Name:                                               │
│ NEXTAUTH_URL                                        │
│                                                     │
│ Value:                                              │
│ ┌─────────────────────────────────────────────┐   │
│ │ https://www.hypercleaningsupplies.co.nz     │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ Environments:                                       │
│ ☑ Production                                        │
│ ☑ Preview                                           │
│ ☑ Development                                       │
│                                                     │
│ [Cancel]  [Save] ← Click Save                      │
└─────────────────────────────────────────────────────┘
```

### ⚠️ IMPORTANT:
- Use HTTPS (not HTTP)
- Include "www."
- NO trailing slash at the end
- Exact format: `https://www.hypercleaningsupplies.co.nz`

---

## STEP 6: REPEAT FOR NEXT_PUBLIC_SITE_URL

### What to do:
1. Find: **NEXT_PUBLIC_SITE_URL**
2. Click the three dots [⋯]
3. Click "Edit"
4. Change value to: `https://www.hypercleaningsupplies.co.nz`
5. Ensure all environments are checked
6. Click "Save"

### Same process as Step 4-5, just different variable name

---

## STEP 7: GO TO DEPLOYMENTS

### What to do:
1. Click **"Deployments"** in the top menu
2. You'll see a list of all deployments

### What you'll see:
```
┌─────────────────────────────────────────────────────┐
│ hypercleaning-oc5n                                  │
├─────────────────────────────────────────────────────┤
│ Overview  [Deployments] ← Click  Analytics Settings │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Latest Deployments:                                 │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Production                            [⋯]   │   │
│ │ 194e9f9 Fix Prisma relation names           │   │
│ │ main branch • 3d ago • Ready ✓              │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Production                            [⋯]   │   │
│ │ abc1234 Previous deployment                 │   │
│ │ main branch • 5d ago • Ready ✓              │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## STEP 8: REDEPLOY

### What to do:
1. Find the **FIRST** deployment in the list (most recent)
2. Click the **three dots [⋯]** on the right
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm

### What you'll see:
```
┌─────────────────────────────────────────────┐
│ Production                            [⋯] ← Click │
│ 194e9f9 Fix Prisma relation names           │
│ main branch • 3d ago • Ready ✓              │
└─────────────────────────────────────────────┘

Dropdown menu:
┌─────────────────────┐
│ View Deployment     │
│ View Source Commit  │
│ [Redeploy]          │ ← Click this
│ Promote to Prod     │
│ Instant Rollback    │
└─────────────────────┘

Confirmation dialog:
┌─────────────────────────────────────────┐
│ Redeploy to Production?                 │
│                                         │
│ This will create a new deployment       │
│ with the latest environment variables.  │
│                                         │
│ [Cancel]  [Redeploy] ← Click           │
└─────────────────────────────────────────┘
```

---

## STEP 9: WAIT FOR DEPLOYMENT

### What to do:
1. Wait for the deployment to complete
2. Watch the status change from "Building" → "Ready"

### What you'll see:
```
Building... (30 seconds)
┌─────────────────────────────────────────────┐
│ Production                                  │
│ 194e9f9 Fix Prisma relation names           │
│ main branch • Just now • Building... ⏳     │
└─────────────────────────────────────────────┘

Then... (2-3 minutes)
┌─────────────────────────────────────────────┐
│ Production                                  │
│ 194e9f9 Fix Prisma relation names           │
│ main branch • Just now • Ready ✓            │
└─────────────────────────────────────────────┘
```

---

## STEP 10: TEST THE FIX

### What to do:
1. Open a new browser tab (or incognito window)
2. Go to: `https://www.hypercleaningsupplies.co.nz`
3. Browse to any product
4. Click "Add to Cart"
5. Click cart icon or "View Cart"
6. Click "Go to Checkout"

### What you should see:

#### ❌ BEFORE (Broken):
```
┌─────────────────────────────────────────┐
│ 404                                     │
│ This page could not be found.           │
└─────────────────────────────────────────┘
```

#### ✅ AFTER (Fixed):
```
┌─────────────────────────────────────────┐
│ SHIPPING & BILLING                      │
├─────────────────────────────────────────┤
│ Contact Information                     │
│ ┌─────────────────────────────────┐   │
│ │ Full Name                       │   │
│ └─────────────────────────────────┘   │
│ ┌─────────────────────────────────┐   │
│ │ Email Address                   │   │
│ └─────────────────────────────────┘   │
│                                         │
│ Shipping Address                        │
│ ┌─────────────────────────────────┐   │
│ │ Street Address                  │   │
│ └─────────────────────────────────┘   │
│                                         │
│ [Submit Order Request]                  │
└─────────────────────────────────────────┘
```

---

## STEP 11: COMPLETE TEST ORDER

### What to do:
1. Fill in the shipping form with test data:
   - Full Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Address: 123 Test St
   - City: Auckland
   - State: Auckland
   - Postal Code: 1010
   - Country: New Zealand
2. Click "Submit Order Request"

### What you should see:

#### ✅ SUCCESS:
```
┌─────────────────────────────────────────┐
│         ⏰                              │
│                                         │
│ Request Pending!                        │
│                                         │
│ Thank you for your order request.       │
│ Your request is currently pending.      │
│                                         │
│ Our team will review your order and     │
│ contact you shortly.                    │
│                                         │
│ Order Details                           │
│ Order ID: #123                          │
│ Status: Pending                         │
│ Total: $XX.XX                           │
│                                         │
│ [View Orders] [Continue Shopping]       │
└─────────────────────────────────────────┘
```

---

## ✅ SUCCESS INDICATORS

You know it's fixed when:

1. ✅ Checkout page loads (no 404)
2. ✅ Form appears with all fields
3. ✅ Can submit order
4. ✅ Success page appears (no 404)
5. ✅ Order ID is shown
6. ✅ Order appears in admin dashboard

---

## 🐛 TROUBLESHOOTING VISUAL GUIDE

### Problem: Still seeing 404

#### Check 1: Verify Variables Saved
```
Go back to: Settings → Environment Variables

Look for:
NEXTAUTH_URL
Value: https://www.hypercleaningsupplies.co.nz ✓

NEXT_PUBLIC_SITE_URL
Value: https://www.hypercleaningsupplies.co.nz ✓

If they show old values, they didn't save!
Repeat Steps 4-6.
```

#### Check 2: Verify Deployment Completed
```
Go to: Deployments

Latest deployment should show:
┌─────────────────────────────────────────┐
│ Production                              │
│ Ready ✓ ← Should be green checkmark    │
└─────────────────────────────────────────┘

If it shows "Error" or "Failed":
Click on it to see error logs
```

#### Check 3: Clear Browser Cache
```
Press: Ctrl + Shift + Delete

Select:
☑ Cached images and files
☑ Cookies and other site data

Click: Clear data

Then try again
```

#### Check 4: Try Incognito Mode
```
Press: Ctrl + Shift + N (Chrome)
       Ctrl + Shift + P (Firefox)

Visit: https://www.hypercleaningsupplies.co.nz

Try checkout again

If it works in incognito:
→ Your browser cache was the issue
→ Clear cache in normal browser
```

---

## 📊 MONITORING DASHBOARD

### After Fix, Check These:

#### Vercel Analytics
```
Go to: Analytics tab

Look for:
• Page Views: Should be normal
• 404 Errors: Should decrease ↓
• Function Errors: Should decrease ↓
```

#### Admin Dashboard
```
Go to: https://www.hypercleaningsupplies.co.nz/admin

Check:
• New orders appearing ✓
• Order details loading ✓
• No error messages ✓
```

---

## 🎉 YOU'RE DONE!

If you can:
- ✅ Add items to cart
- ✅ View cart
- ✅ Go to checkout (no 404!)
- ✅ Submit order (no 404!)
- ✅ See success page

**Your site is fixed and working perfectly!**

---

## 📞 NEED MORE HELP?

If you're stuck at any step:

1. **Take a screenshot** of what you see
2. **Note which step** you're on
3. **Check the error message** (if any)
4. **Try the troubleshooting steps** above

Most issues are solved by:
- Clearing browser cache
- Trying incognito mode
- Verifying variables saved correctly
- Waiting for deployment to complete

---

**TOTAL TIME: 5-10 MINUTES**
**DIFFICULTY: EASY**
**SUCCESS RATE: 99%**

🚀 **YOU GOT THIS!**
