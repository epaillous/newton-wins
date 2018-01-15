import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { LoaderComponent } from '../loader/loader.component';

interface Props {
  title: string;
  modalOpened: boolean;
  wasValidated: boolean;
  loading?: boolean;

  closeModal(): void;

  modalAnimationEnded(): void;
}

class NoRouterModalWithFormComponent
  extends React.Component<Props & RouteComponentProps<any>> {

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentWillReceiveProps(nextProps: Props & RouteComponentProps<any>) {
    if (this.props.modalOpened && !nextProps.modalOpened) {
      this.redirectTo('/');
    }
  }

  public render() {
    if (this.props.loading) {
      return (
        <Modal
          isOpen={this.props.modalOpened}
          toggle={this.closeModal}
        >
          <LoaderComponent/>
        </Modal>
      );
    }
    return (
      <Modal
        isOpen={this.props.modalOpened}
        toggle={this.closeModal}
      >
        <ModalHeader toggle={this.closeModal}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Form className={this.props.wasValidated ? 'was-validated' : ''}>
            {this.getComponent('form-content')}
          </Form>
        </ModalBody>
        <ModalFooter>
          {this.getComponent('footer')}
        </ModalFooter>
      </Modal>
    );
  }

  private closeModal() {
    this.props.closeModal();
  }

  private redirectTo(path: string) {
    // FIXME : should use onClosed of Modal but not in types
    setTimeout(() => {
      this.props.history.push(path);
      this.props.modalAnimationEnded();
    }, 200);
  }

  private getComponent(key: string) {
    if (!this.props.children) {
      return;
    }
    return (this.props.children as any[]).filter((comp) => {
      return comp.key === key;
    });
  }
}

export const ModalWithFormComponent = withRouter(NoRouterModalWithFormComponent);
