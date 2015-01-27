import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes} from './../constants/groups-constants';

export default {

  receiveAllComments(rawComments) {

    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_COMMENTS,
      rawComments: rawComments
    });

  },

  receiveCreatedComment(createdComment) {

    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_CREATED_COMMENTS,
      rawComment: createdComment
    });

  },

  receiveAllPosts(rawPosts) {

    console.log('rawPosts', rawPosts);

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_POSTS,
        rawPosts: rawPosts
      });
  },

  receiveCreatedPost(createdPost) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_CREATED_POST,
        rawPost: createdPost
      });

  },

  receiveAllGroups(rawGroups) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_GROUPS,
        rawGroups
      })


  }

}

