import React from 'react';
import './styles/LeftSection.css';

const LeftSection = ({ videoSrc }) => {
  return ( 
    <div className="left-section">
    <video className="left-section-video" controls>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
};

export default LeftSection;
