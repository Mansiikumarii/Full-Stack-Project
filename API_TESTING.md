# API Testing Guide - Productr Backend

This guide helps you test all API endpoints using tools like Postman or cURL.

## 🚀 Base URL
```
http://localhost:5000/api
```

## 📋 Authentication

Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Auth Endpoints

### 1. Sign Up
**POST** `/auth/signup`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1-555-1234"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Smith"
  }
}
```

**Save the token for authenticated requests!**

---

### 3. Get User Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response (200):**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+1-555-0101",
    "profileImage": null,
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### 4. Update User Profile
**PUT** `/auth/profile`

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1-555-9999",
  "profileImage": "https://example.com/profile.jpg"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+1-555-9999",
    "profileImage": "https://example.com/profile.jpg",
    "isActive": true,
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🛍️ Product Endpoints

### 1. Create Product
**POST** `/products`

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Amazing Wireless Headphones",
  "description": "High-quality wireless headphones with active noise cancellation",
  "price": 199.99,
  "category": "Electronics",
  "stock": 20,
  "images": [
    "https://example.com/headphones1.jpg",
    "https://example.com/headphones2.jpg"
  ]
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Amazing Wireless Headphones",
    "description": "High-quality wireless headphones...",
    "price": 199.99,
    "category": "Electronics",
    "images": ["https://example.com/headphones1.jpg"],
    "seller": "507f1f77bcf86cd799439011",
    "stock": 20,
    "rating": 0,
    "reviews": [],
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### 2. Get All Products
**GET** `/products`

**Query Parameters:**
- `category` - Filter by category (optional)
- `search` - Search query (optional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Examples:**
```
GET /products
GET /products?category=Electronics
GET /products?search=headphones
GET /products?category=Electronics&page=1&limit=5
```

**Response (200):**
```json
{
  "message": "Products retrieved successfully",
  "products": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Wireless Headphones",
      "price": 199.99,
      "category": "Electronics",
      "images": ["https://example.com/headphones1.jpg"],
      "seller": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Smith",
        "profileImage": null
      },
      "stock": 20,
      "rating": 4.5,
      "reviews": []
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

---

### 3. Get Single Product
**GET** `/products/:id`

**URL Parameter:**
- `id` - Product ID

**Example:**
```
GET /products/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "message": "Product retrieved successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Wireless Headphones",
    "description": "High-quality wireless headphones...",
    "price": 199.99,
    "category": "Electronics",
    "images": ["https://example.com/headphones1.jpg"],
    "seller": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "profileImage": null
    },
    "stock": 20,
    "rating": 4.5,
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "userId": "507f1f77bcf86cd799439014",
        "comment": "Excellent product!",
        "rating": 5,
        "createdAt": "2024-01-15T11:00:00.000Z"
      }
    ]
  }
}
```

---

### 4. Update Product
**PUT** `/products/:id`

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**URL Parameter:**
- `id` - Product ID

**Request Body:**
```json
{
  "title": "Updated Wireless Headphones",
  "price": 189.99,
  "stock": 15
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Wireless Headphones",
    "price": 189.99,
    "stock": 15,
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### 5. Delete Product
**DELETE** `/products/:id`

**Headers:**
```
Authorization: Bearer <your_token>
```

**URL Parameter:**
- `id` - Product ID

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

### 6. Get My Products
**GET** `/products/my-products`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response (200):**
```json
{
  "message": "Your products retrieved successfully",
  "products": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Wireless Headphones",
      "price": 199.99,
      "category": "Electronics",
      "stock": 20
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "Smart Watch",
      "price": 299.99,
      "category": "Electronics",
      "stock": 10
    }
  ]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "value": "invalidemail",
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to update this product"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 📝 cURL Examples

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","firstName":"John","lastName":"Doe"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create Product (with token)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Product","description":"Desc","price":99.99,"category":"Electronics","stock":10}'
```

---

## 🧪 Testing Workflow

1. **Sign up** or **Login** to get a token
2. **Copy the token** from response
3. **Use token** in Authorization header for protected endpoints
4. **Test CRUD operations** on products
5. **Verify responses** match expected format

---

**Happy Testing! 🚀**
