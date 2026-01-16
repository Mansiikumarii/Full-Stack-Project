# Setup Guide - Productr Application

## 🔧 Installation Steps

### Step 1: MongoDB Setup

#### Option A: Local MongoDB
1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should start automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Use this in your `.env` file

### Step 2: Backend Installation

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB URI
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/productr
# JWT_SECRET=your_secret_key_here
# NODE_ENV=development

# Seed the database with sample data
node seedData.js

# Start development server
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Step 3: Frontend Installation

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

**Expected Output:**
Application will open at `http://localhost:3000`

## 🧪 Testing the Application

### 1. Test Authentication
```
Email: john@example.com
Password: password123
```

### 2. Navigate Features
- ✅ Login/Signup pages
- ✅ Dashboard with products
- ✅ Create new product
- ✅ View product details
- ✅ Filter by category
- ✅ Logout functionality

## 🔍 Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running
- Check MongoDB URI in `.env`
- Verify database name in connection string

### Issue: "CORS error"
**Solution:**
- Backend CORS is configured in `server.js`
- Ensure frontend URL is correct in `.env`

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in .env to different port (e.g., 5001)
PORT=5001
```

### Issue: "Token is not valid"
**Solution:**
- Clear localStorage: DevTools → Application → Local Storage → Clear
- Log out and log back in

### Issue: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

## 📁 File Structure Explanation

### Backend Files
- `server.js` - Main server entry point
- `config/db.js` - MongoDB connection
- `models/User.js` - User database schema
- `models/Product.js` - Product database schema
- `controllers/authController.js` - Authentication logic
- `controllers/productController.js` - Product logic
- `routes/authRoutes.js` - Auth API routes
- `routes/productRoutes.js` - Product API routes
- `middleware/auth.js` - JWT verification
- `middleware/errorHandler.js` - Error handling

### Frontend Files
- `App.js` - Main application component
- `pages/Login.jsx` - Login page
- `pages/Signup.jsx` - Registration page
- `pages/Dashboard.jsx` - Product listing
- `pages/CreateProduct.jsx` - Add product form
- `pages/ProductDetail.jsx` - Product details view
- `contexts/AuthContext.js` - Authentication state
- `services/api.js` - API calls
- `components/UI.jsx` - Reusable UI components
- `styles/` - CSS styling

## 🎯 API Endpoints Reference

### Auth Routes
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)
- `GET /api/products/my-products` - Get user's products

## 📊 Database Seeding

The `seedData.js` script creates:
- 3 sample users
- 8 sample products with different categories
- Sample reviews

Run it with:
```bash
node seedData.js
```

## 🚀 Running in Production

### Build Frontend
```bash
cd frontend
npm run build
```

This creates a `build/` folder with optimized production files.

### Configure for Production
1. Update `.env` files with production URLs
2. Set `NODE_ENV=production`
3. Use production MongoDB connection
4. Set strong JWT secret

## 📱 Testing on Mobile

1. Find your computer's IP: 
   - Windows: `ipconfig`
   - Mac: `ifconfig`

2. Update frontend `.env`:
   ```
   REACT_APP_API_URL=http://YOUR_IP:5000/api
   ```

3. Access from mobile: `http://YOUR_IP:3000`

## 🆘 Need Help?

1. Check server console for errors
2. Open browser DevTools (F12) for frontend errors
3. Verify all environment variables are set
4. Ensure both servers are running
5. Check MongoDB connection

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend `.env` file configured
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend `.env` file configured
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can log in with sample credentials
- [ ] Products display on dashboard
- [ ] Can create new products
- [ ] Can view product details

---

**Congratulations! Your Productr application is ready to use! 🎉**
