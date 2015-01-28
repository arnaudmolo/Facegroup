import React from 'react/addons';

export default React.createClass(

  class Video {

    render(){
      return (
        <video controls src={this.props.post.source}></video>
      );
    }

  }.prototype

);
