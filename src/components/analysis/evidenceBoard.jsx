import {
  Controls,
  Background,
  Position,
  Handle,
  EdgeLabelRenderer,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import React, { useEffect, useMemo } from "react";

import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
import styled from "styled-components";
import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
const allHandles = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const EvidenceBoard = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!data?.evidence_board) {
      return { nodes: [], edges: [] };
    }
    const board = data.evidence_board;

    // // const filtered
    // const positions = applyForces([...board.nodes], [...board.edges]);

    // const handlers = {};

    // const n = board.nodes
    //   .map((node, i) => {
    //     const position = positions[node.id];
    //     const sourceHandles = board.edges.filter(
    //       (k) => k.fromId === node.id.toString()
    //     ).length;
    //     const targetHandles = board.edges.filter(
    //       (k) => k.toId === node.id.toString()
    //     ).length;

    //     handlers[node.id] = {
    //       sourceHandles: [...allHandles.slice(0, sourceHandles).reverse()],
    //       targetHandles: [...allHandles.slice(0, targetHandles)],
    //     };

    //     if (sourceHandles === 0 && targetHandles === 0) return null;

    //     return {
    //       id: node.id,
    //       type: "labelnode",
    //       data: {
    //         label: node.id + " " + node.name,
    //         description: node.description,
    //         sourceHandles,
    //         targetHandles,
    //       },
    //       position: { x: position?.x, y: position?.y },
    //     };
    //   })
    //   .filter((n) => n);

    // console.log(handlers);

    // const edges = board.edges.map((edge, i) => {
    //   return {
    //     id: (i + 1).toString(),
    //     source: edge.fromId,
    //     target: edge.toId,
    //     animated: true,
    //     sourceHandle: handlers[edge.fromId].sourceHandles.pop(),
    //     // targetHandle: handlers[edge.toId].targetHandles.pop(),
    //   };
    // });

    const restrestructureBoard = restructureBoard(board);
    setEdges(restrestructureBoard.edges);
    setNodes(restrestructureBoard.nodes);
    // return {
    //   nodes: n,
    //   edges: edges,
    // };
  }, [data?.evidence_board]);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        // defaultNodes={nodes}
        // defaultEdges={edges}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        minZoom={0.001}
        edgeTypes={{
          animatedSvg: AnimatedSVGEdge,
        }}
        nodeTypes={{
          //   root: RootNode,
          labelnode: LabelNode,
          //   stringnode: StringNode,
          //   listnode: ListNode,
          //   tablenode: TableView,
        }}
        nodeOrigin={[1, 0]}
        fitView="auto"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default EvidenceBoard;

const LabelNodeContainer = styled.div`
  background: #0a978e;

  padding: 25px;
  color: white;

  width: 350px;
  min-height: 138.34px;
  border: 4px solid;

  border-radius: 19.21px;

  border-color: ${(props) => props.color};

  .node-header {
    display: grid;
    grid-template-columns: 1fr 50px;
    justify-content: space-between;
    gap: 10px;
  }
  h1 {
    margin-bottom: 1rem;
  }

  .node-type {
    text-transform: uppercase;
    border: 2px solid #0c3c3b;
    font-size: 8.42px;
    font-weight: 400;
    line-height: 10.19px;
    text-align: left;
    color: #9effc5;
    border-radius: 15px;
    padding: 4px 10px;
  }

  .description {
    color: #ffffff9a;
  }
`;

const borderColors = {
  person: "#4E6CBA",
  event: "#7848AE",
  action: "#d8a04ccc",
  organization: "#D84C4CCC",
  claim: "#D84C4CCC",
  law: "#34B32DCC",
  place: "#FFE661CC",
};

const borderList = Object.values(borderColors);
const getByIndex = (index) => borderList[index % borderList.length];
const getColor = (type, index) => borderColors[type] || getByIndex(index);

const edgeColors = {
  person: "#1c4ecb",
  event: "#6319b8",
  action: "#ca7e0ccc",
  organization: "#D84C4CCC",
  claim: "#dc2222cc",
  law: "#16ae0ecc",
  place: "#bca316cc",
};

const edgeColorList = Object.values(edgeColors);
const getEdgeColorByIndex = (index) =>
  edgeColorList[index % edgeColorList.length];
const getEdgeColor = (type, index) =>
  edgeColors[type] || getEdgeColorByIndex(index);

const LabelNode = ({ data }) => {
  const sourcePositions = [
    Position.Bottom,
    Position.Left,
    Position.Right,
    Position.Top,
  ];
  const targetPositions = [
    Position.Top,
    Position.Right,
    Position.Left,
    Position.Bottom,
  ];
  return (
    <LabelNodeContainer color={getColor(data.nodeType, data.index)}>
      {data.targetHandles > 0 && (
        <Handle type="target" position={targetPositions[0]} id={"a"} />
      )}

      <div className="node-header">
        <h2>{data.label}</h2>
        <div>
          {" "}
          <div className="node-type">{data.nodeType}</div>
        </div>
      </div>

      <div className="description">{data.description}</div>

      {allHandles.map((h, i) => {
        if (i >= data.sourceHandles) return <></>;
        return (
          <Handle
            type="source"
            position={sourcePositions[i % sourcePositions.length]}
            id={h}
          />
        );
      })}
    </LabelNodeContainer>
  );
};

export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffcc00",
            padding: 2,
            borderRadius: 5,
            fontSize: 18,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data?.label || "Nothing"}
        </div>
      </EdgeLabelRenderer>

      <circle r="5" fill={getEdgeColor(data?.sourceNodeType, data?.index)}>
        <animateMotion dur="1s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <circle r="15" fill={getEdgeColor(data?.sourceNodeType, data?.index)}>
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>

  );
}

const restructureBoard = (board) => {
  function initializePositions(nodes) {
    const positions = {};
    nodes.forEach((node, index) => {
      // Initialize positions in a grid layout instead of random
      const row = Math.floor(index / Math.sqrt(nodes.length));
      const col = index % Math.floor(Math.sqrt(nodes.length));
      positions[node.id] = {
        x: col * 100 + Math.random() * 50, // Adjust grid size and add slight randomness
        y: row * 100 + Math.random() * 50,
      };
    });
    return positions;
  }

  // Function to apply force-directed layout with stability improvements
  function applyForces(nodes, edges, iterations = 10000) {
    const positions = initializePositions(nodes);

    // Settings for repulsion and attraction
    const repulsionStrength = 5000; // Adjusted repulsion strength
    const attractionStrength = 0.0002; // Reduced attraction strength
    const damping = 0.9; // Damping factor to stabilize movement
    const maxForce = 50; // Maximum force to prevent extreme values
    const minDistance = 30; // Minimum distance to prevent overlap

    for (let iter = 0; iter < iterations; iter++) {
      // Apply repulsion between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            let nodeId1 = nodes[i].id;
            let nodeId2 = nodes[j].id;

            let dx = positions[nodeId1].x - positions[nodeId2].x;
            let dy = positions[nodeId1].y - positions[nodeId2].y;
            let distance = Math.sqrt(dx * dx + dy * dy) + 0.1; // Avoid division by zero
            let force = (repulsionStrength * damping) / (distance * distance);

            if (distance < minDistance) {
              // Prevent nodes from overlapping
              force = repulsionStrength / (minDistance * minDistance);
            }

            // Limit the repulsion force to avoid extreme values
            force = Math.min(force, maxForce);

            // Update positions based on repulsion force
            positions[nodeId1].x += (dx / distance) * force;
            positions[nodeId1].y += (dy / distance) * force;
            positions[nodeId2].x -= (dx / distance) * force; // Repulsion is mutual
            positions[nodeId2].y -= (dy / distance) * force;
          }
        }
      }

      // Apply attraction for connected nodes
      edges.forEach((edge) => {
        const fromId = edge.from;
        const toId = edge.to;

        if (positions[fromId] && positions[toId]) {
          let dx = positions[toId].x - positions[fromId].x;
          let dy = positions[toId].y - positions[fromId].y;
          let distance = Math.sqrt(dx * dx + dy * dy) + 0.1; // Avoid division by zero
          let force = distance * distance * attractionStrength * damping;

          // Limit the attraction force
          force = Math.min(force, maxForce);

          // Update positions based on attraction force
          positions[fromId].x += (dx / distance) * force;
          positions[fromId].y += (dy / distance) * force;
          positions[toId].x -= (dx / distance) * force;
          positions[toId].y -= (dy / distance) * force;
        }
      });
    }

    return positions;
  }

  const positions = applyForces([...board.nodes], [...board.edges]);

  const handlers = {};

  const n = board.nodes
    .map((node, i) => {
      const position = positions[node.id];
      const sourceHandles = board.edges.filter(
        (k) => k.fromId === node.id.toString()
      ).length;
      const targetHandles = board.edges.filter(
        (k) => k.toId === node.id.toString()
      ).length;

      handlers[node.id] = [...allHandles.slice(0, sourceHandles).reverse()];

      if (sourceHandles === 0 && targetHandles === 0) return null;

      return {
        id: node.id,
        type: "labelnode",
        data: {
          label: node.name,
          description: node.description,
          sourceHandles,
          targetHandles,
          index: i,
          nodeType: node.type,
        },
        position: { x: position?.x, y: position?.y },
      };
    })
    .filter((n) => n);

  console.log(handlers);

  const edges = board.edges.map((edge, i) => {
    const soureNode = board.nodes.find((node) => node.id === edge.fromId);
    return {
      id: (i + 1).toString(),
      source: edge.fromId,
      target: edge.toId,
      animated: true,
      sourceHandle: handlers[edge.fromId].pop(),
      label: edge.description,
      type: "animatedSvg",
      data: {
        sourceNodeType: soureNode.type,
        label: edge.description,
        index: i,
      },
    };
  });
  return {
    nodes: n,
    edges: edges,
  };
};
