import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';

export default {

  create(comment) {
    console.log('comment action', comment);
    AppDispatcher
      .handleViewAction({
        actionType: ActionTypes.CREATE_COMMENT,
        comment: comment
      });
  },

  createAllCommentsFromPost(postId, rawComments) {

    AppDispatcher
      .handleServerAction({
        actionType: ActionTypes.CREATE_COMMENT,
        comments: rawComments
      });

  }

}
