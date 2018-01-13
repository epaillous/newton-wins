import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import { FormButton } from '../modalWithForm/formButton';
import { ModalWithFormComponent } from '../modalWithForm/modalWithForm.component';

interface Props {
  register: (user: User) => Promise<any>;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  private user: User = new User();

  public render() {
    const buttons =
      [new FormButton('primary', 'submit', () => this.props.register(this.user), 'S\'inscrire')];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title="Inscrivez vous !"
        formValid={this.user.valid}
        closeModalNeeded={false}
      >
        <FormGroupInputComponent
          type="text"
          label="Prénom"
          property="firstName"
          errorMessage="Le prénom est obligatoire"
          object={this.user}
        />
        <FormGroupInputComponent
          type="text"
          label="Nom"
          property="lastName"
          errorMessage="Le nom est obligatoire"
          object={this.user}
        />
        <FormGroupInputComponent
          type="email"
          label="e-mail"
          property="email"
          errorMessage="L'email est obligatoire"
          object={this.user}
        />
        <FormGroupInputComponent
          type="password"
          label="Mot de passe"
          property="password"
          errorMessage="Le mot de passe est obligatoire (et s'il contient des chiffres, des lettres, etc. c'est mieux)"
          object={this.user}
        />
      </ModalWithFormComponent>
    );
  }

}

export default withRouter(RegisterComponent);
