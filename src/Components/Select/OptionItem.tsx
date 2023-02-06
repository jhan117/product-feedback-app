import { ReactComponent as IconCheck } from "../../assets/shared/icon-check.svg";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import classes from "./OptionItem.module.css";

import { selectActions } from "../../store/select-slice";
import { listIdToName } from "../../utils/changeName";

interface Props {
  id: string;
  state: string;
  dataState?: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
  onClickOption: () => void;
  className: string;
}

const OptionItem = (props: Props) => {
  const [data, setData] = props.dataState!;
  const sortId = useAppSelector((state) => state.select.sort);
  const dispatch = useAppDispatch();

  const { state } = props;
  const isSort = state === "sort";

  const optionItemClickHandler = () => {
    if (state === "sort") {
      dispatch(selectActions.changeSort(props.id));
    } else {
      const name = listIdToName(state, props.id)!;
      if (state === "status") {
        setData((prevState) => ({
          ...prevState,
          status: name,
        }));
      } else {
        setData((prevState) => ({
          ...prevState,
          category: name,
        }));
      }
    }
    props.onClickOption();
  };

  let currentId;
  if (isSort) currentId = sortId;
  else if (state === "status") {
    currentId = listIdToName(state, data.status, true);
  } else currentId = listIdToName(state, data.category, true);

  return (
    <li
      className={`${classes.optionItem} ${props.className}`}
      onClick={optionItemClickHandler}
    >
      <p>{listIdToName(state, props.id)}</p>
      {props.id === currentId && <IconCheck />}
    </li>
  );
};

export default OptionItem;
