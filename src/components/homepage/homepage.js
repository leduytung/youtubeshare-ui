import React from 'react';
import { Layout } from 'antd';
import PageHeader from './page_header';
import PageContent from './page_content';
// import PageFooter from './page_footer';
import user_api from '../../api/user_api';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      user: null,
      signed_in: false
    };
  }

  signIn(user) {
    this.setState({signed_in: true, user: user});
  }

  signOut() {
    user_api.sign_out();
    this.setState({"user": null, "signed_in": false})
  }

  componentDidMount() {
    user_api.verify_token().then(data => {
      this.setState(data)
    });
  }

  render() {
    return (
      <Layout className="layout">
        <PageHeader
          {...this.state}
          signOut={this.signOut}
          signIn={this.signIn}
          currentUser={this.currentUser}
        />
        <PageContent 
          {...this.state}
        />
        {/* <PageFooter signed_in={this.signed_in}/> */}
      </Layout>
    );
  }
}

export default Homepage;
