import React from 'react/addons';

var { CSSTransitionGroup } = React.addons;

export default React.createClass(

  class Sidebar {
    render() {

      var itemsList;

      itemsList = this.props.items.map(function(d){

        return (
          <div key={d.id} className="menu-item">
            <a href={`/group/${d.id}`}>{d.name}</a>
          </div>
        );

      });
      return (
        <div className="sidebar">
            { itemsList }
        </div>
      );
    }
  }.prototype

);
