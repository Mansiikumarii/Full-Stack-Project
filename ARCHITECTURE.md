# 🎨 Productr - Visual Architecture & Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT (BROWSER)                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React.js Frontend                           │   │
│  │                                                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │   Pages     │  │ Components  │  │    Services     │  │   │
│  │  ├─────────────┤  ├─────────────┤  ├─────────────────┤  │   │
│  │  │ Login       │  │ Button      │  │ Axios Client    │  │   │
│  │  │ Signup      │  │ Input       │  │ API Methods     │  │   │
│  │  │ Dashboard   │  │ Card        │  │ Auth Service    │  │   │
│  │  │ Product     │  │ Loading     │  │ Product Service │  │   │
│  │  │ Detail      │  │ Error Msg   │  │                 │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  │                                                          │   │
│  │        AuthContext (State Management)                   │   │
│  │        └─ User, Token, Loading                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                          ↓ HTTP                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
           ┌──────────────────────────────────────┐
           │  REST API (Node.js + Express)        │
           │  http://localhost:5000/api           │
           │                                      │
           │  Routes:                             │
           │  /auth/signup    → AuthController    │
           │  /auth/login     → AuthController    │
           │  /products       → ProductController │
           └──────────────────────────────────────┘
                              ↓
           ┌──────────────────────────────────────┐
           │       MongoDB Database               │
           │                                      │
           │  Collections:                        │
           │  - users (User Schema)               │
           │  - products (Product Schema)         │
           └──────────────────────────────────────┘
```

---

## Data Flow Diagram

### Authentication Flow
```
User Enters Email & Password
        ↓
Submit Signup/Login Form
        ↓
API Service Method Called
        ↓
Axios POST Request to Backend
        ↓
Backend Express Route Handler
        ↓
Authentication Controller
        ↓
MongoDB Query (Find/Create User)
        ↓
Password Hashing/Verification
        ↓
Generate JWT Token
        ↓
Send Response with Token
        ↓
Frontend Stores Token in localStorage
        ↓
Update AuthContext
        ↓
Redirect to Dashboard
```

### Product Browse Flow
```
User Navigates to Dashboard
        ↓
useEffect Hook Triggers
        ↓
productService.getProducts() Called
        ↓
Axios GET Request with Token
        ↓
Backend Route Handler (No Auth Required)
        ↓
Product Controller: getProducts()
        ↓
MongoDB Query All Products
        ↓
Populate Seller Info
        ↓
Return Products Array
        ↓
Frontend Updates State
        ↓
Re-render Product Grid
        ↓
Display Products to User
```

### Product Creation Flow
```
User Clicks "Add Product"
        ↓
Navigate to CreateProduct Page
        ↓
Fill Product Form
        ↓
Submit Form
        ↓
productService.createProduct(data)
        ↓
Axios POST Request with JWT
        ↓
Auth Middleware Validates Token
        ↓
Validation Middleware Checks Data
        ↓
Product Controller: createProduct()
        ↓
Create Document in MongoDB
        ↓
Return Created Product
        ↓
Show Success Message
        ↓
Redirect to Dashboard
```

---

## Component Hierarchy

```
App
├── Router
│   ├── Login Route
│   │   └── Login Component
│   ├── Signup Route
│   │   └── Signup Component
│   ├── Dashboard Route (Protected)
│   │   └── Dashboard Component
│   │       ├── Header
│   │       ├── Filter Section
│   │       └── Product Grid
│   │           └── Product Card (x multiple)
│   ├── CreateProduct Route (Protected)
│   │   └── CreateProduct Component
│   │       ├── Text Inputs
│   │       ├── TextArea
│   │       ├── Select (Category)
│   │       └── Image URLs Section
│   └── ProductDetail Route (Protected)
│       └── ProductDetail Component
│           ├── Image Gallery
│           ├── Product Info
│           ├── Seller Info
│           └── Reviews Section
└── AuthProvider
    └── Entire App (Context)
```

---

## Middleware Pipeline

```
Browser Request
        ↓
┌─────────────────────────────┐
│ Express Middleware Stack    │
├─────────────────────────────┤
│ 1. CORS Middleware          │ → Enable cross-origin
│ 2. JSON Parser              │ → Parse request body
│ 3. URL Encoder              │ → Parse URL-encoded data
│ 4. Route Handler            │ → Find matching route
│ 5. Auth Middleware          │ → Verify JWT (if protected)
│ 6. Validation Middleware    │ → Check input data
│ 7. Controller Logic         │ → Business logic
│ 8. Database Operation       │ → MongoDB query
│ 9. Error Handler            │ → Catch & format errors
│ 10. Response                │ → Send JSON response
└─────────────────────────────┘
        ↓
Browser Response
```

---

## File Organization Visual

```
backend/
├── 📄 server.js                    Main entry point
├── 📄 seedData.js                  Database seeding
│
├── 📁 config/
│   └── 📄 db.js                    MongoDB connection
│
├── 📁 models/                      ← Database schemas
│   ├── 📄 User.js                  User data model
│   └── 📄 Product.js               Product data model
│
├── 📁 controllers/                 ← Business logic
│   ├── 📄 authController.js        Auth logic
│   └── 📄 productController.js     Product logic
│
├── 📁 routes/                      ← API endpoints
│   ├── 📄 authRoutes.js            /api/auth routes
│   └── 📄 productRoutes.js         /api/products routes
│
├── 📁 middleware/                  ← Request handlers
│   ├── 📄 auth.js                  JWT verification
│   ├── 📄 validate.js              Input validation
│   └── 📄 errorHandler.js          Error handling
│
└── 📁 .env                         Environment vars

frontend/
├── 📁 public/
│   └── 📄 index.html               HTML template
│
├── 📁 src/
│   ├── 📄 index.js                 Entry point
│   ├── 📄 App.js                   Router setup
│   │
│   ├── 📁 pages/                   ← Page components
│   │   ├── 📄 Login.jsx            Login page
│   │   ├── 📄 Signup.jsx           Sign up page
│   │   ├── 📄 Dashboard.jsx        Product listing
│   │   ├── 📄 CreateProduct.jsx    Add product form
│   │   └── 📄 ProductDetail.jsx    Product details
│   │
│   ├── 📁 components/              ← Reusable components
│   │   ├── 📄 UI.jsx               UI components
│   │   └── 📄 ProtectedRoute.jsx   Route protection
│   │
│   ├── 📁 services/                ← API integration
│   │   ├── 📄 apiClient.js         Axios setup
│   │   └── 📄 api.js               API methods
│   │
│   ├── 📁 contexts/                ← State management
│   │   └── 📄 AuthContext.js       Auth context
│   │
│   └── 📁 styles/                  ← Styling
│       ├── 📄 index.css            Global styles
│       ├── 📄 App.css              App styles
│       └── 📄 components.css       Component styles
│
└── 📁 .env                         Environment vars
```

---

## Database Schema Visualization

### Users Collection
```
User {
  _id: ObjectId
  email: String ✓ (unique)
  password: String ✓ (hashed)
  firstName: String ✓
  lastName: String ✓
  phoneNumber: String
  profileImage: String
  isActive: Boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Products Collection
```
Product {
  _id: ObjectId
  title: String ✓
  description: String ✓
  price: Number ✓
  category: String ✓ (Enum: Electronics, Fashion, etc.)
  images: [String]
  seller: ObjectId → User ✓ (ref)
  rating: Number (0-5, default: 0)
  reviews: [
    {
      userId: ObjectId → User
      comment: String
      rating: Number (1-5)
      createdAt: Date
    }
  ]
  stock: Number ✓
  isActive: Boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

---

## API Endpoints Map

```
┌─────────────────────────────────────────────────────────┐
│              API ENDPOINTS STRUCTURE                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  POST   /api/auth/signup          → Create account    │
│  POST   /api/auth/login           → User login        │
│  GET    /api/auth/profile    [✓]  → Get profile       │
│  PUT    /api/auth/profile    [✓]  → Update profile    │
│                                                         │
│  GET    /api/products             → List all products │
│  GET    /api/products/:id         → Product details   │
│  POST   /api/products        [✓]  → Create product    │
│  PUT    /api/products/:id    [✓]  → Update product    │
│  DELETE /api/products/:id    [✓]  → Delete product    │
│  GET    /api/products/my-products [✓]→ My products    │
│                                                         │
│  [✓] = Requires JWT Authentication                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Sequence Diagram

```
User                    Frontend              Backend              Database
 │                        │                     │                    │
 │─── Fill Login Form ──→  │                     │                    │
 │                        │                     │                    │
 │                        │── POST /auth/login ─→│                    │
 │                        │  (email, password)   │                    │
 │                        │                     │                    │
 │                        │                     │─ Query User ──────→│
 │                        │                     │                   │
 │                        │                     │← User Document ───│
 │                        │                     │                    │
 │                        │                     │─ Verify Password   │
 │                        │                     │  & Generate JWT    │
 │                        │                     │                    │
 │                        │← 200 + Token + User │                    │
 │                        │                     │                    │
 │                        │─ Save Token ─────→  │                    │
 │                        │  localStorage       │                    │
 │                        │                     │                    │
 │←─ Redirect Dashboard   │                     │                    │
```

---

## Responsive Design Breakpoints

```
┌─────────────────────────────────────────────────┐
│          Screen Sizes & Styling                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ Desktop (>1200px)                               │
│ ├─ Multi-column grid                            │
│ ├─ Full navigation                              │
│ └─ Large product cards                          │
│                                                 │
│ Tablet (768px - 1199px)                        │
│ ├─ Two-column grid                              │
│ ├─ Adjusted spacing                             │
│ └─ Responsive forms                             │
│                                                 │
│ Mobile (<768px)                                 │
│ ├─ Single column                                │
│ ├─ Compact navigation                           │
│ ├─ Stack layout                                 │
│ └─ Touch-friendly buttons                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Feature Implementation Timeline

```
Phase 1: Authentication
├─ User Schema
├─ Login/Signup APIs
├─ JWT Generation
└─ Auth Middleware

        ↓

Phase 2: Products
├─ Product Schema
├─ CRUD APIs
├─ Seller Authorization
└─ Image Support

        ↓

Phase 3: Frontend UI
├─ Pages (Login, Dashboard, etc.)
├─ Components (Buttons, Forms, etc.)
├─ State Management (AuthContext)
└─ API Integration

        ↓

Phase 4: Polish
├─ Error Handling
├─ Loading States
├─ Responsive Design
└─ Styling

        ↓

Phase 5: Documentation
├─ API Documentation
├─ Setup Guide
├─ Quick Start
└─ Project Structure
```

---

## 🎓 Learning Path

```
Beginner
├─ Understand project structure
├─ Review database schemas
├─ Study API endpoints
└─ Run sample requests

        ↓

Intermediate
├─ Trace authentication flow
├─ Understand middleware
├─ Study React components
└─ Test all API endpoints

        ↓

Advanced
├─ Modify existing features
├─ Add new endpoints
├─ Create new pages
└─ Deploy to production
```

---

**This visual guide helps understand how all parts work together! 🎨**
