import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
import FocusArea from './FocusArea';
import LogoContainer from './LogoContainer';
import Footer from './Footer';
import Build from './Build';
import Ideas from './Ideas';
import Follow from './Follow';
import Impact from './Impact';

import './styles/Home.css'; 

const Home = () => {
  const images = [
    'images/bg1.jpeg',
    'images/bg2.jpeg',
    'images/bg3.jpeg',
   
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(images.length - 1);
  const constantImage = 'images/pictures/bg2.jpg';

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);  

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="HomePage">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="images/logo.jpg" alt="SEEK Logo" className="logo" /> <p>SEEK Innovation</p>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="welcome-section">
       {/* <div className="background-image" style={{ backgroundImage: url(${images[currentImageIndex]}) }}></div>*/}
       <div className="background-image" style={{ backgroundImage: `url(${constantImage})` }}></div>
       
        <div className="welcome-content text-center">
          <h1>Welcome to SEEK Innovation</h1>
          <p>Your gateway to innovation and networking</p>
          <Link to="/register">
          <button className="btn get-started">Get Started</button>
          </Link>
        </div>
      </div>
      <br/><br/><br/><br/>
      <FocusArea />
      <br/>
      <LogoContainer />
      <br/>

      

      <Build />
      <br/>
      <Ideas />
      <br/>
      <Footer />
      <br/>
      <Impact/>
      
      <Follow />
    
      </div>
      
  );
};

export default Home;

