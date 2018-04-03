import { connect } from 'react-redux';
import mentionsComponent from '../components/mentions/mentions.component';
import { showMentions } from '../actions/mentions.actions';

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
