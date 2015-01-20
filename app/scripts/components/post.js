import React from 'react/addons';
import FB from 'fb';
import Types from './facebook-types';
import Avatar from './avatar';

export default React.createClass(

  class Post {

    render(){

      var post, comments, Type;

      post = this.props.post;

      Type = Types[post.type];

      if (Type === undefined) {
        console.error('Type doesn\'t match any facebook type');
      };

      return (
        <div className="post">
          <header>
            <Avatar user={post.from}></Avatar>
          </header>
          <h3>{ post.message }</h3>
          <Type post={post}></Type>
        </div>
      );
    }

  }.prototype

);

