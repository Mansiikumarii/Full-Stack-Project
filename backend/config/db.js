const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning:', error.message);
    console.log('📝 Running in demo mode without MongoDB. Data will not persist.');
    console.log('💡 To use with MongoDB, ensure MongoDB is running and accessible.');
  }
};

module.exports = connectDB;
