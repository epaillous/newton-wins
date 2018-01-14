import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'reactstrap';
import { OAuthSignInButton } from 'redux-auth/bootstrap-theme';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import './login.component.css';

interface Props {
  openLogin: () => void;
  login: (email: string, password: string) => Promise<any>;
  closeModal: () => void;
  fetchSuggestions: () => void;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>> {
  public user = new User();

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.fetchSuggestionsAndCloseModal = this.fetchSuggestionsAndCloseModal.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.login = this.login.bind(this);
  }

  public componentWillMount() {
    this.props.openLogin();
  }

  public render() {
    return (
      <ModalWithFormComponent
        title="Connectez-vous"
      >
        <div key="form-content">
          <div className="oauth-container">
            <OAuthSignInButton
              provider={'facebook'}
              className="btn-primary facebook-button"
              next={this.fetchSuggestionsAndCloseModal}
            >
              Connectez-vous avec Facebook !
            </OAuthSignInButton>
            <p className="sentence-divider"> ou utilisez vos identifiants : </p>
          </div>
          <FormGroupInputComponent
            property="email"
            label="e-mail"
            object={this.user}
            errorMessage="L'email est obligatoire"
            type="email"
            required={true}
          />
          <FormGroupInputComponent
            property="password"
            label="Mot de passe"
            object={this.user}
            errorMessage="Le mot de passe est obligatoire"
            type="password"
            required={true}
          />
        </div>
        <div key="footer">
          <Button type="submit" color="primary" onClick={this.login}>Se connecter</Button>
          {' '}
          <Button type="submit" color="primary" outline={true} onClick={this.goToSignUp}>S'inscrire</Button>
        </div>
      </ModalWithFormComponent>
    );
  }

  private login() {
    return this.props.login(this.user.email, this.user.password)
      .then(() =>
        this.props.fetchSuggestions());
  }

  private goToSignUp() {
    this.props.history.push('/signup');
  }

  private fetchSuggestionsAndCloseModal() {
    this.props.fetchSuggestions();
    this.props.closeModal();
  }

}

export default withRouter(LoginComponent);
