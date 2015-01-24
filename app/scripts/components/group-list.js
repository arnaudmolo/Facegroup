import React from 'react/addons';
// import {LeftNav, MenuItem} from 'material-ui';
import Sidebar from './sidebar/sidebar'

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class GroupList {

    render(){
      console.log("log");
      return (
        <CSSTransitionGroup transitionName="example">
          <Sidebar items={this.props.groups.data} />
        </CSSTransitionGroup>
      );
    }

  }.prototype

);
