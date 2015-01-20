import React from 'react/addons';
import FB from 'fb';

var authRes = {};

export default React.createClass(

  class Group {

    render(){

      var posts, data;

      data = this.props.posts.data;

      posts = data.map(function(d, i){

        return (<p>{d.message}</p>);

      });

      return (<div>
        { posts }
      </div>);
    }

  }.prototype

);

