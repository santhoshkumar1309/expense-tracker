import React from 'react';
import { Link } from 'react-router-dom';
import Particle from './Particle';
import '../index.css'; // Adjust path as needed

const Home = () => {
  return (
    <div className="page-container">
      <div className="particle-bg">
        <Particle />
      </div>
      <div className="overlay" />
      <div className="intro-card text-center">
        <h1 className="home-title">
          Welcome to <span className="highlight-text">SpendSmart</span>
        </h1>
        <p className="home-subtitle">
          Take control of your finances with <span className="highlight-text">smart tracking</span>,
          seamless insights, and effortless savings—designed for the modern money manager.
        </p>
        <div className="button-group">
          <Link to="/login" className="fancy-button">
            Log In
          </Link>
          <Link to="/signup" className="fancy-button">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;