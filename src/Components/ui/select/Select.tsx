import { ReactComponent as IconArrowDown } from "../../../assets/shared/icon-arrow-down.svg";
import { Fragment, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";

import Option from "./Option";
import classes from "./Select.module.css";

import { listIdToName } from "../../../utils/changeName";
import { optionTagList, sortList, statusList } from "../../../utils/nameList";

interface Props {
  state: string;
  length: number;
}

const Select = (props: Props) => {
  const isSort = props.state === "sort";
  const initialState =
    props.state === "status" ? statusList[0].id : optionTagList[0].id;

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const selectedState = useState<string>(initialState);
  const sortId = useAppSelector((state) => state.select.sort);
  const conRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Pos>({ top: 0, left: 0 });

  const getPos = () => {
    const currentRef = conRef.current?.getBoundingClientRect();
    if (currentRef) {
      setPosition((prevState) => ({
        ...prevState,
        top: currentRef.top + currentRef.height,
        left: currentRef.left,
      }));
    }
  };

  useEffect(() => {
    getPos();
  }, [isOptionOpen]);

  useEffect(() => {
    window.addEventListener("resize", getPos);
    window.addEventListener("scroll", getPos);
    return () => {
      window.removeEventListener("resize", getPos);
      window.removeEventListener("scroll", getPos);
    };
  }, []);

  const optionClickHandler = () => {
    if (isOptionOpen) {
      setIsOptionOpen(false);
    } else {
      setIsOptionOpen(true);
    }
  };

  let currentList = sortList;
  if (props.state === "status") {
    currentList = statusList;
  }
  if (props.state === "category") {
    currentList = optionTagList;
  }

  const sortText = (
    <Fragment>
      <span>Sort by : </span>
      {listIdToName(currentList, sortId)}
    </Fragment>
  );
  const content = isSort
    ? sortText
    : listIdToName(currentList, selectedState[0]);

  // form style, sort style
  const sugNone = props.length === 0 ? classes.sortNone : "";
  const conStyle = `${classes.selectCon} ${isSort ? sugNone : classes.formCon}`;
  const labelStyle = `${classes.selectLabel} ${
    isSort ? classes.sortLabel : ""
  }`;
  const iconStyle = `${classes.iconArrow} ${isSort ? classes.sortIcon : ""} ${
    isOptionOpen ? classes.iconClickedOn : ""
  }`;

  return (
    <Fragment>
      <div className={conStyle} onClick={optionClickHandler} ref={conRef}>
        <div className={labelStyle}>
          <p>{content}</p>
          <IconArrowDown className={iconStyle} />
        </div>
      </div>
      {isOptionOpen && (
        <Option
          onClick={optionClickHandler}
          state={props.state}
          selectedState={selectedState}
          options={currentList}
          position={position}
        />
      )}
    </Fragment>
  );
};

export default Select;
