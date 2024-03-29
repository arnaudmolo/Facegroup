import keyMirror from 'keymirror';

export default Object.freeze({
  ActionTypes: keyMirror({
    CREATE_COMMENT: null,
    RECEIVE_RAW_CREATED_COMMENTS: null,
    RECEIVE_RAW_COMMENTS: null,
    DELETE_COMMENT: null,

    CREATE_POST: null,
    RECEIVE_RAW_CREATED_POST: null,
    RECEIVE_RAW_POSTS: null,

    RECEIVE_RAW_CREATED_GROUP: null,
    RECEIVE_RAW_GROUPS: null,

    CHANGE_GROUP: null

  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
});
