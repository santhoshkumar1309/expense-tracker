import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../api/api';
import Particle from './Particle';
import { Spinner } from 'react-bootstrap';
import '../index.css';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOtp({ email, otp });
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="page-container">
      <div className="particle-bg">
        <Particle />
      </div>
      <div className="overlay" />
      <div className="glass-card-otp">
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <h3 className="form-title">Verify OTP for <span className="highlight-text">SpendSmart</span></h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className={`fancy-input ${error ? 'is-invalid' : ''}`}
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  pattern="\d{6}"
                  maxLength="6"
                />
                {error && <div className="invalid-feedback">{error}</div>}
                <div className="footer-otp">
                  Check your email for the OTP sent to <b>{email}</b>
                </div>
              </div>
              <button type="submit" className="fancy-button">
                Verify OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
