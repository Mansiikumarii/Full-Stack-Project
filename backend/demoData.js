// Demo Data Store - In-memory storage for testing without MongoDB
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory storage
let users = [];
let products = [];
let otpStore = {}; // Store OTP codes temporarily

// Initialize with sample data
function initializeDemo() {
  users = [
    {
      _id: '1',
      email: 'john@example.com',
      password: bcrypt.hashSync('password123', 10),
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '+1-555-0101',
      isActive: true,
      createdAt: new Date(),
    },
    {
      _id: '2',
      email: 'jane@example.com',
      password: bcrypt.hashSync('password123', 10),
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '+1-555-0102',
      isActive: true,
      createdAt: new Date(),
    },
  ];

  products = [
    {
      _id: '101',
      title: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      category: 'Electronics',
      images: ['https://via.placeholder.com/400x400?text=Wireless+Headphones'],
      seller: '1',
      stock: 15,
      rating: 4.5,
      reviews: [],
      isActive: true,
      createdAt: new Date(),
    },
    {
      _id: '102',
      title: 'Smart Watch Pro',
      description: 'Advanced fitness tracking smartwatch with heart rate monitor',
      price: 299.99,
      category: 'Electronics',
      images: ['https://via.placeholder.com/400x400?text=Smart+Watch'],
      seller: '1',
      stock: 8,
      rating: 4.7,
      reviews: [],
      isActive: true,
      createdAt: new Date(),
    },
    {
      _id: '103',
      title: 'Organic Cotton T-Shirt',
      description: 'Premium organic cotton t-shirt, eco-friendly and comfortable',
      price: 29.99,
      category: 'Fashion',
      images: ['https://via.placeholder.com/400x400?text=Cotton+Shirt'],
      seller: '2',
      stock: 50,
      rating: 4.3,
      reviews: [],
      isActive: true,
      createdAt: new Date(),
    },
    {
      _id: '104',
      title: 'Minimalist Desk Lamp',
      description: 'Modern LED desk lamp with adjustable brightness',
      price: 49.99,
      category: 'Home',
      images: ['https://via.placeholder.com/400x400?text=Desk+Lamp'],
      seller: '2',
      stock: 22,
      rating: 4.6,
      reviews: [],
      isActive: true,
      createdAt: new Date(),
    },
  ];
}

// Initialize on require
initializeDemo();

module.exports = {
  users,
  products,
  otpStore,
  initializeDemo,
  generateToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  },
};
