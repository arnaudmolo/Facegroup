import React from 'react/addons';

export default React.createClass(

  class CommentInput {

    getInitialState() {
      return {
        comment: ''
      };
    }

    handleCommentChange(e) {
      this.setState({
        comment: e.target.value
      });
    }

    handleSubmit(e) {

      e.preventDefault();

      FB.api(
          '/' + this.props.postId + '/comments',
          'POST',
          {message: this.state.comment},
          (response) => {
            console.log(response);
            if (response && !response.error) {
              this.setState({comment: ''});
            }
          }
      );

      // FB.api(
      //     '/878677622152887/feed',
      //     'POST',
      //     {message: 'on peut meme poster'},
      //     function(response) {
      //       console.log(response);
      //     }
      // );

    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleCommentChange} value={this.state.comment}/>
        </form>
      );
    }

  }.prototype

);
