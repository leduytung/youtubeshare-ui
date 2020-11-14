import React from 'react';
import { Button, Modal, Input, message } from 'antd';
import movieApi from '../../../api/movie_api';

const { TextArea } = Input;

class ModalCreateMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', url: '', desc: ''};
    this.handleTypingUrl = this.handleTypingUrl.bind(this);
    this.handleTypingTitle = this.handleTypingTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypingDesc = this.handleTypingDesc.bind(this);
  }

  handleTypingUrl(event) {
    this.setState({url: event.target.value});
  }
  handleTypingTitle(event) {
    this.setState({title: event.target.value});
  }
  handleTypingDesc(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let params = {url: this.state.url, title: this.state.title, description: this.state.desc}
    movieApi.createMovie(params).then(res => {
      if (res.status) {
        message.success('Movie Created Successfully!');
        this.props.hideModal();
        this.props.loadPage();
      } else {
        message.error('Movie Create Failed!');
      }
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="Share a movie"
          visible={this.props.createMovieModal}
          onCancel={this.props.hideModal}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleSubmit}>
              Submit
            </Button>
          ]}
        >
          <Input placeholder="Enter Title" onChange={this.handleTypingTitle} style={{margin: 10}}/>
          <Input placeholder="Enter Youtube URL" onChange={this.handleTypingUrl} style={{margin: 10}}/>
          <TextArea placeholder="Enter Description" onChange={this.handleTypingDesc} rows={4} style={{margin: 10}}/>
        </Modal>
      </div>
    );
  }
  
}

export default ModalCreateMovie;
