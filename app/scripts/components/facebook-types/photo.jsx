import React from 'react/addons';

export default React.createClass(

  class Photo {

    render(){

      var post;

      post = this.props.post;

      return (
        <a href={post.link} target="_blank">
          <img src={post.picture} />
        </a>);
    }

  }.prototype

);

