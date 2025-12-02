# Admin User Guide

## Overview

This guide explains how the admin user experience works and how to manage products with images.

## Admin User Behavior

### Automatic Dashboard Redirect

When the admin user logs in and visits the homepage (`/`), they are **automatically redirected** to the admin dashboard (`/admin`).

**How it works:**
1. Admin logs in with credentials: `admin@localhost.com` / `Admin123!`
2. Visits homepage at http://localhost:3000
3. System detects admin email matches `ADMIN_EMAIL` environment variable
4. Automatically redirects to http://localhost:3000/admin
5. Admin sees dashboard instead of public homepage

**Benefits:**
- Admin doesn't see the public shopping interface
- Direct access to management tools
- Cleaner admin experience
- Prevents confusion

### Admin Access Points

Admin can access the dashboard through:
1. **Direct URL**: http://localhost:3000/admin
2. **After Login**: Automatic redirect from homepage
3. **Navbar**: Admin link (if implemented)

### What Admin Can Do

From the dashboard, admin can:
- ✅ View statistics (total products, orders, revenue)
- ✅ Manage products (create, edit, delete)
- ✅ Manage categories
- ✅ View and manage orders
- ✅ Update order status
- ✅ View customer information

### What Admin Cannot Do

Admin user is restricted from:
- ❌ Shopping/adding to cart (redirected to dashboard)
- ❌ Placing orders as customer
- ❌ Accessing regular user account pages

## Managing Product Images

### Current System: URL-Based Images

Admin enters image URLs when creating/editing products. The system doesn't upload files directly.

### Step-by-Step: Adding Product with Image

#### 1. Prepare Your Product Image

**Image Requirements:**
- Format: JPG, PNG, or WebP
- Size: 800x800px to 1200x1200px (square or 4:3 ratio)
- File size: Under 500KB
- Clear, professional product photo

**Optimize Image:**
- Use https://tinypng.com to compress
- Crop to remove unnecessary background
- Ensure good lighting and clarity

#### 2. Upload Image to Hosting Service

**Recommended: ImgBB (Easiest)**

1. Go to https://imgbb.com
2. Click "Start uploading"
3. Select your product image
4. Click "Upload"
5. Wait for upload to complete
6. Click "Direct link" to copy URL
7. URL will look like: `https://i.ibb.co/abc123/product.jpg`

**Alternative: Imgur**

1. Go to https://imgur.com/upload
2. Drag and drop your image
3. Right-click uploaded image
4. Select "Copy image address"
5. URL will look like: `https://i.imgur.com/xyz789.jpg`

#### 3. Create Product in Admin Panel

1. **Login to Admin**
   - Go to http://localhost:3000/admin
   - Login with: `admin@localhost.com` / `Admin123!`

2. **Navigate to Products**
   - Click "Products" in sidebar
   - Click "New Product" button

3. **Fill Product Details**
   
   **Basic Information:**
   - Product Title: e.g., "Multi-Surface Cleaner - 5L"
   - Description: Detailed product description
   - Category: Select from dropdown

   **Pricing & Inventory:**
   - Price: e.g., 29.99
   - Stock Quantity: e.g., 100
   - Discount Amount: Optional (e.g., 5.00)
   - Discount Percentage: Optional (e.g., 15)
   - Rating: 0-5 (e.g., 4.5)

   **Product Image:**
   - Paste the image URL from ImgBB/Imgur
   - Preview will appear automatically
   - If preview shows "Invalid URL", check the URL

4. **Save Product**
   - Click "Create Product"
   - Product will appear in products list
   - Verify image displays correctly

#### 4. Verify Product

1. Go to http://localhost:3000/shop
2. Find your product
3. Check image displays correctly
4. Click product to view details
5. Verify all information is correct

### Image URL Examples

**Valid URLs:**
```
✅ https://i.ibb.co/abc123/cleaner.jpg
✅ https://i.imgur.com/xyz789.png
✅ https://res.cloudinary.com/demo/image/upload/product.jpg
✅ /images/products/local-image.jpg (for local files)
```

**Invalid URLs:**
```
❌ C:\Users\Desktop\image.jpg (local file path)
❌ image.jpg (no domain)
❌ https://example.com/page.html (not an image)
```

### Image Preview Feature

The admin form includes a **live preview**:
- Type or paste image URL
- Preview appears automatically below
- Shows "Invalid URL" if URL doesn't work
- Helps verify image before saving

### Editing Product Images

1. Go to Admin → Products
2. Click "Edit" on product
3. Update Image URL field
4. Preview updates automatically
5. Click "Save Changes"

## Image Hosting Options

### Quick Comparison

| Service | Setup Time | Free Storage | Best For |
|---------|------------|--------------|----------|
| **ImgBB** | 30 seconds | Unlimited | Quick start |
| **Imgur** | 30 seconds | Unlimited | Quick start |
| **Cloudinary** | 5 minutes | 25GB | Production |
| **Local Files** | Instant | N/A | Development |

### Recommended Workflow

**For Testing/Development:**
- Use ImgBB or Imgur
- No account needed
- Fast and simple

**For Production:**
- Set up Cloudinary account
- Organize images in folders
- Better performance and features

## Troubleshooting

### Image Not Showing

**Problem**: Image URL entered but doesn't display

**Solutions:**
1. Check URL is accessible (paste in browser)
2. Ensure URL ends with image extension (.jpg, .png)
3. Verify URL uses HTTPS (not HTTP)
4. Try different image hosting service
5. Check image file isn't too large

### Preview Shows "Invalid URL"

**Problem**: Preview shows error message

**Solutions:**
1. Verify URL is complete and correct
2. Check for typos in URL
3. Ensure image is publicly accessible
4. Try uploading image again
5. Use different hosting service

### Admin Can't Access Dashboard

**Problem**: Admin redirected to signin

**Solutions:**
1. Verify logged in with correct email: `admin@localhost.com`
2. Check `ADMIN_EMAIL` in `.env.local` matches
3. Clear browser cache and cookies
4. Try logging out and back in

### Admin Sees Homepage Instead of Dashboard

**Problem**: Admin not redirected to dashboard

**Solutions:**
1. Check `NEXT_PUBLIC_ADMIN_EMAIL` is set in `.env.local`
2. Verify email matches exactly (case-sensitive)
3. Restart development server: `npm run dev`
4. Clear browser cache

## Admin Credentials

### Development
```
Email: admin@localhost.com
Password: Admin123!
```

### Production
Update these in your database and environment variables before deploying.

## Environment Variables

Admin functionality requires these variables:

```bash
# .env.local
ADMIN_EMAIL="admin@localhost.com"
NEXT_PUBLIC_ADMIN_EMAIL="admin@localhost.com"
```

**Note**: `NEXT_PUBLIC_` prefix makes it available in browser for client-side redirect.

## Security Notes

### Admin Protection

- Admin routes protected by middleware
- Only user with matching email can access
- Automatic redirect if not authorized
- Session-based authentication

### Best Practices

1. **Change default password** after first login
2. **Use strong password** in production
3. **Don't share admin credentials**
4. **Use environment variables** for admin email
5. **Enable 2FA** if implementing additional security

## Future Enhancements

### Planned Features

1. **Direct File Upload**
   - Upload images directly in admin panel
   - Automatic upload to cloud storage
   - No need for external hosting

2. **Image Gallery**
   - Multiple images per product
   - Drag-and-drop reordering
   - Thumbnail management

3. **Image Optimization**
   - Automatic compression
   - Multiple sizes generated
   - WebP conversion

4. **Admin Dashboard Improvements**
   - Sales analytics
   - Customer insights
   - Inventory alerts

## Quick Reference

### Admin URLs
- Dashboard: http://localhost:3000/admin
- Products: http://localhost:3000/admin/products
- Categories: http://localhost:3000/admin/categories
- Orders: http://localhost:3000/admin/orders

### Image Hosting
- ImgBB: https://imgbb.com
- Imgur: https://imgur.com/upload
- Cloudinary: https://cloudinary.com

### Image Tools
- Compress: https://tinypng.com
- Optimize: https://squoosh.app
- Resize: https://www.iloveimg.com/resize-image

## Support

### Common Tasks

**Add Product**: Admin → Products → New Product
**Edit Product**: Admin → Products → Edit (pencil icon)
**Delete Product**: Admin → Products → Delete (trash icon)
**View Orders**: Admin → Orders
**Manage Categories**: Admin → Categories

### Getting Help

1. Check this guide first
2. Review IMAGE_HOSTING_GUIDE.md for detailed image instructions
3. Check server logs for errors
4. Verify environment variables are set

---

**Admin Experience**: Automatic dashboard redirect ✅
**Image Management**: URL-based with preview ✅
**Documentation**: Complete guide available ✅
