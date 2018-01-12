import * as React from 'react';
import { Card, CardImg, Col, Container, Row } from 'reactstrap';
import './photos.component.css';
import { Media } from '../../models/media';

interface Props {
  medias: Media[];
}

class PhotosComponent extends React.Component<Props> {

  render() {
    if (!this.props.medias || this.props.medias.length === 0) {
      return null;
    }
    return (
      <Container>
        <Row>
          {
            this.props.medias.map((item: Media) =>
              (
                <Col xs="3">
                  <Card key={item.id}>
                    <CardImg top={true} width="300px" src={item.url} alt="Card image cap"/>
                  </Card>
                </Col>
              ))
          }
        </Row>
      </Container>
    );
  }
}

export default PhotosComponent;
