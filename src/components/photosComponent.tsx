import * as React from 'react';
import { Card, CardImg } from 'reactstrap';
import './photosComponent.css';
import { Media } from '../models/media';
import { Col, Container, Row } from 'reactstrap';

interface Props {
  medias: Media[];
}

class PhotosComponent extends React.Component<Props> {

  render() {
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