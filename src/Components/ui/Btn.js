import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Btn.module.css";

function Btn(props) {
  let navigate = useNavigate();
  let func = () => {};
  const [isHover, setIsHover] = useState(false);

  let bgColor = "";

  switch (props.state) {
    case "cancel":
      func = (e) => {
        e.preventDefault();
        navigate(-1);
      };
      bgColor = isHover ? "hsl(231, 26%, 52%)" : `var(--${props.color})`;
      break;
    case "addFeedback":
      func = (e) => {
        e.preventDefault();
        props.setIsSubmit(true);
      };
      bgColor = isHover ? "hsl(282, 90%, 66%)" : `var(--${props.color})`;
      break;
    case "saveChanges":
      func = (e) => {
        e.preventDefault();
        props.setIsSubmit(true);
      };
      bgColor = isHover ? "hsl(282, 90%, 66%)" : `var(--${props.color})`;
      break;
    case "delete":
      func = (e) => {
        e.preventDefault();
        props.setIsDelete(true);
      };
      bgColor = isHover ? "hsl(0, 69%, 72%)" : props.colorHsl;
      break;
    default:
      break;
  }

  function enterHandler() {
    setIsHover(true);
  }
  function leaveHandler() {
    setIsHover(false);
  }

  return (
    <button
      className={classes.btn}
      type={props.type ? props.type : null}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={func}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      {props.children}
    </button>
  );
}

export default Btn;
