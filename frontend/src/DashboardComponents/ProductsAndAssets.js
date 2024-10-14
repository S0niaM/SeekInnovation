import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductsAndAssets.module.css';

const ProductsAndAssets = () => {
  const [selectedAssets, setSelectedAssets] = useState({});
  const [productFiles, setProductFiles] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false); 
  const [completedAssets, setCompletedAssets] = useState([]);
   

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedAssets((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setProductFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setProductFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleModifyClick = () => {
    setShowCheckboxes((prev) => !prev); 
  };

  const handleCompleteClick = () => {
    const selected = Object.keys(selectedAssets).filter(asset => selectedAssets[asset]);
    setCompletedAssets(selected); 
    setShowCheckboxes(false); 
  };

  return (
    <div className={styles.productsandassetsContainer}>
      <div className={styles.productsandassetsColumn}>
        <h2>Technological Assets</h2>
        {showCheckboxes && ( 
          <div className={styles.productsandassetsCheckboxContainer}>
            {[
              "Solutions / Skills sought",
              "Land, air and marine vehicles - Aircraft and boats",
              "Sub-assemblies Land, air and marine vehicles",
              "Weapons and ammunition",
              "Information and communication systems",
              "Cybersecurity - Security Solutions",
              "Detection, Localization, Acquisition and Decoying",
              "Simulation - Training",
              "Staff equipment",
              "Infrastructure protection",
              "Operational logistics and camp/infrastructure support",
              "Health and emergency support",
              "Preparation and development of the site - Mine clearance",
              "Research, Design, Production - Materials",
              "Natural Disasters, Resilience and Homeland Security",
              "Services",
            ].map((asset, index) => (
              <div key={index} className={styles.productsandassetsCheckboxItem}>
                <input
                  type="checkbox"
                  name={asset}
                  checked={selectedAssets[asset] || false}
                  onChange={handleCheckboxChange}
                />
                <label>{asset}</label>
              </div>
            ))}
          </div>
        )}
         {completedAssets.length > 0 && (
          <div className={styles.productsandassetsCompletedAssets}>
            
            <ul>
              {completedAssets.map((asset, index) => (
                <li key={index}>{asset}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.productsandassetsLinks}>
          <a href="#" className={styles.productsandassetsLink} onClick={handleModifyClick}>
            Modify "Technological Assets"
          </a>
          <a href="#" className={styles.productsandassetsLink} onClick={handleCompleteClick}>
            Complete
          </a>
        </div>
      </div>




      <div className={styles.productsandassetsColumn}>
        <div className={styles.productsandassetsProductDescription}>
          <h3>Product Description:</h3>
          <p>Add your documents, PDFs, images, or videos to showcase your products.</p>
          <input
            type="file"
            onChange={handleFileUpload}
            multiple
            className={styles.productsandassetsProductFileInput}
          />
          <ul className={styles.productsandassetsProductUploadedFilesList}>
            {productFiles.map((file, index) => (
              <li key={index} className={styles.productsandassetsProductUploadedFileItem}>
                {file.name} 
                <FontAwesomeIcon 
                  icon={faTimes} 
                  onClick={() => handleRemoveFile(index)} 
                  className={styles.productsandassetsProductRemoveIcon} 
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductsAndAssets;
