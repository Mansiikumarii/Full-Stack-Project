import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input, Button, ErrorMessage, Loading } from '../components/UI';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For now, we'll redirect to OTP verification
      // In a real app, this would first verify email/password on the backend
      navigate('/otp-verification', { state: { email, formData: { email } } });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <Loading />;

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

            <form onSubmit={handleSubmit}>
              <Input
                label="Email or Phone number"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter email or phone number"
                required
              />

              <Button
                type="submit"
                disabled={loading}
                className="login-btn"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="signup-link">
              Don't have a Productr Account?{' '}
              <Link to="/signup">Sign Up Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
