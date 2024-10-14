import React from 'react';
import './styles/Impact.css';  
import { Link } from 'react-router-dom';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Impact = () => {
  return (
    <div className="impact-section">
      <h2 className="text-center mb-4">Average Impact of SEEK Innovation Across Clients</h2>
      <Row className='row'>
        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">3x</h1>
              <h4 className="impact-subtitle">Faster</h4>
              <p className="impact-description">from gathering ideas to deploying solutions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">100%</h1>
              <h4 className="impact-subtitle">Eliminate</h4>
              <p className="impact-description">redundant tasks & initiatives</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">3x</h1>
              <h4 className="impact-subtitle">Increase</h4>
              <p className="impact-description">business impact</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
       
      <Row className='row'>
        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">5x</h1>
              <h4 className="impact-subtitle">Growth</h4>
              <p className="impact-description">of your innovation community</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">70+</h1>
              <h4 className="impact-subtitle">NPS</h4>
              <p className="impact-description">with startups</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="impact-card text-center">
            <Card.Body>
              <h1 className="impact-number">4x</h1>
              <h4 className="impact-subtitle">More qualified</h4>
              <p className="impact-description">sourcing of innovation providers</p>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      <br/>
      <div className="text-center mt-4">
        <Link to="/register">
        <Button className="register-button">Register for Free</Button>
        </Link>
      </div>
    </div>
  );
};

export default Impact;
