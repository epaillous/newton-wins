import { connect } from 'react-redux';
import headerComponent from '../components/header/header.component';

const mapStateToProps = (state: any) => {
  return {
    flagCode: state.header.flagCode,
    subtitle: state.header.subtitle,
    title: state.header.title,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(headerComponent);
