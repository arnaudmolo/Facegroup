import React from 'react/addons';
import FB from 'fb';

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
