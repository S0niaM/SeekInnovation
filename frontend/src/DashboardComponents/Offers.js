import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OffersNeeds.module.css';

const Offers = () => {
  const [offersSelections, setOffersSelections] = useState([]);
  const navigate = useNavigate();

  const handleSave = () => {
    const groupedOffers = offersOptions.reduce((acc, offer) => {
      const selectedSubcategories = offer.subcategories.filter(sub => offersSelections.includes(sub));
      if (selectedSubcategories.length > 0) {
        acc.push({
          sector: "ENERGY", // Future sectors can be added here
          category: offer.name,
          subcategories: selectedSubcategories
        });
      }
      return acc;
    }, []);
  
    navigate('/supplier-dashboard', { state: { offers: groupedOffers } });
  };
  

  const offersOptions = [
    {
      name: "Renewable hydrogen",
      subcategories: [
        "Green (Renewable energy)",
        "Low-carbon hydrogen",
        "Blue (Low-carbon fossil)",
        "Yellow (Nuclear energy)",
        "Carbon Hydrogen",
        "Grey (Fossil)",
      ]
    },
    {
      name: "PACKAGING",
      subcategories: [
        "Compressors",
        "Compression",
        "Manufacturing compression equipment",
        "Tanks, trucks",
        "Tube trailers",
        "Pipeline tubes",
        "Liquefaction units: heat exchangers, compressors, pumps, turbo-owners"
      ]
    },
    {
      name: "DISTRIBUTION",
      subcategories: [
        "Means of distribution",
        "Provisioning by boat",
        "Provisioning by truck",
        "Provisioning by gas pipeline",
        "Filling by swapping the stacking module",
        "Filling on station"
      ]
    },
    {
      name: "HYDROGEN STORAGE",
      subcategories: [
        "Storage facilities",
        "Integrated gas storage",
        "Modular gas storage",
        "Liquid storage",
        "Solid storage"
      ]
    },
    {
      name: "PRODUCTION",
      subcategories: [
        "Development",
        "Site development",
        "Equipment manufacturing",
        "Biomass gasification plants",
        "Biogas reforming plants",
        "Vapor-processing plants with or without carbon capture",
        "Electrolyzers (- ALK, PEM, SOEC...)"
      ]
    },
    {
      name: "On sites",
      subcategories: [
        "Operating and maintaining the sites"
      ]
    },
    {
      name: "USE",
      subcategories: [
        "Manufacturing of CAP vehicle parts",
        "batteries and electric motors",
        "fuel cells",
        "hydrogen tanks"
      ]
    },
    {
      name: "Vehicle assembly",
      subcategories: [
        "HGVs (buses, coaches, semi-trailers...)",
        "Light vehicles (forklifts, cars, etc.)",
        "Other: (trains, shipping, planes, etc.)"
      ]
    },
    {
      name: "Vehicle maintenance",
      subcategories: [
        "Maintenance"
      ]
    },
    {
      name: "Recharge stations",
      subcategories: [
        "Construction",
        "Site development",
        "Exploitation",
        "Manufacturing of equipment",
        "Maintenance"
      ]
    },
    {
      name: "Industries",
      subcategories: [
        "Steel",
        "Assembly on industrial site",
        "Other industries",
        "Operation",
        "Manufacturing",
        "Maintenance",
        "Non-ferrous metals",
        "Chemicals",
        "Refineries"
      ]
    },
    {
      name: "Maritime",
      subcategories: [
        "Shore power",
        "Ship propulsion",
        "On-board electrical uses",
        "Ancillary uses (e.g. heat production)"
      ]
    },
    {
      name: "Energy",
      subcategories: [
        "3rd party power supply",
        "Equity power supply",
        "Hydrogen direct",
        "Pipeline",
        "Gas technologies",
        "power transmission"
      ]
    },
    {
      name: "Building",
      subcategories: [
        "Self-sufficient buildings"
      ]
    },
    {
      name: "RECOVERY",
      subcategories: [
        "Recovery in hydrogen",
        "Power to Industry",
        "Power to Mobility",
        "Power to Gas",
        "Power to Power"
      ]
    },
    {
      name: "OTHER SERVICES",
      subcategories: [
        "Services",
        "Support for research and development",
        "Financial services",
        "Technical services",
        "Others"
      ]
    }
  ];

  const handleSubcategorySelect = (subcategory) => {
    setOffersSelections((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearAll = (offerName) => {
    setOffersSelections((prev) =>
      prev.filter((item) => !offersOptions.find((offer) => offer.name === offerName)?.subcategories.includes(item))
    );
  };

  const handleSelectAll = (offerName) => {
    const allSelections = offersOptions.find((offer) => offer.name === offerName)?.subcategories || [];
    setOffersSelections((prev) => [...new Set([...prev, ...allSelections])]);  
  };

  return (
    <div className={styles.offersNeeds}>
      <h3>ENERGY SECTOR </h3>
      <div className={styles.buttonsTop}>
        <button onClick={() => navigate('/supplier-dashboard')}>Back to Dashboard</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <div className={styles.offersLinks}>
        {offersOptions.map((offer) => (
          <a
            key={offer.name}
            onClick={() => scrollToSection(offer.name)}
            className={styles.link}
          >
            {offer.name}
          </a>
        ))}
      </div>

      <div className={styles.sections}>
        {offersOptions.map((offer) => (
          <div key={offer.name} id={offer.name} className={styles.section}>
            <h4>{offer.name}</h4>
            {offer.subcategories && offer.subcategories.map((sub) => (
              <div key={sub} className={styles.subcategory}>
                <input
                  type="checkbox"
                  checked={offersSelections.includes(sub)}
                  onChange={() => handleSubcategorySelect(sub)}
                />
                <label>{sub}</label>
              </div>
            ))}
            <br />
            <div className={styles.buttonsSection}>
              <button onClick={() => handleSelectAll(offer.name)}>Select All</button>
              <button onClick={() => handleClearAll(offer.name)}>Clear All</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
