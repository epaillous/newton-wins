import { connect } from 'react-redux';
import PhotosComponent from '../components/photosComponent';

const mapStateToProps = (state: any) => {
  return {
    medias: state.medias.mediasList
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosComponent);