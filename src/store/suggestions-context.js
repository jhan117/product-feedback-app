import { createContext, useState } from "react";

import request from "../utils/request";

import DummyData from "../data.json";

const SuggestionsContext = createContext({
  suggestions: [],
  totalSuggestions: 0,
  curSuggestionId: 0,
  totalComments: [],
  curCommentId: 0,
  userUpvoteId: [], // user가 upvote한 suggestion id 배열
  totalUpvotes: [], // 최종 upvote 개수들
  addSuggestion: (suggestion) => {},
  addComment: (suggestionId, comment) => {},
  addReply: (suggestionId, commentId, reply) => {},
  addUpvote: (suggestionId) => {}, // suggestion 변경 및 upvotes에 id 넣기
  removeUpvote: (suggestionId) => {},
  idIsUpvote: (suggestionId) => {}, // id가 upvotes에 있는지 확인
  getSuggestions: (category) => {},
  getSuggestionIds: (prevSuggestions) => {},
  editSuggestion: (suggestionId, editedData) => {},
  removeSuggestion: (suggestionId) => {},
});

export function SuggestionsContextProvider(props) {
  const [suggestions, setSuggestions] = useState(DummyData.productRequests);
  const [curSuggestionId, setCurSuggestionId] = useState(
    DummyData.productRequests.length + 1
  );
  const [curCommentId, setCurCommentId] = useState(
    DummyData.productRequests.reduce(
      (total, suggestion) => total + (suggestion.comments?.length || 0),
      0
    ) + 1
  );
  const [userUpvotes, setUserUpvotes] = useState([]);

  function getTotalComments() {
    return suggestions.map((suggestion) => {
      let repliesCount = 0;

      const commentsCount = suggestion.comments?.length || 0;
      suggestion.comments?.forEach(
        (comment) => (repliesCount += comment.replies?.length || 0)
      );

      return {
        id: suggestion.id,
        AllCommentsCount: commentsCount + repliesCount,
      };
    });
  }
  function getTotalUpvotes() {
    return suggestions.map((suggestion) => {
      return {
        id: suggestion.id,
        UpvotesCount: suggestion.upvotes,
      };
    });
  }

  function addSuggestionHandler(suggestion) {
    setSuggestions((prevSuggestions) => {
      return prevSuggestions.concat(suggestion);
    });
    setCurSuggestionId(curSuggestionId + 1);
  }
  function addCommentHandler(suggestionId, comment) {
    setSuggestions((prevSuggestions) => {
      return prevSuggestions.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          if (!suggestion.hasOwnProperty("comments")) {
            suggestion["comments"] = [];
          }
          suggestion.comments.push(comment);
        }
        return suggestion;
      });
    });
    setCurCommentId(curCommentId + 1);
  }
  function addReplyHandler(suggestionId, commentId, reply) {
    setSuggestions((prevSuggestions) => {
      return prevSuggestions.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          suggestion.comments.map((comment) => {
            if (comment.id === commentId) {
              if (!comment.hasOwnProperty("replies")) {
                comment["replies"] = [];
              }
              comment.replies.push(reply);
            }
          });
        }
        return suggestion;
      });
    });
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
  function getSuggestionsHandler(category) {
    if (category === "all") {
      return suggestions;
    } else {
      return suggestions.filter(
        (suggestion) => suggestion.category === category
      );
    }
  }
  function getSuggestionIdsHandler(prevSuggestions) {
    return prevSuggestions.map((suggestion) => suggestion.id);
  }
  function editSuggestionHandler(suggestionId, editedData) {
    setSuggestions((prevSuggestions) => {
      return prevSuggestions.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          suggestion.title = editedData.title;
          suggestion.category = editedData.category;
          suggestion.status = editedData.status;
          suggestion.description = editedData.description;
        }
        return suggestion;
      });
    });
  }
  function removeSuggestionHandler(suggestionId) {
    setSuggestions((prevSuggestions) => {
      return prevSuggestions.filter(
        (suggestion) => suggestion.id !== suggestionId
      );
    });
  }

  const context = {
    suggestions: suggestions,
    totalSuggestions: suggestions.length,
    curSuggestionId: curSuggestionId,
    totalComments: getTotalComments(),
    curCommentId: curCommentId,
    userUpvoteId: userUpvotes,
    totalUpvotes: getTotalUpvotes(),
    addUpvote: addUpvoteHandler,
    removeUpvote: removeUpvoteHandler,
    idIsUpvote: idIsUpvoteHandler,
    addSuggestion: addSuggestionHandler,
    addComment: addCommentHandler,
    addReply: addReplyHandler,
    getSuggestions: getSuggestionsHandler,
    getSuggestionIds: getSuggestionIdsHandler,
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
