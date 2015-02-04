import React from 'react/addons';
import CommentActions from './../actions/comment-actions';
import binderMixin from './../mixins/binder';

const initialState = Object.freeze({
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
      <form onSubmit={this.handleSubmit}>
        <input disabled={this.state.disabled} type="text" onChange={this.handleCommentChange} value={this.state.comment}/>
      </form>
    );
  }

}

Object.assign(CommentInput.prototype, binderMixin);
