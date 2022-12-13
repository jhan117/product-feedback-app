import { getTotalComments } from "./getCommentsCnt";

// category별 suggestion 설정
// sort별 suggestion 설정
// 0: Most Upvotes, 1: Least Upvotes, 2: Most Comments, 3: Least Comments
function sortSuggestions(sortNum, data) {
  let totalComments = [];

  if (sortNum === 2 || sortNum === 3) {
    totalComments = getTotalComments(data);
  }

  switch (sortNum) {
    case 0:
      return data.sort((a, b) => b.upvotes - a.upvotes);
    case 1:
      return data.sort((a, b) => a.upvotes - b.upvotes);
    case 2:
      return totalComments
        .sort((a, b) => b.AllCommentsCount - a.AllCommentsCount)
        .map((sortD) => data.find((d) => d.id === sortD.id));
    case 3:
      return totalComments
        .sort((a, b) => a.AllCommentsCount - b.AllCommentsCount)
        .map((sortD) => data.find((d) => d.id === sortD.id));
    default:
      break;
  }
}

export default sortSuggestions;
