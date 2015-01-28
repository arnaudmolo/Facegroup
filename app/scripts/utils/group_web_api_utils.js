import GroupServerActionCreator from './../actions/group-server-action-creator';
import FB from 'fb';

export default {

  getGroupPosts(groupId) {
    FB.api('/' + groupId + '/feed', (res) => {
      GroupServerActionCreator
        .receiveAllPosts(res);
    });
  },

  createPost(post) {
    FB.api(
        '/' + post.groupId + '/feed',
        'POST',
        {message: post.message},
        function(response) {
          console.log(response);
          if (!response.error) {
            GroupServerActionCreator
              .receiveCreatedPost(Object.assign(post, response));
          }
        }
    );
  },

  getAllGroups() {
    FB.api('/me?fields=groups', (res) => {
      GroupServerActionCreator
        .receiveAllGroups(res);
    });
  }

};
