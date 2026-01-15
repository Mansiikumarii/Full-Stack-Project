const nodemailer = require('nodemailer');

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
  },
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email service not configured:', error.message);
  } else if (success) {
    console.log('✅ Email service ready');
  }
});

/**
 * Send OTP via email
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 */
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER || 'noreply@productr.com',
      to: email,
      subject: 'Your Productr Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #001a4d;">Productr</h2>
          <p>Your One-Time Password (OTP) for Productr login is:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #667eea; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #666;">This OTP will expire in 5 minutes.</p>
          <p style="color: #666;">If you didn't request this OTP, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 Productr. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 OTP sent to ${email}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  transporter,
};
