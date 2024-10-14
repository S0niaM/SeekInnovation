import React, { useState } from 'react';
import './styles/SigninPopup.css';  

const SignInPopup = ({onClose}) => {
 
  const handleNoClick = () => {
    onClose();  
  };

  const handleYesClick = () => {
    onClose();  
  };


  return (
    
      <div className="signinpopup-container">
        <div className="signinpopup-modal">
          <div className="signinpopup-header">
            <img
              src="images/logo.jpg"
              alt="logo"
              className="signinpopup-logo"
            />
          </div>
          <div className="signinpopup-body">
            <h2>Stay signed in?</h2>
            <p>Do this to reduce the number of times you are asked to sign in.</p>
            <div className="signinpopup-checkbox">
              <input type="checkbox" id="dontShow" />
              <label htmlFor="dontShow">Don't show this again</label>
            </div>
          </div>
          <div className="signinpopup-footer">
            <button className="signinpopup-no" onClick={handleNoClick}>No</button>
            <button className="signinpopup-yes" onClick={handleYesClick}>Yes</button>
          </div>
        </div>
      </div>
 
  );
};

export default SignInPopup;
