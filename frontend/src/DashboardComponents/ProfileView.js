import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faComments, faUser, faPencilAlt, faSave, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SectorPopup from './SectorPopup';
import SectorAndApplication from './SectorAndApplication';
import ActivityForm from './ActivityForm';
import { fetchProfileById, updateProfile } from '../api';

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
   // Main profile state
   const [profile, setProfile] = useState({
    name: '',
    country: '',
    company: '',
    position: '',
    company_description: '',
    profile_picture: '',
    companyLogo: '',
    needs: []
  });

  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Editing states
  const [editStates, setEditStates] = useState({
    details: false,
    about: false,
    profile_picture: false,
    companyLogo: false
  });

  // Collapsible section states
  const [showMaterials, setShowMaterials] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showTiming, setShowTiming] = useState(false);
  const [othersChecked, setOthersChecked] = useState(false);
  const [othersText, setOthersText] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchProfileById(id);
        setProfile(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (e, field) => {
    setProfile(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async (section) => {
    setUpdateStatus('Updating...');
    try {
      let updateData = {};
      
      switch(section) {
        case 'details':
          updateData = {
            name: profile.name,
            country: profile.country,
            company: profile.company,
            position: profile.position
          };
          break;
        case 'about':
          updateData = {
            company_description: profile.company_description
          };
          break;
        default:
          throw new Error('Invalid section');
      }

      const updatedProfile = await updateProfile(id, updateData);
      setProfile(prev => ({
        ...prev,
        ...updatedProfile
      }));
      
      setEditStates(prev => ({
        ...prev,
        [section]: false
      }));
      
      setUpdateStatus('Updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message);
      setUpdateStatus('Update failed');
    } finally {
      setTimeout(() => setUpdateStatus(''), 3000);
    }
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUpdateStatus('Uploading file...');
    const formData = new FormData();
    formData.append(field, file);
    
    try {
      const updatedProfile = await updateProfile(id, formData);
      setProfile(prev => ({
        ...prev,
        ...updatedProfile
      }));
      
      setEditStates(prev => ({
        ...prev,
        [field]: false
      }));
      
      setUpdateStatus('File uploaded successfully!');
    } catch (err) {
      console.error('File upload failed:', err);
      setError(err.message);
      setUpdateStatus('File upload failed');
    } finally {
      setTimeout(() => setUpdateStatus(''), 3000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className={styles.dashboard}>
    {isPopupVisible && (
      <SectorPopup 
        closePopup={() => setIsPopupVisible(false)} 
        role={profile.role} 
      />
    )}
      
      <div className={styles.dashboardnavbar}>
        <div className={styles.dashbarlogo}>
          <img src='images/logo.jpg' alt="Logo" />
        </div>
        <div className={styles.navButtons}>
          <Link to="/contact">
            <button>Contact for Help</button>
          </Link>
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
          <button className={styles.menuToggle} onClick={toggleSidebar}>
            {isSidebarOpen ? '<' : '>'}
          </button>
          {isSidebarOpen && (
            <div className={styles.menuItems}>
              <button className='dashboard-btn' onClick={() => navigate('/userdashboard')}><FontAwesomeIcon icon={faHome} /> Dashboard</button>
              <Link to="/profile-settings">
                <button className={styles.dashboardbtn}><FontAwesomeIcon icon={faCog} /> Profile Settings</button>
              </Link>
              <Link to="/chat">
                <button className={styles.dashboardbtn}><FontAwesomeIcon icon={faComments} /> Agenda/Chat</button>
              </Link>
              <Link to="/profile">
                <button className={styles.dashboardbtn}><FontAwesomeIcon icon={faUser} /> Profile</button>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.content}>
          {updateStatus && (
            <div className={styles.updateStatus}>
              {updateStatus}
            </div>
          )}
          <div className={styles.profileSection}>
            <div className={styles.profileAndLogo}>
              <div className={styles.profile_picture}>
                { editStates.profilePic ? (
                  <>
                    <input type="file" onChange={(e) => handleFileChange(e, 'profile_picture')} id="profile-pic-upload" />
                    <label htmlFor="profile-pic-upload" className={styles.uploadButton}>Choose File</label>
                  </>
                ) : (
                  <>
                    <img src={profile.profile_picture} alt="Profile" className={styles.profileImg} />
                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => setEditStates(prev => ({...prev, profilePic: true}))} className={styles.editIcon} />
                  </>
                )}
              </div>
              
              <div className={styles.companyLogo}>
                {editStates.companyLogo ? (
                  <>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, 'companyLogo')} 
                      id="company-logo-upload" 
                    />
                    <label htmlFor="company-logo-upload" className={styles.uploadButton}>
                      Choose File
                    </label>
                  </>
                ) : (
                  <>
                    <img src={profile.companyLogo} alt="Company Logo" className={styles.logoImg} />
                    <FontAwesomeIcon 
                      icon={faPencilAlt} 
                      onClick={() => setEditStates(prev => ({...prev, companyLogo: true}))}
                      className={styles.editIcon} 
                    />
                  </>
                )}
              </div>
            </div>

            <div className={styles.detailsSection}>
              {editStates.details ? (
                <>
                  <div className={styles.detailsSection1}>
                    <p>
                      <strong>Full Name:</strong>
                      <input 
                        value={profile.name} 
                        onChange={(e) => handleInputChange(e, 'name')} 
                      />
                    </p>
                    <p>
                      <strong>Country:</strong>
                      <input 
                        value={profile.country} 
                        onChange={(e) => handleInputChange(e, 'country')} 
                      />
                    </p>
                  </div>
                  <div className={styles.detailsSection2}>
                    <p>
                      <strong>Company:</strong>
                      <input 
                        value={profile.company} 
                        onChange={(e) => handleInputChange(e, 'company')} 
                      />
                    </p>
                    <p>
                      <strong>Position:</strong>
                      <input 
                        value={profile.position} 
                        onChange={(e) => handleInputChange(e, 'position')} 
                      />
                    </p>
                  </div>
                  <button onClick={() => handleSave('details')}>
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.detailsSection1}>
                    <p><strong>Full Name:</strong> {profile.name}</p>
                    <p><strong>Country:</strong> {profile.country}</p>
                  </div>
                  <div className={styles.detailsSection2}>
                    <p><strong>Company:</strong> {profile.company}</p>
                    <p><strong>Position:</strong> {profile.position}</p>
                  </div>
                  <button onClick={() => setEditStates(prev => ({...prev, details: true}))}>
                    Edit
                  </button>
                </>
              )}
            </div>

            <div className={styles.aboutAndActivityContainer}>
              <div className={styles.aboutSection}>
                {editStates.about ? (
                  <>
                    <textarea
                      value={profile.company_description}
                      onChange={(e) => handleInputChange(e, 'company_description')}
                      className={styles.aboutTextarea}
                    />
                    <button onClick={() => handleSave('about')}>
                      <FontAwesomeIcon icon={faSave} /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <p>{profile.company_description || "About the company..."}</p>
                    <button onClick={() => setEditStates(prev => ({...prev, about: true}))}>
                      Edit
                    </button>
                  </>
                )}
                </div>

              <div className={styles.activityformsection}>
                <ActivityForm />
              </div>
            </div>

            <div className={styles.sectorandapplicationsection}>
              <SectorAndApplication />
            </div>

            <div className={styles.offersNeeds}>
              <div className={styles.column}>
                <h3>Add your Needs</h3>
                <h5>To provide you the best match, we will need you to add all needs you have</h5>
                {profile.needs && profile.needs.length > 0 && (
                  <h4>{profile.needs[0].sector.toUpperCase()}</h4>
                )}
                <div className={styles.offersDisplay}>
                  {profile.needs && profile.needs.map((need, index) => (
                    <div key={index} className={styles.offerItem}>
                      <h5>{need.category.toUpperCase()}</h5>
                      <ul className={styles.subcategoryList}>
                        {need.subcategories.map((subcategory, subIndex) => (
                          <li key={subIndex}>{subcategory}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.column2}>
                <h3>Additional questions to improve future matchmaking</h3>
                <br/>
                <div>
                  <h5 onClick={() => setShowMaterials(!showMaterials)} style={{ cursor: 'pointer' }} className={styles.collapsibleHeader}>
                    Materials Processed {showMaterials ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </h5>
                  {showMaterials && (
                    <div className={styles.checkboxGroup1}>
                      {['Steels', 'Inconel', 'Stainless steels', 'Superalloys', 'Titanium', 'Aluminium & Alloys', 'Non-ferrous metals', 'Composites', 'Plastics', 'Thermoplastics', 'Ceramics'].map((material) => (
                        <label key={material}><input type="checkbox" /> {material}</label>
                      ))}
                      <div className={styles.othersContainer}>
                        <label>
                          <input 
                            type="checkbox" 
                            checked={othersChecked} 
                            onChange={(e) => setOthersChecked(e.target.checked)} 
                          /> 
                          Others:
                        </label>
                        {othersChecked && (
                          <input 
                            type="text" 
                            placeholder="Please specify" 
                            value={othersText} 
                            onChange={(e) => setOthersText(e.target.value)} 
                            className={styles.othersInput} 
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <br/>
                <div>
                  <h5 onClick={() => setShowQuantity(!showQuantity)} style={{ cursor: 'pointer' }} className={styles.collapsibleHeader}>
                    Quantity {showQuantity ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </h5>
                  {showQuantity && (
                    <div className={styles.checkboxGroup}>
                      {['Prototype, less than 10 parts', 'Small series (11 to 51 parts)', 'Medium series (51 to 500 parts)', 'Large series (501 to 5000 parts)'].map((quantity) => (
                        <label key={quantity}><input type="checkbox" /> {quantity}</label>
                      ))}
                    </div>
                  )}
                </div>
                <br/>
                <div>
                  <h5 onClick={() => setShowTiming(!showTiming)} style={{ cursor: 'pointer' }} className={styles.collapsibleHeader}>
                    Timing {showTiming ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </h5>
                  {showTiming && (
                    <div className={styles.timingInput}>
                      <input type="text" placeholder="Specify timing requirements" className={styles.inputField} />
                    </div>
                  )}
                </div>
              </div>       
            </div>

            <div className={styles.otherSettings}>
              <Link to='/needs'>
                <button>Modify Needs</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;