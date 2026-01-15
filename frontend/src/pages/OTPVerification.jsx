import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, ErrorMessage, Loading } from '../components/UI';
import axios from 'axios';
import '../styles/App.css';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef([]);

  const email = location.state?.email;

  // Send OTP on page load
  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }
    
    sendOTP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const sendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setOtpSent(true);
      setError('');
      
      // For demo: show OTP on the page (remove in production)
      if (response.data.demo_otp) {
        setTimeout(() => {
          setError(`✅ Demo OTP: ${response.data.demo_otp} - Enter this 6-digit code above`);
        }, 300);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleOTPChange = (index, value) => {
    // Only allow numbers
    const numValue = value.replace(/[^0-9]/g, '');
    
    if (numValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numValue;
      setOtp(newOtp);

      // Auto-focus to next input
      if (numValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    if (!otpCode || otpCode.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Verify OTP with backend
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { 
        email, 
        otp: otpCode 
      });

      if (response.data.success && response.data.token) {
        // Update auth context so app recognizes logged-in user immediately
        setAuth(response.data.token, response.data.user);

        // Navigate to dashboard after auth state is set
        navigate('/dashboard');
      } else {
        setError('OTP verification failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setOtp(['', '', '', '', '', '']);
    setTimer(20);
    setCanResend(false);
    await sendOTP();
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="brand-section">
            <h2>Productr</h2>
            <p>Uplist your product to market</p>
            <div className="brand-image">
              <div className="image-placeholder">🚀</div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">
            <h1>Login to your Productr Account</h1>

            {error && (
              <ErrorMessage message={error} onClose={() => setError('')} />
            )}

            {otpSent ? (
              <form onSubmit={handleVerifyOTP}>
                <div className="otp-section">
                  <label>Enter OTP</label>
                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="otp-input"
                        placeholder="-"
                      />
                    ))}
                  </div>
                  <p className="otp-hint">We sent a 6-digit code to {email}</p>
                </div>

                <Button
                  type="submit"
                  disabled={loading || otp.join('').length < 6}
                  className="login-btn"
                >
                  {loading ? 'Verifying...' : 'Enter your OTP'}
                </Button>
              </form>
            ) : (
              <div className="otp-loading">
                <Loading />
                <p>Sending OTP...</p>
              </div>
            )}

            <div className="resend-otp">
              {canResend ? (
                <button 
                  className="resend-link" 
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="resend-timer">
                  Didn't receive OTP? Resend in {timer}s
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
