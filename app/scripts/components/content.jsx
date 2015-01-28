import React from 'react/addons';

import GroupStore from './../stores/group-store';

import Sidebar from './sidebar.jsx';
import Group from './group';

function getStateFromStores() {
  return {
    groups: GroupStore.getAll()
  };
}

export default React.createClass(

  class Content {

    getInitialState() {
      return getStateFromStores();
    }

    componentDidMount() {
      GroupStore.addChangeListener(this._onChange);
    }

    _onChange() {
      this.setState(getStateFromStores());
    }

    render() {

      var posts;

      if (this.props.posts) {
        posts = (<Group posts={this.props.posts} />);
      }

      return (
        <div className="application-container">
          <div className="sidebar">
            <Sidebar groups={this.state.groups} />
          </div>
          <div className="page-with-nav-content">
            <div className="posts-container">{posts}</div>
          </div>
        </div>
      );

    }

  }.prototype

);

