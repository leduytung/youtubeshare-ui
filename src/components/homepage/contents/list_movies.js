import React from 'react';
import { List, message, Button } from 'antd';
import reactionApi from '../../../api/reaction_api';
import ReactPlayer from "react-player"

const LIKE = 1;
const DISLIKE = 0;

class ListMovies extends React.Component {
  constructor(props) {
    super(props);
    this.react = this.react.bind(this);
    this.updateReactCount = this.updateReactCount.bind(this);
    this.iconText = this.iconText.bind(this);
  }

  updateReactCount(movie_id, react_type){
    let likeCount = this.props.likeCount;
    let dislikeCount = this.props.dislikeCount;
    if (react_type == LIKE) {
      likeCount[movie_id] = likeCount[movie_id] + 1;
      dislikeCount[movie_id] > 0 && (dislikeCount[movie_id] = dislikeCount[movie_id] - 1);
    } else {
      likeCount[movie_id] > 0 && (likeCount[movie_id] = likeCount[movie_id] - 1);
      dislikeCount[movie_id] = dislikeCount[movie_id] + 1;
    }

    this.props.setReactCount(likeCount, dislikeCount)
  }

  react(e){
    e.preventDefault()
    let movie_id = e.target.getAttribute('item_id')
    let react_type = e.target.getAttribute('react_type')
    let params = {
      movie_id: movie_id,
      react_type: react_type
    }
    let reactions = this.props.reactions
    reactions[movie_id] = react_type
    this.props.setReactions(reactions);
    this.updateReactCount(movie_id, react_type)
    reactionApi.react(params).then(res => {
      if (res.status) {
        message.success('React Sent!');
      } else {
        message.error('React Failed!');
      }
    });
  }

  iconText(react_type, item_id, type) {
    return (
      this.props.reactions && <span onClick={this.react} item_id={item_id} react_type={react_type} >
        <Button
          disabled={react_type == this.props.reactions[item_id]}
          ghost={true}
          type={type}
          item_id={item_id}
          react_type={react_type}
          type="primary"
          icon={type}
          shape="round"
          size="small">
        { 
          `${react_type == LIKE ? this.props.likeCount[item_id] : this.props.dislikeCount[item_id]}`
        }
        </Button>
      </span>
    )
  }

  render() {
    const {movies, signed_in, authors} = this.props
    const listData = [];
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      listData.push({
        id: movie.id,
        title: movie.title,
        description: `Shared by: ${authors && authors[movie.user_id]}`,
        content: movie.description,
        like: movie.like,
        dislike: movie.dislike,
        url: movie.url
      });
    }
    return (
        <List
          style={{ padding: '50px 10px 20px 50px' }}
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: page => {
              this.props.loadPage(page);
            },
            showSizeChanger: false,
            pageSize: 10,
            total: 170,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={signed_in && [
                this.iconText(LIKE, item.id, "like"),
                this.iconText(DISLIKE, item.id, "dislike")
              ]}
              extra={
                <ReactPlayer
                  width={500}
                  height={200}
                  url={item.url}
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
    );
  }
}

export default ListMovies;
