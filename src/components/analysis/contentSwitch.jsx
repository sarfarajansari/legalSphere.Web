import React from "react";
import TreeView from "./treeView";
import TimelineView from "./timelineView";
import EvidenceBoard from "./evidenceBoard";
import Map from "./map";
import Pdfview from "./pdfview";

const ContentSwitch = ({ mode, data, id }) => {
  if (id === "new-chat") {
    return <></>;
  }
  if (mode === "Tree" && data && data.tree) {
    return <TreeView data={data} />;
  }
  if (mode === "Timeline" && data && data.timeline) {
    return <TimelineView data={data} />;
  }

  if (mode === "Evidence Board" && data && data.evidence_board) {
    return <EvidenceBoard data={data} />;
  }

  if (mode === "Map") {
    return <Map data={data} />;
  }

  if (mode === "pdf") {
    return <Pdfview chatId={id} />;
  }
  return <div></div>;
};

export default ContentSwitch;
