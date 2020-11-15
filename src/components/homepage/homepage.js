import React from 'react';
import { Layout, message} from 'antd';
import PageHeader from './page_header';
import PageContent from './page_content';
import ModalCreateMovie from './contents/modal_create_movie';
// import PageFooter from './page_footer';
import authApi from '../../api/auth_api';
import movieApi from '../../api/movie_api';
import userApi from '../../api/user_api';
import reactionApi from '../../api/reaction_api';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.setReactions = this.setReactions.bind(this);
    this.setReactCount = this.setReactCount.bind(this);
    this.state = {
      currentPage: 0,
      user: null,
      signed_in: false,
      createMovieModal: false,
      movies: [],
      authors: {},
      reactions: {},
      likeCount: {},
      dislikeCount: {}
    };
  }

  signIn(values) {
    authApi.signIn(values).then(res => {
      if (res.status === true) {
        message.success('Signed in successfully');
        window.location.reload();
      } else {
        message.error('Sign in failed');
      }
    });
    
  }

  signOut() {
    authApi.signOut();
    this.setState({"user": null, "signed_in": false})
  }

  showModal() {
    this.setState({"createMovieModal": true})
  }

  hideModal() {
    this.setState({"createMovieModal": false})
  }

  loadPage(pageCount) {
    movieApi.getAllMovies({page: pageCount}).then(res => {
      // Set movies
      let movies = res.data.movies;
      this.setState({movies: movies});
      // Set current page
      pageCount && this.setState({currentPage: pageCount})
      
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
    authApi.verifyToken().then(data => {
      this.setState(data);
    }).then(() => {
      this.loadPage();
    });
  }

  render() {
    return (
      <Layout className="layout">
        <PageHeader
          {...this.state}
          signOut={this.signOut}
          signIn={this.signIn}
          showModal={this.showModal}
        />
        <PageContent
          {...this.state}
          setReactions={this.setReactions}
          setReactCount={this.setReactCount}
          loadPage={this.loadPage}
        />
        <ModalCreateMovie
          {...this.state}
          hideModal={this.hideModal}
          loadPage={this.loadPage}
        />
        {/* <PageFooter signed_in={this.signed_in}/> */}
      </Layout>
    );
  }
}

export default Homepage;
