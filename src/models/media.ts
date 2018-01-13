import { Point } from './point';

export interface MediaInterface {
  id: number;
  title: string;
  url: string;
  comment: string;
}

export class Media {
  public id: number;
  public title: string;
  public url: string;
  public comment: string;
  public point: Point;

  constructor(jsonMedia: MediaInterface) {
    this.id = jsonMedia.id;
    this.title = jsonMedia.title;
    this.url = jsonMedia.url;
    this.comment = jsonMedia.comment;
  }
}
