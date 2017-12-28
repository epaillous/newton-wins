import { Point } from './point';

export interface MediaInterface {
  id: number;
  title: string;
  url: string;
  comment: string;
}

export class Media {
  id: number;
  title: string;
  url: string;
  comment: string;
  point: Point;

  constructor(jsonMedia: MediaInterface) {
    this.id = jsonMedia.id;
    this.title = jsonMedia.title;
    this.url = jsonMedia.url;
    this.comment = jsonMedia.comment;
  }
}