# Shipping & Orders System - Quick Start Guide

## 🚀 Getting Started

### 1. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

---

## 📋 Testing User Flow

### Step 1: Browse & Add to Cart
1. Go to `/shop`
2. Click on any product
3. Click "Add to Cart"
4. Repeat for 2-3 products
5. Click cart icon in navbar

### Step 2: Proceed to Checkout
1. On cart page, click "Go to Checkout"
2. You'll be redirected to `/checkout`

### Step 3: Fill Shipping Form
Fill in all fields:
- **Full Name**: John Doe
- **Email**: john@example.com
- **Phone**: +1234567890
- **Address Line 1**: 123 Main Street
- **Address Line 2**: (leave empty or fill)
- **City**: New York
- **State**: NY
- **Postal Code**: 10001
- **Country**: United States

### Step 4: Review Order Summary
- See all items in cart
- See subtotal and total
- Verify shipping is free

### Step 5: Proceed to Payment
1. Click "Proceed to Payment"
2. You'll be redirected to Stripe Checkout

### Step 6: Complete Payment (Test Mode)
Use Stripe test card:
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **Name**: Any name

### Step 7: Order Success
1. After payment, see order success page
2. **Order Details** card shows:
   - Order ID
   - Total amount
   - Items purchased
3. **Shipping Address** card shows:
   - Full name
   - Complete address
   - Phone and email

---

## 👤 Testing User Account

### View Your Orders
1. Click account icon (top right)
2. Go to "My Account" → "My Orders"
3. See all your orders with:
   - Order ID and date
   - Status badge
   - Shipping address preview
   - Total amount

### View Order Details
1. In "My Orders", click "View Details →"
2. See full order information
3. See complete shipping address

---

## 🔐 Testing Admin Flow

### Login as Admin
1. Go to `/signin`
2. Use admin credentials (set in `ADMIN_EMAIL` env var)
3. Go to `/admin/orders`

### View All Orders
1. See list of all orders
2. Each order shows:
   - Order ID
   - Customer name
   - Order date
   - Status
   - Total amount
   - **Shipping address** (NEW!)

### View Order Details
1. Click on any order
2. See:
   - Order items with images
   - **Shipping address** section
   - Customer info
   - Order status dropdown
   - Update status button

### Update Order Status
1. On order detail page
2. Select new status from dropdown:
   - pending
   - paid
   - processing
   - shipped
   - delivered
   - cancelled
3. Status updates immediately

---

## 🧪 Testing Guest Checkout

### Without Login
1. Go to `/shop`
2. Add items to cart
3. Click "Go to Checkout"
4. Fill shipping form (email required)
5. Complete payment
6. See order success page

**Note**: Guest orders are still stored in database with email captured.

---

## ✅ Validation Testing

### Test Form Validation
Try submitting with invalid data:

1. **Empty Full Name**
   - Error: "Full name is required"

2. **Invalid Email**
   - Error: "Invalid email address"

3. **Short Phone**
   - Error: "Valid phone number is required"

4. **Empty Address**
   - Error: "Address is required"

5. **Missing City/State/Postal Code**
   - Error: "City/State/Postal code is required"

6. **No Country Selected**
   - Error: "Country is required"

---

## 📊 Database Verification

### Check Orders in Database
```bash
npm run prisma:studio
```

1. Open Prisma Studio
2. Go to "Order" table
3. Click on any order
4. Scroll down to see `shippingAddress` JSON field
5. Verify all shipping data is stored

---

## 🔄 Complete Test Scenario

### Scenario: Customer Places Order
1. ✅ Browse products (no login)
2. ✅ Add 3 items to cart
3. ✅ Go to checkout
4. ✅ Fill shipping form with valid data
5. ✅ Review order summary
6. ✅ Complete Stripe payment
7. ✅ See order success with shipping info
8. ✅ Login to account
9. ✅ View order in "My Orders"
10. ✅ See shipping address in order list
11. ✅ Click "View Details"
12. ✅ See full shipping address

### Scenario: Admin Manages Order
1. ✅ Login as admin
2. ✅ Go to `/admin/orders`
3. ✅ See all orders with shipping addresses
4. ✅ Click on customer's order
5. ✅ See shipping address clearly displayed
6. ✅ Update status to "processing"
7. ✅ Update status to "shipped"
8. ✅ Update status to "delivered"

---

## 🐛 Troubleshooting

### Checkout Page Not Loading
- Ensure cart has items
- Check browser console for errors
- Verify Redux state has cart data

### Shipping Form Not Submitting
- Check all required fields are filled
- Verify phone number is 10+ characters
- Check browser console for validation errors

### Order Not Appearing in Admin
- Ensure you're logged in as admin
- Check `ADMIN_EMAIL` environment variable
- Verify order was created in database

### Stripe Payment Failing
- Use correct test card: 4242 4242 4242 4242
- Ensure expiry is in future
- Check Stripe API keys in environment

---

## 📱 Mobile Testing

### Test on Mobile
1. Open DevTools (F12)
2. Click device toggle (mobile icon)
3. Select iPhone or Android
4. Test full checkout flow
5. Verify form is responsive
6. Check order success page layout

---

## 🎯 Key Features to Verify

- ✅ Shipping form collects all required data
- ✅ Form validation works correctly
- ✅ Shipping address stored in database
- ✅ Admin can see shipping addresses
- ✅ User can see shipping address in account
- ✅ Order success page displays shipping info
- ✅ Status updates work
- ✅ Guest checkout works
- ✅ Responsive design on mobile
- ✅ Error messages display correctly

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs
3. Verify environment variables
4. Check database with Prisma Studio
5. Review implementation guide

---

## Next Steps

After testing:
1. Deploy to staging environment
2. Test with real Stripe account
3. Set up email notifications
4. Configure shipping integrations
5. Deploy to production

