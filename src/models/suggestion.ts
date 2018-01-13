import { Point, PointInterface } from './point';
import { SuggestionType, SuggestionTypeInterface } from './suggestionType';
import PlaceResult = google.maps.places.PlaceResult;

export interface SuggestionInterface {
  id: number;
  suggestion_type: SuggestionTypeInterface;
  comment: string;
  point: PointInterface;
  name: string;
  address: string;
}

export class Suggestion {
  public id: number;
  public suggestionType: SuggestionType | undefined;
  public comment: string;
  public point: Point;
  public place: PlaceResult;
  public name: string;
  public address: string;

  constructor(json: SuggestionInterface | null = null) {
    if (!json) {
      return;
    }
    this.id = json.id;
    this.suggestionType = new SuggestionType(json.suggestion_type);
    this.comment = json.comment;
    this.point = new Point(json.point);
    this.address = json.address;
    this.name = json.name;
  }

  get valid() {
    return !!(this.suggestionType);
  }
}
