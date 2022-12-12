function getTotalComments(data) {
  return data.map((d) => {
    let repliesCount = 0;

    const commentsCount = d.comments?.length || 0;
    d.comments?.forEach(
      (comment) => (repliesCount += comment.replies?.length || 0)
    );

    return {
      id: d.id,
      AllCommentsCount: commentsCount + repliesCount,
    };
  });
}

export default getTotalComments;
