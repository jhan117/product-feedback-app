import { getTotalComments } from "./getCommentsCnt";

// category별 suggestion 설정
// sort별 suggestion 설정
// 0: Most Upvotes, 1: Least Upvotes, 2: Most Comments, 3: Least Comments
function getSug(tag, sort, data) {
  let tagData = [];
  if (tag !== "all") {
    tagData = data.filter((d) => d.category === tag);
  } else {
    tagData = data;
  }

  let totalComments = [];

  if (sort === 2 || sort === 3) {
    totalComments = getTotalComments(tagData);
  }

  switch (sort) {
    case 0:
      return tagData.sort((a, b) => b.upvotes - a.upvotes);
    case 1:
      return tagData.sort((a, b) => a.upvotes - b.upvotes);
    case 2:
      return totalComments
        .sort((a, b) => b.AllCommentsCount - a.AllCommentsCount)
        .map((sortD) => tagData.find((d) => d.id === sortD.id));
    case 3:
      return totalComments
        .sort((a, b) => a.AllCommentsCount - b.AllCommentsCount)
        .map((sortD) => tagData.find((d) => d.id === sortD.id));
    default:
      break;
  }
}

export default getSug;
