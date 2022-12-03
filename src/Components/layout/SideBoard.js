import { Link } from "react-router-dom";
import { useContext } from "react";

import classes from "./SideBoard.module.css";

import TagList from "../sidebarItems/TagList";
import Card from "../ui/Card";
import RoadList from "../sidebarItems/RoadList";
import TagsContext from "../../store/tags-context";

function SideBoard(props) {
  const tagsCtx = useContext(TagsContext);
  // nav랑 중복 상수
  const itemList = ["planned", "in-progress", "live"];

  return (
    <aside className={classes.sideBoard} style={props.style}>
      <Card style={{ padding: "3rem 2.1rem" }}>
        <TagList tags={tagsCtx.tagList}></TagList>
      </Card>
      <Card
        style={{
          padding: "2rem 2.4rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "2.2rem",
        }}
      >
        <div className={classes.roadHeader}>
          <h2 className={classes.roadmapH2}>Roadmap</h2>
          <Link className={classes.roadViewLink} to="/roadmap">
            View
          </Link>
        </div>
        <RoadList roads={itemList}></RoadList>
      </Card>
    </aside>
  );
}

export default SideBoard;
