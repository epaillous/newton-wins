import * as React from 'react';
import { FormGroup, Label, Input, } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { OAuthSignInButton } from 'redux-auth/bootstrap-theme';
import './login.component.css';
import { FormButton } from '../modalWithForm/modalWithForm.component';
import ModalWithFormComponent from '../../containers/modalWithForm.container';

interface Props {
  login: (email: string, password: string) => Promise<any>;
  closeModal: () => void;
  fetchSuggestions: () => void;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>> {
  email: string;
  password: string;

  render() {
    const buttons = [
      new FormButton('primary', 'submit', () => this.login(), 'Se connecter'),
      new FormButton('primary', '', () => Promise.resolve({}), 'S\'inscrire', true, '/signup'),
    ];
    return (
      <ModalWithFormComponent title="Connectez-vous"
                              buttons={buttons}
                              formValid={!!(this.email && this.password)}>
        <div className="oauth-container">
          <OAuthSignInButton
            provider={'facebook'}
            className="btn-primary facebook-button"
            next={() => {
              this.props.fetchSuggestions();
              this.props.closeModal();
            }
            }
          >
            Connectez-vous avec Facebook !
          </OAuthSignInButton>
          <p className="sentence-divider"> ou utilisez vos identifiants : </p>
        </div>
        <FormGroup>
          <Label for="placeType">e-mail</Label>
          <Input
            required
            type="email"
            onChange={event => this.handleChange('email', event.target.value)}
          />
          <div className="invalid-feedback">
            L'email est obligatoire
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="placeType">Mot de passe</Label>
          <Input
            required
            type="password"
            onChange={event => this.handleChange('password', event.target.value)}
          />
          <div className="invalid-feedback">
            Le mot de passe est obligatoire
          </div>
        </FormGroup>
      </ModalWithFormComponent>
    );
  }

  private handleChange(property: string, value: string) {
    this[property] = value;
  }

  private login() {
    return this.props.login(this.email, this.password).then(() =>
      this.props.fetchSuggestions());
  }

}

export default withRouter(LoginComponent);
