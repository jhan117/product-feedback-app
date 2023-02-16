import { Fragment } from "react";
import { createPortal } from "react-dom";

import Backdrop from "../../ui/Backdrop";
import CategoryList from "./Category/CategoryList";
import NavRoadmapContainer from "./NavRoadmap/NavRoadmapContainer";
import classes from "./Navbar.module.css";

interface Props {
  onClickBackdrop: () => void;
}

const NavbarOverlay = () => {
  return (
    <div className={classes.navbar}>
      <CategoryList />
      <NavRoadmapContainer />
    </div>
  );
};

const Navbar = (props: Props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={props.onClickBackdrop} />,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <NavbarOverlay />,
        document.getElementById("overlay-root")!
      )}
    </Fragment>
  );
};

export default Navbar;
