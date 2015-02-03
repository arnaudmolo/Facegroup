import React from 'react/addons';

export default class Video extends React.Component {

  render(){
    return (
      <video controls src={this.props.post.source}></video>
    );
  }

}
