import { useContext } from "react";

import TagsContext from "../../store/tags-context";

import classes from "./TagItem.module.css";

function TagItems(props) {
  const tagsContext = useContext(TagsContext);

  function changeCategoryHandler() {
    tagsContext.changeTag(props.name.toLowerCase());
  }

  return (
    <li>
      <button
        className={classes.tagBtn}
        style={
          tagsContext.tag === props.name.toLowerCase()
            ? {
                backgroundColor: "var(--blue)",
                color: "white",
                cursor: "default",
              }
            : null
        }
        onClick={changeCategoryHandler}
      >
        {props.name}
      </button>
    </li>
  );
}

export default TagItems;
