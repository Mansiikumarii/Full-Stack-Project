# Productr - Full Stack Application

A modern full-stack e-commerce marketplace application built with React.js, Node.js/Express, and MongoDB.

## 📋 Project Structure

```
Assignment/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB schemas (User, Product)
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication, validation, error handling
│   ├── server.js           # Main server file
│   ├── seedData.js         # Database seeding
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
│
└── frontend/               # React.js Application
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components (Login, Dashboard, etc.)
    │   ├── services/       # API integration (Axios)
    │   ├── contexts/       # React Context (Auth)
    │   ├── styles/         # CSS files
    │   ├── App.js          # Main App component
    │   └── index.js        # Entry point
    ├── package.json        # Frontend dependencies
    └── .env                # Environment variables
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create/update `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/productr
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Seed the database (optional):**
   ```bash
   node seedData.js
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create/update `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   Application will open on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Sign Up
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1-555-0000"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Get Profile
- **GET** `/api/auth/profile`
- **Auth:** Required (Bearer Token)

#### Update Profile
- **PUT** `/api/auth/profile`
- **Auth:** Required
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1-555-0000",
    "profileImage": "image_url"
  }
  ```

### Product Endpoints

#### Get All Products
- **GET** `/api/products`
- **Query Parameters:**
  - `category` - Filter by category (optional)
  - `search` - Search query (optional)
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)

#### Get Product by ID
- **GET** `/api/products/:id`

#### Create Product
- **POST** `/api/products`
- **Auth:** Required
- **Body:**
  ```json
  {
    "title": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10,
    "images": ["image_url1", "image_url2"]
  }
  ```

#### Update Product
- **PUT** `/api/products/:id`
- **Auth:** Required (Must be seller)

#### Delete Product
- **DELETE** `/api/products/:id`
- **Auth:** Required (Must be seller)

#### Get My Products
- **GET** `/api/products/my-products`
- **Auth:** Required

## 🗄️ Database Schema

### User Schema
```javascript
{
  email: String (unique, required),
  phoneNumber: String,
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  profileImage: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  images: [String],
  seller: ObjectId (ref: User, required),
  rating: Number (0-5, default: 0),
  reviews: [
    {
      userId: ObjectId,
      comment: String,
      rating: Number,
      createdAt: Date
    }
  ],
  stock: Number (required),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Features

### Frontend
- ✅ **Authentication**: Sign up, login, logout with JWT
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Dashboard**: Browse and filter products
- ✅ **Product Creation**: Add new products with images
- ✅ **Product Details**: View detailed product information
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Loading States**: Loading indicators for better UX
- ✅ **Protected Routes**: Authenticated access control

### Backend
- ✅ **REST APIs**: Full CRUD operations
- ✅ **Authentication**: JWT-based security
- ✅ **Input Validation**: Express-validator integration
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **CORS**: Cross-origin resource sharing
- ✅ **MongoDB Integration**: Mongoose ORM

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT authentication tokens
- Protected API routes
- Input validation on server
- Error handling middleware
- CORS configuration

## 📦 Sample Credentials

After running `npm run seedData.js`, use these credentials:

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |
| alex@example.com | password123 |

## 🧪 Testing the Application

1. **Test Sign Up**: Create a new account
2. **Test Login**: Use provided credentials
3. **Test Dashboard**: View all products
4. **Test Product Creation**: Add a new product
5. **Test Product Details**: Click on a product
6. **Test Filtering**: Filter products by category
7. **Test Logout**: Sign out and verify redirect

## 🛠️ Development Tips

### Adding a New Feature
1. Create the model in `backend/models/`
2. Create the controller in `backend/controllers/`
3. Create the routes in `backend/routes/`
4. Create API service in `frontend/src/services/`
5. Create component/page in `frontend/src/`

### Debugging
- Backend: Check `server` console for logs
- Frontend: Use browser DevTools (F12)
- Database: Use MongoDB Compass or Atlas dashboard

## 📝 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build production
npm run build

# Deploy built files to Vercel/Netlify
```

## 📞 Support

For issues or questions, please check:
1. Console logs for error messages
2. MongoDB connection status
3. API endpoint availability
4. CORS configuration

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, Node.js, and MongoDB**
