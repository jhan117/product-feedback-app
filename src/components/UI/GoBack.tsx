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

  return (
    <button className={conStyle} onClick={() => navigate(-1)}>
      <IconArrowLeft aria-hidden="true" />
      <p>Go Back</p>
    </button>
  );
};

export default GoBack;
