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
    scope: ['user_groups', 'publish_actions', 'manage_notifications']
  });
}

function init(authRes) {

  var store;

  store = JSON.parse(localStorage.getItem('store'));

  Object.observe(store, function(changes) {
    localStorage.setItem('store', JSON.stringify(store));
  });

  function getGroups(cb) {

    if (store.groups.data.length) {
      return cb(store.groups);
    };

    FB.api('/me?fields=groups', (res) => {
      cb(res.groups);
    });

  }

  router
    .route('index', '/', function(req) {

      this.render(Content, store);

      getGroups((groups) => {
        this.render(Content, {groups: groups});
      });

    })
    .route('group', '/group/:id', function(req){

      this.render(Content, store);

      FB.api('/' + req.params.id + '/feed', (res) => {
        store.posts = res;
        this.render(Content, store);
      });

      FB.api(`/${req.params.id}`, (res) => {
        store.groupInfo = res;
        console.log(res);
        this.render(Content, store);
      });

      getGroups((groups) => {
        store.groups = groups;
        this.render(Content, store);
      });

    })
    .attach(document.getElementsByClassName('content')[0])
    .captureClicks();
}
