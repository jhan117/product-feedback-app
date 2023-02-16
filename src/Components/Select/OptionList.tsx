import { Dispatch, CSSProperties, SetStateAction } from "react";

import OptionItem from "./OptionItem";
import classes from "./OptionList.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";
import { sortList, statusList, optionTagList } from "../../utils/nameList";

interface Props {
  state: string;
  dataState?: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
  onClickOption: () => void;
  position: Pos;
}

const OptionList = (props: Props) => {
  const isSort = props.state === "sort";
  const isTablet = useMediaQuery("tablet");

  const ulPos: CSSProperties = {
    top: ((props.position.top + (isTablet ? 16 : 8)) / 10).toFixed(2) + "rem",
    left: (props.position.left / 10).toFixed(2) + "rem",
  };
  const ulStyle = `${classes.optionList} ${
    isSort ? classes.sortUl : classes.formUl
  }`;

  let options: Item[];
  if (isSort) options = sortList;
  else if (props.state === "status") options = statusList;
  else options = optionTagList;

  return (
    <ul className={ulStyle} style={ulPos}>
      {options.map((option, idx) => (
        <OptionItem
          key={option.id}
          name={option.name}
          state={props.state}
          dataState={props.dataState}
          onClickOption={props.onClickOption}
          className={idx === 0 ? "" : classes.firstLi}
        />
      ))}
    </ul>
  );
};

export default OptionList;
