import { Article, ArticleInterface } from './article';
import { City, CityInterface } from './city';
import LatLngLiteral = google.maps.LatLngLiteral;

export interface PointInterface {
  latitude: string;
  longitude: string;
  id: number;
  articles: ArticleInterface[];
  city?: CityInterface;
}

export class Point {
  public latitude: number;
  public longitude: number;
  public id: number;
  public articles: Article[];
  public city: City;

  constructor(json: PointInterface) {
    this.latitude = +json.latitude;
    this.longitude = +json.longitude;
    this.id = json.id;
    this.articles = json.articles ? json.articles
      .map((article) => new Article(article)) : [];
    this.articles.map((article) => article.point = this);
    if (json.city) {
      this.city = new City(json.city);
    }
  }

  get googleMapPoint(): LatLngLiteral {
    return { lat: this.latitude, lng: this.longitude };
  }
}
