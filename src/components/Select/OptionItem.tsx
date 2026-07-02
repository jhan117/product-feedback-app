import { ReactComponent as IconCheck } from "../../assets/shared/icon-check.svg";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

import classes from "./OptionItem.module.css";

interface Props {
  name: string;
  state: string;
  data?: FeedbackItem;
  setData?: Dispatch<SetStateAction<FeedbackItem>>;
  onClickOption: () => void;
  className: string;
}

const OptionItem = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { state, name } = props;
  const lowerName = name.toLowerCase();
  const isSort = state === "sort";

  let currentName;
  if (isSort) {
    currentName = searchParams.get("sort");
  } else if (state === "status") {
    currentName = props.data!.status;
  } else {
    currentName = props.data!.category;
  }

  const optionItemClickHandler = () => {
    if (state === "sort") {
      searchParams.set("sort", lowerName.replace(" ", "_"));
      setSearchParams(searchParams);
    } else {
      const setData = props.setData!;
      if (state === "status") {
        setData((prevState) => ({
          ...prevState,
          status: lowerName,
        }));
      } else {
        setData((prevState) => ({
          ...prevState,
          category: lowerName,
        }));
      }
    }
    props.onClickOption();
  };

  return (
    <li
      className={`${classes.optionItem} ${props.className}`}
      onClick={optionItemClickHandler}
    >
      <p>{name}</p>
      {lowerName === currentName && <IconCheck />}
    </li>
  );
};

export default OptionItem;
