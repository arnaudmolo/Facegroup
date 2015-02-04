import React from 'react/addons';

import binderMixin from './../mixins/binder';
import PostStore from './../stores/post-store';

import Post from './post.jsx';
import PostInput from './post-input.jsx';

function getStateFromStores() {
  return {
    posts: PostStore.getPostsForCurrentGroup()
  }
}

export default class Group extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
    this.state = getStateFromStores();
  }

  componentDidMount() {
    PostStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(nextProps, nextState) {
    PostStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {

    var posts, data;

    data = this.state.posts;

    posts = data.map(function(d){
      return (
        <Post key={d.id} post={d}></Post>
      );
    });

    return (
      <div>
        <PostInput />
        <div>{ posts }</div>
      </div>
    );
  }

}

Object.assign(Group.prototype, binderMixin);
