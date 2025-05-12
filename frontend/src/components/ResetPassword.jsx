import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/api';
import Particle from './Particle';
import '../index.css'; 

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      await resetPassword({ email, otp, newPassword });
      alert('Password reset successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="page-container">
      <div className="particle-bg">
        <Particle />
      </div>
      <div className="overlay" />
      <div className="glass-card">
        <h3 className="form-title">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input
              type="text"
              id="otp"
              className="fancy-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                className="fancy-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="fancy-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="fancy-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
