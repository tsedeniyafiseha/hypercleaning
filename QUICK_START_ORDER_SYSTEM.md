# 🚀 Quick Start - Order Request System

## For You (Admin)

### View Orders
```
URL: http://localhost:3000/admin/orders
```

### What You'll See
- All customer order requests
- Customer name, email (clickable), phone (clickable)
- Full shipping address
- Order items and total
- Order status badges

### Contact Customers
1. Click email → Opens your email client
2. Click phone → Opens phone dialer
3. Discuss payment and delivery
4. Process the order

## For Customers

### Place Order
```
1. Browse: /shop
2. Add to cart
3. Checkout: /checkout
4. Fill info and submit
5. Done! Admin will contact them
```

## Key Points

✅ **No payment needed** - Orders submitted without paying
✅ **Direct contact** - You contact customers via email/phone
✅ **Flexible payment** - Arrange payment method with customer
✅ **Auto cart clear** - Cart empties after order submission
✅ **Guest friendly** - Works for logged-in and guest users

## Order Status

- **PENDING** (Yellow) - New order, needs contact
- **PROCESSING** (Blue) - You contacted customer
- **COMPLETED** (Green) - Order fulfilled

## Environment Setup

Make sure your `.env` has:
```env
ADMIN_EMAIL=your-email@example.com
DATABASE_URL=your-database-url
```

## Test It Now

1. Start dev server: `npm run dev`
2. Go to: `http://localhost:3000/shop`
3. Add products to cart
4. Go to checkout and submit order
5. Check admin dashboard: `http://localhost:3000/admin/orders`

## That's It!

Your order request system is ready. Customers submit orders, you see them in the dashboard, and you contact them directly. Simple and effective! 🎉
