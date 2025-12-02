# Admin Dashboard - Complete Guide

## 🔐 Admin Access

**Admin Email**: Set in `.env.local` as `ADMIN_EMAIL`
**Default**: `admin@localhost.com`

Only users with this exact email can access admin features.

## 📍 Admin Dashboard URLs

### Main Dashboard
**URL**: `http://localhost:3000/admin`
**File**: `src/app/admin/page.tsx`

**Features**:
- Overview statistics (products, orders, revenue, users)
- Pending orders alert
- Recent orders feed
- Quick navigation to all admin sections

### Products Management
**URL**: `http://localhost:3000/admin/products`
**File**: `src/app/admin/products/page.tsx`

**Capabilities**:
- ✅ View all products with images, prices, stock
- ✅ See product details (category, rating, discounts)
- ✅ Click any product to edit
- ✅ Create new products

**Create New Product**:
**URL**: `http://localhost:3000/admin/products/new`
**File**: `src/app/admin/products/new/page.tsx`

**Can Add**:
- Product title
- Description (full text)
- Price (NZD)
- Image URL
- Category selection
- Stock quantity
- Discount amount or percentage
- Initial rating

**Edit Product**:
**URL**: `http://localhost:3000/admin/products/[id]`
**File**: `src/app/admin/products/[id]/page.tsx`

**Can Modify**:
- All product fields
- Title, description, price
- Images, category
- Stock levels
- Discounts
- Rating
- ✅ **Delete product** (with confirmation)

### Categories Management
**URL**: `http://localhost:3000/admin/categories`
**File**: `src/app/admin/categories/page.tsx`

**Capabilities**:
- ✅ View all categories with product counts
- ✅ Create new categories
- ✅ Edit category names and slugs
- ✅ Delete categories
- Auto-generates URL-friendly slugs

### Orders Management
**URL**: `http://localhost:3000/admin/orders`
**File**: `src/app/admin/orders/page.tsx`

**Capabilities**:
- ✅ View all orders
- ✅ Filter by status (pending, paid, etc.)
- ✅ See customer details
- ✅ View order items and totals
- ✅ Update order status

**Order Details**:
**URL**: `http://localhost:3000/admin/orders/[id]`
**File**: `src/app/admin/orders/[id]/page.tsx`

**Shows**:
- Complete order information
- Customer details
- Shipping address
- Order items with images
- Payment status
- Stripe transaction IDs

## 🔌 Backend API Endpoints

### Products API
**Base**: `/api/admin/products`

**GET** `/api/admin/products`
- Lists all products with pagination
- Includes category relations
- Admin authentication required

**POST** `/api/admin/products`
- Creates new product
- Validates required fields
- Returns created product

**GET** `/api/admin/products/[id]`
- Fetches single product
- Includes category data

**PUT** `/api/admin/products/[id]`
- Updates product
- All fields editable
- Validates data

**DELETE** `/api/admin/products/[id]`
- Deletes product
- Cascades to related data

### Categories API
**Base**: `/api/admin/categories`

**GET** `/api/admin/categories`
- Lists all categories
- Includes product counts

**POST** `/api/admin/categories`
- Creates new category
- Auto-validates slug uniqueness

**PUT** `/api/admin/categories/[id]`
- Updates category

**DELETE** `/api/admin/categories/[id]`
- Deletes category

### Orders API
**Base**: `/api/admin/orders`

**GET** `/api/admin/orders`
- Lists all orders
- Filter by status
- Pagination support
- Includes user and items

**GET** `/api/admin/orders/[id]`
- Fetches order details
- Complete order information

**PUT** `/api/admin/orders/[id]`
- Updates order status
- Modifies order data

## 🎯 What Admin Controls

### Database Control
✅ **Products**: Full CRUD (Create, Read, Update, Delete)
✅ **Categories**: Full CRUD
✅ **Orders**: Read and Update status
✅ **Direct database access**: All changes save to PostgreSQL/Supabase

### Frontend Control
✅ **Product listings**: Changes appear immediately on shop pages
✅ **Category filters**: Updated categories show in navigation
✅ **Pricing**: Price changes reflect instantly
✅ **Stock levels**: Out of stock products handled automatically
✅ **Discounts**: Discount calculations update in real-time

### What Updates Automatically
When admin makes changes:
1. **Homepage** - New/updated products appear
2. **Shop page** - Product listings update
3. **Category pages** - Filtered products update
4. **Product detail pages** - All product info updates
5. **Search results** - New products are searchable
6. **Cart** - Prices update (if product still in cart)

## 🔒 Security

**Authentication**: NextAuth.js session-based
**Authorization**: Email-based admin check
**API Protection**: All admin routes verify session + admin email
**CSRF Protection**: Built into Next.js
**SQL Injection**: Prevented by Prisma ORM

## 📊 Admin Workflow Example

### Adding a New Product:
1. Go to `http://localhost:3000/admin/products`
2. Click "New Product"
3. Fill in:
   - Title: "Multi-Surface Cleaner 5L"
   - Description: "Professional grade cleaner..."
   - Price: 45.99
   - Image URL: https://example.com/image.jpg
   - Category: Cleaning Chemicals
   - Stock: 100
   - Discount: 10%
4. Click "Create Product"
5. Product immediately appears on:
   - Homepage (if new arrival)
   - Shop page
   - Category page
   - Search results

### Editing Product:
1. Go to `http://localhost:3000/admin/products`
2. Click on any product
3. Modify any field (price, description, stock, etc.)
4. Click "Save Changes"
5. Changes reflect immediately across entire site

### Managing Categories:
1. Go to `http://localhost:3000/admin/categories`
2. Click "Add Category"
3. Enter name (slug auto-generates)
4. Category appears in:
   - Navigation menu
   - Product filters
   - Admin product creation dropdown

## 🧪 Testing Admin Features

### Prerequisites:
1. Database connected (local PostgreSQL or Supabase)
2. Admin user created: `npx tsx scripts/create-admin.ts`
3. Dev server running: `npm run dev`

### Test Checklist:
- [ ] Login as admin at `/signin`
- [ ] Access `/admin` dashboard
- [ ] View products list
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] Create category
- [ ] Edit category
- [ ] View orders
- [ ] Check product appears on homepage
- [ ] Verify price changes reflect on shop page

## 📝 Summary

**Admin Dashboard Location**: `/admin`
**Full Database Control**: ✅ Yes
**Full Frontend Control**: ✅ Yes (via database changes)
**Real-time Updates**: ✅ Yes
**Secure**: ✅ Yes (session + email verification)

The admin has complete control over products, categories, and orders through an intuitive web interface. All changes save to the database and immediately reflect across the entire frontend.
