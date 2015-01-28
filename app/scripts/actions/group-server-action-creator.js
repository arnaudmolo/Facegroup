import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';

export default {

  receiveAllComments(rawComments) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_COMMENTS,
        rawComments
      });

  },

  receiveCreatedComment(rawComment) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_CREATED_COMMENTS,
        rawComment
      });

  },

  receiveAllPosts(rawPosts) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_POSTS,
        rawPosts
      });

  },

  receiveCreatedPost(rawPost) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_CREATED_POST,
        rawPost
      });

  },

  receiveAllGroups(rawGroups) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_GROUPS,
        rawGroups
      });

  }

};
