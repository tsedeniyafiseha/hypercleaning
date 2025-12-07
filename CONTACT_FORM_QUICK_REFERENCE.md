# Contact Form - Quick Reference

## ✅ What Was Fixed

1. **Phone validation** - Now properly optional
2. **Environment variables** - Standardized to `SMTP_*` naming
3. **Error logging** - Enhanced for better debugging
4. **Email templates** - Professional HTML design
5. **Error messages** - More helpful user feedback

## 🔧 Required Environment Variables

Make sure these are set in your environment (Vercel dashboard for production):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

## 🧪 Testing

### Quick Test (Local)
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/contact
3. Fill and submit the form
4. Check emails

### API Test
```bash
npx tsx scripts/test-contact-form.ts
```

## 📧 Gmail Setup

If using Gmail for SMTP:
1. Enable 2FA on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an App Password
4. Use that as `SMTP_PASS` (not your regular password)

## 🚨 Troubleshooting

### "SMTP configuration incomplete"
- Check all `SMTP_*` variables are set
- Run: `npx tsx scripts/test-contact-form.ts` to verify

### "Authentication failed"
- Verify you're using an App Password (not regular password)
- Check the email/password are correct

### "Connection timeout"
- Check firewall settings
- Verify SMTP_HOST and SMTP_PORT are correct
- Try port 465 instead of 587

### Form submits but no email
- Check server logs in Vercel dashboard
- Verify FROM_EMAIL and ADMIN_EMAIL are set
- Test with the test script

## 📁 Files Modified

- `src/app/api/contact/route.ts` - Main API handler
- `src/components/contact/ContactForm.tsx` - Form component
- `.env.production.template` - Template file
- `scripts/test-contact-form.ts` - Test script (new)

## 🎯 Status

✅ All fixes applied and tested
✅ Ready for production deployment
