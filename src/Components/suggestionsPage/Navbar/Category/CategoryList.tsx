import Card from "../../../ui/Card";
import CategoryItem from "./CategoryItem";
import classes from "./CategoryList.module.css";

import { tagList } from "../../../../utils/nameList";

const CategoryList = () => {
  return (
    <Card className={classes.container}>
      <ul className={classes.tagList}>
        {tagList.map((tag) => (
          <CategoryItem key={tag.id} name={tag.name} />
        ))}
      </ul>
    </Card>
  );
};

export default CategoryList;
