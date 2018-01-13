import * as React from 'react';
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import { SuggestionType } from '../../models/suggestionType';
import { Suggestion } from '../../models/suggestion';
import { RouteComponentProps, withRouter } from 'react-router';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { FormButton } from '../modalWithForm/modalWithForm.component';
import PlaceResult = google.maps.places.PlaceResult;

interface Props {
  fetchSuggestionTypes: () => void;

  types: SuggestionType[];

  createSuggestion(suggestion: Suggestion): Promise<any>;

  place: PlaceResult;

}

class CreateSuggestionComponent extends React.Component<Props & RouteComponentProps<any>> {
  suggestion: Suggestion = new Suggestion;

  componentWillMount() {
    this.props.fetchSuggestionTypes();
    this.suggestion.place = this.props.place;
  }

  render() {
    const buttons = [
      new FormButton('primary', 'submit',
        () => this.props.createSuggestion(this.suggestion), 'Suggérer')];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title="Suggérez-nous un lieu !"
        formValid={true}
      >
        <FormGroup tag="fieldset" required>
          <div className="invalid-feedback">
            Vous devez choisir une de ces options
          </div>
          {this.props.types.map(type => (
            <FormGroup check key={type.id}>
              <Label check>
                <Input type="radio" name="radio"
                       required
                       checked={this.suggestion.suggestionType
                       && this.suggestion.suggestionType === type}
                       onClick={() => this.handleSelection(type)}/>{type.title}
              </Label>
              <FormText>{type.description}</FormText>
            </FormGroup>
          ))}
        </FormGroup>
        <FormGroup>
          <Label for="placeType">Commentaire</Label>
          <Input
            type="textarea"
            placeholder="Donnez nous des informations sur ce lieu"
            value={this.suggestion.comment}
            onChange={event => this.handleChange(event)}
          />
        </FormGroup>
      </ModalWithFormComponent>
    );
  }

  private handleChange(inputElement: React.ChangeEvent<HTMLInputElement>) {
    this.suggestion.comment = inputElement.target.value;
  }

  private handleSelection(type: SuggestionType) {
    this.suggestion.suggestionType = type;
  }


}

export default withRouter(CreateSuggestionComponent);
