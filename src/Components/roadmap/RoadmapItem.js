import classes from "./RoadmapItem.module.css";

import SuggestionList from "../suggestions/SuggestionList";

function RoadmapItem(props) {
  return (
    <li className={classes.roadmapLi}>
      <header className={classes.roadHeader}>
        <h2>
          {props.title} ({props.length})
        </h2>
        {props.desc}
      </header>
      <SuggestionList status={props.status} requests={props.requests} />
    </li>
  );
}

export default RoadmapItem;
