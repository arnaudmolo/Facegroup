import React from 'react/addons';
import GroupList from './group-list';
import Group from './group';

export default React.createClass(

  class Content {


    render() {

      var groupList, posts;

      if (this.props.posts) {
        posts = (<Group posts={this.props.posts}></Group>);
      };

      return (
        <div>
          <div>
            <GroupList groups={this.props.groups}></GroupList>
          </div>
          <div className="page-with-nav-content">
            <div className="posts-container">{posts}</div>
          </div>
        </div>
      );

    }

  }.prototype

);

