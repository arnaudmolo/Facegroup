import React from 'react/addons';

export default React.createClass(

  class Avatar {

    render(){

      var user;

      user = this.props.user;

      return (
        <a href={'https://www.facebook.com/' + user.id} target="_blank">
          <img src={'http://graph.facebook.com/' + user.id + '/picture?type=square'}></img>
          <h4>{user.name}</h4>
        </a>
      );
    }

  }.prototype

);
