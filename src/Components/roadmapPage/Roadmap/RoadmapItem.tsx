import SuggestionList from "../../suggestionsPage/Suggestion/SuggestionList";
import classes from "./RoadmapItem.module.css";

const RoadmapItem = (props: { statusItem: StatusItem }) => {
  const { id, name, items, length } = props.statusItem;

  let describe;

  if (id === "st2") describe = "Ideas prioritized for research";
  if (id === "st3") describe = "Features currently being developed";
  if (id === "st4") describe = "Released features";

  return (
    <li className={classes.roadmapLi}>
      <header className={classes.roadHeader}>
        <h2>
          {name} ({length})
        </h2>
        <p>{describe}</p>
      </header>
      <SuggestionList isRoadmap={true} items={items} />
    </li>
  );
};

export default RoadmapItem;
