import { Timeline } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: calc(100vh - 160px);

  .ant-timeline-item-tail{
    background-color: #087b2a;
  }
  overflow-y: auto;

  .time-line {
    position: relative;
    right: 300px;
    top: 30px;
  }
  color: white;

  .data-label{
    color: white;
  }
  .data-node {
    background-color: #c9c0c0bf;
    border-radius: 10px;
    box-shadow: 0px 7.36px 7.36px 0px #00000040;
    .data-title {
      font-size: 18px;
      color: white;
      background-color: #087b2a;
      text-align: center;
    }
    .data-description {
      padding: 10px;
    }
  }
`;

const TimelineView = ({ data }) => {
  const timelinedata = useMemo(() => {
    if (!data) return [];
    return data.timeline.map((event) => {
      return {
        label: <div className="data-label">{event.time}</div>,
        children: (
          <div className="data-node">
            <div className="data-title">{event.title}</div>
            <div className="data-description">{event.description}</div>
          </div>
        ),
      };
    });
  }, [data]);
  return (
    <Container>
      <div className="time-line">
        <Timeline mode={"left"} items={timelinedata} />
      </div>
    </Container>
  );
};

export default TimelineView;
