import { useSearchParams } from "react-router-dom";

import classes from "./CategoryItem.module.css";

interface Props {
  name: string;
}

const CategoryItem = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("category");

  const { name } = props;

  const changeCategoryHandler = () => {
    searchParams.set("category", name.toLowerCase());
    setSearchParams(searchParams);
  };

  console.log(name);

  const className = `${classes.tagBtn} ${
    filter === name.toLowerCase() && classes.onTagBtn
  }`;

  return (
    <li>
      <button className={className} onClick={changeCategoryHandler}>
        {name}
      </button>
    </li>
  );
};

export default CategoryItem;
