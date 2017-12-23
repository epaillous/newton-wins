import { connect } from 'react-redux';
import ArticleComponent from '../components/articleComponent';

const mapStateToProps = (state: any) => {
  return {
    selectedArticle: state.articles.activeArticle.article
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);