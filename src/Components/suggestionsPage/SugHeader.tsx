import { Fragment, useState } from "react";

import Card from "../ui/Card";
import Navbar from "./Navbar/Navbar";
import HamburgerIcon from "./HamburgerIcon";
import CategoryList from "./Navbar/Category/CategoryList";
import NavRoadmapContainer from "./Navbar/NavRoadmap/NavRoadmapContainer";
import classes from "./SugHeader.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

const SugHeader = () => {
  const isTablet = useMediaQuery("tablet");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navbarClickHandler = () => {
    isNavbarOpen ? setIsNavbarOpen(false) : setIsNavbarOpen(true);
  };

  const wideHeader = (
    <Fragment>
      <CategoryList />
      <NavRoadmapContainer />
    </Fragment>
  );

  return (
    <Fragment>
      <header className={classes.sugHeader}>
        <Card
          className={`${classes.board} ${
            isNavbarOpen ? classes.boardZIndex : ""
          }`}
        >
          <h1>Frontend Mentor</h1>
          <p>Feedback Board</p>
          {!isTablet && (
            <HamburgerIcon isOpen={isNavbarOpen} onClick={navbarClickHandler} />
          )}
        </Card>
        {isTablet && wideHeader}
      </header>
      {!isTablet && isNavbarOpen && <Navbar onClick={navbarClickHandler} />}
    </Fragment>
  );
};

export default SugHeader;
