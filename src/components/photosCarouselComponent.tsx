import * as React from 'react';
import { Card, CardImg } from 'reactstrap';
import './photosCarouselComponent.css';

const items = [
  {
    src: 'https://s3.eu-west-3.amazonaws.com/newton-wins/Europe/Portugal/Lisbonne/IMG_0001.JPG',
    altText: 'Slide 1',
    caption: 'Slide 1',
    id: 134
  },
  {
    src: 'https://s3.eu-west-3.amazonaws.com/newton-wins/Europe/Portugal/Lisbonne/IMG_0002.JPG',
    altText: 'Slide 2',
    caption: 'Slide 2',
    id: 2123
  },
];

class PhotosCarouselComponent extends React.Component {

  render() {
    return items.map(item =>
      (
        <Card key={item.id}>
          <CardImg top={true} width="100%" src={item.src} alt="Card image cap"/>
        </Card>
      ));
  }
}

export default PhotosCarouselComponent;