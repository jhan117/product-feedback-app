import classes from "./RoadmapNav.module.css";

import RoadmapBtn from "../ui/RoadmapBtn";

function RoadmapNav(props) {
  const btnList = ["planned", "in-progress", "live"];

  return (
    <nav className={classes.roadmapNav}>
      {btnList.map((name, idx) => (
        <RoadmapBtn
          key={idx}
          status={name}
          curStatus={props.curStatus}
          setCurStatus={props.setCurStatus}
        />
      ))}
    </nav>
  );
}

export default RoadmapNav;
