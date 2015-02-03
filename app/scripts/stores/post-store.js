import AppDispatcher from './../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import { ActionTypes } from './../constants/groups-constants';
import GroupStore from './group-store';
import CommentActions from './../actions/comment-actions';

var PostStore, CHANGE_EVENT, _posts;

CHANGE_EVENT = 'change';

_posts = {};

function create(rawPost) {
  console.log(rawPost);
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

    var res;

    res = [];

    Object.keys(_posts).forEach(function(d){
      if (_posts[d].groupId === GroupStore.getCurrentId()) {
        res.push(_posts[d]);
      };
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
  }

});
