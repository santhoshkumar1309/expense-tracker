import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api/api';
import Particle from './Particle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email });
      alert('OTP sent to your email');
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending OTP');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="particle-bg">
        <Particle />
      </div>
      <div className="overlay" />
      <div className="glass-card">
        <h3 className="form-title">Forgot Password</h3>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Enter Your Email</label>
            <input
              type="email"
              className="fancy-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="fancy-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
