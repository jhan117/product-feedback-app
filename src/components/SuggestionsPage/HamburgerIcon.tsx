import { ReactComponent as IconHamburger } from "../../assets/shared/mobile/icon-hamburger.svg";
import { ReactComponent as IconClose } from "../../assets/shared/mobile/icon-close.svg";

import classes from "./HamburgerIcon.module.css";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerIcon = (props: Props) => {
  return (
    <div className={classes.iconCon} onClick={props.onClick}>
      {props.isOpen ? <IconClose /> : <IconHamburger />}
    </div>
  );
};

export default HamburgerIcon;
