import AppDispatcher from './../dispatcher/app-dispatcher';
import PostConstant from './../constant/post-constant';

export default class PostActions {

  create(text) {
    AppDispatcher.dispatch({
      actionType: PostConstant.POST_CREATE,
      text
    });
  }

  updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: PostConstant.POST_UPDATE_TEXT,
      text
    });
  }

}.prototype
