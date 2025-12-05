# Hyper Cleaning Supplies - E-Commerce Platform

Professional cleaning supplies e-commerce platform built with Next.js 14, featuring product management, user authentication, shopping cart, and Stripe payment integration.

**Live Site:** https://www.hypercleaningsupplies.co.nz

---

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

---

## 📋 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v4
- **Payments:** Stripe
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Redux Toolkit with redux-persist
- **Deployment:** Vercel

---

## 🔑 Environment Variables

Create `.env.local` for development:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Admin
ADMIN_EMAIL="admin@example.com"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (SMTP)
EMAIL_SERVER="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@hypercleaningsupplies.co.nz"
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── admin/             # Admin dashboard
│   ├── shop/              # Product pages
│   ├── cart/              # Shopping cart
│   └── account/           # User account pages
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── common/            # Shared components
│   └── ui/                # ShadCN UI components
├── lib/                   # Utilities and configurations
│   ├── prisma.ts          # Database client
│   ├── auth.ts            # Authentication config
│   └── stripe.ts          # Payment config
└── styles/                # Global styles

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Database migrations
```

---

## 🗄️ Database Setup

### Initial Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Open Prisma Studio
npm run prisma:studio
```

### Database Schema
- **User** - Customer accounts
- **Product** - Cleaning supplies inventory
- **Category** - Product categories
- **Cart** - Shopping cart items
- **Order** - Purchase orders
- **Review** - Product reviews

---

## 👤 User Features

### Authentication
- Email/password signup and login
- Google OAuth
- GitHub OAuth
- Email verification
- Password reset

### Shopping
- Browse products by category
- Search and filter products
- Add to cart (persists across sessions)
- Wishlist functionality
- Stripe checkout
- Order history

### Account Management
- Profile editing
- Order tracking
- Password change

---

## 🛠️ Admin Features

**Access:** Login with email matching `ADMIN_EMAIL` environment variable

### Admin Dashboard (`/admin`)
- View statistics (total products, orders, revenue)
- Manage products (create, edit, delete)
- Manage categories
- View and update orders
- Upload product images

### Product Management
- Add new products with images
- Set prices and discounts
- Manage stock levels
- Assign categories
- Update product details

### Order Management
- View all orders
- Update order status
- View customer details
- Track order history

---

## 🛒 How the Website Works

### Customer Journey

1. **Browse Products**
   - Visit homepage or navigate to Shop
   - Filter by category from navigation menu
   - View product details

2. **Add to Cart**
   - Click "Add to Cart" on product page
   - Cart persists even after closing browser
   - View cart summary in navbar

3. **Checkout**
   - Click "Checkout" from cart page
   - Login or continue as guest
   - Enter shipping information
   - Pay with Stripe (credit/debit card)

4. **Order Confirmation**
   - Receive order confirmation email
   - View order in account dashboard
   - Track order status

### Navigation Structure

- **Shop by Category** - Dynamic menu from database categories
- **About Us** - Company information
- **Blog** - Cleaning tips and guides
- **Contact** - Contact form and information

### Cart System

- **Redux State** - Cart stored in Redux with persistence
- **LocalStorage** - Cart survives page refreshes
- **Database Sync** - Logged-in users sync cart to database

---

## 💳 Payment Flow

1. User clicks "Checkout" from cart
2. System creates Stripe Checkout Session
3. User redirected to Stripe payment page
4. After payment, Stripe webhook notifies system
5. Order created in database
6. Confirmation email sent
7. User redirected to success page

---

## 📧 Email System

Automated emails sent for:
- Account verification
- Password reset
- Order confirmation
- Order status updates

**SMTP Configuration:** Uses Gmail SMTP (requires app password)

---

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import project to Vercel
   - Connect GitHub repository

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Update `NEXTAUTH_URL` to production domain
   - Update `NEXT_PUBLIC_SITE_URL` to production domain

3. **Database**
   - Use production PostgreSQL database
   - Run migrations: `npm run db:migrate:deploy`

4. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel auto-deploys on push

### Important Production Settings

- Set `NEXTAUTH_URL=https://www.hypercleaningsupplies.co.nz`
- Set `NEXT_PUBLIC_SITE_URL=https://www.hypercleaningsupplies.co.nz`
- Use production Stripe keys
- Configure production database
- Set up production SMTP

---

## 🔧 Common Commands

```bash
# Development
npm run dev                 # Start dev server

# Database
npm run prisma:migrate      # Create migration
npm run prisma:generate     # Generate Prisma client
npm run prisma:studio       # Open database GUI
npm run db:push             # Push schema changes

# Production
npm run build               # Build for production
npm start                   # Start production server

# Testing
npm test                    # Run tests
npm run lint                # Run linter
```

---

## 🐛 Troubleshooting

### Cart Not Persisting
- Check Redux persist configuration in `src/lib/store.ts`
- Verify `whitelist: ["carts"]` is set
- Clear browser localStorage and test again

### Checkout 404 Error
- Verify `NEXTAUTH_URL` matches your domain
- Check Stripe webhook configuration
- Ensure cart has items before checkout

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database is running
- Run `npm run prisma:generate`

### Admin Access Issues
- Verify `ADMIN_EMAIL` matches your login email exactly
- Check environment variables are loaded
- Clear browser cache and re-login

---

## 📞 Support

**Website:** https://www.hypercleaningsupplies.co.nz  
**Phone:** +64 22 069 2139  
**Email:** Contact through website form

---

## 📝 Key Features Summary

✅ Product catalog with categories  
✅ Shopping cart with persistence  
✅ User authentication (email, Google, GitHub)  
✅ Stripe payment integration  
✅ Admin dashboard  
✅ Order management  
✅ Email notifications  
✅ Product reviews  
✅ Wishlist  
✅ Responsive design  
✅ SEO optimized  
✅ Blog with cleaning guides  

---

## 🔐 Security Notes

- All passwords hashed with bcrypt
- JWT sessions with secure tokens
- CSRF protection enabled
- Rate limiting on API routes
- Input validation with Zod
- SQL injection protection via Prisma
- XSS protection

---

## 📄 License

Proprietary - All rights reserved

---

**Last Updated:** December 2024
