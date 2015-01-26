import React from 'react/addons';
import GroupList from './sidebar/group-list';

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class Sidebar {

    getInitialState() {
      return {
        mounted: false,
        hidden: false
      };
    }

    componentDidMount() {
      this.setState({mounted: true});
    }

    handleHide() {
      this.setState({
        hidden: !this.state.hidden
      });
    }

    render(){

      var groupList;

      if (this.state.mounted) {
        groupList =
          <div className={'sidebar-container ' + (this.state.hidden?'hidden':'')}>
            <button className="sidebar-toggler" onClick={this.handleHide}>x</button>
            <GroupList items={this.props.groups.data} />
          </div>
      }

      return (
        <CSSTransitionGroup transitionName="example">
          {groupList}
        </CSSTransitionGroup>
      );
    }

  }.prototype

);
