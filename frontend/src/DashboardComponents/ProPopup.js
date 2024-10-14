import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faTasks, faBell, faCloud } from '@fortawesome/free-solid-svg-icons';
import './ProPopup.css';

const ProPopup = ({ onClose }) => {
  const [isAlertActive, setIsAlertActive] = useState(true);

  const handleToggle = () => {
    setIsAlertActive(!isAlertActive);
  };

  return (
    <div className="propopup-popup-container">
      <div className="propopup-popup-content">
        <div className="propopup-header">
          <h2>Become a Pro member</h2>
          <button className="propopup-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="propopup-alert-section">
          <div className="propopup-alert-text">
            <span>Activate free trial alert</span>
            <p>We'll remind you 7 days before your trial ends.</p>
          </div>
          <div className="propopup-toggle">
            <input
              type="checkbox"
              id="toggleAlert"
              checked={isAlertActive}
              onChange={handleToggle}
            />
            <label htmlFor="toggleAlert" className="toggle-label"></label>
          </div>
        </div>

        <ul className="propopup-features-list">
          <li>
            <FontAwesomeIcon icon={faChartBar} className="propopup-icon" />
            <div>
              <strong>Advanced Analytics</strong>
              <p>Get detailed insights and progress tracking.</p>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faTasks} className="propopup-icon" />
            <div>
              <strong>Unlimited Habits</strong>
              <p>Track as many habits as you want.</p>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} className="propopup-icon" />
            <div>
              <strong>Custom Reminders</strong>
              <p>Set personalized reminders to stay on track.</p>
            </div>
          </li>
          <li>
            <FontAwesomeIcon icon={faCloud} className="propopup-icon" />
            <div>
              <strong>Cloud Sync</strong>
              <p>Access your data across all devices.</p>
            </div>
          </li>
        </ul>

        <div className="propopup-cta">
          <p>After the free trial, you'll be automatically moved to the Medium Plan with more benefits to help you scale your business.</p>
          <button className="propopup-cta-btn" onClick={onClose}>OK, Got it</button>
        </div>
      </div>
    </div>
  );
};

export default ProPopup;
