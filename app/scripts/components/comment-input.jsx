import React from 'react/addons';
import FB from 'fb';
import CommentActions from './../actions/comment-actions';

export default React.createClass(

  class CommentInput {

    getInitialState() {
      return {
        comment: '',
        disabled: false
      };
    }

    handleCommentChange(e) {
      this.setState({
        comment: e.target.value
      });
    }

    handleSubmit(e) {

      e.preventDefault();

      this.setState({disabled: true});

      FB.api(
          '/' + this.props.postId + '/comments',
          'POST',
          {message: this.state.comment},
          (response) => {
            console.log(response);
            this.setState({disabled: false});
            if (response && !response.error) {
              CommentActions.create({
                id: response.id,
                message: this.state.comment
              });
              this.setState({comment: ''});
            }
          }
      );

    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input disabled={this.state.disabled} type="text" onChange={this.handleCommentChange} value={this.state.comment}/>
        </form>
      );
    }

  }.prototype

);
