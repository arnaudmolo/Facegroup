require("6to5/polyfill");

import React from 'react/addons';
import FB from 'fb';
import { app_id } from './constants/constant';
import router from './router';
import Content from './components/content.jsx';
import GroupWebAPIUtils from './utils/group_web_api_utils';
import GroupsActions from './actions/group-actions';

window.React = React;

function init() {
  React.render(
    Content(),
    document.getElementsByClassName('content')[0]
  );

  GroupWebAPIUtils
    .getAllGroups();

  var renderer = (function() {
    console.log(this);
  }).bind(router);

  console.log(renderer());

  router
    .route('group', '/group/:id', function(req){

      console.log(this);

      GroupsActions
        .changeCurrentGroup(req.params.id);

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
