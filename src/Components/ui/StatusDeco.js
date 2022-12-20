import { useContext } from "react";

import classes from "./StatusDeco.module.css";

import StatusContext from "../../store/status-context";

function StatusDeco(props) {
  // sidebar에 재사용 roadItem에 있음
  const statusCtx = useContext(StatusContext);

  let circleColor = {};

  switch (props.status) {
    case "planned":
      circleColor = { backgroundColor: "var(--scarlet)" };
      break;
    case "in-progress":
      circleColor = { backgroundColor: "var(--purple)" };
      break;
    case "live":
      circleColor = { backgroundColor: "var(--light-blue)" };
      break;

    default:
      break;
  }

  return (
    <div
      className={classes.decoCon}
      style={props.side ? { columnGap: "1.6rem" } : { columnGap: "0.8rem" }}
    >
      <div className={classes.circle} style={circleColor}></div>
      <p
        style={
          props.side
            ? { fontSize: "1.6rem", lineHeight: "2.3rem" }
            : { fontSize: "1.3rem", lineHeight: "1.9rem" }
        }
      >
        {statusCtx.changeStatusName(props.status).replace("-", " ")}
      </p>
    </div>
  );
}

export default StatusDeco;
