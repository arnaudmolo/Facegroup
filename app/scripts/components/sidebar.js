import React from 'react/addons';
import GroupList from './sidebar/group-list';

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class Sidebar {

    getInitialState() {
      return {
        mounted: false,
        hidden: false,
        width: 200
      };
    }

    componentDidMount() {
      this.setState({mounted: true});
    }

    handleResize(e) {
      if (e.pageX) {
        this.setState({
          width: e.pageX
        });
      };
    }

    render(){

      var groupList;

      if (this.state.mounted) {
        groupList =
            <GroupList items={this.props.groups.data} />
      }

      return (
        <div className="sidebar-container" style={{width: this.state.width}}>
          <CSSTransitionGroup transitionName="example">
            <div className="resize-bar" onClick={this.handleDragStart} onDrag={this.handleResize} draggable></div>
            {groupList}
          </CSSTransitionGroup>
        </div>
      );
    }

  }.prototype

);
