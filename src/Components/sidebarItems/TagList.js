import classes from "./TagList.module.css";
import TagItem from "./TagItem";

function TagList(props) {
  return (
    <ul className={classes.tagList}>
      {props.tags.map((tag) => (
        <TagItem key={tag.id} name={tag.name}></TagItem>
      ))}
    </ul>
  );
}

export default TagList;
