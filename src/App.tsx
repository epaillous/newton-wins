import * as React from 'react';
import './App.css';
import { Container } from 'reactstrap';
import MainMapComponent from './containers/mapContainer';
import ArticleComponent from './containers/articleContainer';
import NavBarComponent from './containers/navbarContainer';

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBarComponent/>
        <MainMapComponent/>
        <Container className="Container"/>
        <ArticleComponent/>
      </div>
    );
  }
}

export default App;
