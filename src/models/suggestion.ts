import { SuggestionType, SuggestionTypeInterface } from './suggestionType';
import { Point, PointInterface } from './point';
import PlaceResult = google.maps.places.PlaceResult;

export interface SuggestionInterface {
  id: number;
  suggestion_type: SuggestionTypeInterface;
  comment: string;
  point: PointInterface;
}

export class Suggestion {
  id: number;
  suggestionType: SuggestionType | undefined;
  comment: string;
  point: Point;
  place: PlaceResult;

  constructor(json: SuggestionInterface | null = null) {
    if (!json) {
      return;
    }
    this.id = json.id;
    this.suggestionType = new SuggestionType(json.suggestion_type);
    this.comment = json.comment;
    this.point = new Point(json.point);
  }
}
