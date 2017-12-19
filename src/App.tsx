import * as React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Container, Row, Col  } from 'reactstrap';
import MainMapComponent from './containers/mapContainer';

class App extends React.Component {
  render() {
      return (
      <div>
          <Navbar color="faded" light={true} expand="md">
              <NavbarBrand href="/">Newton Wins</NavbarBrand>
          </Navbar>
              <Row>
                  <Col xs="12">
                      <MainMapComponent />
                  </Col>
              </Row>
          <Container className="Container"/>
      </div>
    );
  }
}

export default App;
