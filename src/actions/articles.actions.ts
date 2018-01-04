import { Article, ArticleInterface } from '../models/article';
import wretch from 'wretch';
import { ROOT_URL } from './utils';

export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';
export const RESET_ARTICLE = 'RESET_ARTICLE';

export function resetArticle() {
  return {
    type: RESET_ARTICLE,
  };
}

function fetchArticleSuccess(article: Article) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: article,
  };
}

function fetchArticleFailure(error: any) {
  return {
    type: FETCH_ARTICLE_FAILURE,
    payload: error,
  };
}

function requestArticle() {
  return {
    type: FETCH_ARTICLE,
    payload: {},
  };
}

export function fetchArticle(id: number) {
  return (dispatch: any) => {
    dispatch(requestArticle());
    return wretch(ROOT_URL + '/articles/' + id).get()
      .json((json: any) => {
        const article = new Article(json.article as ArticleInterface);
        dispatch(fetchArticleSuccess(article));
      })
      .catch((error: any) => {
        dispatch(fetchArticleFailure(error));
      });
  };
}
