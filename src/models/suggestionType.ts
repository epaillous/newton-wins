export interface SuggestionTypeInterface {
  id: number;
  title: string;
  description: string;
}

export class SuggestionType {
  public id: number;
  public title: string;
  public description: string;

  constructor(json: SuggestionTypeInterface) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
  }
}
