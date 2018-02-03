import 'flag-icon-css/css/flag-icon.css';
import * as React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'reactstrap';
import './header.component.css';

interface Props {
  title: string;
  subtitle: string;
  flagCode: string;
}

class HeaderComponent extends React.Component<Props> {

  public render() {
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
                  <Col xs="8" md="10">
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                  </Col>
                  <Col xs="4" md="2">
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
