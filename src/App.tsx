import * as React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Container, Row, Col  } from 'reactstrap';
import MainMapComponent from './containers/mapContainer';
import ArticleComponent from './containers/articleContainer';

class App extends React.Component {

  render() {
      return (
      <div>
          <Navbar color="faded" light={true} expand="md">
              <NavbarBrand href="/">Le tour du monde de Ludo & Emilie</NavbarBrand>
          </Navbar>
              <Row>
                  <Col xs="12">
                      <MainMapComponent />
                  </Col>
              </Row>
          <Container className="Container"/>
        <ArticleComponent/>
      </div>
    );
  }
}

export default App;
