import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 32px;
  height: 400px;
  width: 65px;
  border: 2px solid white;
  border-radius: 21px;
  top: 220px;

  z-index: 2;

  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 20px;
  justify-content: space-around;

  img {
    cursor: pointer;
  }
`;

const Views = [
  {
    name: "Tree",
    img: "viewicons/tree.png",
  },
  {
    name: "Evidence Board",
    img: "viewicons/board.png",
  },
  {
    name: "Map",
    img: "viewicons/map.png",
  },
  {
    name: "Timeline",
    img: "viewicons/timeline.png",
  },
  {
    name: "pdf",
    img: "viewicons/pdf.png",
  },
];
const ViewSwitch = ({ setMode }) => {
  return (
    <Container>
      {Views.map((view, index) => (
        <img
          key={index}
          src={view.img}
          alt={view.name}
          onClick={() => setMode(view.name)}
        />
      ))}
    </Container>
  );
};

export default ViewSwitch;
