# Clean Up Database - Delete All Users

## What This Does

Deletes all:
- ✅ Users
- ✅ Emails
- ✅ Sessions
- ✅ OAuth accounts
- ✅ Verification tokens
- ✅ Orders
- ✅ Reviews
- ✅ Wishlist items

Keeps:
- ✅ Products
- ✅ Categories
- ✅ All other data

---

## How to Run

### Option 1: Using Node (Easiest)
```bash
node cleanup-db.js
```

### Option 2: Using Prisma
```bash
npx ts-node scripts/cleanup-users.ts
```

---

## What You'll See

```
🗑️  Starting database cleanup...

✓ Deleted 5 verification tokens
✓ Deleted 3 sessions
✓ Deleted 2 OAuth accounts
✓ Deleted 0 reviews
✓ Deleted 0 wishlist items
✓ Deleted 0 order items
✓ Deleted 0 orders
✓ Deleted 5 users

✅ Database cleanup complete!
All users, emails, and related data have been deleted.
```

---

## Before Running

Make sure:
1. Dev server is **stopped** (Ctrl+C)
2. You have `.env.local` configured
3. Database connection is working

---

## After Running

1. All users are deleted
2. You can signup fresh
3. Start dev server: `npm run dev`
4. Test signup/login with new account

---

## If You Want to Keep Products

The script only deletes users and related data. Products and categories stay intact.

If you also want to delete products:
```bash
# Edit cleanup-db.js and add before deleting users:
const productsDeleted = await prisma.product.deleteMany({});
console.log(`✓ Deleted ${productsDeleted.count} products`);

const categoriesDeleted = await prisma.category.deleteMany({});
console.log(`✓ Deleted ${categoriesDeleted.count} categories`);
```

---

## Quick Steps

1. **Stop dev server**
   ```bash
   Ctrl+C
   ```

2. **Run cleanup**
   ```bash
   node cleanup-db.js
   ```

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. **Test signup**
   - Go to http://localhost:3000/signup
   - Create new account
   - Should work fresh

---

## Done! ✅

Your database is now clean. All old users and emails are deleted.
