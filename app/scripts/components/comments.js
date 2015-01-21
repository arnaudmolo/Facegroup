import React from 'react/addons';
import Avatar from './avatar';

export default React.createClass(

  class Comments {

    getInitialState() {
      return {
        nbPosts: 5
      }
    }

    handleShowMore() {
      this.setState({nbPosts: this.state.nbPosts + 5})
    }

    render() {

      var comments, commentsList, limit, rest;

      comments = this.props.comments.data;
      commentsList = [];
      limit = this.state.nbPosts > comments.length - 1 ?
        comments.length - 1:
        this.state.nbPosts;
      rest = comments.length - 1 - limit;

      for (var i = 0; i <= limit; i++) {
        commentsList.push(
          <li key={comments[i].id}>
            <Avatar user={comments[i].from}></Avatar>
            <p>{comments[i].message}</p>
          </li>
        );
      };

      rest = rest?<span onClick={this.handleShowMore}>Show more</span>:undefined

      return (
        <div>
          <ul>{commentsList}</ul>
          {rest}
        </div>
      );

    }

  }.prototype

);
