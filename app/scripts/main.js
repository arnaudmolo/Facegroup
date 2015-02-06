require("6to5/polyfill");

import React from 'react/addons';
import FB from 'fb';
import { app_id } from './constants/constant';
import router from './router';
import Content from './components/content.jsx';
import GroupWebAPIUtils from './utils/group-web-api-utils';
import GroupsActions from './actions/group-actions';
import io from 'socket.io-client';

window.React = React;

var io;

io = io('http://127.0.0.1:1337');

Content = React.createFactory(Content);

function init(auth) {

  io
    .emit('subscribe', auth.userID);

  io
    .on('data', function(res) {
      console.log('new comment', res);
    });

  GroupWebAPIUtils
    .getAllGroups();

  router
    .route('index', '/', function(req) {
      this.render(Content);
    })
    .route('group', '/group/:id', function(req){

      this.render(Content);

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
