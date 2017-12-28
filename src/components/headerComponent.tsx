import * as React from 'react';
import { Row, Col } from 'reactstrap';
import {
  Card, CardBody,
  CardTitle
} from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';
import 'flag-icon-css/css/flag-icon.css';
import './headerComponent.css';

interface Props {
  title: string;
  subtitle: string;
  flagCode: string;
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
                <Row>
                  <Col xs="10">
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                  </Col>
                  <Col xs="2">
                    <div className={'flag-icon flag-icon-' + this.props.flagCode}/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HeaderComponent;