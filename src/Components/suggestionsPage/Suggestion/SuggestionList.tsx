import { Link } from "react-router-dom";

import SuggestionItem from "./SuggestionItem";
import classes from "./SuggestionList.module.css";

interface Props {
  isRoadmap?: boolean;
  items: Suggestion[];
}

const SuggestionList = (props: Props) => {
  const ulClass = `${classes.commonUl} ${props.isRoadmap ? "" : classes.sugUl}`;

  return (
    <ul className={ulClass}>
      {props.items.map((item) => (
        <Link key={item.id} to={`/detail/${item.id}`}>
          <SuggestionItem
            key={item.id}
            isRoadmap={props.isRoadmap || false}
            item={item}
          />
        </Link>
      ))}
    </ul>
  );
};

export default SuggestionList;
