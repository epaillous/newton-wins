import * as React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

interface Props {
  property: string;
  label: string;
  object: any;
  errorMessage: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  required: boolean;
  onChange?: () => void;
}

export class FormGroupInputComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <FormGroup>
        <Label for="placeType">{this.props.label}</Label>
        <Input
          type={this.props.type}
          onChange={this.handleChange}
          required={this.props.required}
          defaultValue={this.props.object[this.props.property]}
        />
        <div className="invalid-feedback">{this.props.errorMessage}</div>
      </FormGroup>
    );
  }

  private handleChange(event: any) {
    this.props.object[this.props.property] = event.target.value;
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
}
