import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import { FormButton } from '../modalWithForm/formButton';

interface Props {
  register: (user: User) => Promise<any>;

  changeFormValidStatus(status: boolean): void;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  private user: User = new User();

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.checkUserStatus = this.checkUserStatus.bind(this);
  }

  public render() {
    const buttons =
      [new FormButton('primary', 'submit', () => this.props.register(this.user), 'S\'inscrire')];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title="Inscrivez-vous !"
      >
        <FormGroupInputComponent
          type="text"
          label="Prénom"
          property="firstName"
          errorMessage="Le prénom est obligatoire"
          object={this.user}
          required={true}
          onChange={this.checkUserStatus}
        />
        <FormGroupInputComponent
          type="text"
          label="Nom"
          property="lastName"
          errorMessage="Le nom est obligatoire"
          object={this.user}
          required={true}
          onChange={this.checkUserStatus}
        />
        <FormGroupInputComponent
          type="email"
          label="e-mail"
          property="email"
          errorMessage="L'email est obligatoire"
          object={this.user}
          required={true}
          onChange={this.checkUserStatus}
        />
        <FormGroupInputComponent
          type="password"
          label="Mot de passe"
          property="password"
          errorMessage="Le mot de passe est obligatoire (et s'il contient des chiffres, des lettres, etc. c'est mieux)"
          object={this.user}
          required={true}
          onChange={this.checkUserStatus}
        />
      </ModalWithFormComponent>
    );
  }

  private checkUserStatus() {
    this.props.changeFormValidStatus(this.user.valid);
  }

}

export default withRouter(RegisterComponent);
