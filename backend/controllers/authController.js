const User = require('../models/User');
const jwt = require('jsonwebtoken');
const demoData = require('../demoData');
const bcrypt = require('bcryptjs');
const { sendOTPEmail } = require('../services/mailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Check if we're in demo mode
const isDemoMode = process.env.DEMO_MODE !== 'false';

exports.signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    if (isDemoMode) {
      // Demo mode
      let user = demoData.users.find(u => u.email === email);
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = {
        _id: String(demoData.users.length + 100),
        email,
        password: bcrypt.hashSync(password, 10),
        firstName,
        lastName,
        phoneNumber,
        isActive: true,
        createdAt: new Date(),
      };

      demoData.users.push(newUser);
      const token = generateToken(newUser._id);

      return res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
    }

    // MongoDB mode
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' });
    }

    if (isDemoMode) {
      // Demo mode
      const user = demoData.users.find(u => u.email === email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);

      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    }

    // MongoDB mode
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    if (isDemoMode) {
      const user = demoData.users.find(u => u._id === req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        message: 'Profile retrieved successfully',
        user: { ...user, password: undefined },
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile retrieved successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, profileImage } = req.body;

    if (isDemoMode) {
      const user = demoData.users.find(u => u._id === req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.profileImage = profileImage || user.profileImage;

      return res.json({
        message: 'Profile updated successfully',
        user: { ...user, password: undefined },
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phoneNumber, profileImage, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
// Send OTP
exports.sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Fixed OTP for demo - use 111111 instead
    const otp = '111111';

    // Store OTP temporarily (expires in 10 minutes)
    demoData.otpStore[email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    };

    console.log(`\n✅ OTP GENERATED FOR TESTING`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔐 OTP Code: ${otp}`);
    console.log(`⏰ Valid for 10 minutes\n`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // Show OTP on page for demo
      demo_otp: otp,
    });
  } catch (error) {
    console.error('Error in sendOTP:', error);
    next(error);
  }
};

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpData = demoData.otpStore[email];

    if (!otpData) {
      return res.status(400).json({ message: 'OTP not found or expired. Please request a new OTP.' });
    }

    if (Date.now() > otpData.expiresAt) {
      delete demoData.otpStore[email];
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
    }

    if (otpData.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // OTP verified successfully
    delete demoData.otpStore[email];

    // Generate login token
    let user = demoData.users.find(u => u.email === email);
    
    if (!user) {
      // If user doesn't exist, they might be signing up
      user = {
        _id: String(demoData.users.length + 100),
        email,
        firstName: 'User',
        lastName: '',
        isActive: true,
        createdAt: new Date(),
      };
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};