import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';

export default {

  receiveAllComments(rawComments, postId) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_COMMENTS,
        rawComments,
        postId
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

    var comments;

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.RECEIVE_RAW_POSTS,
        rawPosts
      });

    comments = [];

    rawPosts.data.forEach((post) => {
      if (post.comments) {
        this.receiveAllComments(post.comments.data, post.id);
      };
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
