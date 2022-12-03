import { ReactComponent as IconCheck } from "../../../assets/shared/icon-check.svg";
import { useContext } from "react";

import classes from "./OptionItem.module.css";
import SortContext from "../../../store/sort-context";

function OptionItem(props) {
  const sortCtx = useContext(SortContext);

  const selectProps = {
    sort: {
      func: () => {
        sortCtx.changeSort(props.idx);
      },
    },
    category: {
      func: () => {
        props.setSelected[props.state](props.name);
      },
    },
    status: {
      func: () => {
        props.setSelected[props.state](props.name);
      },
    },
  };

  return (
    <li
      className={classes.optionItem}
      onClick={selectProps[props.state].func}
      style={props.liStyle}
    >
      <p className={classes.optionText}>{props.name}</p>
      {(
        props.state === "sort"
          ? sortCtx.sortBy === props.idx
          : props.selected[props.state] === props.name
      ) ? (
        <IconCheck />
      ) : null}
    </li>
  );
}

export default OptionItem;
