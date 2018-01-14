import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { OAuthSignInButton } from 'redux-auth/bootstrap-theme';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import { FormButton } from '../modalWithForm/formButton';
import './login.component.css';

interface Props {
  login: (email: string, password: string) => Promise<any>;
  closeModal: () => void;
  fetchSuggestions: () => void;
  changeFormValidStatus: (status: boolean) => void;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>> {
  public user = new User();

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.fetchSuggestionsAndCloseModal = this.fetchSuggestionsAndCloseModal.bind(this);
    this.checkEmailAndPasswordStatus = this.checkEmailAndPasswordStatus.bind(this);
  }

  public render() {
    const buttons = [
      new FormButton('primary', 'submit', () => this.login(), 'Se connecter'),
      new FormButton('primary', '', () => Promise.resolve({}), 'S\'inscrire', true, '/signup'),
    ];
    return (
      <ModalWithFormComponent
        title="Connectez-vous"
        buttons={buttons}
      >
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
          onChange={this.checkEmailAndPasswordStatus}
        />
        <FormGroupInputComponent
          property="password"
          label="Mot de passe"
          object={this.user}
          errorMessage="Le mot de passe est obligatoire"
          type="password"
          required={true}
          onChange={this.checkEmailAndPasswordStatus}
        />
      </ModalWithFormComponent>
    );
  }

  private checkEmailAndPasswordStatus() {
    this.props.changeFormValidStatus(!!(this.user.email && this.user.password));
  }

  private login() {
    return this.props.login(this.user.email, this.user.password).then(() =>
      this.props.fetchSuggestions());
  }

  private fetchSuggestionsAndCloseModal() {
    this.props.fetchSuggestions();
    this.props.closeModal();
  }

}

export default withRouter(LoginComponent);
