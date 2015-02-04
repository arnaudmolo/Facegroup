import React from 'react/addons';
import CommentInput from './comment-input.jsx';
import CommentStore from './../stores/comment-store';
import binderMixin from './../mixins/binder';
import Comment from './comment.jsx';

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
      commentsList.push(
        <Comment comment={comments[i]} />
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
