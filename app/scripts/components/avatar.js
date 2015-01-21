import React from 'react/addons';
import styles from './../../../dist/styles/avatar.css';

export default React.createClass(

  class Avatar {

    componentDidMount() {
      console.log(this.getDOMElement());
    }

    render(){

      var user;

      user = this.props.user;

      console.log(styles['Avatar h4']);

      return (
        <a styles={styles.Avatar} href={'https://www.facebook.com/-' + user.id} target="_blank">
          <img src={'http://graph.facebook.com/' + user.id + '/picture?type=square'}></img>
          <h4 styles={styles['Avatar h4']}>{user.name}</h4>
        </a>
      );
    }

  }.prototype

);
