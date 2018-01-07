import * as React from 'react';
import {
  Modal, ModalHeader,
  ModalBody, ModalFooter,
  Button, Form,
  FormGroup, Label, Input,
} from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
  login: (email: string, password: string) => Promise<any>;
}

interface State {
  modalOpened: boolean;
}

class LoginComponent extends React.Component<Props & RouteComponentProps<any>, State> {
  email: string;
  password: string;


  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.state = {
      modalOpened: true,
    };
  }

  render() {
    return (
      <Modal isOpen={this.state.modalOpened} toggle={() => this.closeModal()}>
        <ModalHeader toggle={() => this.closeModal()}>Connectez-vous !</ModalHeader>
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
            onClick={() => this.login()}>Se connecter
          </Button>{' '}
          <Button outline color="primary"
                  onClick={() => this.register()}>S'inscrire</Button>
        </ModalFooter>
      </Modal>
    );
  }

  private handleChange(property: string, value: string) {
    this[property] = value;
  }

  private toggle() {
    this.setState({
      modalOpened: false,
    });
  }

  private closeModal() {
    this.redirectTo('/');
    this.toggle();
  }

  private register() {
    this.redirectTo('/signup');
    this.toggle();
  }

  private login() {
    this.props.login(this.email, this.password)
      .then(() => {
        this.redirectTo('/');
        this.toggle();
      });
  }

  private redirectTo(path: string) {
    // FIXME : should use onClosed of Modal but not in types
    setTimeout(() => {
      this.props.history.push(path);
    }, 200);
  }
}

export default withRouter(LoginComponent);
