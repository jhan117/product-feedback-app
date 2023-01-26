export const getAllComments = (comments: Comment[]) => {
  if (!comments) {
    return 0;
  }
  const commentsCount = comments.length;
  const repliesCount = comments.reduce((acc, cur) => {
    if (!cur.replies) {
      return acc;
    }
    return acc + cur.replies.length;
  }, 0);

  return commentsCount + repliesCount;
};
