# 🚀 START MongoDB and Run the Application

## Step 1: Start MongoDB

Choose one option below:

### Option A: Using MongoDB Community Edition (Windows)

**If you have MongoDB installed:**

Open PowerShell and run:
```powershell
# Windows Services
net start MongoDB

# Or if using mongod directly:
mongod
```

The service should start. You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Option B: Using Docker (Recommended if you have Docker)

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option C: Download & Install MongoDB

1. Download from: https://www.mongodb.com/try/download/community
2. Run installer
3. MongoDB will be installed as a Windows Service
4. Service will start automatically

---

## Step 2: Verify Backend is Running

The backend server is already running at:
```
http://localhost:5000
```

Check if MongoDB connected by visiting:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "message": "Server is running"
}
```

---

## Step 3: Seed Database (After MongoDB Starts)

Run this command in a new terminal:

```powershell
cd 'c:\Users\mansi\OneDrive\Desktop\Assignment\backend'
node seedData.js
```

You should see:
```
✓ Users created successfully
✓ Products created successfully
✓ Reviews added successfully
✅ Database seeding completed successfully!

Sample Login Credentials:
Email: john@example.com | Password: password123
Email: jane@example.com | Password: password123
Email: alex@example.com | Password: password123
```

---

## Step 4: Start Frontend (New Terminal)

```powershell
cd 'c:\Users\mansi\OneDrive\Desktop\Assignment\frontend'
npm install
npm start
```

The app will open at: `http://localhost:3000`

---

## Step 5: Login and Test

Login with:
- Email: `john@example.com`
- Password: `password123`

---

## ✅ Checklist

- [ ] MongoDB is running
- [ ] Backend server started (port 5000)
- [ ] Database seeded with sample data
- [ ] Frontend installed dependencies
- [ ] Frontend running (port 3000)
- [ ] Can login with sample credentials
- [ ] Dashboard loads with products

---

## 🆘 Troubleshooting

### MongoDB not starting?

**Try:**
```powershell
# Start MongoDB service
net start MongoDB

# Or start mongod directly
mongod --dbpath "C:\data\db"
```

**First time setup:**
```powershell
mkdir C:\data\db
mongod --dbpath "C:\data\db"
```

### Backend still showing MongoDB error?

1. Ensure MongoDB is running (you should see output from mongod)
2. Check the terminal where backend is running
3. Files will auto-restart when MongoDB connects
4. Then run `node seedData.js`

### Frontend won't install?

```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

---

**Start MongoDB first, then everything else will work! ✅**
