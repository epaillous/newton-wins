import { connect } from 'react-redux';
import headerComponent from '../components/header/header.component';

const mapStateToProps = (state: any) => {
  return {
    title: state.header.title,
    subtitle: state.header.subtitle,
    flagCode: state.header.flagCode,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(headerComponent);
