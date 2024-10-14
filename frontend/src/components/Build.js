import React from 'react';
import './styles/Build.css';

const Build = () => {
  return (
    
    <section className="build">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="/images/pictures/picture.jpg" alt="Image" className="build-image" />
          </div>

          <div className="col-md-6">
            <h2 className="build-title">
              Build new business partnerships with a platform available 24/7!
            </h2>
            <p className="build-description">
              SEEK Innovation is a B2B matchmaking platform that allows you to access the latest innovations and technological developments in your ecosystem, in just a few clicks! Identify your future partners and control your ROI thanks to an optimized meeting path:
            </p>
            <ul className="build-list">
              <li>Make your appointments according to your availability</li>
              <li>Without costs or constraints</li>
              <li>Meet qualified profiles in scheduled business meetings &nbsp; &nbsp;&nbsp;&nbsp;using matchmaking and search filters</li>
            </ul>
            <h6 className="build-action">Actively respond to current challenges in your industry.</h6>
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default Build;
