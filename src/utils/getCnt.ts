export const getAllComments = (comments: Comments) => {
  if (!comments) {
    return 0;
  }
  const commentValues = Object.values(comments);
  const repliesCount = commentValues.reduce((acc, cur) => {
    if (!cur.replies) {
      return acc;
    }
    return acc + Object.values(cur.replies).length;
  }, 0);
  return commentValues.length + repliesCount;
};

