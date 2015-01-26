import React from 'react/addons';
import _ from 'lodash';

export default React.createClass(

  class GroupList {

    render() {

      var itemsList;

      itemsList = _.sortBy(this.props.items, 'bookmark_order')
        .map(function(d){

          var name;

          if (d.name.length >= 20) {
            name = d.name.substr(0, 19) + '…';
          } else {
            name = d.name;
          }

          return (
            <div key={d.id} className="menu-item">
              <a href={`/group/${d.id}`}>
                <span>{name}</span>
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
