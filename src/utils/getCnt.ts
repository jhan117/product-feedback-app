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

export const getLastId = (data: Suggestion[]) => {
  const sugIds: number[] = [],
    commentIds: number[] = [],
    replyIds: number[] = [];

  for (const d of data) {
    sugIds.push(d.id);
    if (d.comments) {
      for (const c of Object.values(d.comments)) {
        commentIds.push(c.id);
        if (c.replies) {
          replyIds.push(...Object.values(c.replies).map((v) => v.id));
        }
      }
    }
  }
  return {
    sug: Math.max(...sugIds),
    comment: Math.max(...commentIds),
    reply: Math.max(...replyIds),
  };
};
