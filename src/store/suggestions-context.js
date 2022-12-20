import { createContext, useState, useEffect } from "react";

import request from "../utils/request";

const SuggestionsContext = createContext({
  user: {},
  curSuggestionId: 0,
  curCommentId: 0,
  userUpvoteId: [], // user가 upvote한 suggestion id 배열

  // add, edit, remove suggestion
  addSuggestion: (suggestion) => {},
  editSuggestion: (suggestionId, editedData) => {},
  removeSuggestion: (suggestionId) => {},
  // add comment, reply
  addComment: (suggestionId, comment) => {},
  addReply: (suggestionId, commentId, reply) => {},
  // upvote handler
  addUpvote: (suggestionId) => {}, // suggestion 변경 및 upvotes에 id 넣기
  removeUpvote: (suggestionId) => {},
  idIsUpvote: (suggestionId) => {}, // id가 upvotes에 있는지 확인
});

export function SuggestionsContextProvider(props) {
  const [userData, setUserData] = useState({});
  const [curSuggestionId, setCurSuggestionId] = useState(0);
  const [curCommentId, setCurCommentId] = useState(0);
  const [userUpvotes, setUserUpvotes] = useState([]);

  useEffect(() => {
    request
      .get(
        "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests.json"
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter(Boolean);
        setCurSuggestionId(filteredData.length + 1);
        const sum = filteredData.reduce(
          (acc, cur) => acc + (cur.comments?.length || 0),
          0
        );
        setCurCommentId(sum + 1);
      })
      .catch((err) => console.log(err));

    request
      .get(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/currentUser.json`
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function addSuggestionHandler(suggestion) {
    // id, title, category, upvotes, status, description
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          curSuggestionId - 1
        }.json`,
        suggestion
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));

    setCurSuggestionId(curSuggestionId + 1);
  }
  function editSuggestionHandler(suggestionId, editedData) {
    // id, title, category, upvotes, status, description
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }.json`,
        editedData
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
  function removeSuggestionHandler(suggestionId) {
    request
      .delete(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }.json`
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.error(err));
  }

  function addCommentHandler(suggestionId, commentCnt, comment) {
    // content, id, user
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }/comments/${commentCnt}.json`,
        comment
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));

    setCurCommentId(curCommentId + 1);
  }
  function addReplyHandler(suggestionId, commentCnt, replyCnt, reply) {
    // content, replyingTo, user
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }/comments/${commentCnt}/replies/${replyCnt}.json`,
        reply
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));
  }

  function addUpvoteHandler(suggestionId, prevUpvotes) {
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }.json`,
        {
          upvotes: prevUpvotes + 1,
        }
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));

    // upvotes id 삽입
    setUserUpvotes((prevUserUpvotes) => {
      return prevUserUpvotes.concat(suggestionId);
    });
  }
  function removeUpvoteHandler(suggestionId, prevUpvotes) {
    request
      .patch(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          suggestionId - 1
        }.json`,
        {
          upvotes: prevUpvotes - 1,
        }
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => console.log(err));

    // upvotes id 제거
    setUserUpvotes((prevUserUpvotes) => {
      return prevUserUpvotes.filter((upvote) => upvote !== suggestionId);
    });
  }
  function idIsUpvoteHandler(suggestionId) {
    return userUpvotes.some((id) => id === suggestionId);
  }

  const context = {
    user: userData,
    curSuggestionId: curSuggestionId,
    curCommentId: curCommentId,
    userUpvoteId: userUpvotes,
    addUpvote: addUpvoteHandler,
    removeUpvote: removeUpvoteHandler,
    idIsUpvote: idIsUpvoteHandler,
    addSuggestion: addSuggestionHandler,
    addComment: addCommentHandler,
    addReply: addReplyHandler,
    editSuggestion: editSuggestionHandler,
    removeSuggestion: removeSuggestionHandler,
  };

  return (
    <SuggestionsContext.Provider value={context}>
      {props.children}
    </SuggestionsContext.Provider>
  );
}

export default SuggestionsContext;
