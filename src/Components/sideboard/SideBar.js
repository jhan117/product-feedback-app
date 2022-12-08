import { ReactComponent as IconHamburger } from "../../assets/shared/mobile/icon-hamburger.svg";
import { ReactComponent as IconClose } from "../../assets/shared/mobile/icon-close.svg";
import { Fragment, useState } from "react";

import classes from "./SideBar.module.css";

import CategoryList from "./Category/CategoryList";
import RoadmapContainer from "./Roadmap/RoadmapContainer";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function clickHandler() {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  }

  const side = (
    <Fragment>
      <div className={classes.sideCon}>
        <CategoryList />
        <RoadmapContainer />
      </div>
      <div className={classes.sideModal} />
    </Fragment>
  );

  return (
    <Fragment>
      <div className={classes.menuIcon} onClick={clickHandler}>
        {isSidebarOpen ? <IconClose /> : <IconHamburger />}
      </div>
      {isSidebarOpen ? side : null}
    </Fragment>
  );
}

export default SideBar;
