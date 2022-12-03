import classes from "./ReplyBtn.module.css";

function ReplyBtn(props) {
  function toggleReplyBtnHandler(e) {
    console.log("reply open?", props.isReplyOpen);
    props.isReplyOpen ? closeReply() : openReply(e);
  }

  function openReply() {
    props.setIsReplyOpen(true);
    props.setReplyingToUser(props.user.username);
  }

  function closeReply() {
    props.setIsReplyOpen(false);
  }

  return (
    <button className={classes.replyBtn} onClick={toggleReplyBtnHandler}>
      Reply
    </button>
  );
}

export default ReplyBtn;
