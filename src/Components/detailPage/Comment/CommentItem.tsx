import { useRef, useState } from "react";

import Comment from "../../ui/Comment/Comment";
import RepliesList from "../Reply/RepliesList";
import NewReplyForm from "../Reply/NewReplyForm";
import classes from "./CommentItem.module.css";

interface Props {
  sugId: string;
  comment: Comment;
  className: string;
}

const CommentItem = (props: Props) => {
  const { user, id, content, replies } = props.comment;

  const commentHeightRef = useRef(null);
  const [commentHeight, setCommentHeight] = useState(0);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyingToUser, setReplyingToUser] = useState("");

  // useEffect(() => {
  //   setCommentHeight(commentHeightRef.current.clientHeight);
  // }, [commentHeightRef]);

  // function addReplyHandler(ReplyData) {
  //   suggestionsCtx.addReply(
  //     props.suggestionId,
  //     props.idx,
  //     props.replies?.length || 0,
  //     {
  //       content: ReplyData,
  //       replyingTo: replyingToUser,
  //       user: suggestionsCtx.user,
  //     }
  //   );
  // }

  const showReplyFormHandler = () => {
    setReplyingToUser(user.username);
    setIsReplyOpen((state) => !state);
  };

  return (
    <li className={`${classes.commentCon} ${props.className}`}>
      <Comment user={user} onClickBtn={showReplyFormHandler}>
        {content}
      </Comment>
      {replies && (
        <RepliesList
          commentId={id}
          replies={replies}
          isReplyOpen={isReplyOpen}
          setIsReplyOpen={setIsReplyOpen}
          setReplyingToUser={setReplyingToUser}
          commentHeight={commentHeight}
          onClick={showReplyFormHandler}
        />
      )}
      {isReplyOpen && (
        <NewReplyForm
          className={replies ? classes.hasReplies : ""}
          replyingToUser={replyingToUser}
          onSubmit={showReplyFormHandler}
        />
      )}
    </li>
  );
};

export default CommentItem;
