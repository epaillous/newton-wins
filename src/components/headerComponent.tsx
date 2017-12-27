import * as React from 'react';
import { Row, Col } from 'reactstrap';
import {
  Card, CardBody,
  CardTitle
} from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';

interface Props {
  title: string;
  subtitle: string;
}

class HeaderComponent extends React.Component<Props> {

  render() {
    if (!this.props.title) {
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
                <CardTitle>{this.props.title}</CardTitle>
                <CardSubtitle>{this.props.subtitle}</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeaderComponent;