import React from 'react/addons';
import FB from 'fb';

var authRes = {};

export default React.createClass(

  class Login {

    handleLogin(e) {
      e.preventDefault();
    }

    render(){
      return (<div onClick={this.handleLogin}>Login !</div>);
    }

  }.prototype

);

