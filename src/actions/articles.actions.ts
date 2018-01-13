import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Article, ArticleInterface } from '../models/article';
import { ROOT_URL } from './utils';

export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';
export const RESET_ARTICLE = 'RESET_ARTICLE';

interface ArticleContainerInterface {
  article: ArticleInterface;
}

export const resetArticle: ActionCreator<Action> = () => {
  return {
    type: RESET_ARTICLE,
  };
};

const fetchArticleSuccess: ActionCreator<Action> = (article: Article) => {
  return {
    payload: article,
    type: FETCH_ARTICLE_SUCCESS,
  };
};

const fetchArticleFailure: ActionCreator<Action> = (error: Error) => {
  return {
    payload: error,
    type: FETCH_ARTICLE_FAILURE,
  };
};

const requestArticle: ActionCreator<Action> = () => {
  return {
    payload: {},
    type: FETCH_ARTICLE,
  };
};

export const fetchArticle: ActionCreator<ThunkAction<Promise<void>, any, void>> = (id: number) => {
  return (dispatch: Dispatch<Promise<void>>) => {
    dispatch(requestArticle());
    return fetch(ROOT_URL + '/articles/' + id)
      .then((response: Response) => response.json())
      .then((json: ArticleContainerInterface) => {
        const article = new Article(json.article as ArticleInterface);
        dispatch(fetchArticleSuccess(article));
      })
      .catch((error: Error) => {
        dispatch(fetchArticleFailure(error));
      });
  };
};
