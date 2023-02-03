import { useState } from "react";

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

  const [commentHeight, setCommentHeight] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const replyingToUserState = useState("");
  const [replyingToUser, setReplyingToUser] = replyingToUserState;

  const formCloseHandler = () => {
    setIsFormOpen(false);
    setReplyingToUser("");
  };

  return (
    <li className={`${classes.commentCon} ${props.className}`}>
      <Comment
        user={user}
        replyingToUserState={replyingToUserState}
        setCommentHeight={setCommentHeight}
        setIsFormOpen={setIsFormOpen}
      >
        {content}
      </Comment>
      {replies && (
        <RepliesList
          replies={Object.values(replies)}
          commentHeight={commentHeight}
          replyingToUserState={replyingToUserState}
          setIsFormOpen={setIsFormOpen}
        />
      )}
      {isFormOpen && (
        <NewReplyForm
          className={replies ? classes.hasReplies : ""}
          replyingToUser={replyingToUser}
          commentId={id}
          onSubmit={formCloseHandler}
        />
      )}
    </li>
  );
};

export default CommentItem;
