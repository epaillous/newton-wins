import { Point } from './point';

export interface ArticleInterface {
  id: number;
  content: string;
  title: string;
  subtitle: string;
  date: string;
  main_image_url: string;
}

export class Article {
  public id: number;
  public content: string;
  public title: string;
  public subtitle: string;
  public date: string;
  public mainImageUrl: string;
  public point: Point;

  constructor(jsonArticle: ArticleInterface) {
    this.id = jsonArticle.id;
    this.content = jsonArticle.content;
    this.title = jsonArticle.title;
    this.subtitle = jsonArticle.subtitle;
    this.date = jsonArticle.date;
    this.mainImageUrl = jsonArticle.main_image_url;
  }

}
