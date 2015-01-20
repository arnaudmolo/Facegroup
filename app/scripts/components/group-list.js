import React from 'react/addons';
import {LeftNav, MenuItem} from 'material-ui';

export default React.createClass(

  class GroupList {

    render(){

      var groups, groupElements;

      groups = this.props.groups.data;

      groupElements = groups.map(function(d){
        return {
          type: MenuItem.Types.LINK,
          payload: "/group/" + d.id,
          text: d.name
        };
      });
      return (<LeftNav menuItems={groupElements} />);
    }

  }.prototype

);

