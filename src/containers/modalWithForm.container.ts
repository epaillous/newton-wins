import { connect } from 'react-redux';
import { ModalWithFormComponent } from '../components/modalWithForm/modalWithForm.component';

const mapStateToProps = (state: any) => {
  return {
    closeModalNeeded: state.modal.closeModalNeeded,
    formValid: state.modal.formValid
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWithFormComponent);
