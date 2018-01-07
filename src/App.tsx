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
import RegisterComponent from './containers/register.container';
import { Router, Route } from 'react-router-dom';
import { generateRequireSignInWrapper } from 'redux-token-auth';
import CreateSuggestionComponent from './containers/createSuggestion.container';
import { Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import LoginComponent from './containers/login.container';


interface Props {
  alertMessage: string;
  resetAlert: () => void;
}

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
});

const history = createBrowserHistory({});

class App extends React.Component<Props> {

  render() {
    return (
      <Router history={history}>
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
          <Switch>
            <Route path="/signup" component={RegisterComponent}/>
            <Route path="/login" component={LoginComponent}/>
            <Route path="/suggestions/new" component={requireSignIn(CreateSuggestionComponent)}/>
          </Switch>
        </div>
      </Router>
    );
  }

  private onAlertDismiss() {
    this.props.resetAlert();
  }
}

export default App;
