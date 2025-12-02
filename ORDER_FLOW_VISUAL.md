# Order Request Flow - Visual Guide

## Customer Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     CUSTOMER EXPERIENCE                          │
└─────────────────────────────────────────────────────────────────┘

1. Browse Products
   └─> /shop
       └─> View products by category
           └─> Click product for details

2. Add to Cart
   └─> Click "Add to Cart" button
       └─> Cart stored in:
           ├─> Redux (instant UI)
           ├─> localStorage (browser)
           └─> Database (if logged in)

3. View Cart
   └─> /cart
       └─> Review items
           └─> Adjust quantities
               └─> Click "Proceed to Checkout"

4. Checkout Form
   └─> /checkout
       └─> Fill in:
           ├─> Full Name
           ├─> Email
           ├─> Phone Number
           ├─> Street Address
           ├─> City, State, Postal Code
           └─> Country
       └─> Click "Submit Order Request"

5. Order Submitted
   └─> Cart automatically cleared
       └─> Redirected to /order-success
           └─> Shows:
               ├─> Order ID
               ├─> Order items
               ├─> Total amount
               ├─> Shipping address
               └─> "Admin will contact you within 24 hours"

6. Wait for Contact
   └─> Admin contacts via email or phone
       └─> Discuss payment method
           └─> Arrange delivery
```

## Admin Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN WORKFLOW                              │
└─────────────────────────────────────────────────────────────────┘

1. Access Admin Dashboard
   └─> /admin/orders
       └─> See all order requests

2. Review Order Details
   ┌────────────────────────────────────────────────┐
   │ Order #123                    Status: PENDING  │
   │ Customer: John Doe                             │
   │ Email: john@example.com (clickable)            │
   │ Placed: Dec 1, 2025 10:30 AM                   │
   │                                                 │
   │ Items:                                          │
   │ - Product A × 2 ............ $50.00            │
   │ - Product B × 1 ............ $25.00            │
   │                                                 │
   │ ┌─────────────────────────────────────────┐   │
   │ │ 📍 Customer Contact & Shipping Details  │   │
   │ │                                          │   │
   │ │ John Doe                                 │   │
   │ │ Phone: +1-555-0123 (clickable)          │   │
   │ │ Email: john@example.com (clickable)     │   │
   │ │ ─────────────────────────────────────   │   │
   │ │ 123 Main Street                          │   │
   │ │ Apt 4B                                   │   │
   │ │ New York, NY 10001                       │   │
   │ │ United States                            │   │
   │ └─────────────────────────────────────────┘   │
   └────────────────────────────────────────────────┘

3. Contact Customer
   └─> Click email link → Opens email client
       OR
   └─> Click phone link → Opens phone dialer
       └─> Discuss:
           ├─> Confirm order details
           ├─> Payment method (cash, bank transfer, etc.)
           ├─> Delivery date
           └─> Any special requests

4. Process Order
   └─> Receive payment
       └─> Update order status
           └─> Prepare shipment
               └─> Deliver to customer
```

## Order Status Flow

```
┌──────────┐      ┌────────────┐      ┌───────────┐
│ PENDING  │ ───> │ PROCESSING │ ───> │ COMPLETED │
└──────────┘      └────────────┘      └───────────┘
   Yellow            Blue                 Green
    Badge            Badge                Badge

  Customer        Admin contacted      Order fulfilled
  submitted       customer and         and delivered
  order           arranged payment
```

## Data Storage

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE TABLES                           │
└─────────────────────────────────────────────────────────────────┘

Order Table:
├─> id (unique order number)
├─> userId (if logged in, null for guest)
├─> customerEmail
├─> totalAmount
├─> status (pending/processing/completed)
├─> shippingAddress (JSON with all contact info)
├─> stripeSessionId (null - for future payment)
├─> createdAt
└─> updatedAt

OrderItem Table:
├─> id
├─> orderId (links to Order)
├─> productId
├─> name
├─> unitPrice
├─> quantity
├─> imageUrl
├─> createdAt
└─> updatedAt
```

## Key Differences from Payment System

```
┌─────────────────────────────────────────────────────────────────┐
│              ORDER REQUEST vs PAYMENT SYSTEM                     │
└─────────────────────────────────────────────────────────────────┘

ORDER REQUEST (Current):
✅ No Stripe integration needed
✅ No payment gateway fees
✅ Direct customer contact
✅ Flexible payment methods
✅ Personal customer service
✅ Order created immediately
✅ Status: "pending" by default

PAYMENT SYSTEM (Future):
❌ Requires Stripe account
❌ Payment processing fees
❌ Automated payment flow
❌ Card payments only
❌ Less personal interaction
❌ Order created after payment
❌ Status: "paid" after checkout
```

## Admin Dashboard Features

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD VIEW                          │
└─────────────────────────────────────────────────────────────────┘

Header:
"Order Requests"
"Customer order requests are listed below. Contact customers 
directly using their email or phone to confirm orders and 
arrange payment."

Each Order Card Shows:
├─> Order ID (bold)
├─> Customer name and email (clickable mailto link)
├─> Order date and time
├─> Status badge (color-coded)
├─> Total amount (large, blue)
├─> Order items list with quantities
├─> Highlighted contact section with:
│   ├─> Customer name
│   ├─> Phone (clickable tel link)
│   ├─> Email (clickable mailto link)
│   └─> Complete shipping address

Empty State:
"No order requests yet. Orders will appear here when 
customers submit requests."
```

## URLs Reference

```
Customer URLs:
├─> /shop ..................... Browse products
├─> /shop/product/[slug] ...... Product details
├─> /cart ..................... View cart
├─> /checkout ................. Submit order request
├─> /order-success ............ Order confirmation
└─> /account/orders ........... View order history

Admin URLs:
├─> /admin .................... Admin dashboard
├─> /admin/orders ............. All order requests
├─> /admin/orders/[id] ........ Single order details
├─> /admin/products ........... Manage products
└─> /admin/categories ......... Manage categories
```
