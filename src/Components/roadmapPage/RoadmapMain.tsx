import classes from "./RoadmapMain.module.css";

const RoadmapMain = () => {
  const getContent = (status) => {
    switch (status) {
      case "planned":
        return <p>Ideas prioritized for research</p>;
      case "in-progress":
        // tablet과 desktop은 features가 없는데... 흠...!
        return <p>Features currently being developed</p>;
      case "live":
        return <p>Released features</p>;
      default:
        break;
    }
  };

  let mainContent = "";

  if (isLoading) {
    mainContent = "loading...";
  } else {
    mainContent = isTablet ? (
      <RoadmapList
        statusList={statusList}
        data={loadedData}
        getFunc={getContent}
      />
    ) : (
      <RoadmapItem
        title={statusCtx.changeStatusName(curStatus)}
        length={currSuggestions.length}
        desc={getContent(curStatus)}
        status={curStatus}
        requests={currSuggestions}
      />
    );
  }

  return <main className={classes.main}>{mainContent}</main>;
};

export default RoadmapMain;
