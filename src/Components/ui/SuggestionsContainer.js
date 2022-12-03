import classes from "./SuggestionsContainer.module.css";

function SuggestionsContainer(props) {
  return <div className={classes.suggestionsCon}>{props.children}</div>;
}

export default SuggestionsContainer;
