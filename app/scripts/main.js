import FB from 'fb';

FB.init({
  appId      : '347053662133402',
  xfbml      : true,
  version    : 'v2.2'
});

FB.getLoginStatus(function(res){
  console.log(arguments);
});
