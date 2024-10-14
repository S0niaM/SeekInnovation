import React, { useState, useEffect } from 'react';
import './styles/UserDashboard.css';  
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import LogoContainer1 from './LogoContainer1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { fetchProfile } from '../api';

const UserDashboard = () => {
  const { id } = useParams(); // Access the dynamic ID from the URL
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState(''); 
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await fetchProfile(id); 
        setFullName(profile.name);
        setPosition(profile.position);
        setCountry(profile.country);
        setCompany(profile.company);
        setProfilePic(profile.profilePic);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleMyProfile = () => {
    navigate(`/profileview/${id}`); // Only pass the user ID to the profile view
  };

  return (
    <div className='Dashboard9'>
      <div className="user-dashboard-container">
        <LogoContainer1 />
        <div className="dashboard-main">
          <div className="profile-card">
            <div className="profile-info">
              <div className="profile-picture-container">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <FontAwesomeIcon icon={faCamera} className="camera-icon" size="3x" />
                )}
              </div>

              <div className="profile-details">
                <div className='profile-button'>
                  <button className="btn btn-profile" onClick={handleMyProfile}>My Profile</button>
                </div>
                <h3 className="profile-name"><strong>{fullName}</strong></h3>
                <p className="profile-position"><strong>{position}</strong></p>
                <div className="progress-container">
                  <p>Profile Completion: 80%</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ud-welcome-content">
            <h3>Welcome to your Dashboard</h3>
            <p>
              Here, you can manage your profile, explore matching areas, and review urgent requests.
            </p>
            <a href="/suggestions" className="suggestions-link">
              Send us your Suggestions
            </a>
            <br/><br/><br/>
            <Link to='/contact'>
              <button className="btn btn-contact">Contact Us</button>
            </Link>
          </div>
        </div>

        <div className="dashboard-cards9">
          <div className="dashboard-card profile-completion-card">
            <h4>I completed my profile</h4>
            <button className="btn-look" onClick={handleMyProfile}>Look</button>
            <div className="card-background-img1"></div>
          </div>

          <div className="middle-cards">
            <div className="dashboard-card matching-card">
              <h4>Matching Area</h4>
              <a href='/matching-area'>
                <button className="btn-look">Look</button>
              </a>
              <div className="card-background-img2"></div>
            </div>
            <div className="dashboard-card urgent-requests-card">
              <h4>Urgent Requests</h4>
              <a href='/urgent-requests'>
                <button className="btn-look">Look</button>
              </a>
              <div className="card-background-img3"></div>
            </div>
          </div>

          <div className="dashboard-card agenda-card">
            <h4>My Agenda</h4>
            <a href='/myagenda'>
              <button className="btn-look">Look</button>
            </a>
            <div className="card-background-img4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
