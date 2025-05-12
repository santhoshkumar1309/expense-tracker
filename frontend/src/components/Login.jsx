import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import Particle from './Particle';
import { Spinner } from 'react-bootstrap';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setLoading(false);
      navigate('/otp-verification', { state: { email } });
    } catch (error) {
      setLoading(false);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="page-container">
      <div className="particle-bg">
        <Particle />
      </div>
      <div className="overlay" />
      <div className="glass-card">
        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <>
            <h3 className="form-title">
              Login to <span className="highlight-text">SpendSmart</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="fancy-input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="footer-text">
                  We’ll never share your email.
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="fancy-input"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
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
              <div className="forgot-password-container">
                <a href="/forgot-password" className="form-label">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="fancy-button">
                Login
              </button>
            </form>
            <div className="footer-text">
              <small>
                Don’t have an account?{' '}
                <a href="/signup" className="highlight-text">
                  Sign up here
                </a>
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
