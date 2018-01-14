import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'reactstrap';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';

interface Props {
  register: (user: User) => Promise<any>;

  changeFormValidStatus(status: boolean): void;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  private user: User = new User();

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    return (
      <ModalWithFormComponent
        title="Inscrivez-vous !"
      >
        <div key="form-content">
          <FormGroupInputComponent
            type="text"
            label="Prénom"
            property="firstName"
            errorMessage="Le prénom est obligatoire"
            object={this.user}
            required={true}
          />
          <FormGroupInputComponent
            type="text"
            label="Nom"
            property="lastName"
            errorMessage="Le nom est obligatoire"
            object={this.user}
            required={true}
          />
          <FormGroupInputComponent
            type="email"
            label="e-mail"
            property="email"
            errorMessage="L'email est obligatoire"
            object={this.user}
            required={true}
          />
          <FormGroupInputComponent
            type="password"
            label="Mot de passe"
            property="password"
            errorMessage="Le mot de passe est obligatoire (et s'il contient des chiffres, des lettres, etc. c'est mieux)"
            object={this.user}
            required={true}
          />
        </div>
        <Button type="submit" color="primary" key="footer" onClick={this.onClick}>S'inscrire</Button>
      </ModalWithFormComponent>
    );
  }

  private onClick() {
    this.props.register(this.user);
  }

}

export default withRouter(RegisterComponent);
