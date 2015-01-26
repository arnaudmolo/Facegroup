import React from 'react/addons';
import Sidebar from './sidebar';
import Group from './group';

export default React.createClass(

  class Content {

    render() {

      var groupList, posts;

      if (this.props.posts) {
        posts = (<Group posts={this.props.posts} />);
      };

      return (
        <div className="application-container">
          <div className="sidebar">
            <Sidebar groups={this.props.groups} />
          </div>
          <div className="page-with-nav-content">
            <div className="posts-container">{posts}</div>
          </div>
        </div>
      );

    }

  }.prototype

);

