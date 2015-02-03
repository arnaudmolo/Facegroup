import React from 'react/addons';
import {sortBy} from 'lodash';

export default class GroupList extends React.Component {

  render() {

    var itemsList;

    itemsList = sortBy(this.props.items, 'bookmark_order')
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

}
