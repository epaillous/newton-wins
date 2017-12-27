import { connect } from 'react-redux';
import HeaderComponent from '../components/headerComponent';

const mapStateToProps = (state: any) => {
  return {
    title: state.header.title,
    subtitle: state.header.subtitle
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);