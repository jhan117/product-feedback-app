import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

function CommentList(props) {
  return (
    <ul className={classes.commentsCon}>
      {props.comments.map((comment, idx) => (
        <CommentItem
          key={comment.id}
          idx={idx}
          id={comment.id}
          suggestionId={props.suggestionId}
          content={comment.content}
          user={comment.user}
          replies={comment.replies}
          setIsReplySubmit={props.setIsReplySubmit}
        />
      ))}
    </ul>
  );
}

export default CommentList;
