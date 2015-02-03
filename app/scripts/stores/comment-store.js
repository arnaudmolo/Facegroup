import { EventEmitter } from 'events';
import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';
import PostStore from './post-store';
import { convertRawComment } from './../utils/post-comment-utils';

var CommentStore, CHANGE_EVENT, _comments;

CHANGE_EVENT = 'change';

_comments = {};

function mockComment(comment) {
  return Object.assign({
    can_remove: true,
    created_time: Date.now(),
    from: {
      id: '10205436595175226',
      name: 'Arnaud Molo'
    },
    like_count: 0,
    users_likes: false
  }, comment);
}

function create(rawComment) {
  if (_comments[rawComment.id]) {
    console.warn('obejct already exist');
  }else{
    _comments[rawComment.id] = mockComment(rawComment);
  }
}

function createAll(rawComments, postId) {
  rawComments.forEach(function(comment) {
    comment.postId = postId;
    create(comment);
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

CommentStore.setMaxListeners(100);

CommentStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATE_COMMENT:
      create(action.comment);
      CommentStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_COMMENTS:
      createAll(action.rawComments, action.postId);
      CommentStore.emitChange();
  }

});
