import classes from "./OptionList.module.css";

import useMediaQuery from "../../../utils/useMediaQuery";

import OptionItem from "./OptionItem";

function OptionList(props) {
  let ulStyle = {};
  const isTablet = useMediaQuery("tablet");

  // width -> 150에 240, 160에 255
  if (props.state === "sort") {
    ulStyle = {
      top: isTablet ? "6.2rem" : "3.5rem",
      width: isTablet ? "25.5rem" : "24rem",
    };
  } else {
    ulStyle = {
      top: "6.4rem",
      left: 0,
      width: isTablet ? "45.6rem" : "calc(100vw - 9.6rem)",
    };
  }

  return (
    <ul className={classes.optionList} style={ulStyle}>
      {props.options.map((option, idx) => (
        <OptionItem
          idx={idx}
          key={option.id}
          name={option.name}
          state={props.state}
          setSelected={props.setSelected}
          selected={props.selected}
          liStyle={
            idx === 0
              ? null
              : { borderTop: "0.1rem solid hsla(231, 33%, 34%, 0.15)" }
          }
        />
      ))}
    </ul>
  );
}

export default OptionList;
