import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./DetailFeedbackPage.module.css";
import SuggestionsContext from "../store/suggestions-context";

import request from "../utils/request";
import useRootClass from "../utils/useRootClass";
import { getCommentsNum } from "../utils/getCommentsCnt";

import NewCommentForm from "../Components/comments/NewCommentForm";
import SuggestionItem from "../Components/suggestions/SuggestionItem";
import GoBack from "../Components/ui/GoBack";
import EditBtn from "../Components/ui/buttons/EditBtn";
import CommentsContainer from "../Components/comments/CommentsContainer";

function DetailFeedbackPage(props) {
  useRootClass("detail");
  const suggestionsCtx = useContext(SuggestionsContext);
  const { requestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedDetailData, setLoadedDetailData] = useState([]);
  const [loadedCommentsData, setLoadedCommentsData] = useState([]);
  const [isCommentSubmit, setIsCommentSubmit] = useState(false);
  const [isReplySubmit, setIsReplySubmit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setInterval(() => {
      request
        .get(
          `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
            requestId - 1
          }.json`
        )
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          if (data !== loadedDetailData) {
            setLoadedDetailData(data);
            setIsLoading(false);
            clearInterval(timeoutId);
          }
        })
        .catch((err) => console.log(err));
    }, 500);

    window.scrollTo(0, 0);
  }, [props.isSubmit, suggestionsCtx.userUpvoteId]);

  useEffect(() => {
    const timeoutCommentId = setInterval(() => {
      request
        .get(
          `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
            requestId - 1
          }/comments.json`
        )
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          if (data !== loadedCommentsData) {
            setLoadedCommentsData(data);
            setIsCommentSubmit(false);
            setIsReplySubmit(false);
            clearInterval(timeoutCommentId);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [isCommentSubmit, isReplySubmit]);

  let commentsCount = 0;
  let mainContent = "";

  commentsCount = getCommentsNum(loadedCommentsData);

  if (isLoading) {
    mainContent = "loading...";
  } else {
    mainContent = (
      <Fragment>
        <SuggestionItem
          id={loadedDetailData.id}
          title={loadedDetailData.title}
          description={loadedDetailData.description}
          category={loadedDetailData.category}
          upvotes={loadedDetailData.upvotes}
          commentsCnt={commentsCount}
          detail={true}
        />
        <CommentsContainer
          id={loadedDetailData.id}
          comments={loadedCommentsData}
          commentsCnt={commentsCount}
          setIsReplySubmit={setIsReplySubmit}
        />
      </Fragment>
    );
  }

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
    <Fragment>
      <header className={classes.detailHeader}>
        <GoBack />
        <EditBtn id={loadedDetailData.id} />
      </header>
      <main className={classes.detailMain}>{mainContent}</main>
      <footer>
        <NewCommentForm
          setIsCommentSubmit={setIsCommentSubmit}
          onAddComment={addCommentHandler}
        />
      </footer>
    </Fragment>
  );
}

export default DetailFeedbackPage;
