import React from 'react/addons';
import _ from 'lodash';

export default React.createClass(

  class GroupList {

    render() {

      var itemsList;

      itemsList = _.sortBy(this.props.items, 'bookmark_order')
        .map(function(d){
          return (
            <div key={d.id} className="menu-item">
              <a href={`/group/${d.id}`}>
                <span>{d.name}</span>
                {d.unread?<span className="unread-post">{d.unread}</span>:null}
              </a>
            </div>
          );
        });

      return (
        <div className="menu-item-container">
            { itemsList }
        </div>
      );
    }
  }.prototype

);
