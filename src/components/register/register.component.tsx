import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Alert, Button } from 'reactstrap';
import ModalComponent from '../../containers/modal.container';
import { User } from '../../models/user';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';

interface Props {
  errors: any;
  register: (user: User) => Promise<any>;
  openRegister: () => void;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  private user: User = new User();

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public componentWillMount() {
    this.props.openRegister();
  }

  public render() {
    return (
      <ModalComponent
        title="Inscrivez-vous !"
        withForm={true}
      >
        <div key="form-content">
          {this.renderError()}
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
      </ModalComponent>
    );
  }

  private onClick() {
    this.props.register(this.user);
  }

  private renderError() {
    return this.props.errors && this.props.errors.full_messages
      && (<Alert color="danger">{this.props.errors.full_messages.map((message: string) => <div key={message}>{message}</div>)}</Alert>);
  }

}

export default withRouter(RegisterComponent);
