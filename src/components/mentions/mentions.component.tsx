import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import ModalComponent from '../../containers/modal.container';
import './mentions.component.css';

interface Props {
  openMentions: () => void;
}

class MentionsComponent extends React.Component<Props & RouteComponentProps<any>> {

  public componentWillMount() {
    this.props.openMentions();
  }

  public render() {
    return (
      <ModalComponent title="Remerciements">
        <Container>
          <Row>
            <Col>
              <p>Ce site a été entièrement réalisé à l'aide de la librairie
                <a className="outer-link" href="https://github.com/facebook/react"> React</a>.</p>
              <p>Le loader est réalisé par <a className="outer-link" href="http://tobiasahlin.com/spinkit/">tobiasahlin</a>.</p>
              <p>Merci à <a className="outer-link" href="http://www.webalys.com/">Webalys</a> pour les pictogrammes.</p>
            </Col>
          </Row>
        </Container>
      </ModalComponent>
    );
  }

}

export default withRouter(MentionsComponent);
