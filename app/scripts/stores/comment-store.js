import { EventEmitter } from 'events';
import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';
import PostStore from './post-store';
import { convertRawComment } from './../utils/post-comment-utils';


var CommentStore, CHANGE_EVENT, _comments;

CHANGE_EVENT = 'change';

_comments = {};

function _addComments(rawComments) {
  rawComments.forEach(function(comment) {
    if (!_comments[comment.id]) {
      _comments[comment.id] = convertRawComment(comment);
    }
  });
}

export default CommentStore = Object.assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get(id) {
    return _comments[id];
  },

  getAll() {
    return _comments;
  },

  getAllForPost(postId) {

    var postMessages = [];

    for (var id in _comments) {
      if (_comments[id].postId === postId) {
        postMessages.push(_comments[id]);
      }
    }

    postMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      }else{
        return 1;
      }
      return 0;
    });

    return postMessages;
  },

  getCreatedCommentData(text, postId) {

    var timestamp;

    timestamp = Date.now();

    return {
      id: 'c_' + timestamp,
      postId: postId
    };
  }

});

CommentStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATE_COMMENT:

      var comment;

      comment = CommentStore.getCreatedCommentData(action.text, action.postId);
      _comments[comment.id] = comment;
      CommentStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_COMMENTS:

      _addComments(action.rawComments);
      AppDispatcher.waitFor([PostStore.dispatchToken]);
      CommentStore.emitChange();

  }

});


































