import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';
import Particle from './Particle';
import { Spinner } from 'react-bootstrap';
import '../index.css'; // Adjust path as needed

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|oregonstate\.edu|outlook\.com)$/;
  
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!emailRegex.test(email)) newErrors.email = 'Email must be a valid @(gmail.com, oregonstate.edu, outlook.com) address';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must include at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must include at least one uppercase letter';
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must include at least one special character (!@#$%^&*)';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    // Only set the errors if any exist
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    
    // Return false if there are any errors
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Run form validation
    const formValid = validateForm();
    
    if (!formValid) {
      setLoading(false);
      return; // Stop execution if validation fails
    }
  
    try {
      const { data } = await signup({ username, email, password, confirmPassword });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
      
      if (error.response?.data?.message) {
        setErrors((prevErrors) => ({ ...prevErrors, backend: error.response.data.message }));
      }
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
              Sign up for <span className="highlight-text">SpendSmart</span>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className={`fancy-input ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
                {errors.username && <div className='confirm-password-error' >{errors.username}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`fancy-input ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-describedby="emailHelp"
                />
                {errors.email && <div className='confirm-password-error' >{errors.email}</div>}
                {/* <div id="emailHelp" className="footer-text">
                  Must be a @gmail.com, @oregonstate.edu, @outlook.com address.
                </div> */}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`fancy-input ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); console.log('Password updated:', e.target.value);}
                    }
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
                {errors.password && <div className='confirm-password-error'>{errors.password}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`fancy-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                  </button>
                </div>
                {errors.confirmPassword && <div className='confirm-password-error' >{errors.confirmPassword}</div>}
                {errors.backend && <div className="alert alert-danger mt-2">{errors.backend}</div>}
              </div>
              <button type="submit" className="fancy-button">
                Sign Up
              </button>
            </form>
            <div className="footer-text">
              <small>
                Already have an account?{' '}
                <a href="/login" className="highlight-text">
                  Login here
                </a>
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;