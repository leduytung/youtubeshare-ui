import React from 'react';
import { Layout, Form, List, Icon } from 'antd';
import movie_api from '../../api/movie_api';

const { Content } = Layout;

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      reactions: []
    };
  }

  loadPage(pageCount) {
    const {signed_in} = this.props
    movie_api.getAllMovies({page: pageCount}, signed_in).then(res => {
      this.setState({movies: res.data.movies})
    });
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
    const IconText = ({ type, text, theme }) => (
      <span>
        <Icon type={type} theme={theme} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const {signed_in} = this.props
    const {movies} = this.state;
    const listData = [];
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      listData.push({
        href: 'https://ant.design',
        title: movie.title,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: `Shared by: ${'aasdasd@ghmail.com'}`,
        content: movie.description,
        like: movie.like,
        dislike: movie.dislike
      });
    }
    return (
      <Content style={{ padding: '0 50px' }}>
        <List
          style={{ padding: '50px 10px 20px 50px' }}
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: page => {
              this.loadPage(page);
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
                <IconText type="like" text={`${item.dislike}`} key="list-vertical-star-o" />,
                <IconText type="dislike" text={`${item.like}`} key="list-vertical-like-o" />,
                
                // <IconText type="like" text={`${item.dislike}`} theme="filled" key="list-vertical-star-o" />,
                // <IconText type="dislike" text={`${item.dislike}`} theme="filled" key="list-vertical-like-o" />
              ]}
              extra={
                <img
                  width={400}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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
      </Content>
    );
  }
}

export default Form.create()(PageContent);
