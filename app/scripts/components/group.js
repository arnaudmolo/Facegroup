import React from 'react/addons';
import FB from 'fb';
import Post from './post';

export default React.createClass(

  class Group {

    render(){

      var posts, data;

      data = this.props.posts.data;

      posts = data.map(function(d, i){
        return (
          <Post key={d.id} post={d}></Post>
        );
      });

      return (<div>{ posts }</div>);
    }

  }.prototype

);

