import { Dispatch, CSSProperties } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";

import OptionItem from "./OptionItem";
import classes from "./OptionList.module.css";

interface Props {
  state: string;
  selectedState: [string, Dispatch<string>];
  options: Item[];
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

  return (
    <ul className={ulStyle} style={ulPos}>
      {props.options.map((option, idx) => (
        <OptionItem
          key={option.id}
          id={option.id}
          state={props.state}
          selectedState={props.selectedState}
          currentList={props.options}
          onClickOption={props.onClickOption}
          className={idx === 0 ? "" : classes.firstLi}
        />
      ))}
    </ul>
  );
};

export default OptionList;
