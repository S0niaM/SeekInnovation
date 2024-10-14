import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import RegistrationPage from './components/RegistrationPage'; 
import LoginPage from './components/LoginPage';

import UserDashboard from './components/UserDashboard';
import Contact from './components/Contact';

import ProfileView from './DashboardComponents/ProfileView'; 
//import BuyerDashboard from './DashboardComponents/BuyerDashboard';
import GeneralSelection from './DashboardComponents/GeneralSelection';
import Offers from './DashboardComponents/Offers';
import Needs from './DashboardComponents/Needs';

import ProPopup from './DashboardComponents/ProPopup';

 

const App = () => {
 

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />      
          <Route path="/login" element={<LoginPage />} />
 
        

          <Route path="/userdashboard/:id" element={<UserDashboard />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/profileview/:id" element={<ProfileView />} />
          
          <Route path='/general-selection' element={<GeneralSelection />} />
          <Route path="/offers" element={<Offers />}/>
          <Route path="/needs" element={<Needs />}/>

          <Route path="/pro" element={<ProPopup />}/>
           
         
 

        
        </Routes>
       
 
      </div>
    </Router>
 
  );
};

export default App;
