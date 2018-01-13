import { connect } from 'react-redux';
import { resetMainAlert } from '../actions/alerts.actions';
import App from '../App';

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
