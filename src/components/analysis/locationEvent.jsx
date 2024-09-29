import React, { useMemo } from "react";
import styled from "styled-components";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";
import { SyncOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: ${(p) => (p.active ? 0 : "-50vw")};
  bottom: 0;
  overflow: auto;
  width: 50vw;
  transition: 300ms;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  padding: 20px 40px;
  #closeicon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    svg {
      font-size: 30px;
      color: white;
    }
  }

  h2 {
    color: white;
    font-size: 2rem;
    margin-bottom: 10px;
    padding: 5px;
  }

  h3 {
    color: white;
    font-size: 1.8rem;
    margin-bottom: 10px;
    padding: 5px;
  }

  h4 {
    color: #1ad4da;
    font-size: 1.5rem;
    margin-bottom: 10px;
    padding: 5px;
  }

  .eventlist {
    padding-left: 50px;

    .item {
      color: white;
    }
  }
`;

const LocationEvent = ({
  complaint: location = null,
  setComplaint: setLocation,
}) => {
  console.log(location);

  const events = useMemo(() => {
    const ev = location?.events || [];
    return ev.map((item) => {
      return {
        children: item,
      };
    });
  }, []);

  return (
    <Container
      active={location ? true : false}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div id="closeicon">
        <CloseIcon onClick={() => setLocation(null)} />
      </div>

      <h2>{location?.location}</h2>

      <h4>{location?.description}</h4>

      <br />
      <div className="eventlist">
        <h3>Events</h3>
        <br />
        <Timeline>
          {events.map((item) => {
            return (
              <Timeline.Item>
                <div className="item">{item.children}</div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </Container>
  );
};

export default LocationEvent;
