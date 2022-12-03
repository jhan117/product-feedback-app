import { Fragment, useContext, useEffect, useState } from "react";
import { ReactComponent as IconArrowDown } from "../../../assets/shared/icon-arrow-down.svg";

import classes from "./Select.module.css";
import TagsContext from "../../../store/tags-context";
import SortContext from "../../../store/sort-context";

import OptionList from "./OptionList";
import SelectModal from "./SelectModal";
import StatusContext from "../../../store/status-context";

function Select(props) {
  const tagCtx = useContext(TagsContext);
  const sortCtx = useContext(SortContext);
  const statusCtx = useContext(StatusContext);

  const [isOpenOption, setIsOpenOption] = useState(false);

  const [selectedCat, setSelectedCat] = useState(
    props.valueC
      ? props.valueC.length === 2
        ? props.valueC.toUpperCase()
        : props.valueC.charAt(0).toUpperCase() + props.valueC.slice(1)
      : "Feature"
  );

  const [selectedStat, setSelectedStat] = useState(
    props.valueS
      ? props.valueS.charAt(0).toUpperCase() + props.valueS.slice(1)
      : ""
  );

  const selectedDict = {
    category: selectedCat,
    status: selectedStat,
  };

  const setDict = {
    category: setSelectedCat,
    status: setSelectedStat,
  };

  const sortContent = (
    <Fragment>
      <span>Sort by : </span>
      {sortCtx.sortList[sortCtx.sortBy].name}
    </Fragment>
  );

  useEffect(() => {
    if (props.state === "category") {
      props.setSugData((prevData) => ({
        ...prevData,
        category: selectedCat.toLowerCase(),
      }));
    } else if (props.state === "status") {
      props.setSugStatus((prevData) => ({
        ...prevData,
        status: selectedStat.toLowerCase(),
      }));
    }
  }, [selectedCat, selectedStat]);

  function sortHandler() {
    if (isOpenOption) {
      setIsOpenOption(false);
    } else {
      setIsOpenOption(true);
    }
  }

  let options = [];

  switch (props.state) {
    case "sort":
      options = sortCtx.sortList;
      break;
    case "category":
      options = tagCtx.optionTagList;
      break;
    case "status":
      options = statusCtx.status;
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <div
        className={`${classes.selectCon} ${
          props.state === "sort" ? null : classes.selectConDefault
        }`}
      >
        <div className={classes.selectLabel} onClick={sortHandler}>
          <p>
            {props.state === "sort"
              ? sortContent
              : props.state === "status"
              ? selectedStat
              : selectedCat}
          </p>
          <IconArrowDown
            className={`${classes.iconArrow} ${
              props.state === "sort" ? classes.iconCustom : null
            } ${props.iconStyle} ${
              isOpenOption ? classes.iconClickedOn : classes.iconClickedOff
            }`}
          />
        </div>
        {isOpenOption ? (
          <OptionList
            state={props.state}
            options={options}
            setSelected={setDict}
            selected={selectedDict}
          />
        ) : null}
      </div>
      {isOpenOption ? <SelectModal setIsOpenOption={setIsOpenOption} /> : null}
    </Fragment>
  );
}

export default Select;
