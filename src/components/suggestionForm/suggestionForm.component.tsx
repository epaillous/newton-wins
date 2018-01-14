import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';
import ModalWithFormComponent from '../../containers/modalWithForm.container';
import { Suggestion } from '../../models/suggestion';
import { SuggestionType } from '../../models/suggestionType';
import { FormGroupInputComponent } from '../formGroupInput/formGroupInput.component';
import SuggestionTypeIcon from '../suggestionTypeIcon/suggestionTypeIcon.component';
import './suggestionForm.component.css';

interface Props {
  editMode: boolean;
  fetchSuggestionTypes: () => void;
  suggestion: Suggestion;
  types: SuggestionType[];

  createSuggestion(suggestion: Suggestion): Promise<any>;

  updateSuggestion(suggestion: Suggestion): Promise<any>;
}

class CreateSuggestionComponent extends React.Component<Props & RouteComponentProps<any>> {
  private title: string;
  private buttonTitle: string;

  public componentWillMount() {
    this.props.fetchSuggestionTypes();
    this.title = this.props.editMode ? 'Modifiez votre suggestion' : 'Suggérez-nous un lieu !';
    this.buttonTitle = this.props.editMode ? 'Modifier' : 'Suggérer';
  }

  constructor(props: Props & RouteComponentProps<any>) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    return (
      <ModalWithFormComponent title={this.title}>
        <div key="form-content">
          <FormGroup tag="fieldset">
            <div className="invalid-feedback">
              Vous devez choisir une de ces options
            </div>
            {this.props.types.map(this.renderOption)}
          </FormGroup>
          <FormGroupInputComponent
            property="comment"
            label="Commentaire"
            object={this.props.suggestion}
            errorMessage={''}
            type="textarea"
            required={false}
          />
        </div>
        <Button type="submit" color="primary" key="footer" onClick={this.onClick}>{this.buttonTitle}</Button>
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
        <Label check={true} className="option-line">
          <Input
            type="radio"
            name="radio"
            required={true}
            defaultChecked={this.props.suggestion.suggestionType && this.props.suggestion.suggestionType.id === type.id}
            onClick={onClick}
          />
          <SuggestionTypeIcon type={type}/>
          <div>{type.title}</div>
        </Label>
        <FormText>{type.description}</FormText>
      </FormGroup>
    );
  }

  private onClick() {
    if (this.props.editMode) {
      this.props.updateSuggestion(this.props.suggestion);
    } else {
      this.props.createSuggestion(this.props.suggestion);
    }
  }


}

export default withRouter(CreateSuggestionComponent);
