import React from 'react';
import './styles/Ideas.css';  

const Ideas = () => {
  return (
    <div className='section'>
      <div className="container mt-5">
        <h2 className="section-heading">Showcase Your Innovations or Find Solutions</h2>
        <div className="idea">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="card mb-4 idea-card">
                <div className="card-body">
                  <h3 className="card-title">Would you like to present your solutions?</h3>
                  <br/><br/>
                  <p className="card-text">Present your solutions/technologies to all participants.</p>
                  <p className="card-text">Meet decision makers looking for innovative solutions and support.</p>
                  <p className="card-text">Make yourself known to the SEEK Innovation Community.</p>
                  <br/><br/>
                  <a href="#explore" className="btn">I PROPOSE MY SOLUTIONS</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card mb-4 idea-card">
                <div className="card-body">
                  <h3 className="card-title">Are you looking for solutions to your problems?</h3><br/>
                  <p className="card-text"> Identify innovative solutions to carry out your projects.</p>
                  <p className="card-text">Meet new suppliers or vendors.</p>
                  <p className="card-text">Benefit from market, sector, and technological insights.</p>
                  <br/>
                  <a href="#learn-more" className="btn">I AM LOOKING FOR SOLUTIONS</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
