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
  editMode: boolean;
  fetchSuggestionTypes: () => void;
  place: PlaceResult;
  suggestion: Suggestion;
  types: SuggestionType[];

  createSuggestion(suggestion: Suggestion): Promise<any>;

  updateSuggestion(suggestion: Suggestion): Promise<any>;
}

class CreateSuggestionComponent extends React.Component<Props & RouteComponentProps<any>> {
  private title: string;
  private button: FormButton;

  public componentWillMount() {
    this.props.fetchSuggestionTypes();
    this.title = this.props.editMode ? 'Modifiez votre suggestion' : 'Suggérez-nous un lieu !';
    this.button = this.props.editMode ? new FormButton(
      'primary',
      'submit',
      () => this.props.updateSuggestion(this.props.suggestion),
      'Modifier') :
      new FormButton(
        'primary',
        'submit',
        () => this.props.createSuggestion(this.props.suggestion),
        'Suggérer');
  }

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  public render() {
    const buttons = [this.button];
    return (
      <ModalWithFormComponent
        buttons={buttons}
        title={this.title}
        formValid={true}
      >
        <FormGroup tag="fieldset" required={true}>
          <div className="invalid-feedback">
            Vous devez choisir une de ces options
          </div>
          {this.props.types.map(this.renderOption)}
        </FormGroup>
        <FormGroupInputComponent property="comment" label="Commentaire" object={this.props.suggestion} errorMessage={''} type="textarea"/>
      </ModalWithFormComponent>
    );
  }

  private handleSelection(type: SuggestionType) {
    this.props.suggestion.suggestionType = type;
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
            defaultChecked={this.props.suggestion.suggestionType && this.props.suggestion.suggestionType.id === type.id}
            onClick={onClick}
          />{type.title}
        </Label>
        <FormText>{type.description}</FormText>
      </FormGroup>
    );
  }

}

export default withRouter(CreateSuggestionComponent);
