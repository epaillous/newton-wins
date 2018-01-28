import * as React from 'react';
import { Alert } from 'reactstrap';
import './alert.component.css';

interface Props {
  alertMessage: string;

  resetAlert: () => void;
}

interface State {
  isOpened: boolean;
}

class AlertComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { isOpened: false };
    this.dismissAlert = this.dismissAlert.bind(this);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.alertMessage) {
      this.setState({ isOpened: true });
      setTimeout(() => this.dismissAlert(), 30000);
    }
  }

  public render() {
    return (
      <Alert
        color="success"
        isOpen={this.state.isOpened}
        toggle={this.dismissAlert}
        className="main-alert"
      >
        {this.props.alertMessage}
      </Alert>
    );
  }

  private dismissAlert() {
    this.setState({ isOpened: false });
    this.props.resetAlert();
  }
}

export default AlertComponent;
