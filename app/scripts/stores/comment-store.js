import { EventEmitter } from 'events';
import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';
import PostStore from './post-store';
import { convertRawComment } from './../utils/post-comment-utils';

var CommentStore, CHANGE_EVENT, _comments;

CHANGE_EVENT = 'change';

_comments = {};

function create(rawComment, postId) {
  rawComment.postId = postId;
  if (_comments[rawComment.id]) {
    console.warn('obejct already exist');
  }else{
    _comments[rawComment.id] = rawComment;
  }
}

function createAll(rawComments, postId) {
  rawComments.forEach(function(comment) {
    create(comment, postId);
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

  getCommentsByPostId(postId) {

    var comments;

    comments = [];

    Object.keys(_comments).forEach(function(commentId) {
      if (_comments[commentId].postId === postId) {
        comments.push(_comments[commentId]);
      };
    });

    return comments;

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
      createAll(action.rawComments, action.postId);
      CommentStore.emitChange();
  }

});
