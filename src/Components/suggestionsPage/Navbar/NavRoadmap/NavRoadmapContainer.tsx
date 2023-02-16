import { Link } from "react-router-dom";

import Card from "../../../ui/Card";
import NavRoadmapList from "./NavRoadmapList";
import classes from "./NavRoadmapContainer.module.css";

const NavRoadmapContainer = () => {
  return (
    <Card className={classes.container}>
      <header className={classes.roadHeader}>
        <h2>Roadmap</h2>
        <Link className={classes.roadViewLink} to="/roadmap">
          View
        </Link>
      </header>
      <NavRoadmapList />
    </Card>
  );
};

export default NavRoadmapContainer;
