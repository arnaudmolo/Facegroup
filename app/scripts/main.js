require("6to5/polyfill");

import React from 'react/addons';
import FB from 'fb';
import { app_id } from './constants/constant';
import router from './router';
import Content from './components/content.jsx';
import GroupWebAPIUtils from './utils/group_web_api_utils';

window.React = React;

function init() {
  React.render(
    Content(),
    document.getElementsByClassName('content')[0]
  );

  GroupWebAPIUtils
    .getAllGroups();

  router
    .route('group', '/group/:id', function(req){
      GroupWebAPIUtils
        .getGroupPosts(req.params.id);
    })
    .attach(document.getElementsByClassName('content')[0])
    .captureClicks();
}

function login(){
  FB.login(function(res){
    init(res.authResponse);
  }, {
    scope: ['user_groups', 'publish_actions', 'manage_notifications']
  });
}

FB.init({
  appId      : app_id,
  xfbml      : true,
  version    : 'v2.2'
});

FB.getLoginStatus(function(res){
  if (res.status === "connected") {
    init(res.authResponse);
  } else {
    login();
  }
});

import { EventEmitter } from 'events';

console.log(Object.assign(EventEmitter.prototype, {
  ok() {

  }
}));

console.log(Object.assign({}, EventEmitter.prototype, {
  ok() {

  }
}));

console.log(Object.assign({
  ok() {

  }
}, EventEmitter.prototype));
