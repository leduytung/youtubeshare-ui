import React from 'react';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Layout, List, Avatar, Space } from 'antd';
import movieApi from '../../api/movieApi';

const { Content } = Layout;

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      movies: [],
      reactions: []
    };
  }
  handleClick() {
    console.log('Click happened');
  }

  loadPage(pageCount) {
    movieApi.getAll({page: pageCount}).then(res => {
      this.setState({movies: res.data.movies})

    });
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
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
        upvote: movie.upvote,
        downvote: movie.downvote
      });
    }

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

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
              actions={[
                <IconText icon={DislikeOutlined} text={`${item.upvote}`} key="list-vertical-dislike-o" />,
                <IconText icon={LikeOutlined} text={`${item.downvote}`} key="list-vertical-like-o" />,

                <IconText icon={DislikeFilled} text={`${item.upvote}`} key="list-vertical-dislike-o" />,
                <IconText icon={LikeFilled} text={`${item.downvote}`} key="list-vertical-like-o" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
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

export default PageContent;
