import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router';


export class FormButton {
  color: string;
  type: string;
  action: () => Promise<any>;
  title: string;
  outline: boolean;
  closeModalAfterAction: boolean;
  redirectPath: string;

  constructor(color: string, type: string, action: () => Promise<any>, title: string,
              outline = false, redirectPath = '/', closeModalAfterAction = true) {
    this.color = color;
    this.type = type;
    this.action = action;
    this.title = title;
    this.outline = outline;
    this.closeModalAfterAction = closeModalAfterAction;
    this.redirectPath = redirectPath;
  }

}

interface State {
  wasValidated: boolean;
  modalOpened: boolean;
}

interface Props {
  buttons: FormButton[];
  title: string;
  formValid: boolean;
  closeModalNeeded: boolean;
}

class NoRouterModalWithFormComponent
  extends React.Component<Props & RouteComponentProps<any>, State> {

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.state = {
      wasValidated: false,
      modalOpened: true,
    };
  }

  render() {
    return (
      <Modal isOpen={this.state.modalOpened} toggle={() => this.closeModal()}>
        <ModalHeader toggle={() => this.closeModal()}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Form className={this.state.wasValidated ? 'was-validated' : ''}>
            {this.props.children}
          </Form>
        </ModalBody>
        <ModalFooter>
          {
            this.props.buttons.map(button =>
              <Button color={button.color}
                      onClick={() => this.handleButtonAction(button)}
                      key={button.title}
                      outline={button.outline}>{button.title}
              </Button>,
            )
          }
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
    setTimeout(() => {
      this.props.history.push(path);
    }, 200);
  }
}

export const ModalWithFormComponent = withRouter(NoRouterModalWithFormComponent);