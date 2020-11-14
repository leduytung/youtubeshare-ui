import React from 'react';
import ListMovies from './contents/list_movies';

import { Layout} from 'antd';


const { Content } = Layout;

class PageContent extends React.Component {
  render() {
    return (
      <Content
        style={{ padding: '0 50px' }}
      >
        <ListMovies
          {...this.props}
        />
      </Content>
    );
  }
}

export default PageContent;
