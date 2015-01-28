import AppDispatcher from './../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import { ActionTypes, PayloadSources } from './../constants/groups-constants';

var GroupStore, CHANGE_EVENT, _groups, _currentId;

CHANGE_EVENT = 'change';

_groups = {};

function create(group) {
  _groups[group.id] = group;
}

function createAll(rawGroups) {
  rawGroups.forEach(create);
}

export default GroupStore = Object.assign({}, EventEmitter.prototype, {

  getAll() {
    return _groups;
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

  getCurrentId(){
    return _currentId;
  }

});

GroupStore.dispatchToken = AppDispatcher.register(function(payload) {

  if (payload.source === PayloadSources.SERVER_ACTION) {

    switch(payload.action.type) {
      case ActionTypes.RECEIVE_RAW_GROUPS:
        createAll(payload.action.rawGroups.groups.data);
        GroupStore.emitChange();
    }

  }

  if (payload.source === PayloadSources.VIEW_ACTION) {

    switch(payload.action.type) {
      case ActionTypes.CHANGE_GROUP:
        _currentId = payload.action.id;
    }

  };

});
