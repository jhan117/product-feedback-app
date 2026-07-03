import { ReactComponent as IconArrowDown } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as IconArrowUp } from "../../assets/shared/icon-arrow-up.svg";
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
  data?: FeedbackItem;
  setData?: Dispatch<SetStateAction<FeedbackItem>>;
}

const Select = (props: Props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const conRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Pos>({ top: 0, left: 0 });
  const searchParams = useSearchParams()[0];

  const { state, data, setData } = props;
  const isSort = state === "sort";

  const getPos = useCallback(() => {
    const currentRef = conRef.current?.getBoundingClientRect();
    if (currentRef) {
      setPosition({
        top: currentRef.top + window.scrollY + currentRef.height,
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
        <span className={classes.sortPrefix}>Sort by : </span>
        <span className={classes.sortValue}>{queryToName(searchParams.get("sort") || "most_upvotes")}</span>
      </Fragment>
    );
  } else if (state === "status") {
    content = statusToUpper(data!.status);
  } else {
    content = categoryToUpper(data!.category);
  }

  // form style, sort style
  const sugNone = props.length === 0 ? classes.sortNone : "";
  const conStyle = `${classes.selectCon} ${isSort ? sugNone : classes.formCon}`;
  const labelStyle = `${classes.selectLabel} ${
    isSort ? classes.sortLabel : ""
  } ${isSort && isOptionOpen ? classes.sortActive : ""}`;
  const iconStyle = `${classes.iconArrow} ${isSort ? classes.sortIcon : ""} ${
    isOptionOpen ? classes.iconClickedOn : ""
  }`;

  return (
    <Fragment>
      <div className={conStyle} onClick={optionClickHandler} ref={conRef}>
        <div className={labelStyle}>
          <p>{content}</p>
          <IconArrowDown aria-hidden="true" className={iconStyle} />
        </div>
      </div>
      {isOptionOpen && (
        <Option
          onClickOption={optionClickHandler}
          state={state}
          data={data}
          setData={setData}
          position={position}
        />
      )}
    </Fragment>
  );
};

export default Select;
