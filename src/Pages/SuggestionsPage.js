import { useState, useEffect, Fragment, useContext } from "react";

import classes from "./SuggestionsPage.module.css";
import SuggestionsContext from "../store/suggestions-context";
import TagsContext from "../store/tags-context";
import SortContext from "../store/sort-context";

import useMediaQuery from "../utils/useMediaQuery";
import request from "../utils/request";
import getSug from "../utils/getSug";
import useRootClass from "../utils/useRootClass";

import MainBar from "../Components/suggestions/MainBar";
import Board from "../Components/sideboard/Board";
import SideBar from "../Components/sideboard/SideBar";
import CategoryList from "../Components/sideboard/Category/CategoryList";
import SideRoadContainer from "../Components/sideboard/sideRoadmap/SideRoadContainer";
import EmptyContent from "../Components/suggestions/EmptyContent";
import SuggestionList from "../Components/suggestions/SuggestionList";

function SuggestionsPage() {
  useRootClass("sug");
  const suggestionsCtx = useContext(SuggestionsContext);
  const tagsCtx = useContext(TagsContext);
  const sortCtx = useContext(SortContext);
  const isTablet = useMediaQuery("tablet");
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setInterval(() => {
      request
        .get(
          "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests.json"
        )
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          if (data !== loadedData) {
            setLoadedData(data.filter(Boolean));
            setIsLoading(false);
            clearInterval(timeoutId);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [suggestionsCtx.userUpvoteId]);

  // header 컴포넌트 설정
  const TDHeader = (
    <Fragment>
      <CategoryList />
      <SideRoadContainer />
    </Fragment>
  );

  let content;
  if (isLoading) {
    content = "loading...";
  } else {
    const sortedData = getSug(tagsCtx.tag, sortCtx.sortBy, loadedData);
    if (sortedData.length === 0) {
      content = <EmptyContent />;
    } else {
      content = <SuggestionList requests={sortedData} />;
    }
  }

  return (
    <Fragment>
      <header className={classes.sugHeader}>
        <Board />
        {isTablet ? TDHeader : <SideBar />}
      </header>
      <main className={classes.sugMain}>
        <MainBar num={loadedData.length} />
        {content}
      </main>
    </Fragment>
  );
}

export default SuggestionsPage;
