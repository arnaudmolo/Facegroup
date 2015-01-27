import AppDispatcher from './../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';

var PostStore, CHANGE_EVENT, _posts;

CHANGE_EVENT = 'change';

_posts = {};

function create(id, text) {

  _posts[id] = {
    id: id,
    text: text
  }

}

function update(id, updates) {
  _posts[id] = Object.assign({}, _posts[id], updates);
}

function updateAll(updates) {
  for (var id in _posts) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _posts[id];
}

export default PostStore = Object.assign({}, EventEmitter, {

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

AppDispatcher.register(function(action) {

  var text;

  switch(action.actionType) {
    case PostConstant.POST_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      };
      PostStore.emitChange();
      break;

    case PostConstant.POST_DESTROY:
      destroy(action.id);
      PostStore.emitChange();
      break;
  }

});
