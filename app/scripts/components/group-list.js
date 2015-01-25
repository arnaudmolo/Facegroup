import React from 'react/addons';
import Sidebar from './sidebar/sidebar'

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class GroupList {

    getInitialState() {
      return {
        mounted: false
      }
    }

    componentDidMount() {
      this.setState({mounted: true});
    }

    render(){

      var sideBar;

      if (this.state.mounted) {
        sideBar =
          <Sidebar items={this.props.groups.data} />
      }

      return (
        <CSSTransitionGroup transitionName="example">
          {sideBar}
        </CSSTransitionGroup>
      );
    }

  }.prototype

);
