import React, { useState } from 'react';
import './SectorAndApplication.css'; // Assuming you save the CSS in SectorApplication.css

const SectorAndApplication = () => {
  const [aeronauticalExpanded, setAeronauticalExpanded] = useState(false);
  const [defenseExpanded, setDefenseExpanded] = useState(false);
  const [spaceExpanded, setSpaceExpanded] = useState(false);

  const [aeronauticalApplications, setAeronauticalApplications] = useState({
    "Airports": false,
    "Displays and instruments": false,
    "Guide weapons": false,
    "Commercial aircraft": false,
    "Business & general aircraft": false,
    "Military aircraft": false,
    "Airlines": false,
    "Aircraft manufacturers": false,
    "Unmanned aerial vehicles and drones": false,
    "Helicopters": false,
    "Ground infrastructure": false,
    "Maintenance": false,
    "Missiles": false,
    "Engines": false,
    "Air traffic control radar": false,
    "Radars and sensors": false,
    "Integrated avionics systems": false,
    "Data storage and processing systems": false,
  });

  const [defenseApplications, setDefenseApplications] = useState({
    "Weapons and ammunition": false,
    "Aviation (general, business, commercial, military)": false,
    "Drones": false,
    "Launch vehicles": false,
    "Troop equipment": false,
    "Helicopters": false,
    "Launchers": false,
    "Missiles & Rockets": false,
    "Ships": false,
    "Parachutes & Aerostats": false,
    "Ports & Military Buildings": false,
    "Support or Defense Robotics": false,
    "Security": false,
    "Intelligence Systems": false,
    "Support Systems": false,
    "Underwater Systems": false,
    "Underground Systems": false,
    "Land Vehicles": false,
  });

  const [spaceApplications, setSpaceApplications] = useState({
    "Displays and instruments": false,
    "Manufacturers": false,
    "Ground infrastructure": false,
    "Space launchers": false,
    "Maintenance": false,
    "Orbiters": false,
    "Propulsion": false,
    "Radars and sensors": false,
    "Space robots": false,
    "Civil satellites": false,
    "Military satellites": false,
    "Analysis systems / on-board laboratories": false,
    "Communication and navigation systems": false,
    "Electronic warfare systems": false,
    "Energy storage and generation systems": false,
    "Data storage and processing systems": false,
    "Environmental support systems": false,
    "Life support systems": false,
  });

  const toggleExpand = (section) => {
    switch (section) {
      case 'aeronautical':
        setAeronauticalExpanded(!aeronauticalExpanded);
        break;
      case 'defense':
        setDefenseExpanded(!defenseExpanded);
        break;
      case 'space':
        setSpaceExpanded(!spaceExpanded);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sectorandapp-container">
      {/* First Column: Sector(s) of Activity */}
      <div className="sectorandapp-column sectorandapp-sectorColumn">
        <h3>Sector(s) of Activity</h3>
        <div className="sectorandapp-links">
          <a href="#">Complete</a>
          <a href="#">Modify Sector(s) of Activity</a>
        </div>
      </div>

      {/* Second Column: Area(s) of Application */}
      <div className="sectorandapp-column sectorandapp-applicationColumn">
        <h3>Area(s) of Application</h3>

        {/* Aeronautical Applications */}
        <div className="sectorandapp-category">
          <div className="sectorandapp-categoryHeader" onClick={() => toggleExpand('aeronautical')}>
            <h4>Aeronautical Applications</h4>
            <span>{aeronauticalExpanded ? '-' : '+'}</span>
          </div>
          {aeronauticalExpanded && (
            <ul className="sectorandapp-applicationList">
              {Object.keys(aeronauticalApplications).map((key) => (
                <div key={key} className="sectorandapp-checkboxItem">
                  <input
                    type="checkbox"
                    checked={aeronauticalApplications[key]}
                    onChange={() =>
                      setAeronauticalApplications({
                        ...aeronauticalApplications,
                        [key]: !aeronauticalApplications[key],
                      })
                    }
                  />
                  <span>{key}</span>
                </div>
              ))}
            </ul>
          )}
        </div>

        {/* Defense Applications */}
        <div className="sectorandapp-category">
          <div className="sectorandapp-categoryHeader" onClick={() => toggleExpand('defense')}>
            <h4>Defense Applications</h4>
            <span>{defenseExpanded ? '-' : '+'}</span>
          </div>
          {defenseExpanded && (
            <ul className="sectorandapp-applicationList">
              {Object.keys(defenseApplications).map((key) => (
                <div key={key} className="sectorandapp-checkboxItem">
                  <input
                    type="checkbox"
                    checked={defenseApplications[key]}
                    onChange={() =>
                      setDefenseApplications({
                        ...defenseApplications,
                        [key]: !defenseApplications[key],
                      })
                    }
                  />
                  <span>{key}</span>
                </div>
              ))}
            </ul>
          )}
        </div>

        {/* Space Applications */}
        <div className="sectorandapp-category">
          <div className="sectorandapp-categoryHeader" onClick={() => toggleExpand('space')}>
            <h4>Space Applications</h4>
            <span>{spaceExpanded ? '-' : '+'}</span>
          </div>
          {spaceExpanded && (
            <ul className="sectorandapp-applicationList">
              {Object.keys(spaceApplications).map((key) => (
                <div key={key} className="sectorandapp-checkboxItem">
                  <input
                    type="checkbox"
                    checked={spaceApplications[key]}
                    onChange={() =>
                      setSpaceApplications({
                        ...spaceApplications,
                        [key]: !spaceApplications[key],
                      })
                    }
                  />
                  <span>{key}</span>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectorAndApplication;
