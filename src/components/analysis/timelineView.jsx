import { Timeline } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";
import detectAndConvertDate from "../helper/convertToDate";

const Container = styled.div`
  max-height: calc(100vh - 160px);

  .ant-timeline-item-tail {
    background-color: #087b2a;
  }
  overflow-y: auto;

  .time-line {
    position: relative;
    right: 400px;
    top: 30px;
  }
  color: white;

  .data-label {
    color: #659b7b;

    border: 0.43px solid #659b7b;
    background: #00000099;
    box-shadow: 1.44px 2.88px 11.25px 0px #00000082;
    padding: 5px 10px;
    border-radius: 19.21px;

    /* &>div{
      padding: 10px;
    } */
  }
  /* .data-node {
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
  } */

  .data-node {
    background: #0a978eb2;
    padding: 5px 10px;
    border: 4px solid;

    border-image-source: linear-gradient(
      180deg,
      rgba(81, 112, 192, 0.8) 0%,
      rgba(59, 83, 142, 0.8) 100%
    );
    color: white;

    border-radius: 19.21px;
    opacity: 0.6px;

    .data-title {
      font-size: 16px;
      font-weight: 700;
      line-height: 19.36px;
      text-align: left;
    }
  }
`;

const TimelineView = ({ data }) => {
  const addtionalDates = [
    "December",
    " November",
    "October",
    "September",
    "August",
    "July",
    "June",
    "May",
    "April",
    "March",
    "February",
    "January",
  ];
  const timelinedata = useMemo(() => {
    if (!data) return [];

    const timeLines = data.timeline.map((event) => {
      return {
        ...event,

        dateobj: detectAndConvertDate(event.time),
        time: event?.time || addtionalDates.pop() + ", 2024",
      };
    });

    const sorted = timeLines.sort((a, b) => a.dateobj - b.dateobj);

    return sorted.map((event) => {
      return {
        label: <span className="data-label">{event.time}</span>,
        children: (
          <div>
            <div className="data-node">
              <div className="data-title">{event.title}</div>
              <div className="data-description">{event.description}</div>
            </div>
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
