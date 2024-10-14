import React, { useState } from 'react';
import './styles/Contact.css';
 
const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    question: '',
    suggestion: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form Submitted', formData);
    alert('Thank you for your feedback!');
    setFormData({ email: '', question: '', suggestion: '' });
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-desc">Have any questions or suggestions? We’re here to listen and assist.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Your Email</label> 
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="question">Your Question</label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              placeholder="Write your question here..."
            ></textarea>
          </div>
          <div className="contact-form-group">
            <label htmlFor="suggestion">Your Suggestion</label>
            <textarea
              id="suggestion"
              name="suggestion"
              value={formData.suggestion}
              onChange={handleChange}
              placeholder="Any suggestions?"
            ></textarea>
          </div>
          <div className="submit-button-container">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
