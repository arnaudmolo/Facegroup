import React from 'react/addons';
import Avatar from './avatar';
import moment from 'moment';
import FB from 'fb';

export default React.createClass(

  class Comments {

    getInitialState() {
      return {
        nbPosts: 5
      }
    }

    handleShowMore() {
      this.setState({nbPosts: this.state.nbPosts + 5});
    }

    handleSubmit(event) {

      event.preventDefault();

      console.log();

      FB.api(
          '/' + this.props.postId + '/comments',
          'POST',
          {
              "message": "This is a test comment"
          },
          function (response) {
            console.log(response);
            if (response && !response.error) {
              /* handle the result */
            }
          }
      );

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

        let from, comment;

        comment = comments[i];
        from = comment.from;

        commentsList.push(
          <li key={comments[i].id} className="comment-container">
            <div className="comment-avatar">
              <Avatar user={from} name={false}></Avatar>
            </div>
            <div className="comment">
              <p className="comment-name">
                <a href={'https://www.facebook.com/-' + from.id} target="_blank">{from.name}</a>
                <time className="post-time">
                  <a
                    href={'https://www.facebook.com/' + comment.id + '/'}
                    target="_blank">
                      {moment(comment.created_time).fromNow()}
                  </a>
                </time>
              </p>
              <p>{comments[i].message}</p>
            </div>
          </li>
        );
      };

      return (
        <div>
          <ul className="comments-container">{commentsList}</ul>
          {rest?<span onClick={this.handleShowMore}>Show more</span>:undefined}
          <form onSubmit={this.handleSubmit}>
            <input type="text"/>
          </form>
        </div>
      );

    }

  }.prototype

);
