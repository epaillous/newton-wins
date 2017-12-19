import * as React from 'react';
import { Row, Col  } from 'reactstrap';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

interface ArticleProps {
  title:  string;
  subtitle: string;
  text: string;
}

class Article extends React.Component<ArticleProps> {
    render() {
        return (
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>{this.props.title}</CardTitle>
                                <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                                <CardText>{this.props.text}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        );
    }
}

export default Article;