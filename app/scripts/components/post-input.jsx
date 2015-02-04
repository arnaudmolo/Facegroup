import React from 'react/addons';
import binderMixin from './../mixins/binder';
import GroupStore from './../stores/group-store';
import PostActions from './../actions/post-actions';

const initialState = Object.freeze({
  post: '',
  disabled: false
});

export default class PostInput extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
    this.state = initialState;
  }

  handlePostChange(e) {
    this.setState({
      post: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({disabled: true});

    PostActions.create({
      message: this.state.post,
      groupId: GroupStore.getCurrentId()
    }, () => this.setState(initialState));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input disabled={this.state.disabled} type="text" onChange={this.handlePostChange} value={this.state.comment} />
      </form>
    );
  }

}

Object.assign(PostInput.prototype, binderMixin);
