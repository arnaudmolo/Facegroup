import React from 'react/addons';
import FB from 'fb';

import { app_id } from './constant';
import router from './router';
import Login from './components/login';
import Content from './components/content';

var init;

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

function login(){
  FB.login(function(res){
    init(res.authResponse);
  }, {
    scope: 'user_groups'
  });
}

function init(authRes) {

  var groups;

  function getGroups(cb) {

    if (groups) {
      return cb(groups);
    };

    FB.api('/me?fields=groups', (res) => {
      groups = res.groups;
      cb(res.groups);
    });

  }

  router
    .route('index', '/', function(req) {

      this.render(Content, {groups: {data: []}});

      getGroups((groups) => {
        this.render(Content, {groups: groups});
      });

    })
    .route('group', '/group/:id', function(req){

      this.render(Content, {groups: {data: []}});

      getGroups((groups) => {
        FB.api('/' + req.params.id + '/feed', (res) => {
          this.render(Content, {posts: res, groups: groups});
        });
      });

    })
    .attach(document.getElementsByClassName('content')[0])
    .captureClicks();
}
