# Quick Gmail Setup (5 Minutes)

## Easiest Way - Get Your App Password

### Step 1: Open Gmail Settings
- Go to: **https://myaccount.google.com**
- Click **Security** (left sidebar)

### Step 2: Enable 2-Factor Authentication (if not enabled)
- Look for "How you sign in to Google"
- Click **2-Step Verification**
- Follow the steps

### Step 3: Generate App Password
- Go to: **https://myaccount.google.com/apppasswords**
- You'll see two dropdowns
- Select: **Mail** and **Windows Computer** (or your device)
- Click **Generate**
- Google shows you a **16-character password** like: `abcd efgh ijkl mnop`
- **Copy this password**

### Step 4: Update .env File
Open this file: `backend/.env`

Replace these lines:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

With your actual credentials:
```env
GMAIL_USER=mansi@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

**⚠️ IMPORTANT:**
- Use the **16-character app password** (NOT your regular Gmail password)
- Keep spaces in the password
- Save the file

### Step 5: Restart Backend
In your terminal where backend is running:
1. Press **Ctrl+C** to stop it
2. Run: `npm run dev`

You should see: `✅ Email service ready`

### Step 6: Test It
1. Go to http://localhost:3000
2. Enter your email
3. Click Login
4. **Check your Gmail inbox for OTP**
5. Enter the code
6. ✅ Success!

## Troubleshooting

**Still not receiving emails?**

1. **Check backend console** - It shows:
   ```
   📝 OTP CODE FOR TESTING: 123456
   📧 Email sent status: ✅ Success or ❌ Failed
   ```

2. **If email failed:**
   - Close backend with Ctrl+C
   - Double-check .env file has correct credentials
   - Run: `npm run dev` again

3. **Still not working?**
   - For now, use the **OTP code shown on the login page**
   - It's displayed for testing purposes

## For Testing Without Gmail

If you want to skip Gmail setup for now:
- The OTP code is displayed on the page
- Enter that code to proceed
- (You can set up Gmail later)
