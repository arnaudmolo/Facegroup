import React from 'react/addons';
import Post from './post.jsx';

export default React.createClass(

  class Group {

    render(){

      var posts, data;

      data = this.props.posts;

      posts = data.map(function(d){
        return (
          <Post key={d.id} post={d}></Post>
        );
      });

      return (
        <div>{ posts }</div>
      );
    }

  }.prototype

);

