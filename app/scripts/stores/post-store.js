import AppDispatcher from './../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import { ActionTypes } from './../constants/groups-constants';
import GroupStore from './group-store';
import CommentActions from './../actions/comment-actions';

var PostStore, CHANGE_EVENT, _posts;

CHANGE_EVENT = 'change';

_posts = {};

function create(rawPost) {
  rawPost.groupId = rawPost.to.data[0].id;
  _posts[rawPost.id] = rawPost;
}

function createAll(rawPosts) {
  rawPosts.forEach(create);
}

export default PostStore = Object.assign({}, EventEmitter.prototype, {

  getAll() {
    return Object.freeze(Object.clone(_posts));
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getPostsForCurrentGroup() {

    var res, currentId;

    res = [];
    currentId = GroupStore.getCurrentId();

    Object.keys(_posts).forEach(function(d){
      if (_posts[d].groupId === currentId) {
        res.push(_posts[d]);
      };
    });

    res.sort(function(a, b) {
      return new Date(b.updated_time) - new Date(a.updated_time);
    });

    return res;
  }

});

PostStore.setMaxListeners(100);

PostStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action;

  action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_POSTS:
      createAll(action.rawPosts.data);
      PostStore.emitChange();
      break;
    case ActionTypes.CREATE_POST:
      create(action.post);
      PostStore.emitChange();
      break;
  }

});
