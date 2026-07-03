import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { suggestionsActions } from "../../store/suggestions-slice";
import useMediaQuery from "../../hooks/useMediaQuery";
import images from "../../assets/user-images";

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
  const { isLoggedIn, currentUser } = useAppSelector((state) => state.suggestions);
  const userImageName = currentUser.image ? currentUser.image.slice(27, -4) : "";
  const avatarSrc = images[userImageName];

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
              {avatarSrc ? (
                <img
                  className={classes.guestProfile}
                  src={avatarSrc}
                  alt={currentUser.name}
                />
              ) : (
                <div className={classes.guestProfile}>
                  {currentUser.name ? currentUser.name[0] : "G"}
                </div>
              )}
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
