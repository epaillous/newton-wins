import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { SuggestionType } from '../models/suggestionType';
import { Suggestion } from '../models/suggestion';
import { ChangeEvent } from 'react';

interface Props {
  fetchSuggestionTypes: () => void;

  types: SuggestionType[];
  suggestion: Suggestion;
}

export class CreateSuggestionComponent extends React.Component<Props> {

  componentWillMount() {
    this.props.fetchSuggestionTypes();
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="placeType">Type de lieu</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={(event) => this.handleSelect(event)}>
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
            value={this.props.suggestion.comment}
            onChange={(event) => this.handleChange(event)}
          />
        </FormGroup>
      </Form>
    );
  }

  private handleChange(inputElement: ChangeEvent<HTMLInputElement>) {
    this.props.suggestion.comment = inputElement.target.value;
  }

  private handleSelect(inputElement: ChangeEvent<HTMLInputElement>) {
    this.props.suggestion.suggestionType = this.props.types.find(item => item.title === inputElement.target.value);
  }

}
