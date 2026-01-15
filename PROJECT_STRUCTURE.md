# Project File Structure & Descriptions

## 📁 Complete File Structure

```
Assignment/
│
├── README.md                           # Main project documentation
├── SETUP.md                            # Step-by-step setup guide
├── API_TESTING.md                      # API endpoint testing guide
│
├── backend/                            # Node.js + Express Backend
│   │
│   ├── server.js                       # Main server entry point
│   ├── seedData.js                     # Database seeding script
│   ├── package.json                    # Backend dependencies
│   ├── .env                            # Environment variables
│   ├── .gitignore                      # Git ignore file
│   │
│   ├── config/
│   │   └── db.js                       # MongoDB connection configuration
│   │
│   ├── models/
│   │   ├── User.js                     # User schema with password hashing
│   │   └── Product.js                  # Product schema with reviews
│   │
│   ├── controllers/
│   │   ├── authController.js           # Authentication logic (signup, login, profile)
│   │   └── productController.js        # Product CRUD operations
│   │
│   ├── routes/
│   │   ├── authRoutes.js               # Auth endpoints (/api/auth/*)
│   │   └── productRoutes.js            # Product endpoints (/api/products/*)
│   │
│   └── middleware/
│       ├── auth.js                     # JWT verification middleware
│       ├── validate.js                 # Input validation middleware
│       └── errorHandler.js             # Global error handling
│
└── frontend/                           # React.js Frontend
    │
    ├── package.json                    # Frontend dependencies
    ├── .env                            # Environment variables
    ├── .gitignore                      # Git ignore file
    │
    ├── public/
    │   └── index.html                  # HTML entry point
    │
    └── src/
        │
        ├── index.js                    # React app entry point
        ├── App.js                      # Main app component with routing
        │
        ├── pages/
        │   ├── Login.jsx               # Login page with form
        │   ├── Signup.jsx              # Sign up page with form
        │   ├── Dashboard.jsx           # Product listing & filtering
        │   ├── CreateProduct.jsx       # Add new product form
        │   └── ProductDetail.jsx       # Product details view
        │
        ├── components/
        │   ├── UI.jsx                  # Reusable UI components
        │   └── ProtectedRoute.jsx      # Route protection component
        │
        ├── contexts/
        │   └── AuthContext.js          # Authentication state management
        │
        ├── services/
        │   ├── apiClient.js            # Axios configuration with interceptors
        │   └── api.js                  # API service methods
        │
        └── styles/
            ├── index.css               # Global styles
            ├── App.css                 # App & page styles
            └── components.css          # Component styles
```

## 📄 File Descriptions

### Backend Files

#### `server.js`
- Initializes Express server
- Connects to MongoDB
- Sets up middleware (CORS, JSON parsing)
- Mounts API routes
- Starts server on configured port

#### `config/db.js`
- MongoDB connection configuration
- Handles connection errors
- Sets mongoose options

#### `models/User.js`
- Defines user schema (email, password, name, phone)
- Pre-save hook for password hashing with bcryptjs
- Password comparison method

#### `models/Product.js`
- Defines product schema (title, price, description, etc.)
- References User as seller
- Embedded reviews array
- Category enumeration

#### `controllers/authController.js`
- `signup`: Create new user account
- `login`: Authenticate user and return JWT token
- `getProfile`: Fetch user profile information
- `updateProfile`: Update user details

#### `controllers/productController.js`
- `createProduct`: Add new product (authenticated)
- `getProducts`: Fetch all products with filtering
- `getProductById`: Get single product details
- `updateProduct`: Update product (seller only)
- `deleteProduct`: Delete product (seller only)
- `getMyProducts`: Get products created by user

#### `routes/authRoutes.js`
- POST `/signup`: Register new user
- POST `/login`: User login
- GET `/profile`: Get user profile (protected)
- PUT `/profile`: Update profile (protected)

#### `routes/productRoutes.js`
- POST `/`: Create product (protected)
- GET `/`: Get all products
- GET `/my-products`: Get user's products (protected)
- GET `/:id`: Get product details
- PUT `/:id`: Update product (protected)
- DELETE `/:id`: Delete product (protected)

#### `middleware/auth.js`
- Verifies JWT token from Authorization header
- Extracts user data from token
- Protects API routes

#### `middleware/validate.js`
- Validates request data using express-validator
- Returns validation errors

#### `middleware/errorHandler.js`
- Global error handling
- Formats error responses
- Handles MongoDB and JWT errors

#### `seedData.js`
- Creates sample users and products
- Populates MongoDB with test data
- Used for development and testing

### Frontend Files

#### `index.js`
- React app entry point
- Renders App component to root element

#### `App.js`
- Main application component
- Sets up routing with React Router
- Wraps app with AuthProvider
- Implements ProtectedRoute logic

#### `pages/Login.jsx`
- Login form with email and password
- Calls login API
- Redirects to dashboard on success
- Shows error messages

#### `pages/Signup.jsx`
- Registration form with all user fields
- Validates password confirmation
- Calls signup API
- Redirects to dashboard on success

#### `pages/Dashboard.jsx`
- Displays all products in grid
- Filter by category
- Shows loading and error states
- Add product button
- User menu with logout

#### `pages/CreateProduct.jsx`
- Form to add new product
- Multiple image URL support
- Category selection
- Form validation
- Success/error messages

#### `pages/ProductDetail.jsx`
- Displays single product details
- Image gallery with thumbnails
- Seller information
- Customer reviews
- Rating display
- Stock status

#### `components/UI.jsx`
- **Button**: Reusable button component
- **Input**: Form input with validation
- **Card**: Container component
- **Loading**: Loading spinner
- **ErrorMessage**: Error banner
- **SuccessMessage**: Success banner

#### `components/ProtectedRoute.jsx`
- Protects routes from unauthorized access
- Redirects to login if not authenticated
- Shows loading state

#### `contexts/AuthContext.js`
- Manages authentication state
- Provides login/signup/logout functions
- Persists token in localStorage
- Auto-fetches user profile

#### `services/apiClient.js`
- Configures Axios instance
- Adds JWT token to requests
- Handles 401 errors
- Global response interceptor

#### `services/api.js`
- Defines API service methods
- Groups API calls by feature (auth, products)
- Single source for all API calls

#### `styles/index.css`
- Global styles
- CSS variables for colors
- Common component styles
- Form styling
- Message styling

#### `styles/App.css`
- Login/Signup page styles
- Dashboard header
- Product grid
- Create product form
- Responsive design

#### `styles/components.css`
- Dashboard styles
- Product card styles
- Product detail styles
- Reviews section
- Responsive breakpoints

### Configuration Files

#### `.env` (Backend)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productr
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### `.env` (Frontend)
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### `package.json` (Backend)
- Dependencies: express, mongoose, bcryptjs, jsonwebtoken
- Dev dependencies: nodemon
- Scripts: start, dev

#### `package.json` (Frontend)
- Dependencies: react, react-router-dom, axios
- Scripts: start, build, test, eject

---

## 🔄 Data Flow

### Authentication Flow
```
User Input → Signup/Login Page → API Call → Backend Auth Controller
→ MongoDB → JWT Token → LocalStorage → AuthContext → Redirect to Dashboard
```

### Product Flow
```
Dashboard → API Call → Backend Product Controller → MongoDB Query
→ Response → State Update → Re-render Product Grid
```

### Protected Route Flow
```
User Navigation → Check AuthContext → If Authenticated → Show Page
→ If Not → Redirect to Login
```

---

## 📚 Technology Stack

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling)
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router**: Routing
- **Axios**: HTTP client
- **CSS3**: Styling

---

## 🚀 Key Features Implementation

### Authentication
- Password hashing with bcryptjs
- JWT token generation
- Token verification middleware
- Protected routes

### Product Management
- CRUD operations
- Search and filter
- Seller authorization
- Image support

### User Experience
- Loading states
- Error handling
- Success messages
- Responsive design

---

**This structure provides a scalable, maintainable full-stack application! 🎉**
