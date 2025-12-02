# Payment System Test & Production Setup Guide

## Current Payment Flow

### How It Works

1. **Cart to Checkout**
   - User adds items to cart (Redux state)
   - Navigates to `/checkout` page
   - Enters shipping address
   - Clicks "Place Order"

2. **Checkout API (`/api/checkout`)**
   - Creates Stripe checkout session with line items
   - Creates Order record in database with status "pending"
   - Creates OrderItem records for each product
   - Stores shipping address in Order
   - Returns Stripe checkout URL

3. **Stripe Payment Page**
   - User redirected to Stripe-hosted payment page
   - Enters card details (test mode: 4242 4242 4242 4242)
   - Completes payment

4. **Webhook Handler (`/api/checkout/webhook`)**
   - Stripe sends `checkout.session.completed` event
   - Updates Order status from "pending" to "paid"
   - Sends order confirmation email
   - Logs payment intent ID

5. **Success Page (`/order-success`)**
   - User redirected back with session_id
   - Fetches order details from `/api/orders?sessionId=xxx`
   - Displays order confirmation

## Current Configuration Status

### ✅ Already Configured (Test Mode)
- Stripe test keys in `.env.local`
- Webhook secret configured
- Email SMTP configured (Gmail)
- Database connection working
- Order creation working

### ⚠️ NEEDS PRODUCTION CONFIGURATION

## Production Environment Variables Checklist

### 1. Stripe Keys (CRITICAL)
```bash
# Replace test keys with LIVE keys from Stripe Dashboard
STRIPE_SECRET_KEY="sk_live_..." # NOT sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # NOT pk_test_...

# Create NEW webhook endpoint in Stripe Dashboard for production URL
STRIPE_WEBHOOK_SECRET="whsec_..." # New secret from production webhook
```

**How to get production keys:**
1. Go to https://dashboard.stripe.com
2. Switch from "Test mode" to "Live mode" (toggle in top right)
3. Go to Developers → API keys
4. Copy "Publishable key" and "Secret key"

**How to setup production webhook:**
1. In Stripe Dashboard (Live mode)
2. Go to Developers → Webhooks
3. Click "Add endpoint"
4. URL: `https://yourdomain.com/api/checkout/webhook`
5. Events to listen: `checkout.session.completed`
6. Copy the webhook signing secret

### 2. NextAuth Configuration
```bash
# Generate secure random secret (CRITICAL)
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"

# Update to production URL
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

**Generate secure secret:**
```bash
openssl rand -base64 32
```

### 3. Database (Already Configured)
```bash
# Your Supabase connection is already set
DATABASE_URL="postgresql://postgres.dhfflpixjzwxexvflpzk:..."
DIRECT_URL="postgresql://postgres.dhfflpixjzwxexvflpzk:..."
```

### 4. Email Configuration (Already Configured)
```bash
# Gmail SMTP already configured
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tsedeniyafisehaw@gmail.com"
SMTP_PASS="zpuq dknd bxii xaxz"
FROM_EMAIL="noreply@yourdomain.com" # Update this
```

### 5. OAuth Providers (Optional - Already Configured)
```bash
# Google and GitHub OAuth already set
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### 6. Admin Configuration
```bash
# Update admin email to real admin
ADMIN_EMAIL="admin@yourdomain.com"
NEXT_PUBLIC_ADMIN_EMAIL="admin@yourdomain.com"
```

## Testing the Payment System

### Test Cards (Test Mode Only)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC

### Manual Test Steps

1. **Start the application:**
```bash
npm run dev
```

2. **Add products to cart:**
   - Navigate to `/shop`
   - Add 2-3 products to cart
   - Verify cart shows correct items

3. **Proceed to checkout:**
   - Go to `/cart`
   - Click "Proceed to Checkout"
   - Fill in shipping address
   - Click "Place Order"

4. **Complete payment:**
   - Should redirect to Stripe checkout page
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

5. **Verify success:**
   - Should redirect to `/order-success?session_id=...`
   - Order details should display
   - Check email for confirmation

6. **Verify in database:**
   - Check Orders table for new order
   - Status should be "paid"
   - OrderItems should be created

7. **Verify in admin:**
   - Login as admin
   - Go to `/admin/orders`
   - Find the new order
   - Verify all details

### Automated Test Script

Run this to test the payment flow:
```bash
npm run test:payment
```

## Production Deployment Checklist

### Before Deploying

- [ ] Switch Stripe to LIVE mode keys
- [ ] Create production webhook endpoint in Stripe
- [ ] Generate new NEXTAUTH_SECRET
- [ ] Update all URLs to production domain
- [ ] Update FROM_EMAIL to production domain
- [ ] Test webhook endpoint is accessible
- [ ] Verify SSL certificate is valid
- [ ] Test a real payment with small amount

### After Deploying

- [ ] Test complete checkout flow in production
- [ ] Verify webhook receives events (check Stripe Dashboard)
- [ ] Verify order confirmation emails are sent
- [ ] Test order appears in admin dashboard
- [ ] Monitor Sentry for errors
- [ ] Check database for order records

## Security Notes

### ⚠️ IMPORTANT
1. **Never commit production keys to git**
2. **Use environment variables on hosting platform**
3. **Webhook secret must match Stripe Dashboard**
4. **NEXTAUTH_SECRET must be cryptographically random**
5. **Enable Stripe webhook signature verification (already implemented)**

## Webhook Testing in Development

To test webhooks locally:

1. **Install Stripe CLI:**
```bash
stripe login
```

2. **Forward webhooks to local:**
```bash
stripe listen --forward-to localhost:3000/api/checkout/webhook
```

3. **Copy webhook secret from CLI output and update .env.local**

4. **Trigger test payment:**
```bash
stripe trigger checkout.session.completed
```

## Monitoring

### Check Payment Status
- Stripe Dashboard: https://dashboard.stripe.com/payments
- Application: `/admin/orders`
- Database: Query Orders table

### Check Webhook Delivery
- Stripe Dashboard → Developers → Webhooks
- View webhook attempts and responses
- Retry failed webhooks if needed

## Common Issues

### Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check webhook secret matches Stripe Dashboard
- Verify endpoint is listening for correct events
- Check server logs for errors

### Payment Succeeds but Order Not Updated
- Check webhook endpoint is configured
- Verify webhook secret is correct
- Check database connection
- Review server logs for errors

### Email Not Sent
- Verify SMTP credentials
- Check email service allows SMTP
- Review email logs in server
- Test email configuration separately

## Support

For Stripe issues: https://support.stripe.com
For application issues: Check server logs and Sentry
