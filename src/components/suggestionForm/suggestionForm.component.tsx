import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FormGroup, FormText, Input, Label } from 'reactstrap';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { Suggestion } from '../../models/suggestion';
import { SuggestionType } from '../../models/suggestionType';
import PlaceResult = google.maps.places.PlaceResult;
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import { FormButton } from '../modalWithForm/formButton';

interface Props {
  fetchSuggestionTypes: () => void;

  place: PlaceResult;

  types: SuggestionType[];

  createSuggestion(suggestion: Suggestion): Promise<any>;
}

class CreateSuggestionComponent extends React.Component<Props & RouteComponentProps<any>> {
  private suggestion: Suggestion = new Suggestion();

  public componentWillMount() {
    this.props.fetchSuggestionTypes();
    this.suggestion.place = this.props.place;
  }

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  public render() {
    const buttons =
      [new FormButton(
        'primary',
        'submit',
        () => this.props.createSuggestion(this.suggestion),
        'Suggérer')];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title="Suggérez-nous un lieu !"
        formValid={true}
      >
        <FormGroup tag="fieldset" required={true}>
          <div className="invalid-feedback">
            Vous devez choisir une de ces options
          </div>
          {this.props.types.map(this.renderOption)}
        </FormGroup>
        <FormGroupInputComponent property="comment" label="Commentaire" object={this.suggestion} errorMessage={''} type="textarea"/>
      </ModalWithFormComponent>
    );
  }

  private handleSelection(type: SuggestionType) {
    this.suggestion.suggestionType = type;
  }

  private renderOption(type: SuggestionType) {
    const onClick = (event: any) => this.handleSelection(type);
    return (
      <FormGroup check={true} key={type.id}>
        <Label check={true}>
          <Input
            type="radio"
            name="radio"
            required={true}
            checked={this.suggestion.suggestionType && this.suggestion.suggestionType === type}
            onClick={onClick}
          />{type.title}
        </Label>
        <FormText>{type.description}</FormText>
      </FormGroup>
    );
  }

}

export default withRouter(CreateSuggestionComponent);
