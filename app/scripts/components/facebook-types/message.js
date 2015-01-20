import React from 'react/addons';

export default React.createClass(

  class Message {

    render(){

      console.log('messages', this.props.post);

      return (<p>message</p>);
    }

  }.prototype

);

