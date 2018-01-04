import { connect } from 'react-redux';
import photosComponent from '../components/photosGalery/photosComponent';

const mapStateToProps = (state: any) => {
  return {
    medias: state.medias.mediasList,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(photosComponent);
