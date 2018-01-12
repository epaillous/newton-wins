import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { User } from '../../models/user';
import { RouteComponentProps, withRouter } from 'react-router';
import { ModalWithFormComponent, FormButton } from '../modalWithForm/modalWithForm.component';

interface Props {
  register: (user: User) => Promise<any>;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  user: User = new User();


  render() {
    const buttons = [new FormButton('primary', 'submit', () => this.props.register(this.user), 'S\'inscrire')];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title="Inscrivez vous !"
        formValid={this.user.valid}
        closeModalNeeded={false}>
        <FormGroup>
          <Label for="placeType">Prénom</Label>
          <Input
            type="text"
            onChange={event => this.handleChange('firstName', event.target.value)}
            required
          />
          <div className="invalid-feedback">Le prénom est obligatoire</div>
        </FormGroup>
        <FormGroup>
          <Label for="placeType">Nom</Label>
          <Input
            type="text"
            onChange={event => this.handleChange('lastName', event.target.value)}
            required
          />
          <div className="invalid-feedback">Le nom est obligatoire</div>
        </FormGroup>
        <FormGroup>
          <Label for="placeType">e-mail</Label>
          <Input
            type="email"
            onChange={event => this.handleChange('email', event.target.value)}
            required
          />
          <div className="invalid-feedback">e-mail est obligatoire</div>
        </FormGroup>
        <FormGroup>
          <Label for="placeType">Mot de passe</Label>
          <Input
            type="password"
            onChange={event => this.handleChange('password', event.target.value)}
            required
          />
          <div className="invalid-feedback">
            Le mot de passe est obligatoire
            (et s'il contient des chiffres, des lettres, etc. c'est mieux)
          </div>
        </FormGroup>
      </ModalWithFormComponent>
    );
  }

  private handleChange(property: string, value: string) {
    this.user[property] = value;
  }
}

export default withRouter(RegisterComponent);
