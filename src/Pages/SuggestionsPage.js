import { ReactComponent as ImageEmpty } from "../assets/suggestions/illustration-empty.svg";
import { useState, useContext, useEffect, Fragment } from "react";

import classes from "./SuggestionsPage.module.css";
import SuggestionsContext from "../store/suggestions-context";
import TagsContext from "../store/tags-context";
import SortContext from "../store/sort-context";
import MediaContext from "../store/media-context";

import FeedbackButton from "../Components/ui/FeedbackButton";
import MainBar from "../Components/layout/MainBar";
import Board from "../Components/sideboard/Board";
import SideBar from "../Components/sideboard/SideBar";
import CategoryList from "../Components/sideboard/Category/CategoryList";
import RoadmapContainer from "../Components/sideboard/Roadmap/RoadmapContainer";
import SuggestionList from "../Components/suggestions/SuggestionList";
import SuggestionsContainer from "../Components/ui/SuggestionsContainer";
import Card from "../Components/ui/Card";
import request from "../utils/request";

function SuggestionsPage() {
  const suggestionsCtx = useContext(SuggestionsContext);
  const tagsCtx = useContext(TagsContext);
  const sortCtx = useContext(SortContext);
  const mediaCtx = useContext(MediaContext);

  const [loadedData, setLoadedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    request
      .get(
        "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests.json"
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setLoadedData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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

  let currSuggestions = [];

  if (!isLoading) {
    currSuggestions = sortedIds.map((count_obj) =>
      loadedData.find((suggestion) => suggestion.id === count_obj.id)
    );
  }

  // header 컴포넌트 설정
  const MHeader = (
    <header>
      <Board />
      <SideBar />
    </header>
  );
  const TDHeader = (
    <header className={classes.TDHeader}>
      <Board />
      <CategoryList />
      <RoadmapContainer />
    </header>
  );

  let content;

  if (isLoading) {
    content = "loading...";
  } else if (currSuggestions.length === 0) {
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
    <Fragment>
      {mediaCtx.isTablet | mediaCtx.isDesktop ? TDHeader : MHeader}
      <main>
        <MainBar />
        {content}
      </main>
    </Fragment>
  );
}

export default SuggestionsPage;
