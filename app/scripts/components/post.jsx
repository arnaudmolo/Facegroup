import React from 'react/addons';
import moment from 'moment';
import Autolinker from 'autolinker';

import Types from './facebook-types';
import Avatar from './avatar.jsx';
import Comments from './comments.jsx';

export default React.createClass(

  class Post {

    render() {

      var post, Type;

      post = this.props.post;

      Type = Types[post.type];

      if (Type === undefined) {
        console.error('Type doesn\'t match any facebook type');
      }

      return (
        <div className="post">
          <header>
            <Avatar user={post.from}></Avatar>
            <time className="post-time">
              <a
                href={'https://www.facebook.com/' + post.id + '/'}
                target="_blank">
                  {moment(post.created_time).fromNow()}
              </a>
            </time>
          </header>
          <section>
            {
              post.message?
                <h3 dangerouslySetInnerHTML={{__html: Autolinker.link(post.message)}} />:
                undefined
            }
            <Type post={post}></Type>
          </section>
          <footer className="comments-container">
            {post.comments !== undefined ? <Comments comments={post.comments} postId={post.id}></Comments>:undefined}
          </footer>
        </div>
      );
    }

  }.prototype

);
