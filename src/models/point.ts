import { Article, ArticleInterface } from './article';

export interface PointInterface {
  latitude: string;
  longitude: string;
  id: number;
  articles: ArticleInterface[];
}

export class Point {
    latitude: number;
    longitude: number;
    id: number;
    articles: Article[];

  constructor(json: PointInterface) {
    this.latitude = +json.latitude;
    this.longitude = +json.longitude;
    this.id = json.id;
    this.articles = json.articles
      .map(article => new Article(article));
    this.articles.map(article => article.point = this);
  }

  get googleMapPoint() {
    return {'lat': this.latitude, 'lng': this.longitude};
  }
}