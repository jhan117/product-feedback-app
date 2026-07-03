import { ReactComponent as IconArrowLeft } from "../../assets/shared/icon-arrow-left.svg";
import { useNavigate } from "react-router-dom";

import classes from "./GoBack.module.css";

interface Props {
  isRoadmap?: boolean;
}

const GoBack = (props: Props) => {
  let navigate = useNavigate();

  const conStyle = `${classes.goBack} ${
    props.isRoadmap ? classes.whiteColor : ""
  }`;

  const goBackHandler = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <button className={conStyle} onClick={goBackHandler}>
      <IconArrowLeft aria-hidden="true" />
      <p>Go Back</p>
    </button>
  );
};

export default GoBack;
