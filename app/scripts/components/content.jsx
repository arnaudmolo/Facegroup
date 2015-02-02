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

export default React.createClass(

  class Content {

    getInitialState() {
      return getStateFromStores();
    }

    componentDidMount() {
      GroupStore.addChangeListener(this._onChange);
      PostStore.addChangeListener(this._onChange);
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

  }.prototype

);

