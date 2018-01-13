import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Switch } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import { AuthGlobals } from 'redux-auth/bootstrap-theme';
import './App.css';
import { FooterComponent } from './components/footer/footer.component';
import ArticleComponent from './containers/article.container';
import CreateSuggestionComponent from './containers/createSuggestion.container';
import HeaderComponent from './containers/header.container';
import LoginComponent from './containers/login.container';
import MainMapComponent from './containers/map.container';
import NavBarComponent from './containers/navbar.container';
import PhotosComponent from './containers/photos.container';
import ProtectedRoute from './containers/protectedRoute.container';
import RegisterComponent from './containers/register.container';
import './fonts/Archive.eot';
import './fonts/Archive.otf';
import './fonts/Archive.svg';
import './fonts/Archive.ttf';
import './fonts/Archive.woff';

interface Props {
  alertMessage: string;
  resetAlert: () => void;
}

const history = createBrowserHistory({});

// bootstrap theme

class App extends React.Component<Props> {

  public render() {
    return (
      <div>
        <AuthGlobals/>
        <Router history={history}>
          <div>
            <NavBarComponent/>
            <Alert
              color="success"
              isOpen={!!this.props.alertMessage}
              toggle={this.onAlertDismiss}
            >
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
              <ProtectedRoute path="/suggestions/new" component={CreateSuggestionComponent}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  private onAlertDismiss() {
    this.props.resetAlert();
  }
}

export default App;
