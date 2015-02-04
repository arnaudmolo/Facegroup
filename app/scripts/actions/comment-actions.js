import {isFunction} from 'lodash';

import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';

export default {

  create(comment, callback) {
    FB.api(
      '/' + comment.postId + '/comments',
      'POST',
      {message: comment.message},
      (response) => {
        if (response && !response.error) {
          AppDispatcher
            .handleViewAction({
              type: ActionTypes.CREATE_COMMENT,
              comment: Object.assign(comment, response)
            });
          if (isFunction(callback)) {
            callback();
          };
        }
      }
    );
  },

  createAllCommentsFromPost(postId, rawComments) {

    AppDispatcher
      .handleServerAction({
        type: ActionTypes.CREATE_COMMENT,
        comments: rawComments
      });

  },

  remove(id) {
    FB.api(
      `/${id}`,
      'DELETE',
      (response) => {

        if (response && !response.error) {
          AppDispatcher
            .handleViewAction({
              type: ActionTypes.DELETE_COMMENT,
              id
            });
        };

      }
    );
  }

}
