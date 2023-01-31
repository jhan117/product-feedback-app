import { ReactComponent as IconCheck } from "../../../assets/shared/icon-check.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Dispatch } from "react";

import classes from "./OptionItem.module.css";

import { selectActions } from "../../../store/select-slice";
import { listIdToName } from "../../../utils/changeName";

interface Props {
  id: string;
  state: string;
  selectedState: [string, Dispatch<string>];
  currentList: Item[];
  onClickOption: () => void;
  className: string;
}

const OptionItem = (props: Props) => {
  const isSort = props.state === "sort";

  const dispatch = useAppDispatch();
  const sortId = useAppSelector((state) => state.select.sort);

  const optionItemClickHandler = () => {
    if (props.state === "sort") {
      dispatch(selectActions.changeSort(props.id));
    } else {
      props.selectedState[1](props.id);
    }
    props.onClickOption();
  };

  const currentId = isSort ? sortId : props.selectedState[0];

  return (
    <li
      className={`${classes.optionItem} ${props.className}`}
      onClick={optionItemClickHandler}
    >
      <p>{listIdToName(props.currentList, props.id)}</p>
      {props.id === currentId && <IconCheck />}
    </li>
  );
};

export default OptionItem;
