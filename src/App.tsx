import * as React from 'react';
import './fonts/Archive.eot';
import './fonts/Archive.otf';
import './fonts/Archive.svg';
import './fonts/Archive.ttf';
import './fonts/Archive.woff';
import './App.css';
import { Container, Alert } from 'reactstrap';
import MainMapComponent from './containers/map.container';
import ArticleComponent from './containers/article.container';
import NavBarComponent from './containers/navbar.container';
import HeaderComponent from './containers/header.container';
import PhotosComponent from './containers/photos.container';
import { FooterComponent } from './components/footer/footerComponent';


interface Props {
  alertMessage: string;
  resetAlert: () => void;
}

class App extends React.Component<Props> {

  render() {
    return (
      <div>
        <NavBarComponent/>
        <Alert
          color="success"
          isOpen={!!this.props.alertMessage}
          toggle={() => this.onAlertDismiss()}>
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
