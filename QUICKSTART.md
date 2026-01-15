# 🚀 Productr - Quick Start Guide

Get your Productr marketplace running in just **5 minutes**!

## ⚡ Prerequisites
- Node.js installed (v14+)
- MongoDB running locally OR MongoDB Atlas account
- A code editor (VS Code recommended)

## 🎯 Quick Setup

### Step 1: Start MongoDB (if local)
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Or use MongoDB Atlas (cloud version)
```

### Step 2: Backend Setup (Terminal 1)
```bash
cd backend
npm install
node seedData.js
npm run dev
```

✅ You should see: `Server running on http://localhost:5000`

### Step 3: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```

✅ Browser opens to `http://localhost:3000`

## 📱 Test the App

### Login with Sample Account
```
Email: john@example.com
Password: password123
```

### Try These Features:
1. ✅ Browse products on dashboard
2. ✅ Filter by category
3. ✅ Click on product to see details
4. ✅ Click "+ Add Product" to create new product
5. ✅ Click logout to sign out

## 📁 Project Structure

```
Assignment/
├── backend/    # Node.js + Express API (Port 5000)
├── frontend/   # React App (Port 3000)
└── docs/       # Documentation files
```

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "MongoDB connection failed" | Ensure MongoDB is running |
| "Port 5000 in use" | Change PORT in backend/.env |
| "CORS error" | Verify REACT_APP_API_URL in frontend/.env |
| "Login not working" | Clear localStorage and try again |
| "Cannot find module" | Run `npm install` again |

## 📖 Documentation

- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **API_TESTING.md** - How to test API endpoints
- **PROJECT_STRUCTURE.md** - File descriptions

## 🎨 Key Features

### Frontend
- Clean, modern UI design
- Responsive layout (mobile-friendly)
- Real-time product filtering
- User authentication
- Product management

### Backend
- RESTful APIs
- JWT authentication
- MongoDB integration
- Input validation
- Error handling

### Database
- User accounts with password hashing
- Product listings with reviews
- Seller relationships
- Category organization

## 🚀 API Endpoints

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 💡 Pro Tips

1. **Use Postman** to test API endpoints directly
2. **Check DevTools** (F12) for frontend errors
3. **Read logs** in server terminal for debugging
4. **Try all 3 sample accounts** to test different products
5. **Create your own products** to test full flow

## 🔐 Security Features

✅ Password hashing with bcryptjs
✅ JWT token authentication
✅ Protected routes
✅ Input validation
✅ CORS enabled

## 📊 Sample Data

The `seedData.js` creates:
- **3 users** with products
- **8 products** across 6 categories
- **Sample reviews** on products

## 🎬 Next Steps

1. Explore all pages and features
2. Test API with Postman
3. Try creating/editing/deleting products
4. Test authentication flow
5. Check responsive design on mobile

## 📞 Need Help?

1. Check **SETUP.md** for detailed instructions
2. Read **API_TESTING.md** for endpoint examples
3. Look in **PROJECT_STRUCTURE.md** for file descriptions
4. Check server logs for errors

## 🌟 What You Can Build

This starter includes:
- ✅ Complete CRUD API
- ✅ User authentication system
- ✅ Product marketplace
- ✅ Responsive UI
- ✅ Error handling
- ✅ Sample data

**Perfect for:**
- Learning full-stack development
- Building e-commerce platform
- Understanding JWT authentication
- Learning MongoDB + Express + React

## 🎉 You're Ready!

Your Productr marketplace is now running! Start exploring and building. Happy coding! 🚀

---

**Quick Links:**
- Backend: http://localhost:5000/api
- Frontend: http://localhost:3000
- API Health: http://localhost:5000/api/health

**Have fun building! 💪**
