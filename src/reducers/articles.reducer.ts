import { FETCH_ARTICLE, FETCH_ARTICLE_SUCCESS, RESET_ARTICLE } from '../actions/articles.actions';
import { Article } from '../models/article';

interface ArticleStateInterface {
  article: Article | null;
  loading: boolean;
  error: any;
}

interface StateInterface {
  activeArticle: ArticleStateInterface;
}

const INITIAL_STATE = { activeArticle: { article: null, error: null, loading: false } };

export default function articles(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_ARTICLE:
      return { ...state, activeArticle: { ...state.activeArticle, loading: true } };
    case FETCH_ARTICLE_SUCCESS:
      return { ...state, activeArticle: { article: action.payload, error: null, loading: false } };
    case RESET_ARTICLE:
      return { ...state, activeArticle: { article: null, error: null, loading: false } };
    default:
      return state;
  }
}
