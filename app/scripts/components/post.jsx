import React from 'react/addons';
import moment from 'moment';
import Autolinker from 'autolinker';

import Types from './facebook-types';
import Avatar from './avatar.jsx';
import Comments from './comments.jsx';
import CommentStore from './../stores/comment-store';

function getStateFromStores(postId) {
  return {
    comments: CommentStore.getCommentsByPostId(postId)
  };
}

export default React.createClass(

  class Post {

    getInitialState() {
      return getStateFromStores(this.props.post.id);
    }

    componentDidMount() {
      CommentStore.addChangeListener(this._onChange);
    }

    _onChange() {
      this.setState(getStateFromStores(this.props.post.id));
    }

    render() {

      var comments, post, Type;

      post = this.props.post;
      comments = this.state.comments;

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
            {comments.length ? <Comments comments={comments} postId={post.id}></Comments>:undefined}
          </footer>
        </div>
      );
    }

  }.prototype

);

