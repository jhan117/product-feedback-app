import { Fragment } from "react";
import { createPortal } from "react-dom";

import CategoryList from "./Category/CategoryList";
import NavRoadmapContainer from "./NavRoadmap/NavRoadmapContainer";
import Backdrop from "../../ui/Backdrop";
import classes from "./Navbar.module.css";

interface Props {
  onClick: () => void;
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
        <Backdrop onClick={props.onClick} />,
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
