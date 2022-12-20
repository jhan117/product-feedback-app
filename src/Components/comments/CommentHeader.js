import classes from "./CommentHeader.module.css";
import images from "../../assets/user-images";

import ReplyBtn from "../ui/buttons/ReplyBtn";

function CommentHeader(props) {
  const userImageName = props.user.image.slice(27, -4);

  return (
    <div className={classes.commentHCon}>
      <div className={classes.userCon}>
        <img
          className={classes.userIcon}
          src={images[userImageName]}
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
