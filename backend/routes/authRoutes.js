const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  signup,
  login,
  getProfile,
  updateProfile,
  sendOTP,
  verifyOTP,
} = require('../controllers/authController');

const router = express.Router();

router.post(
  '/send-otp',
  [
    body('email').isEmail().normalizeEmail(),
  ],
  validate,
  sendOTP
);

router.post(
  '/verify-otp',
  [
    body('email').isEmail().normalizeEmail(),
    body('otp').notEmpty(),
  ],
  validate,
  verifyOTP
);

router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
  ],
  validate,
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validate,
  login
);

router.get('/profile', auth, getProfile);

router.put('/profile', auth, updateProfile);

module.exports = router;
