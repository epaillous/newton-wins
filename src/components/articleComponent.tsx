import { Article } from '../models/article';
import * as React from 'react';
import { Row, Col } from 'reactstrap';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import PhotosCarouselComponent from './photosCarouselComponent';

interface Props {
  selectedArticle: Article;
}

class ArticleComponent extends React.Component<Props> {

  render() {
    const article = this.props.selectedArticle;
    if (!article) {
      return (
        <Container>
          <Row>
            <Col xs="12"/>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle>{article.title}</CardTitle>
                <CardSubtitle>{article.subtitle}</CardSubtitle>
                <CardText>{article.content}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <PhotosCarouselComponent/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ArticleComponent;