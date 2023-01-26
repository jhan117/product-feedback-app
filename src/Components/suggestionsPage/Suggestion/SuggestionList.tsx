import { Link } from "react-router-dom";

import SuggestionItem from "./SuggestionItem";
import classes from "./SuggestionList.module.css";

interface Props {
  isRoadmap?: boolean;
  // status?: string; // 임시 - 어떻게 쓰이니..?
  items: Suggestion[];
}

// roadmap의 경우는 다시 수정할 필요 있음
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
