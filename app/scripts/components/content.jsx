import React from 'react/addons';

import GroupStore from './../stores/group-store';
import PostStore from './../stores/post-store';

import Sidebar from './sidebar.jsx';
import Group from './group.jsx';

function getStateFromStores() {
  return {
    groups: GroupStore.getAll(),
    posts: PostStore.getPostsForCurrentGroup()
  };
}

export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onChange.bind(this));
    PostStore.addChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {

    var posts;

    if (this.state.posts) {
      posts = (<Group posts={this.state.posts} />);
    }

    return (
      <div className="application-container">
        <Sidebar groups={this.state.groups} />
        <div className="page-with-nav-content">
          <div className="posts-container">{posts}</div>
        </div>
      </div>
    );

  }

}
