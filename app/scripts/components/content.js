import React from 'react/addons';
import GroupList from './group-list';
import Group from './group';

export default React.createClass(

  class Content {


    render() {

      var groupList, group;

      if (this.props.groups) {
        groupList = (<GroupList groups={this.props.groups}></GroupList>);
      };

      if (this.props.posts) {
        group = (<Group posts={this.props.posts}></Group>);
      };

      return (
        <div>
          <div>{groupList}</div>
          <div className="page-with-nav-content">{group}</div>
        </div>
      );

    }

  }.prototype

);

