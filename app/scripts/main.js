import React from 'react/addons';
import FB from 'fb';

import { app_id } from './constant';
import router from './router';
import Login from './components/login';
import GroupList from './components/group-list';
import Group from './components/group';

var init;

FB.init({
  appId      : app_id,
  xfbml      : true,
  version    : 'v2.2'
});

// FB.logout();

// FB.getLoginStatus(function(res){

//   console.log(res);

//   try {
//     FB.logout(function(){
//       console.log('loggedout');
//     });
//   } catch(e) {
//     console.log(e);
//   }

//   if (res.status !== 'connected') {
//     React.render(
//       <Login />,
//       document.getElementsByClassName('content')[0]
//     );
//     // FB.login(function(res){
//     //   console.log(res);
//     // });
//   }else{
//     init(res.authResponse);
//   };
// });

FB.login(function(res){

  var authRes;

  authRes = res.authResponse;

  init(authRes)

}, {
  scope: 'user_groups'
});

function init(authRes) {

  router
    .route('index', '/', function(req) {

      FB.api('/me?fields=groups', (res) => {
        this.render(GroupList, {groups: res.groups});
      });

    })
    .route('group', '/group/:id', function(req){

      console.log('?????????????');

      FB.api('/' + req.params.id + '/feed', (res) => {
        this.render(Group, {posts: res});
      });

    })
    .attach(document.getElementsByClassName('content')[0])
    .captureClicks();
}
