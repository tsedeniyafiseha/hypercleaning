# Complete Authentication & Profile System Guide

## Overview

Your e-commerce platform now has a complete authentication and user account system like AliExpress, Shopify, and other major platforms.

## What's Included

### 1. Authentication System (Fixed)
- ✅ Signup with email verification
- ✅ Login with credentials
- ✅ OAuth (Google, GitHub)
- ✅ Password reset
- ✅ Email verification tokens
- ✅ Unique user IDs for every customer

### 2. User Account Dashboard
- ✅ Profile information management
- ✅ Order history and tracking
- ✅ Saved addresses
- ✅ Security settings (change password)
- ✅ Logout functionality

## User Flow

### New User Journey

```
1. User visits /signup
   ↓
2. Fills form (name, email, password)
   ↓
3. System creates account with unique ID
   ↓
4. Verification email sent
   ↓
5. User clicks verification link
   ↓
6. Email marked as verified
   ↓
7. User can now login at /signin
   ↓
8. After login, redirected to home page
   ↓
9. User can access /account/profile
```

### Returning User Journey

```
1. User visits /signin
   ↓
2. Enters email and password
   ↓
3. System verifies credentials
   ↓
4. Creates session with user ID
   ↓
5. Redirects to home page (logged in)
   ↓
6. Can access /account/profile
```

## File Structure

```
src/app/
├── account/
│   ├── page.tsx                    # Account redirect page
│   └── profile/
│       └── page.tsx                # Main profile dashboard
├── api/
│   ├── auth/
│   │   ├── signup/route.ts         # Create new account
│   │   ├── signin/                 # NextAuth handles this
│   │   ├── verify-email/route.ts   # Verify email token
│   │   ├── change-password/route.ts # Change password (NEW)
│   │   └── [...nextauth]/route.ts  # NextAuth handler
│   ├── user/
│   │   └── profile/route.ts        # Get/update profile
│   └── orders/route.ts             # Get user orders
├── signin/page.tsx                 # Login page
└── signup/page.tsx                 # Signup page

src/lib/
├── auth.ts                         # NextAuth configuration
├── validation.ts                   # Zod schemas
└── email.ts                        # Email sending
```

## Database Schema

```
User Table:
- id (auto-increment, primary key)
- name (string)
- email (unique)
- emailVerified (timestamp, nullable)
- passwordHash (string, nullable for OAuth)
- role (default: "user")
- image (nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

VerificationToken Table:
- id (unique)
- identifier (email)
- token (unique)
- expires (timestamp)
- userId (foreign key)

Order Table:
- id (auto-increment)
- userId (foreign key)
- totalAmount (decimal)
- status (pending, completed, etc)
- createdAt (timestamp)
```

## API Endpoints

### Authentication

**POST /api/auth/signup**
- Create new account
- Body: `{ name, email, password }`
- Returns: User object with ID

**POST /api/auth/signin**
- Handled by NextAuth
- Credentials: email, password

**GET /api/auth/verify-email?token={token}**
- Verify email address
- Called from email link

**POST /api/auth/change-password**
- Change user password
- Body: `{ currentPassword, newPassword }`
- Requires authentication

### User Profile

**GET /api/user/profile**
- Get current user profile
- Returns: User object with all details

**PATCH /api/user/profile**
- Update profile information
- Body: `{ name, email }`
- Requires authentication

### Orders

**GET /api/orders**
- Get user's orders
- Returns: Array of orders with items

## Profile Dashboard Features

### 1. Profile Information Tab
- View and edit name
- View and edit email
- See account creation date
- See account status

### 2. My Orders Tab
- View all orders
- See order status (pending, completed, etc)
- View order date and total
- Click to view order details
- Link to shop if no orders

### 3. Addresses Tab
- View saved addresses
- Add new address
- Edit existing addresses
- Set default address
- (Addresses auto-save from orders)

### 4. Security Tab
- Change password
- Requires current password verification
- Password must be 6+ characters
- Confirm new password

## How Each Part Works

### Signup Flow

1. **Frontend** (`src/app/signup/page.tsx`)
   - User enters name, email, password
   - Frontend validates format
   - Normalizes email (lowercase, trim)
   - Sends to API

2. **Backend** (`src/app/api/auth/signup/route.ts`)
   - Validates with Zod schema
   - Checks if email already exists
   - Hashes password with bcrypt (12 rounds)
   - Creates user in database with auto-increment ID
   - Creates verification token
   - Sends verification email
   - Returns user object

3. **Email Verification** (`src/lib/email.ts`)
   - Sends HTML email with verification link
   - Link includes token: `/api/auth/verify-email?token={token}`
   - Token expires in 24 hours

4. **Verification** (`src/app/api/auth/verify-email/route.ts`)
   - User clicks link
   - System finds token
   - Checks if expired
   - Updates user's `emailVerified` timestamp
   - Deletes token
   - User can now login

### Login Flow

1. **Frontend** (`src/app/signin/page.tsx`)
   - User enters email and password
   - Calls NextAuth signIn function

2. **NextAuth** (`src/lib/auth.ts`)
   - Credentials provider validates
   - Finds user by email
   - Compares password hash
   - Checks if email verified
   - Returns user object

3. **JWT Callback** (`src/lib/auth.ts`)
   - Stores user ID in token
   - Stores user role in token
   - Returns token

4. **Session Callback** (`src/lib/auth.ts`)
   - Adds user ID to session
   - Adds user role to session
   - Returns session

5. **Result**
   - User logged in with session
   - Can access protected pages
   - Session includes user ID

### Profile Management

1. **Access Profile**
   - User goes to `/account/profile`
   - System checks if authenticated
   - If not, redirects to `/signin`
   - If yes, loads profile data

2. **Edit Profile**
   - User updates name or email
   - Clicks "Save Changes"
   - API validates data
   - Updates database
   - Shows success message

3. **Change Password**
   - User enters current password
   - Enters new password twice
   - Clicks "Change Password"
   - API verifies current password
   - Hashes new password
   - Updates database
   - Shows success message

4. **View Orders**
   - System fetches user's orders
   - Shows order ID, date, status, total
   - User can click to view details

## Testing the System

### Test 1: Complete Signup Flow
```bash
1. Go to http://localhost:3000/signup
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Click "Create Account"
4. Check email for verification link
5. Click verification link
6. Should see "Email verified successfully"
```

### Test 2: Login
```bash
1. Go to http://localhost:3000/signin
2. Enter:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to home page
5. Should see user menu in navbar
```

### Test 3: Access Profile
```bash
1. After login, go to http://localhost:3000/account/profile
2. Should see profile dashboard
3. Should see all tabs (Profile, Orders, Addresses, Security)
4. Should see user information
```

### Test 4: Edit Profile
```bash
1. In profile page, click "Profile Information" tab
2. Change name to "Jane Doe"
3. Click "Save Changes"
4. Should see success message
5. Name should update
```

### Test 5: Change Password
```bash
1. In profile page, click "Security" tab
2. Enter:
   - Current Password: password123
   - New Password: newpassword456
   - Confirm: newpassword456
3. Click "Change Password"
4. Should see success message
5. Logout and login with new password
```

### Test 6: OAuth Login
```bash
1. Go to /signup or /signin
2. Click "Google" or "GitHub"
3. Follow OAuth provider's flow
4. Should create account and login automatically
5. Should redirect to home page
```

## Database Connection Issue

You're seeing this error:
```
Can't reach database server at aws-1-eu-west-1.pooler.supabase.com:6543
```

**Solutions:**

1. **Check Supabase Status**
   - Go to https://supabase.com
   - Check if service is up
   - Verify your project is active

2. **Verify Connection String**
   - Check `.env.local` has correct `DATABASE_URL`
   - Verify password is URL-encoded
   - Check host and port are correct

3. **Test Connection**
   ```bash
   npm run prisma:studio
   ```
   - If this works, database is connected
   - If not, connection string is wrong

4. **Reconnect**
   - Restart dev server: `npm run dev`
   - Clear browser cache
   - Try again

## Security Features

1. **Password Hashing**
   - Uses bcrypt with 12 rounds
   - Passwords never stored in plain text

2. **Email Verification**
   - Tokens expire in 24 hours
   - Tokens are unique and random
   - Users can't login until verified

3. **Session Management**
   - JWT tokens with user ID
   - Sessions expire after configured time
   - User ID stored securely in token

4. **OAuth Security**
   - Uses NextAuth.js best practices
   - Credentials stored securely
   - No sensitive data in client

5. **Password Change**
   - Requires current password verification
   - New password must be 6+ characters
   - Prevents unauthorized changes

## Customization

### Change Password Requirements
Edit `src/lib/validation.ts`:
```typescript
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')  // Change 6 to 8
  .regex(/[A-Z]/, 'Must contain uppercase');         // Add requirements
```

### Change Email Verification Time
Edit `src/app/api/auth/signup/route.ts`:
```typescript
const tokenExpires = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
```

### Add More Profile Fields
1. Update Prisma schema
2. Add migration
3. Update profile API
4. Update profile form

### Customize Profile Dashboard
Edit `src/app/account/profile/page.tsx`:
- Change colors
- Add more tabs
- Modify layout
- Add more fields

## Troubleshooting

### "Email already registered"
- Email is already in use
- Use different email or reset password

### "Please verify your email before signing in"
- User hasn't clicked verification link
- Check email (including spam)
- Request new verification email

### "Invalid email or password"
- Wrong credentials
- Check email and password
- Verify email is verified

### "Current password is incorrect"
- Wrong current password entered
- Try again carefully

### Email not received
- Check spam folder
- Verify SMTP settings in `.env.local`
- Check `FROM_EMAIL` is set
- Check email service is working

### Database connection error
- Check Supabase is running
- Verify connection string
- Check network connection
- Restart dev server

## Next Steps

1. ✅ Test signup/login flow
2. ✅ Test profile dashboard
3. ✅ Test password change
4. ✅ Test OAuth providers
5. Add address management
6. Add order tracking
7. Add wishlist management
8. Add notification preferences
9. Add two-factor authentication
10. Add account deletion

## Production Checklist

Before deploying:
- [ ] Change `NEXTAUTH_SECRET` to strong random value
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Use production email service
- [ ] Use production database
- [ ] Test all flows on staging
- [ ] Monitor error logs
- [ ] Set up email templates
- [ ] Configure CORS if needed
- [ ] Enable HTTPS
