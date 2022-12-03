import { ReactComponent as ImageEmpty } from "../assets/suggestions/illustration-empty.svg";
import { useState, useContext } from "react";

import classes from "./SuggestionsPage.module.css";

import FeedbackButton from "../Components/ui/FeedbackButton";
import MainBar from "../Components/layout/MainBar";
import SideBar from "../Components/layout/SideBar";
import SideBoard from "../Components/layout/SideBoard";
import SuggestionList from "../Components/suggestions/SuggestionList";
import SuggestionsContainer from "../Components/ui/SuggestionsContainer";
import Card from "../Components/ui/Card";

import SuggestionsContext from "../store/suggestions-context";
import TagsContext from "../store/tags-context";
import SortContext from "../store/sort-context";

function SuggestionsPage() {
  const suggestionsCtx = useContext(SuggestionsContext);
  const tagsCtx = useContext(TagsContext);
  const sortCtx = useContext(SortContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const emptyStyle = {
    padding: "7.6rem 2.45rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  // sort id 나열?
  const curIds = suggestionsCtx.getSuggestionIds(
    suggestionsCtx.getSuggestions(tagsCtx.tag)
  );

  let sortedIds = [];

  // 0: Most Upvotes, 1: Least Upvotes, 2: Most Comments, 3: Least Comments
  switch (sortCtx.sortBy) {
    case 0:
      sortedIds = suggestionsCtx.totalUpvotes
        .filter((upvote) => curIds.includes(upvote.id))
        .sort((a, b) => b.UpvotesCount - a.UpvotesCount);
      break;
    case 1:
      sortedIds = suggestionsCtx.totalUpvotes
        .filter((upvote) => curIds.includes(upvote.id))
        .sort((a, b) => a.UpvotesCount - b.UpvotesCount);
      break;
    case 2:
      sortedIds = suggestionsCtx.totalComments
        .filter((comment) => curIds.includes(comment.id))
        .sort((a, b) => b.AllCommentsCount - a.AllCommentsCount);
      break;
    case 3:
      sortedIds = suggestionsCtx.totalComments
        .filter((comment) => curIds.includes(comment.id))
        .sort((a, b) => a.AllCommentsCount - b.AllCommentsCount);
      break;
    default:
      break;
  }

  const currSuggestions = sortedIds.map((count_obj) =>
    suggestionsCtx.suggestions.find(
      (suggestion) => suggestion.id === count_obj.id
    )
  );

  let content;

  if (currSuggestions.length === 0) {
    content = (
      <SuggestionsContainer>
        <Card style={emptyStyle}>
          <ImageEmpty className={classes.iconEmpty} />
          <div className={classes.emptyText}>
            <h1>There is no feedback yet.</h1>
            <p>
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
          </div>
          <FeedbackButton />
        </Card>
      </SuggestionsContainer>
    );
  } else {
    content = (
      <SuggestionsContainer>
        <SuggestionList requests={currSuggestions} />
      </SuggestionsContainer>
    );
  }

  return (
    <div id={classes["main"]} className={isSidebarOpen ? "" : classes.visible}>
      <SideBar setIsSidebarOpen={setIsSidebarOpen} />
      <SideBoard
        style={isSidebarOpen ? { display: "flex" } : { display: "none" }}
      />
      <MainBar />
      {content}
    </div>
  );
}

export default SuggestionsPage;
