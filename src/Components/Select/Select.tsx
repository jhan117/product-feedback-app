import { ReactComponent as IconArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import Option from "./Option";
import classes from "./Select.module.css";

import {
  categoryToUpper,
  statusToUpper,
  queryToName,
} from "../../utils/changeName";
import useResize from "../../hooks/useResize";

interface Props {
  state: string;
  length?: number;
  dataState?: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
}

const Select = (props: Props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const conRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Pos>({ top: 0, left: 0 });
  const searchParams = useSearchParams()[0];

  const { state, dataState } = props;
  const isSort = state === "sort";

  const getPos = useCallback(() => {
    const currentRef = conRef.current?.getBoundingClientRect();
    if (currentRef) {
      setPosition({
        top: currentRef.top + currentRef.height,
        left: currentRef.left,
      });
    }
  }, []);

  useEffect(() => {
    getPos();
  }, [isOptionOpen, getPos]);

  useResize(getPos, true);

  const optionClickHandler = () => {
    if (isOptionOpen) {
      setIsOptionOpen(false);
    } else {
      setIsOptionOpen(true);
    }
  };

  let content;
  if (isSort) {
    content = (
      <Fragment>
        <span>Sort by : </span>
        {queryToName(searchParams.get("sort") || "most_upvotes")}
      </Fragment>
    );
  } else if (state === "status") {
    content = statusToUpper(dataState![0].status);
  } else {
    content = categoryToUpper(dataState![0].category);
  }

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
          onClickOption={optionClickHandler}
          state={state}
          dataState={dataState}
          position={position}
        />
      )}
    </Fragment>
  );
};

export default Select;
