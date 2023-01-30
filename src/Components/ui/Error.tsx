import { createPortal } from "react-dom";

import classes from "./Error.module.css";

interface Props {
  onClick: () => void;
}

const IconX = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 -4 32 32"
      strokeWidth={3}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Error = (props: Props) => {
  return (
    <div className={classes.error}>
      <div className={classes.errorCon}>
        <div className={classes.circle}>
          <IconX />
        </div>
        <div className={classes.errorText}>
          <h3>Error!</h3>
          <p>Failed to fetch</p>
        </div>
      </div>
      <button className={classes.cancelBtn} onClick={props.onClick}>
        <IconX />
      </button>
    </div>
  );
};

const ErrorNotification = (props: Props) => {
  return createPortal(
    <Error onClick={props.onClick} />,
    document.getElementById("overlay-root")!
  );
};

export default ErrorNotification;
