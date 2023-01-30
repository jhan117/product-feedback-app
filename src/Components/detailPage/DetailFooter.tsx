import classes from "./DetailFooter.module.css";

const DetailFooter = () => {
  function addCommentHandler(commentData) {
    suggestionsCtx.addComment(
      loadedDetailData.id,
      loadedCommentsData?.length || 0,
      {
        id: suggestionsCtx.curCommentId,
        content: commentData,
        user: suggestionsCtx.user,
      }
    );
  }

  return (
    <footer>
      <NewCommentForm
        setIsCommentSubmit={setIsCommentSubmit}
        onAddComment={addCommentHandler}
      />
    </footer>
  );
};

export default DetailFooter;
