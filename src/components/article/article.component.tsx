import * as React from 'react';
import {
  Card, CardBody, CardSubtitle, CardText, CardTitle,
  Col, Container, Row
} from 'reactstrap';
import { Article } from '../../models/article';

interface Props {
  selectedArticle: Article;
}

class ArticleComponent extends React.Component<Props> {

  public render() {
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
      </Container>
    );
  }
}

export default ArticleComponent;
