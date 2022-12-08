import { useContext } from "react";

import classes from "./CategoryList.module.css";
import TagsContext from "../../../store/tags-context";
import MediaContext from "../../../store/media-context";

import Card from "../../ui/Card";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const tagsCtx = useContext(TagsContext);
  const mediaCtx = useContext(MediaContext);

  const cardStyle = mediaCtx.isDesktop
    ? { padding: "2.4rem", height: "16.6rem" }
    : { padding: "3rem 2.1rem" };

  return (
    <Card style={cardStyle}>
      <ul className={classes.tagList}>
        {tagsCtx.tagList.map((tag) => (
          <CategoryItem key={tag.id} name={tag.name}></CategoryItem>
        ))}
      </ul>
    </Card>
  );
}

export default CategoryList;
