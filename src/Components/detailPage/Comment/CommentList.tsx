import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

interface Props {
  id: string;
  comments: CommentItem[];
}

const CommentList = (props: Props) => {
  return (
    <ul className={classes.commentsCon}>
      {props.comments.map((comment, idx) => (
        <CommentItem
          key={comment.id}
          sugId={props.id}
          comment={comment}
          className={idx === 0 ? "" : classes.commentBorder}
        />
      ))}
    </ul>
  );
};

export default CommentList;
