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
import { Alert } from 'reactstrap';

interface Props {
  alertMessage: string;
  resetAlert: () => void;
}

class App extends React.Component<Props> {

  render() {
    return (
      <div>
        <NavBarComponent/>
        <Alert color="success" isOpen={!!this.props.alertMessage} toggle={() => this.onAlertDismiss()}>
          {this.props.alertMessage}
        </Alert>
        <MainMapComponent/>
        <Container className="Container"/>
        <HeaderComponent/>
        <ArticleComponent/>
        <PhotosComponent/>
        <FooterComponent/>
      </div>
    );
  }

  private onAlertDismiss() {
    this.props.resetAlert();
  }
}

export default App;
