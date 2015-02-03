import React from 'react/addons';
import moment from 'moment';
import Avatar from './avatar.jsx';
import CommentInput from './comment-input.jsx';
import CommentStore from './../stores/comment-store';
import binderMixin from './../mixins/binder';

export default class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
    this.state = {nbPosts: 5};
  }

  handleShowMore() {
    this.setState({nbPosts: this.state.nbPosts + 5});
  }

  render() {

    var comments, commentsList, limit, rest;

    comments = this.props.comments;
    commentsList = [];
    limit = this.state.nbPosts > comments.length - 1 ?
      comments.length - 1:
      this.state.nbPosts;
    rest = comments.length - 1 - limit;

    for (var i = 0; i <= limit; i++) {

      let from, comment;

      comment = comments[i];
      from = comment.from;

      commentsList.push(
        <li key={comments[i].id} className="comment-container">
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
            <p>{comments[i].message}</p>
          </div>
        </li>
      );
    }

    return (
      <div>
        <ul className="comments-container">{commentsList}</ul>
        {rest?<span onClick={this.handleShowMore}>Show more</span>:undefined}
      </div>
    );

  }

}

Object.assign(Comments.prototype, binderMixin);
