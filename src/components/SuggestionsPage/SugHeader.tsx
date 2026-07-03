import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { suggestionsActions } from "../../store/suggestions-slice";
import useMediaQuery from "../../hooks/useMediaQuery";

import Card from "../UI/Card";
import Navbar from "./Navbar/Navbar";
import HamburgerIcon from "./HamburgerIcon";
import CategoryList from "./Navbar/Category/CategoryList";
import NavRoadmapContainer from "./Navbar/NavRoadmap/NavRoadmapContainer";
import classes from "./SugHeader.module.css";

const SugHeader = () => {
  const isTablet = useMediaQuery("tablet");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.suggestions);

  const handleLogout = () => {
    dispatch(suggestionsActions.logout());
    navigate("/login", { replace: true });
  };

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
          <div className={classes.boardText}>
            <h1>Frontend Mentor</h1>
            <p>Feedback Board</p>
          </div>
          {isLoggedIn && (
            <div className={classes.authInfo}>
              <div className={classes.guestProfile}>G</div>
              <button className={classes.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {!isTablet && (
            <div className={classes.hamburgerWrapper}>
              <HamburgerIcon isOpen={isNavbarOpen} onClick={navbarClickHandler} />
            </div>
          )}
        </Card>
        {isTablet && wideHeader}
      </header>
      {!isTablet && isNavbarOpen && (
        <Navbar onClickBackdrop={navbarClickHandler} />
      )}
    </Fragment>
  );
};

export default SugHeader;
