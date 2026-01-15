require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create sample users
    const users = await User.create([
      {
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '+1-555-0101',
      },
      {
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '+1-555-0102',
      },
      {
        email: 'alex@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Johnson',
        phoneNumber: '+1-555-0103',
      },
    ]);

    console.log('✓ Users created successfully');

    // Create sample products
    const products = await Product.create([
      {
        title: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
        price: 199.99,
        category: 'Electronics',
        images: [
          'https://via.placeholder.com/400x400?text=Wireless+Headphones',
        ],
        seller: users[0]._id,
        stock: 15,
        rating: 4.5,
      },
      {
        title: 'Smart Watch Pro',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance up to 50m.',
        price: 299.99,
        category: 'Electronics',
        images: [
          'https://via.placeholder.com/400x400?text=Smart+Watch',
        ],
        seller: users[0]._id,
        stock: 8,
        rating: 4.7,
      },
      {
        title: 'Organic Cotton T-Shirt',
        description: 'Premium organic cotton t-shirt, eco-friendly and comfortable for everyday wear.',
        price: 29.99,
        category: 'Fashion',
        images: [
          'https://via.placeholder.com/400x400?text=Cotton+Shirt',
        ],
        seller: users[1]._id,
        stock: 50,
        rating: 4.3,
      },
      {
        title: 'Minimalist Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness, USB charging port, and sleek design.',
        price: 49.99,
        category: 'Home',
        images: [
          'https://via.placeholder.com/400x400?text=Desk+Lamp',
        ],
        seller: users[1]._id,
        stock: 22,
        rating: 4.6,
      },
      {
        title: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat made from sustainable materials, perfect for all fitness levels.',
        price: 39.99,
        category: 'Sports',
        images: [
          'https://via.placeholder.com/400x400?text=Yoga+Mat',
        ],
        seller: users[2]._id,
        stock: 30,
        rating: 4.4,
      },
      {
        title: 'JavaScript Guide',
        description: 'Comprehensive guide to modern JavaScript programming with practical examples.',
        price: 34.99,
        category: 'Books',
        images: [
          'https://via.placeholder.com/400x400?text=JavaScript+Book',
        ],
        seller: users[2]._id,
        stock: 100,
        rating: 4.8,
      },
      {
        title: 'USB-C Fast Charger',
        description: '65W fast charger supporting multiple devices, compact and durable design.',
        price: 44.99,
        category: 'Electronics',
        images: [
          'https://via.placeholder.com/400x400?text=USB+Charger',
        ],
        seller: users[0]._id,
        stock: 40,
        rating: 4.5,
      },
      {
        title: 'Designer Sunglasses',
        description: 'Stylish UV-protected sunglasses with polarized lenses and elegant frames.',
        price: 89.99,
        category: 'Fashion',
        images: [
          'https://via.placeholder.com/400x400?text=Sunglasses',
        ],
        seller: users[1]._id,
        stock: 18,
        rating: 4.6,
      },
    ]);

    console.log('✓ Products created successfully');

    // Add sample reviews
    const reviewedProduct = await Product.findById(products[0]._id);
    reviewedProduct.reviews = [
      {
        userId: users[1]._id,
        comment: 'Excellent headphones! Great sound quality and very comfortable.',
        rating: 5,
      },
      {
        userId: users[2]._id,
        comment: 'Good value for money. Battery life is impressive.',
        rating: 4,
      },
    ];
    await reviewedProduct.save();

    console.log('✓ Reviews added successfully');
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: alex@example.com | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
