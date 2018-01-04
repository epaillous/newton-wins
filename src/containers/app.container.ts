import { connect } from 'react-redux';
import App from '../App';
import { resetMainAlert } from '../actions/alerts.actions';

const mapStateToProps = (state: any) => {
  return {
    alertMessage: state.app.alertMessage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetAlert: () => {
      dispatch(resetMainAlert());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
