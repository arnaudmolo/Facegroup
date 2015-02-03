import React from 'react/addons';
import FB from 'fb';
import CommentActions from './../actions/comment-actions';

export default class CommentInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      disabled: false
    };
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
    }, () => this.setState(this.getInitialState()));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input disabled={this.state.disabled} type="text" onChange={this.handleCommentChange} value={this.state.comment}/>
      </form>
    );
  }

}
