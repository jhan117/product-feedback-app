import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

function CommentList(props) {
  return (
    <ul className={classes.commentsCon}>
      {props.comments.map((comment, idx) => (
        <CommentItem
          idx={idx}
          key={comment.id}
          id={comment.id}
          suggestionId={props.suggestionId}
          content={comment.content}
          user={comment.user}
          replies={comment.replies}
        />
      ))}
    </ul>
  );
}

export default CommentList;
