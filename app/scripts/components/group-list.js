import React from 'react/addons';

export default React.createClass(

  class GroupList {

    render(){

      var groups, groupElements;

      groups = this.props.groups.data;

      console.log('ici', groups);

      groupElements = groups.map(function(d){
        return (<div key={d.id}><a href={"/group/" + d.id} className="group-element">{d.name}</a></div>);
      });

      return (<div>
        {groupElements}
      </div>);
    }

  }.prototype

);

