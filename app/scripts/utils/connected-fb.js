import FB from 'fb';
import { app_id } from './../constants/constant';

FB.init({
  appId      : app_id,
  xfbml      : true,
  version    : 'v2.2'
});


FB.getLoginStatus(function(res){

  if (res.status === "connected") {
    console.log(res);
  } else {
    login()
  }

});

function login(){
  FB.login(function(res){
    init(res.authResponse);
  }, {
    scope: ['user_groups', 'publish_actions', 'manage_notifications']
  });
}

function getGroups(cb) {

  if (store.groups.data.length) {
    return cb(store.groups);
  };

  FB.api('/me?fields=groups', (res) => {
    cb(res.groups);
  });

}

export default FB;
