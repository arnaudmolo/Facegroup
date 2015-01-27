export {
  convertRawComment(rawComment, postId) {
    return {
      id: rawComment.id,
      postId: rawComment.postId,
      authorName: rawComment.authorName,
      date: new Date(rawComment.timestamp),
      txt: rawComment.message
    }
  }
}
