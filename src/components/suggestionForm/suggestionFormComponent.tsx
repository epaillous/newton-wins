import * as React from 'react';
import { Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { SuggestionType } from '../../models/suggestionType';
import { Suggestion } from '../../models/suggestion';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
  fetchSuggestionTypes: () => void;

  types: SuggestionType[];

  createSuggestion(suggestion: Suggestion): void;
}

class CreateSuggestionComponent extends React.Component<Props & RouteComponentProps<any>> {
  suggestion: Suggestion = new Suggestion;

  componentWillMount() {
    this.props.fetchSuggestionTypes();
  }

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={() => this.props.history.goBack()}>Suggérez ce lieu</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="placeType">Type de lieu</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={event => this.handleSelect(event)}>
                {this.props.types.map(type => (
                  <option key={type.id}>{type.title}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="placeType">Commentaire</Label>
              <Input
                type="text"
                placeholder="Donnez nous des informations sur ce lieu"
                value={this.suggestion.comment}
                onChange={event => this.handleChange(event)}
              />
            </FormGroup>
          </Form>
          }
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.createSuggestionAndCloseModal()}
            type="submit">Suggérer
          </Button>{' '}
          <Button color="secondary"><Link to={'/'}>Annuler</Link></Button>
        </ModalFooter>
      </Modal>
    );
  }

  private handleChange(inputElement: React.ChangeEvent<HTMLInputElement>) {
    this.suggestion.comment = inputElement.target.value;
  }

  private handleSelect(inputElement: React.ChangeEvent<HTMLInputElement>) {
    this.suggestion.suggestionType =
      this.props.types.find(item => item.title === inputElement.target.value);
  }

  private createSuggestionAndCloseModal() {
    this.props.createSuggestion(this.suggestion);
  }

}

export default withRouter(CreateSuggestionComponent);
