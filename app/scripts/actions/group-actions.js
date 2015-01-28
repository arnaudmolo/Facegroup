import AppDispatcher from './../dispatcher/app-dispatcher';
import { ActionTypes } from './../constants/groups-constants';

export default {

  changeCurrentGroup(id) {

    AppDispatcher
      .handleViewAction({
        type: ActionTypes.CHANGE_GROUP,
        id
      });

  }

};
