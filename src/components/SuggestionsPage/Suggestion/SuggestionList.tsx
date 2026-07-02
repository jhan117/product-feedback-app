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
        <li key={item.id}>
          <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <SuggestionItem
              isRoadmap={props.isRoadmap || false}
              item={item}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
