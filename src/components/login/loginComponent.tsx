import * as React from 'react';
import { FormGroup, Label, Input, } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { OAuthSignInButton } from 'redux-auth/bootstrap-theme';
import './loginComponent.css';
import { FormButton, ModalWithFormComponent } from '../modalWithForm/modalWithForm.component';

interface Props {
  login: (email: string, password: string) => Promise<any>;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>> {
  email: string;
  password: string;
  closeModalNeeded = false;

  render() {
    const buttons = [
      new FormButton('primary', 'submit', () => this.login(), 'Se connecter'),
      new FormButton('primary', '', () => Promise.resolve({}), 'S\'inscrire', true, '/signup'),
    ];
    return (
      <ModalWithFormComponent title="Connectez vous"
                              buttons={buttons}
                              formValid={!!(this.email && this.password)}
                              closeModalNeeded={this.closeModalNeeded}>
        <div>
          <OAuthSignInButton
            provider={'facebook'}
            className="btn-primary facebook-button"
            next={() => this.closeModalNeeded = true}
          >
            Connectez-vous avec Facebook !
          </OAuthSignInButton>
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
    return this.props.login(this.email, this.password);
  }

}

export default withRouter(LoginComponent);
