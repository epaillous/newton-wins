import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FormButton } from './formButton';

interface State {
  wasValidated: boolean;
  modalOpened: boolean;
}

interface Props {
  buttons: FormButton[];
  title: string;
  closeModalNeeded: boolean;
  formValid: boolean;
}

class NoRouterModalWithFormComponent
  extends React.Component<Props & RouteComponentProps<any>, State> {

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.state = {
      modalOpened: true,
      wasValidated: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public componentWillReceiveProps(nextProps: Props & RouteComponentProps<any>) {
    if (!this.props.closeModalNeeded && nextProps.closeModalNeeded) {
      this.toggle();
    }
  }

  public render() {
    return (
      <Modal
        isOpen={this.state.modalOpened}
        toggle={this.closeModal}
      >
        <ModalHeader toggle={this.closeModal}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Form className={this.state.wasValidated ? 'was-validated' : ''}>
            {this.props.children}
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.props.buttons.map(this.renderButton)}
        </ModalFooter>
      </Modal>
    );
  }

  private handleButtonAction(button: FormButton) {
    if (button.type === 'submit') {
      this.setState({ wasValidated: true });
      if (this.props.formValid) {
        button.action().then(() => {
          if (button.closeModalAfterAction) {
            this.redirectTo(button.redirectPath);
            this.toggle();
          }
        });
      }
    } else {
      button.action().then(() => {
        if (button.closeModalAfterAction) {
          this.redirectTo(button.redirectPath);
          this.toggle();
        }
      });
    }
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

  private redirectTo(path: string) {
    // FIXME : should use onClosed of Modal but not in types
    setTimeout(() => this.props.history.push(path), 200);
  }

  private renderButton(button: FormButton) {
    const onClick = () => this.handleButtonAction(button);
    return (
      <Button
        color={button.color}
        onClick={onClick}
        key={button.title}
        outline={button.outline}
      >
        {button.title}
      </Button>
    );
  }
}

export const ModalWithFormComponent = withRouter(NoRouterModalWithFormComponent);
