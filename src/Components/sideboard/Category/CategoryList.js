import { useContext } from "react";

import classes from "./CategoryList.module.css";
import TagsContext from "../../../store/tags-context";

import Card from "../../ui/Card";
import CategoryItem from "./CategoryItem";

function CategoryList() {
  const tagsCtx = useContext(TagsContext);

  return (
    <Card style={{ padding: "3rem 2.1rem" }}>
      <ul className={classes.tagList}>
        {tagsCtx.tagList.map((tag) => (
          <CategoryItem key={tag.id} name={tag.name}></CategoryItem>
        ))}
      </ul>
    </Card>
  );
}

export default CategoryList;
