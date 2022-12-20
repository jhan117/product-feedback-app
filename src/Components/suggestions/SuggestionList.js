import { Link } from "react-router-dom";

import classes from "./SuggestionList.module.css";

import { getCommentsNum } from "../../utils/getCommentsCnt";

import SuggestionItem from "./SuggestionItem";

function SuggestionList(props) {
  return (
    <ul
      className={`${classes.commonUl} ${
        props.status ? classes.statusUl : classes.sugUl
      }`}
    >
      {props.requests.map((request) => (
        <Link
          className={classes.suggestionItemLink}
          key={request.id}
          to={`/detail/${request.id}`}
        >
          <SuggestionItem
            key={request.id}
            id={request.id}
            status={props.status}
            title={request.title}
            description={request.description}
            category={request.category}
            upvotes={request.upvotes}
            commentsCnt={getCommentsNum(request.comments)}
          />
        </Link>
      ))}
    </ul>
  );
}

export default SuggestionList;
