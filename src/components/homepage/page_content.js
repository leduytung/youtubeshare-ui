import React from 'react';
import ListMovies from './contents/list_movies';
import { Layout} from 'antd';
import movieApi from '../../api/movie_api';
import userApi from '../../api/user_api';
import reactionApi from '../../api/reaction_api';

const { Content } = Layout;

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
    this.setReactions = this.setReactions.bind(this);
    this.setReactCount = this.setReactCount.bind(this);
    this.state = {
      movies: [],
      authors: {},
      reactions: {},
      likeCount: {},
      dislikeCount: {}
    };
  }

  loadPage(pageCount) {
    movieApi.getAllMovies({page: pageCount}).then(res => {
      // Set movies
      let movies = res.data.movies;
      this.setState({movies: movies});
      
      // Set like count
      let hash_like = {}
      let hash_dislike = {}
      movies.map(mv => hash_like[mv.id] = mv.like);
      movies.map(mv => hash_dislike[mv.id] = mv.dislike);
      this.setState({likeCount: hash_like, dislikeCount: hash_dislike});
      // Set reactions
      let movie_ids = movies.map(mv => mv.id);
      reactionApi.getReactions({movie_ids: movie_ids}).then(res => {
        this.setState({reactions: res.reactions});
      });

      // Set authors
      let author_ids = movies.map(mv => mv.user_id);
      userApi.getUserEmails({user_ids: author_ids}).then(res => {
        this.setState({authors: res.emails});
      });
    });
  }

  setReactions(reactions) {
    this.setState({reactions: reactions});
  }

  setReactCount(likeCount, dislikeCount) {
    this.setState({likeCount: likeCount, dislikeCount: dislikeCount});
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
    return (
      <Content
        style={{ padding: '0 50px' }}
      >
        <ListMovies
          {...this.state}
          {...this.props}
          setReactions={this.setReactions}
          setReactCount={this.setReactCount}
        />
      </Content>
    );
  }
}

export default PageContent;
