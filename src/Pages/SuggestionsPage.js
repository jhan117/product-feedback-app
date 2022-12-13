import { useState, useContext, useEffect, Fragment } from "react";

import classes from "./SuggestionsPage.module.css";
import TagsContext from "../store/tags-context";
import SortContext from "../store/sort-context";

import useMediaQuery from "../utils/useMediaQuery";
import request from "../utils/request";
import sortSuggestions from "../utils/sortSuggestions";

import MainBar from "../Components/suggestions/MainBar";
import Board from "../Components/sideboard/Board";
import SideBar from "../Components/sideboard/SideBar";
import CategoryList from "../Components/sideboard/Category/CategoryList";
import RoadmapContainer from "../Components/sideboard/Roadmap/RoadmapContainer";
import EmptyContent from "../Components/suggestions/EmptyContent";
import SuggestionList from "../Components/suggestions/SuggestionList";

function SuggestionsPage() {
  const tagsCtx = useContext(TagsContext);
  const sortCtx = useContext(SortContext);
  const isTablet = useMediaQuery("tablet");
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);

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
        if (tagsCtx.tag !== "all") {
          let filteredData = data.filter((d) => d.category === tagsCtx.tag);
          setLoadedData(filteredData);
        } else {
          setLoadedData(data);
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }, [tagsCtx.tag, loadedData]);

  // header 컴포넌트 설정
  const TDHeader = (
    <Fragment>
      <CategoryList />
      <RoadmapContainer />
    </Fragment>
  );

  let content;

  if (isLoading) {
    content = "loading...";
  } else {
    if (loadedData.length === 0) {
      content = <EmptyContent />;
    } else {
      const sortedData = sortSuggestions(sortCtx.sortBy, loadedData);
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
