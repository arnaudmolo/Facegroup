import React from 'react/addons';
import FB from 'fb';
import CommentActions from './../actions/comment-actions';
import binderMixin from './../mixins/binder';

let initialState = Object.freeze({
  comment: '',
  disabled: false
});

export default class CommentInput extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
    this.state = initialState;
  }

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  handleSubmit(e) {

    e.preventDefault();

    this.setState({disabled: true});

    CommentActions.create({
      message: this.state.comment,
      postId: this.props.postId
    }, () => this.setState(initialState));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input disabled={this.state.disabled} type="text" onChange={this.handleCommentChange.bind(this)} value={this.state.comment}/>
      </form>
    );
  }

}

Object.assign(CommentInput.prototype, binderMixin);
