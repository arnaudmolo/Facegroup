import React from 'react/addons';

export default class Avatar extends React.Component {

  render(){

    var user;

    user = this.props.user;

    return (
      <a href={'https://www.facebook.com/-' + user.id} target="_blank" className="avatar-container">
        {this.props.avatar !== false ? <img className="avatar-caption" src={'http://graph.facebook.com/' + user.id + '/picture?type=square'}></img> : undefined}
        {this.props.name !== false ? <p className="avatar-name">{user.name}</p>:undefined}
      </a>
    );
  }

}
