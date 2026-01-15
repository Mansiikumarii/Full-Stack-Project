# 📧 How to Set Up Gmail for OTP Emails

## Step-by-Step Setup Guide

### Step 1: Enable 2-Factor Authentication on Google Account
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** on the left sidebar
3. Under "How you sign in to Google", enable **2-Step Verification**
4. Follow Google's verification process

### Step 2: Generate App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **Mail** from the dropdown
3. Select **Windows Computer** (or your OS)
4. Google will generate a **16-character password**
5. **Copy this password** (you'll use it in the .env file)

### Step 3: Update .env File
Open `backend/.env` and replace:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**Example:**
```env
GMAIL_USER=mansi@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### Step 4: Restart Backend Server
After updating .env, restart the backend:
```bash
# Kill current process (Ctrl+C in terminal)
# Then run:
npm run dev
```

You should see in the terminal:
```
✅ Email service ready
```

## Testing

1. Go to http://localhost:3000
2. Enter your email: `mansi@gmail.com`
3. Click **Login**
4. Check your Gmail inbox for the OTP
5. Enter the 6-digit code in the OTP boxes
6. Click **Enter your OTP**
7. ✅ You should now be on the Dashboard!

## Troubleshooting

### "Email service not configured"
- Make sure you completed all 4 steps above
- Check that GMAIL_USER and GMAIL_APP_PASSWORD are correct in .env
- Restart the backend server after updating .env

### "OTP not received"
- Check spam/promotions folder in Gmail
- Make sure 2FA is actually enabled on Google account
- Generate a new app password

### Port Already in Use
If you see "address already in use :::5000":
```bash
Get-Process node | Stop-Process -Force
npm run dev
```

## Notes
- OTP expires after 5 minutes
- Each request generates a new OTP
- Gmail app passwords are 16 characters
- Do NOT use your regular Gmail password (it won't work)
