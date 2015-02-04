import AppDispatcher from './../dispatcher/app-dispatcher';
import {ActionTypes} from './../constants/groups-constants';
import {isFunction} from 'lodash';

export default class PostActions {

  create(post, callback) {
    FB.api(
      '/' + post.groupId + '/feed',
      'POST',
      {message: post.message},
      (response) => {
        if (!response.error) {
          FB.api(`/${ response.id }`, (response) => {
            if (!response.error) {
              AppDispatcher
                .handleViewAction({
                  type: ActionTypes.CREATE_POST,
                  post: response
                });
              if (isFunction(callback)) {
                callback();
              };
            };
          });
        }
      }
    );
  }

}.prototype
