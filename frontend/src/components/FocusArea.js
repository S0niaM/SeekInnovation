import React from 'react';
import './styles/FocusArea.css';  

const FocusAreas = () => {
  return (
    <div className="focus-areas container mt-5">
      <h2 className="focus-areas-heading">Focus Areas</h2>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <img src="/images/pictures/defense.jpg" alt="Defense & Security" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Defense & Security</h3>
              <p className="card-text">Land, Naval, Aero, Spatial, Cybersecurity and Public Places...</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <img src="/images/pictures/energy.jpg" alt="Energy" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Energy</h3>
              <p className="card-text">Solar, Nuclear, Electricity, Wind, Geothermal energy, Oil, Gas, Hydrogen, and Waste...</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card mb-4">
            <img src="/images/pictures/industry.jpg" alt="Industry" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Industry</h3>
              <p className="card-text">Industry 4.0, Machinery, Manufacturing, Tooling, Logistics, IoT, AR/VR, Embedded Systems...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusAreas;
