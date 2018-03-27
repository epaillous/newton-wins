import { Point } from './point';

export interface MediaInterface {
  id: number;
  title: string;
  url: string;
  comment: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}

export class Media {
  public id: number;
  public title: string;
  public url: string;
  public comment: string;
  public point: Point;
  public thumbnailUrl: string;
  public thumbnailWidth: number;
  public thumbnailHeight: number;

  constructor(jsonMedia: MediaInterface) {
    this.id = jsonMedia.id;
    this.title = jsonMedia.title;
    this.url = jsonMedia.url;
    this.comment = jsonMedia.comment;
    this.thumbnailUrl = jsonMedia.thumbnail_url || jsonMedia.url;
    this.thumbnailHeight = jsonMedia.thumbnail_height || 250;
    this.thumbnailWidth = jsonMedia.thumbnail_width || 200;
  }
}
