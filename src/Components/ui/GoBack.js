import { ReactComponent as IconArrowLeft } from "../../assets/shared/icon-arrow-left.svg";
import { useNavigate } from "react-router-dom";

import classes from "./GoBack.module.css";

function GoBack(props) {
  let navigate = useNavigate();

  return (
    <div className={classes.goBack} onClick={() => navigate(-1)}>
      <IconArrowLeft className={props.color ? classes.whiteColor : null} />
      <p style={props.color}>Go Back</p>
    </div>
  );
}

export default GoBack;
