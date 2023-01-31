import images from "../../../assets/user-images";

import classes from "./CommentHeader.module.css";

interface Props {
  user: User;
  onClickBtn: () => void;
}

const CommentHeader = (props: Props) => {
  const { image, name, username } = props.user;
  const userImageName = image.slice(27, -4);

  return (
    <div className={classes.commentHCon}>
      <div className={classes.userCon}>
        <img
          className={classes.userIcon}
          src={images[userImageName]}
          alt={name}
        />
        <div className={classes.userTxt}>
          <h4>{name}</h4>
          <p>@{username}</p>
        </div>
      </div>
      <button className={classes.replyBtn} onClick={props.onClickBtn}>
        Reply
      </button>
    </div>
  );
};

export default CommentHeader;
