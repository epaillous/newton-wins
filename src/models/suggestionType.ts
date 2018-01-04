export interface SuggestionTypeInterface {
  id: number;
  title: string;
  description: string;
}

export class SuggestionType {
  id: number;
  title: string;
  description: string;

  constructor(json: SuggestionTypeInterface) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
  }
}
