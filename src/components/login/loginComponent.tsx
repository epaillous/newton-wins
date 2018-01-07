import * as React from 'react';
import {
  Modal, ModalHeader,
  ModalBody, ModalFooter,
  Button, Form,
  FormGroup, Label, Input,
} from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
  login: (email: string, password: string) => void;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>> {
  email: string;
  password: string;

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={() => this.props.history.goBack()}>Connectez-vous !</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="placeType">e-mail</Label>
              <Input
                required
                type="email"
                onChange={event => this.handleChange('email', event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="placeType">Mot de passe</Label>
              <Input
                required
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
            onClick={() => this.props.login(this.email, this.password)}>Se connecter
          </Button>{' '}
          <Button outline color="primary"
                  onClick={() => this.props.history.push('/signup')}>S'inscrire</Button>
        </ModalFooter>
      </Modal>
    );
  }

  private handleChange(property: string, value: string) {
    this[property] = value;
  }
}

export default withRouter(LoginComponent);
