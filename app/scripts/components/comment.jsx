import React from 'react/addons';

import CommentActions from './../actions/comment-actions';

import moment from 'moment';
import Avatar from './avatar.jsx';

import binderMixin from './../mixins/binder';

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
  }

  handleClick(e) {

    e.preventDefault();

    CommentActions
      .remove(this.props.comment.id);

  }

  render() {

    let comment, from;

    comment = this.props.comment;
    from = comment.from;

    return (
      <li key={comment.id} className="comment-container">
        <div className="comment-avatar">
          <Avatar user={from} name={false} />
        </div>
        <div className="comment">
          <p className="comment-name">
            <a href={'https://www.facebook.com/' + from.id} target="_blank">{from.name}</a>
            <time className="post-time">
              <a
                href={'https://www.facebook.com/' + comment.id + '/'}
                target="_blank">
                  {moment(comment.created_time).fromNow()}
              </a>
            </time>
          </p>
          <a onClick={this.handleClick} href={'https://www.facebook.com/' + comment.id + '/'} className="remove">x</a>
          <p>{comment.message}</p>
        </div>
      </li>
    );

  }

}

Object.assign(Comment.prototype, binderMixin);
