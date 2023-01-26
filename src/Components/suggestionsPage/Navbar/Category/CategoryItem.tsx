import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import classes from "./CategoryItem.module.css";

import { selectActions } from "../../../../store/select-slice";

interface Props {
  name: string;
}

const CategoryItem = (props: Props) => {
  const filter = useAppSelector((state) => state.select.filter);
  const dispatch = useAppDispatch();

  const className = `${classes.tagBtn} ${
    filter === props.name && classes.onTagBtn
  }`;

  const changeCategoryHandler = () => {
    dispatch(selectActions.changeFilter(props.name));
  };

  return (
    <li>
      <button className={className} onClick={changeCategoryHandler}>
        {props.name}
      </button>
    </li>
  );
};

export default CategoryItem;
