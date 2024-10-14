import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCountries, registerUser } from '../api';
import './styles/RegisterPage.css';
import LeftSection from './LeftSection';

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    position: '',
    name: '',
    email: '',
    country_id: '',
    profile: '',
    company: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countryData = await fetchCountries();
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setErrorMessage('Failed to load country data. Please try again.');
      }
    };

    getCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profile || !formData.name || !formData.country_id || !formData.company || !formData.position || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.profile) {
      setErrorMessage('Please select a profile.');
      return;
    }
    if (step === 2 && (!formData.email || !formData.password)) {
      setErrorMessage('Please fill the above details.');
      return;
    }
    if (step === 3 && (!formData.name || !formData.country_id || !formData.company || !formData.position)) {
      setErrorMessage('Please fill the above details.');
      return;
    }
    setStep(step + 1);
    setErrorMessage('');
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrorMessage('');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="register-page-form-section">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="register-page-form-group">
                <input
                  type="radio"
                  id="contactor"
                  name="profile"
                  value="Buyer"
                  checked={formData.profile === 'Buyer'}
                  onChange={handleChange}
                />
                <label htmlFor="contactor">Contractor/Buyer</label>
              </div>
              <div className="register-page-form-group">
                <input
                  type="radio"
                  id="supplier"
                  name="profile"
                  value="Seller"
                  checked={formData.profile === 'Seller'}
                  onChange={handleChange}
                />
                <label htmlFor="supplier">Supplier/OEM</label>
              </div>
              <div className="register-page-form-group">
                <input
                  type="radio"
                  id="cluster"
                  name="profile"
                  value="Cluster"
                  checked={formData.profile === 'Cluster'}
                  onChange={handleChange}
                />
                <label htmlFor="cluster">Cluster/Government</label>
              </div>
              <button type="button" onClick={nextStep} className="register-page-register-btn">
                Next →
              </button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="registration-step2-form-section">
            <h2>Registration</h2>
            <div className="registration-step2-form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your Email Id"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registration-step2-form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registration-step2-form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="registration-step2-button-group">
              <button className="btn registration-step2-back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button className="btn registration-step2-next-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="registration-step3-form-section">
            <h2>Registration</h2>
            <div className="registration-step3-form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registration-step3-form-group">
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="Enter your Company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registration-step3-form-group">
              <input
                type="text"
                name="position"
                className="form-control"
                placeholder="Enter your position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registration-step3-form-group">
              <select
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                className="select-input"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="registration-step3-button-group">
              <button className="btn registration-step3-back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="btn registration-step3-next-btn" onClick={handleSubmit}>
                Register →
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-page-register-container">
      <LeftSection videoSrc="videos/video1.mp4" />
      <div className="register-page-right-section">
        <div className="register-page-logo-section">
          <img src="images/logo.jpg" alt="Logo" className="register-page-logo" />
        </div>
        {renderStep()}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="register-page-already-registered">
          Already registered? <a href="/login">Click here</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;