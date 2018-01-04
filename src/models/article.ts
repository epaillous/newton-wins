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
  id: number;
  content: string;
  title: string;
  subtitle: string;
  date: string;
  mainImageUrl: string;
  point: Point;

  constructor(jsonArticle: ArticleInterface) {
    this.id = jsonArticle.id;
    this.content = jsonArticle.content;
    this.title = jsonArticle.title;
    this.subtitle = jsonArticle.subtitle;
    this.date = jsonArticle.date;
    this.mainImageUrl = jsonArticle.main_image_url;
  }

}
