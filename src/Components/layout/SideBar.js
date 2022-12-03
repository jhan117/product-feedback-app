import { ReactComponent as IconHamburger } from "../../assets/shared/mobile/icon-hamburger.svg";
import { ReactComponent as IconClose } from "../../assets/shared/mobile/icon-close.svg";
import { useState } from "react";

import classes from "./SideBar.module.css";

// add burger animation
function SideBar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function sidebarHandler() {
    isSidebarOpen ? closeSidebar() : openSidebar();
  }

  function openSidebar() {
    setIsSidebarOpen(true);
    props.setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
    props.setIsSidebarOpen(false);
  }

  return (
    <aside className={classes.board}>
      <div className={classes.text}>
        <h1>Frontend Mentor</h1>
        <p>Feedback Board</p>
      </div>
      <div className={classes.menuIcon} onClick={sidebarHandler}>
        {isSidebarOpen ? <IconClose /> : <IconHamburger />}
      </div>
    </aside>
  );
}

export default SideBar;
