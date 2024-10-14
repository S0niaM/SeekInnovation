import React from 'react';
import './styles/Follow.css';  
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Follow = () => {
  return (

    <footer className="follow">
      <br/><br/>
      <div className="social-media">
        <p>Follow Us</p>
        {/*<a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>*/}
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedinIn />
        </a>
        {/*<a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />  
        </a> */}
      </div>
      <div className="contact-details">
        <p>&copy; 2024 SEEK Innovation. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Follow;