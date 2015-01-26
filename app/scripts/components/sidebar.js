import React from 'react/addons';
import GroupList from './sidebar/group-list';

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class Sidebar {

    getInitialState() {
      return {
        mounted: false
      }
    }

    componentDidMount() {
      this.setState({mounted: true});
    }

    render(){

      var groupList;

      if (this.state.mounted) {
        groupList = <GroupList items={this.props.groups.data} />
      }

      return (
        <CSSTransitionGroup transitionName="example">
          {groupList}
        </CSSTransitionGroup>
      );
    }

  }.prototype

);
