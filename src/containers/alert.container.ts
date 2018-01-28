import { connect } from 'react-redux';
import { resetMainAlert } from '../actions/alerts.actions';
import Alert from '../components/alert/alert.component';

const mapStateToProps = (state: any) => {
  return {
    alertMessage: state.alert.alertMessage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetAlert: () => {
      setTimeout(() => dispatch(resetMainAlert()), 4000);

    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
