import { connect } from 'react-redux';
import { closeModal, modalAnimationEnded } from '../actions/modal.actions';
import { ModalWithFormComponent } from '../components/modalWithForm/modalWithForm.component';

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalWithFormComponent);
