import * as React from 'react';
import { Card, CardImg, Col, Container, Row } from 'reactstrap';
import { Media } from '../../models/media';
import './photos.component.css';

interface Props {
  medias: Media[];
}

const renderPhoto = (item: Media) =>
  (
    <Col xs="3" key={item.id}>
      <Card>
        <CardImg top={true} width="300px" src={item.url} alt="Card image cap"/>
      </Card>
    </Col>
  );

class PhotosComponent extends React.Component<Props> {

  public render() {
    if (!this.props.medias || this.props.medias.length === 0) {
      return null;
    }
    return (
      <Container>
        <Row>
          {this.props.medias.map(renderPhoto)}
        </Row>
      </Container>
    );
  }
}

export default PhotosComponent;
