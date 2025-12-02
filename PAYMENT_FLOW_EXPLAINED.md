# Payment Flow - Complete Explanation ✅

## How Payment Works in Your App

### Step-by-Step Payment Flow

```
1. User adds products to cart
   ↓
2. User clicks "Checkout"
   ↓
3. Frontend sends cart items to /api/checkout
   ↓
4. Backend creates:
   - Order in database (status: "pending")
   - Order items linked to order
   - Stripe checkout session
   ↓
5. Stripe checkout session URL returned to frontend
   ↓
6. User redirected to Stripe payment page
   ↓
7. User enters card details and pays
   ↓
8. Stripe processes payment
   ↓
9. Stripe sends webhook to /api/checkout/webhook
   ↓
10. Backend updates order status to "paid"
   ↓
11. User redirected to /order-success
   ↓
12. User can view order in /account/profile
```

---

## Where Payment Money Goes

### Payment Processing

**Stripe handles all payment processing:**
- User enters card details on Stripe's secure page (NOT your server)
- Stripe processes the payment securely
- Stripe charges the card
- Money goes to your Stripe account

### Your Stripe Account

1. **Test Mode** (Development)
   - Use test card: `4242 4242 4242 4242`
   - No real money charged
   - For testing only

2. **Live Mode** (Production)
   - Real card payments
   - Real money charged
   - Money goes to your bank account
   - Stripe takes a fee (typically 2.9% + $0.30)

### Money Flow

```
Customer's Bank
    ↓
Stripe (processes payment)
    ↓
Your Stripe Account
    ↓
Your Bank Account (after settlement)
```

---

## Database Records

### What Gets Saved

When payment is successful:

**Order Table:**
```
{
  id: 1,
  userId: 123,
  totalAmount: 99.99,
  stripeSessionId: "cs_test_...",
  stripePaymentIntentId: "pi_test_...",
  status: "paid",  // ← Changed from "pending" to "paid"
  customerEmail: "user@example.com",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:35:00Z"
}
```

**OrderItem Table:**
```
{
  id: 1,
  orderId: 1,
  productId: 5,
  name: "Cleaning Spray",
  unitPrice: 19.99,
  quantity: 5,
  imageUrl: "..."
}
```

---

## API Endpoints Involved

### 1. POST /api/checkout
**What it does:**
- Receives cart items from frontend
- Creates order in database (status: "pending")
- Creates order items
- Creates Stripe checkout session
- Returns Stripe URL

**Request:**
```json
{
  "items": [
    {
      "id": 5,
      "name": "Cleaning Spray",
      "price": 19.99,
      "quantity": 5,
      "srcUrl": "..."
    }
  ],
  "adjustedTotalPrice": 99.99
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### 2. POST /api/checkout/webhook
**What it does:**
- Receives webhook from Stripe when payment succeeds
- Verifies webhook signature (security)
- Updates order status to "paid"
- Stores Stripe payment intent ID

**Triggered by:** Stripe (not user)

**Payload:**
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_...",
      "payment_intent": "pi_test_..."
    }
  }
}
```

---

## Security Features

### 1. Webhook Signature Verification
```typescript
stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
```
- Verifies webhook came from Stripe
- Prevents fake payment notifications
- Uses STRIPE_WEBHOOK_SECRET

### 2. Stripe Handles Card Data
- Card details never touch your server
- Stripe's PCI-compliant servers handle it
- You only get payment confirmation

### 3. Session ID Tracking
- Each order linked to Stripe session ID
- Prevents duplicate orders
- Tracks payment status

### 4. User Authentication
- Orders linked to user ID
- Only authenticated users can checkout
- Orders visible in user's account

---

## Order Status Flow

```
Order Created
    ↓
status: "pending"
(waiting for payment)
    ↓
User pays on Stripe
    ↓
Webhook received
    ↓
status: "paid"
(payment confirmed)
    ↓
Order visible in user account
```

---

## Testing Payment Flow

### Test with Stripe Test Card

1. **Go to checkout**
   - Add products to cart
   - Click "Checkout"

2. **Enter test card**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)

3. **Complete payment**
   - Click "Pay"
   - Should redirect to /order-success

4. **Check order**
   - Go to /account/profile
   - Click "My Orders"
   - Should see order with status "paid"

### Test Cards for Different Scenarios

- **Successful payment:** `4242 4242 4242 4242`
- **Card declined:** `4000 0000 0000 0002`
- **Requires authentication:** `4000 0025 0000 3155`

---

## Viewing Orders

### User Can See Orders In:

1. **Profile Page** (`/account/profile`)
   - Click "My Orders" tab
   - Shows all orders with status
   - Shows order total and items

2. **Order Details**
   - Click order to see details
   - Shows items purchased
   - Shows order date and status

### Admin Can See Orders In:

1. **Admin Dashboard** (`/admin/orders`)
   - All orders from all users
   - Filter by status
   - View order details

---

## Reliability Features

### 1. Database Transactions
- Order and items created together
- If one fails, both rollback
- No orphaned records

### 2. Webhook Retry Logic
- Stripe retries webhook if it fails
- Ensures payment is recorded
- Prevents lost payments

### 3. Idempotency
- Same webhook can be processed multiple times
- Won't create duplicate orders
- Safe and reliable

### 4. Error Handling
- Failed payments don't create orders
- Failed webhooks logged
- Admin can manually verify

---

## Production Checklist

Before going live:

- [ ] Switch Stripe to live mode
- [ ] Update STRIPE_SECRET_KEY to live key
- [ ] Update NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to live key
- [ ] Update STRIPE_WEBHOOK_SECRET to live webhook secret
- [ ] Configure webhook endpoint in Stripe dashboard
- [ ] Test with real card (small amount)
- [ ] Verify money appears in bank account
- [ ] Set up email notifications for orders
- [ ] Monitor webhook logs in Stripe dashboard

---

## Summary

✅ **Payment Flow:**
1. User adds to cart → Checkout → Stripe payment page → Pay → Webhook confirms → Order saved

✅ **Money Flow:**
Customer card → Stripe → Your Stripe account → Your bank account

✅ **Database:**
Orders and items saved with status "paid" after webhook confirmation

✅ **Security:**
Stripe handles cards, webhooks verified, user authentication required

✅ **Reliability:**
Transactions, retries, idempotency, error handling all built-in

Your payment system is production-ready!
