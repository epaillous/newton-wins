import * as React from 'react';
import { Row, Col  } from 'reactstrap';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

class Article extends React.Component {
    render() {
        return (
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        );
    }
}

export default Article;