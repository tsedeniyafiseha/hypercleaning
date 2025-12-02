# Cart Database Migration Guide

## What Changed

Added database-backed cart system where each user has their own unique cart stored in PostgreSQL.

## New Database Models

### Cart
- One cart per user
- Stores cart metadata (created/updated timestamps)
- Linked to User via userId

### CartItem
- Individual items in a cart
- Stores: productId, quantity, attributes (size, color, etc.)
- Linked to Cart and Product

## Migration Steps

### 1. Generate Prisma Migration

```bash
npx prisma migrate dev --name add_cart_models
```

This will:
- Create migration files
- Update your database schema
- Generate new Prisma client types

### 2. Verify Migration

```bash
npx prisma studio
```

Check that you see the new `Cart` and `CartItem` tables.

### 3. Test the API

The cart API is now available at `/api/cart`:

- `GET /api/cart` - Fetch user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update item quantity
- `DELETE /api/cart?itemId=123` - Remove item

## Benefits

✅ **User-Specific**: Each user has their own cart
✅ **Persistent**: Cart survives logout/login
✅ **Cross-Device**: Access cart from any device
✅ **Database-Backed**: No data loss
✅ **Secure**: Requires authentication

## Next Steps

After migration, the frontend will automatically sync with the database cart instead of localStorage.
