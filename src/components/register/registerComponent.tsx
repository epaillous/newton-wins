import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { User } from '../../models/user';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
  register: (user: User) => void;
}

class RegisterComponent extends React.Component<Props & RouteComponentProps<any>> {
  user: User = new User();

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={() => this.props.history.goBack()}>Inscrivez-vous !</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="placeType">Prénom</Label>
              <Input
                type="text"
                onChange={event => this.handleChange('firstName', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="placeType">Nom</Label>
              <Input
                type="text"
                onChange={event => this.handleChange('lastName', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="placeType">e-mail</Label>
              <Input
                type="email"
                onChange={event => this.handleChange('email', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="placeType">Mot de passe</Label>
              <Input
                type="password"
                onChange={event => this.handleChange('password', event.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            onClick={() => this.props.register(this.user)}>S'inscrire
          </Button>{' '}
          <Button color="secondary">Annuler</Button>
        </ModalFooter>
      </Modal>
    );
  }

  private handleChange(property: string, value: string) {
    this.user[property] = value;
  }
}

export default withRouter(RegisterComponent);
