import * as React from 'react';
import './fonts/Archive.eot';
import './fonts/Archive.otf';
import './fonts/Archive.svg';
import './fonts/Archive.ttf';
import './fonts/Archive.woff';
import './App.css';
import { Container } from 'reactstrap';
import MainMapComponent from './containers/mapContainer';
import ArticleComponent from './containers/articleContainer';
import NavBarComponent from './containers/navbarContainer';
import HeaderComponent from './containers/headerContainer';
import PhotosComponent from './containers/photosContainer';
import { FooterComponent } from './components/footerComponent';

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBarComponent/>
        <MainMapComponent/>
        <Container className="Container"/>
        <HeaderComponent/>
        <ArticleComponent/>
        <PhotosComponent/>
        <FooterComponent/>
      </div>
    );
  }
}

export default App;
