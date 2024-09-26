import React from "react";
import TreeView from "./treeView";
import TimelineView from "./timelineView";

const ContentSwitch = ({ mode, data }) => {
  if (mode === "Tree" && data && data.tree) {
    return <TreeView data={data} />;
  }
  if (mode === "Timeline" && data && data.timeline) {
    return <TimelineView data={data} />;
  }
  return <div></div>;
};

export default ContentSwitch;
