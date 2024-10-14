import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import { loginUser, fetchProfile } from '../api'; // Import loginUser and fetchProfile
import LeftSection from './LeftSection';
import SignInPopup from './SignInPopup';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [profile, setProfile] = useState(null); // Add state to store profile data
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      // Log the user in
      await loginUser({ email: formData.email, password: formData.password });

      // After successful login, fetch the profile
      const userProfile = await fetchProfile();
      setProfile(userProfile); // Store profile data in state

      // Show the popup after successful login
      setShowPopup(true);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  // Handle popup close and navigate to the dashboard
  const handlePopupClose = () => {
    setShowPopup(false);
    if (profile) {
      navigate(`/userdashboard/${profile.id}`);  // Redirect to the dashboard with the user ID
    }
  };

  return (
    <div className='loginpage-login-container'>
      <LeftSection imageSrc="images/pictures/picture1.jpg" />
      <div className="loginpage-right-section">
        <div className="loginpage-logo-section">
          <img src="images/logo.jpg" alt="Logo" className="loginpage-logo" />
        </div>
        <div className="loginpage-form-section">
          <h2>Login</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="loginpage-form-group">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email" // Ensure the name attribute is set to match formData
                className="form-control"
                placeholder="Enter your Email Id"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="loginpage-form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password" // Ensure the name attribute is set to match formData
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <br /><br /><br />
            </div>
            <button type="submit" className="btn loginpage-login-btn">Login</button>
          </form>
          <br/>
          <p className="loginpage-register-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
      {showPopup && <SignInPopup onClose={handlePopupClose} />} {/* Show popup if user successfully logs in */}
    </div>
  );
};

export default LoginPage;
