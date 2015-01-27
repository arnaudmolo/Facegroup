
import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    CREATE_COMMENT: null,
    RECEIVE_RAW_CREATED_COMMENTS: null,
    RECEIVE_RAW_COMMENT: null,

    CREATE_POST: null,
    RECEIVE_RAW_CREATED_POST: null,
    RECEIVE_RAW_POST: null,

    RECEIVE_RAW_CREATED_GROUP: null,
    RECEIVE_RAW_GROUPS: null

  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
}
