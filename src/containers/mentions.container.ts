import { connect } from 'react-redux';
import { showMentions } from '../actions/mentions.actions';
import mentionsComponent from '../components/mentions/mentions.component';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openMentions: () => {
      dispatch(showMentions());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mentionsComponent);
