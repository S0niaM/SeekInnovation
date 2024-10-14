import React, { useState } from 'react';
import styles from './ActivityForm.module.css';  

const ActivityForm = () => {
  const [activityInfo, setActivityInfo] = useState({
    aeroActivity: '',
    defenseActivity: '',
    spaceActivity: '',
    exportZones: '',
    exportPercentage: '',
    caAeronautics: '',
    caSpatial: '',
    caDefense: '',
  });

  const [isActivityFormVisible, setIsActivityFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    setActivityInfo({
      aeroActivity: '',
      defenseActivity: '',
      spaceActivity: '',
      exportZones: '',
      exportPercentage: '',
      caAeronautics: '',
      caSpatial: '',
      caDefense: '',
    });
  };

  const handleSave = () => {
    // Logic to save the data
    setIsActivityFormVisible(false);
  };

  return (
    <div className={styles['activity-form-section']}>
      <h3>Describe Your Activity</h3>
      <button onClick={() => setIsActivityFormVisible(!isActivityFormVisible)}>
        Modify
      </button>

      {isActivityFormVisible && (
        <div className={styles['activity-form']}>
          <button onClick={handleDelete} className={styles['activity-form-deleteButton']}>Delete</button>
          <h4>Key Information About Your Activity</h4>
          <div>
            <label>% Aero Activity:</label>
            <input
              type="text"
              name="aeroActivity"
              value={activityInfo.aeroActivity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>% Defense Activity:</label>
            <input
              type="text"
              name="defenseActivity"
              value={activityInfo.defenseActivity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>% Space Activity:</label>
            <input
              type="text"
              name="spaceActivity"
              value={activityInfo.spaceActivity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Export zone(s):</label>
            <input
              type="text"
              name="exportZones"
              value={activityInfo.exportZones}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>% Export:</label>
            <input
              type="text"
              name="exportPercentage"
              value={activityInfo.exportPercentage}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>CA Aeronautics:</label>
            <input
              type="text"
              name="caAeronautics"
              value={activityInfo.caAeronautics}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>CA Spatial:</label>
            <input
              type="text"
              name="caSpatial"
              value={activityInfo.caSpatial}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>CA Defense:</label>
            <input
              type="text"
              name="caDefense"
              value={activityInfo.caDefense}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave} className={styles['activity-form-saveButton']}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ActivityForm;
