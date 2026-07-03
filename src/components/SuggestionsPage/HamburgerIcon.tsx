import { ReactComponent as IconHamburger } from "../../assets/shared/mobile/icon-hamburger.svg";
import { ReactComponent as IconClose } from "../../assets/shared/mobile/icon-close.svg";

import classes from "./HamburgerIcon.module.css";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = (props: Props) => {
  return (
    <button
      className={classes.iconCon}
      onClick={props.onClick}
      aria-label={props.isOpen ? "Close menu" : "Open menu"}
      aria-expanded={props.isOpen}
    >
      {props.isOpen ? <IconClose aria-hidden="true" /> : <IconHamburger aria-hidden="true" />}
    </button>
  );
};

export default HamburgerIcon;
