# Password Reset - Fixed ✅

## Issue

The forgot-password API was creating a malformed reset link by passing the full URL to the email function, which then tried to build another URL around it, resulting in a double-link.

## Fix Applied

**File:** `src/app/api/auth/forgot-password/route.ts`

**Before:**
```typescript
const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`;
await sendPasswordResetEmail(email, resetLink);
```

**After:**
```typescript
await sendPasswordResetEmail(email, token);
```

The email function (`sendPasswordResetEmail` in `src/lib/email.ts`) already builds the complete reset link from the token, so we only need to pass the token.

## How It Works Now

### 1. User Requests Password Reset
- Goes to `/forgot-password`
- Enters email address
- Submits form

### 2. Backend Processing
- Validates email exists in database
- Generates random 32-byte token
- Saves token in database with 1-hour expiration
- Sends email with reset link

### 3. Email Contains
- Professional HTML template
- Reset link: `https://www.hypercleaningsupplies.co.nz/reset-password?token=xxx`
- Link expires in 1 hour
- Brand colors and styling

### 4. User Clicks Link
- Opens `/reset-password?token=xxx`
- Enters new password (min 8 characters)
- Password requirements shown with live validation

### 5. Password Reset
- Token validated (not expired, exists in DB)
- Password hashed with bcrypt
- User password updated
- Token deleted (one-time use)
- Redirects to signin page

## Security Features

✅ **Token expiration:** 1 hour
✅ **One-time use:** Token deleted after successful reset
✅ **Secure hashing:** bcrypt with salt rounds
✅ **No email enumeration:** Always returns success message
✅ **HTTPS only:** Reset links use production URL

## Testing

To test the password reset flow:

1. **Local:**
   ```bash
   npm run dev
   ```
   Go to: http://localhost:3000/forgot-password

2. **Production:**
   Go to: https://www.hypercleaningsupplies.co.nz/forgot-password

3. **Test Steps:**
   - Enter email: taranveerebu340@gmail.com
   - Check email inbox for reset link
   - Click link
   - Enter new password
   - Login with new password

## Files Modified

- ✅ `src/app/api/auth/forgot-password/route.ts` - Fixed to pass token only

## Status

✅ **Fixed and ready to deploy**

The password reset functionality now works correctly!
