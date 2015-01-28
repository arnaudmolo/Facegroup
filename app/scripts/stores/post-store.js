import AppDispatcher from './../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import { ActionTypes } from './../constants/groups-constants';

var PostStore, CHANGE_EVENT, _posts;

CHANGE_EVENT = 'change';

_posts = {};

function create(post) {
  _posts[post.id] = post;
}

function createAll(rawPosts) {
  rawPosts.forEach(create);
}

function destroy(id) {
  delete _posts[id];
}

export default PostStore = Object.assign({}, EventEmitter.prototype, {

  getAll() {
    return _posts;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

PostStore.dispatchToken = AppDispatcher.register(function(payload) {

  var text;

  console.log('azeazeazeazeazeazeaze', payload);

  switch(payload.actionType) {

  }

});
