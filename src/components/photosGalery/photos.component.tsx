import * as React from 'react';
import Gallery from 'react-grid-gallery';
import { Container } from 'reactstrap';
import { Media } from '../../models/media';
import './photos.component.css';

interface Props {
  medias: Media[];
}

const renderPhoto = (item: Media) => ({
  src: item.url,
  thumbnail: item.thumbnailUrl,
  thumbnailHeight: item.thumbnailHeight,
  thumbnailWidth: item.thumbnailWidth,
});

class PhotosComponent extends React.Component<Props> {

  public render() {
    if (!this.props.medias || this.props.medias.length === 0) {
      return null;
    }
    return (
      <Container>
        <Gallery images={this.props.medias.map(renderPhoto)} enableImageSelection={false}/>
      </Container>
    );
  }

}

export default PhotosComponent;
