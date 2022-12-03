import classes from "./CommentHeader.module.css";
import ReplyBtn from "./ReplyBtn";

function CommentHeader(props) {
  return (
    <div className={classes.commentHCon}>
      <div className={classes.userCon}>
        <img
          className={classes.userIcon}
          src={process.env.PUBLIC_URL + props.user.image.slice(1)}
          alt={props.user.name}
        />
        <div className={classes.userTxt}>
          <h4>{props.user.name}</h4>
          <p>@{props.user.username}</p>
        </div>
      </div>
      <ReplyBtn
        isReplyOpen={props.isReplyOpen}
        setIsReplyOpen={props.setIsReplyOpen}
        setReplyingToUser={props.setReplyingToUser}
        user={props.user}
      />
    </div>
  );
}

export default CommentHeader;
