import AppDispatcher from './../dispatcher/app-dispatcher';
import CommentConstant from './../constant/comment-constant';

export class CommentActions {

  create(comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstant.COMMENT_CREATE,
      text: comment.text
    });
  }

}
