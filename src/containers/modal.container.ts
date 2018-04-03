import { connect } from 'react-redux';
import { closeModal, modalAnimationEnded } from '../actions/modal.actions';
import { ModalComponent } from '../components/modal/modal.component';

const mapStateToProps = (state: any) => {
  return {
    modalOpened: state.modal.modalOpened,
    wasValidated: state.modal.wasValidated
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
    modalAnimationEnded: () => {
      dispatch(modalAnimationEnded());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
