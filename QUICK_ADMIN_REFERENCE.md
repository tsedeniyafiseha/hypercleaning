# Quick Admin Reference Card

## 🎯 Admin Login
```
URL: http://localhost:3000/admin
Email: admin@localhost.com
Password: Admin123!
```

## 🔄 Admin Behavior

**Homepage Visit** → **Auto-Redirect to Dashboard**

Admin users don't see the shopping interface. They go straight to the admin panel.

## 📸 Adding Product Images (3 Steps)

### Step 1: Upload Image (30 seconds)
1. Go to https://imgbb.com
2. Click "Start uploading"
3. Select your product photo
4. Click "Upload"
5. Copy the "Direct link"

### Step 2: Create Product
1. Admin Dashboard → Products → New Product
2. Fill in product details
3. Paste image URL in "Image URL" field
4. See live preview appear
5. Click "Create Product"

### Step 3: Done!
Product appears in shop with image.

## 🖼️ Image Requirements

- **Size**: 800x800px to 1200x1200px
- **Format**: JPG or PNG
- **File Size**: Under 500KB
- **Aspect Ratio**: Square (1:1) or 4:3

## 🔗 Quick Links

### Image Hosting (Choose One)
- **ImgBB**: https://imgbb.com (Recommended - No account needed)
- **Imgur**: https://imgur.com/upload (Alternative)

### Image Optimization
- **Compress**: https://tinypng.com
- **Resize**: https://www.iloveimg.com/resize-image

### Admin URLs
- **Dashboard**: http://localhost:3000/admin
- **Products**: http://localhost:3000/admin/products
- **Orders**: http://localhost:3000/admin/orders
- **Categories**: http://localhost:3000/admin/categories

## ✅ Image URL Examples

**Valid:**
```
✅ https://i.ibb.co/abc123/product.jpg
✅ https://i.imgur.com/xyz789.png
✅ /images/products/local-image.jpg
```

**Invalid:**
```
❌ C:\Desktop\image.jpg (local path)
❌ image.jpg (no domain)
❌ https://example.com/page.html (not an image)
```

## 🎨 Product Form Features

- ✅ Live image preview (updates as you type)
- ✅ Direct links to image hosting services
- ✅ Image size recommendations
- ✅ Error handling for invalid URLs
- ✅ Helpful tooltips

## 🚨 Troubleshooting

### Image Not Showing?
1. Check URL is accessible (paste in browser)
2. Ensure URL ends with .jpg, .png, or .webp
3. Verify URL uses HTTPS
4. Try different hosting service

### Can't Access Dashboard?
1. Verify logged in as: `admin@localhost.com`
2. Check password: `Admin123!`
3. Clear browser cache
4. Restart server: `npm run dev`

### Preview Shows "Invalid URL"?
1. Check for typos in URL
2. Ensure image is publicly accessible
3. Try uploading image again
4. Use ImgBB or Imgur

## 📚 Full Documentation

- **IMAGE_HOSTING_GUIDE.md** - Complete image hosting guide
- **ADMIN_USER_GUIDE.md** - Full admin manual
- **ADMIN_IMPROVEMENTS_SUMMARY.md** - Technical details

## 💡 Pro Tips

1. **Optimize images** before uploading (use TinyPNG)
2. **Use descriptive names** for images
3. **Test image URL** in browser before pasting
4. **Keep images under 500KB** for fast loading
5. **Use square images** for best display

---

**Quick Workflow**: Upload to ImgBB → Copy URL → Paste in admin form → Save ✅
