import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Switch } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import { FooterComponent } from './components/footer/footer.component';
import Alert from './containers/alert.container';
import ArticleComponent from './containers/article.container';
import HeaderComponent from './containers/header.container';
import LoginComponent from './containers/login.container';
import MainMapComponent from './containers/map.container';
import MentionsComponent from './containers/mentions.container';
import NavBarComponent from './containers/navbar.container';
import PhotosComponent from './containers/photos.container';
import ProtectedRoute from './containers/protectedRoute.container';
import RegisterComponent from './containers/register.container';
import FormSuggestionComponent from './containers/suggestionForm.container';
import './fonts/Archive.eot';
import './fonts/Archive.otf';
import './fonts/Archive.svg';
import './fonts/Archive.ttf';
import './fonts/Archive.woff';

const history = createBrowserHistory({});

// bootstrap theme

class App extends React.Component<{}> {

  public render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <NavBarComponent/>
            <div className="app-container">
              <Alert/>
              <MainMapComponent/>
            </div>
            <Container className="Container"/>
            <HeaderComponent/>
            <ArticleComponent/>
            <PhotosComponent/>
            <FooterComponent/>
            <Switch>
              <Route path="/signup" component={RegisterComponent}/>
              <Route path="/login" component={LoginComponent}/>
              <ProtectedRoute path="/suggestions/new" component={FormSuggestionComponent}/>
              <ProtectedRoute path="/suggestions/edit" component={FormSuggestionComponent}/>
              <Route path="/mentions" component={MentionsComponent}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
