import {
  ReactFlow,
  Controls,
  Background,
  Position,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

const rootNodeHandles = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const allHandles = [
  ...rootNodeHandles,
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
const snakeCaseToLabel = (str) => {
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
};

const isIgnoredSubTree = (key) => {
  const ignoredList = ["detail_text", "message"];

  return ignoredList.includes(key);
};

const TreeView = ({ data }) => {
  const heightDifference = 1200;
  const { nodes, edges } = useMemo(() => {
    if (!data.tree) return { nodes: [], edges: [] };
    const n = [];
    const e = [];

    n.push({
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: data.title },
      type: "root",
    });

    let currentId = 2;

    let edgeId = 1;

    const numberOfLeafNodes = (obj) => {
      let count = 0;
      Object.keys(obj).forEach((key) => {
        if (isIgnoredSubTree(key)) return;
        if (
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key]) &&
          obj[key] !== null &&
          typeof obj[key] !== "function" &&
          typeof obj[key] !== "string"
        ) {
          count += numberOfLeafNodes(obj[key]);
        } else {
          count++;
        }
      });
      return count;
    };
    const widthOfNode = (leafNodeCount) => leafNodeCount * 1000;

    const addtionalHeight = (length, index) => {
      let center = Math.floor((length - 1) / 2);
      let distance = Math.abs(center - index);

      return Math.abs(distance - center) * 10;
    };
    const addObject = (obj, parent, depth = 1) => {
      const parentId = parent.id;
      const numberOfLeaf = numberOfLeafNodes(obj);
      const fullWidth = widthOfNode(numberOfLeaf);
      let start = parent.position.x - fullWidth / 2;

      Object.keys(obj).forEach((key, index) => {
        if (isIgnoredSubTree(key)) return;
        let nodeId = String(currentId++);

        if (
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key]) &&
          obj[key] !== null &&
          typeof obj[key] !== "function" &&
          typeof obj[key] !== "string"
        ) {
          const numberOfChild = Object.keys(obj[key]).length;
          const numberOfLeaf = numberOfLeafNodes(obj[key]);
          const width = widthOfNode(numberOfLeaf);
          const newNode = {
            id: nodeId,
            position: {
              x: start,
              y:
                depth * heightDifference +
                addtionalHeight(Object.keys(obj).length, index),
            },
            data: {
              label: snakeCaseToLabel(key),
              child: numberOfChild,
              depth: depth,
            },
            type: "labelnode",
          };
          start += width;
          n.push(newNode);

          let newEdgeId = "edge-" + String(edgeId++);
          e.push({
            id: newEdgeId,
            source: parentId,
            target: nodeId,
            sourceHandle: allHandles[index],
          });

          addObject(obj[key], newNode, depth + 1);
        } else {
          const getNumberOfChild = () => {
            if (typeof obj[key] === "string") return 1;
            if (
              Array.isArray(obj[key]) &&
              obj[key].length > 0 &&
              typeof obj[key][0] === "string"
            )
              return 1;

            if (
              Array.isArray(obj[key]) &&
              obj[key].length > 0 &&
              typeof obj[key][0] === "object"
            )
              return 1;
            return 0;
          };
          n.push({
            id: nodeId,
            position: {
              x: start + widthOfNode(index),
              y:
                depth * heightDifference +
                addtionalHeight(Object.keys(obj).length, index),
            },
            data: {
              label: snakeCaseToLabel(key),
              child: getNumberOfChild(),
              depth: depth,
            },
            type: "labelnode",
          });

          let newEdgeId = "edge-" + String(edgeId++);
          e.push({
            id: newEdgeId,
            source: parentId,
            target: nodeId,
            sourceHandle: allHandles[index],
          });

          if (typeof obj[key] === "string") {
            let childeNodeId = String(currentId++);
            let newEdgeId = "edge-" + String(edgeId++);
            let newDepth = depth + 1;
            n.push({
              id: childeNodeId,
              position: {
                x: start + widthOfNode(index),
                y: newDepth * heightDifference + 200,
              },
              data: { label: obj[key], child: 0, depth: newDepth },
              type: "stringnode",
            });

            e.push({
              id: newEdgeId,
              source: nodeId,
              target: childeNodeId,
              sourceHandle: allHandles[0],
            });
          }

          if (
            Array.isArray(obj[key]) &&
            obj[key].length > 0 &&
            typeof obj[key][0] === "string"
          ) {
            let childeNodeId = String(currentId++);
            let newEdgeId = "edge-" + String(edgeId++);
            let newDepth = depth + 1;
            n.push({
              id: childeNodeId,
              position: {
                x: start + widthOfNode(index),
                y: newDepth * heightDifference + 200,
              },
              data: {
                label: snakeCaseToLabel(key),
                list: obj[key],
                child: 0,
                depth: newDepth,
              },
              type: "listnode",
            });

            e.push({
              id: newEdgeId,
              source: nodeId,
              target: childeNodeId,
              sourceHandle: allHandles[0],
            });
          }
          if (
            Array.isArray(obj[key]) &&
            obj[key].length > 0 &&
            typeof obj[key][0] === "object"
          ) {
            let childeNodeId = String(currentId++);
            let newEdgeId = "edge-" + String(edgeId++);
            let newDepth = depth + 1;
            n.push({
              id: childeNodeId,
              position: {
                x: start + widthOfNode(index),
                y: newDepth * heightDifference + 200,
              },
              data: {
                label: snakeCaseToLabel(key),
                table: obj[key],
                child: 0,
                depth: newDepth,
              },
              type: "tablenode",
            });

            e.push({
              id: newEdgeId,
              source: nodeId,
              target: childeNodeId,
              sourceHandle: allHandles[0],
            });
          }
        }
      });
    };

    addObject(data.tree, n[0]);

    return { nodes: n, edges: e };
  }, [data.tree]);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        minZoom={0.001}
        nodeTypes={{
          root: RootNode,
          labelnode: LabelNode,
          stringnode: StringNode,
          listnode: ListNode,
          tablenode: TableView,
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

export default TreeView;

const LabelNodeContainer = styled.div`
  background: #2aa0be;
  font-size: 80px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 5.52px 7.36px 7.36px 0px #00000099;
  width: 800px;
  color: white;
  text-align: center;
  text-wrap: wrap;
`;

const LabelNode = ({ data }) => {
  const numberOfChild = data.child;
  const depth = data.depth;
  const totalWidth = 800 + (3 - depth) * 20 - 20;
  const width = totalWidth / numberOfChild;
  return (
    <LabelNodeContainer
      style={{
        padding: 5 + (2 - depth) * 4,
        fontSize: 80 + (3 - depth) * 2,
        width: 800 + (3 - depth) * 20,
        backgroundColor: depth === 1 ? "#0d5c6f" : "#3e5a61",
      }}
    >
      <Handle type="target" position={Position.Top} id="a" />
      <div>{data.label}</div>

      {allHandles.map((h, i) => {
        if (i >= data.child) return <></>;
        return (
          <Handle
            type="source"
            position={Position.Bottom}
            id={h}
            style={{ left: width === totalWidth ? width / 2 : 10 + i * width }}
          />
        );
      })}
    </LabelNodeContainer>
  );
};

const StringNodeContainer = styled.div`
  background: rgba(115, 236, 210, 1);
  font-size: 10px;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0px 7.36px 7.36px 0px #00000040;
  min-width: 180px;

  max-width: 400px;
  color: black;
  text-align: center;
  text-wrap: wrap;
  line-height: 1.5;
  border-radius: 10px;
  position: relative;
  z-index: 5;
`;

const StringNode = ({ data }) => {
  return (
    <StringNodeContainer>
      <Handle type="target" position={Position.Top} id="a" />
      <div>{data.label}</div>
    </StringNodeContainer>
  );
};

const ListNodeContainer = styled.div`
  background: #dddcf1;
  font-size: 10px;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0px 7.36px 7.36px 0px #50585e40;
  min-width: 180px;

  max-width: 400px;
  h2 {
    color: blue;
  }
  text-align: center;
  text-wrap: wrap;
  line-height: 1.5;
  border-radius: 10px;

  .home-list {
    list-style: none;
    width: 350px;
    background: #ecf5ff;
    padding: 30px;
    border-radius: 4px;

    li {
      padding: 10px 0 10px 0;
    }
    li:nth-child(odd) {
      text-align: left;
      border-left: 10px solid #1488f3;
      padding-left: 4px;
      border-bottom: 10px solid #86bfff;
    }
    li:nth-child(even) {
      text-align: right;
      border-right: 10px solid #1488f3;
      padding-right: 4px;
      border-bottom: 10px solid #86bfff;
    }
  }
`;

const ListNode = ({ data }) => {
  return (
    <ListNodeContainer>
      <Handle type="target" position={Position.Top} id="a" />
      <h2>{data.label}</h2>
      <br />
      <ul className="home-list">
        {data.list.map((item) => {
          return (
            <li>
              {/* <ContentEditable html={item}  /> */}
              {item}
            </li>
          );
        })}
      </ul>
    </ListNodeContainer>
  );
};

const TableViewContainer = styled.div`
  background: #dddcf1;
  font-size: 10px;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0px 7.36px 7.36px 0px #50585e40;
  min-width: 180px;

  max-width: 600px;
  h2 {
    color: blue;
  }
  text-align: center;
  text-wrap: wrap;
  line-height: 1.5;
  border-radius: 10px;

  table {
    background: #012b39;
    border-radius: 0.25em;
    border-collapse: collapse;
    margin: 1em;
  }
  th {
    border-bottom: 1px solid #364043;
    color: #e2b842;
    font-size: 0.85em;
    font-weight: 600;
    padding: 0.5em 1em;
    text-align: left;
  }
  td {
    color: #fff;
    font-weight: 400;
    padding: 0.65em 1em;
  }
  .disabled td {
    color: #4f5f64;
  }
  tbody tr {
    transition: background 0.25s ease;
  }
  tbody tr:hover {
    background: #014055;
  }
`;

const TableView = ({ data }) => {
  return (
    <TableViewContainer>
      <Handle type="target" position={Position.Top} id="a" />
      <h2>{data.label}</h2>
      <br />
      <table>
        <thead>
          <tr>
            {Object.keys(data.table[0]).map((key) => {
              return <th>{snakeCaseToLabel(key)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.table.map((row) => {
            return (
              <tr>
                {Object.keys(row).map((key) => {
                  return <td>{row[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableViewContainer>
  );
};

const RootNodeContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(102, 77, 255, 0.25) -25.51%,
    rgba(69, 53, 255, 0.25) 99.91%
  );
  font-size: 105px;
  padding: 4px;
  border-radius: 18px;
  box-shadow: 0px 7.36px 7.36px 0px #00000040;
  width: 1200px;
  color: white;
  text-align: center;
  text-wrap: wrap;
  line-height: 1.5;
`;

const RootNode = ({ data }) => {
  const totalWidth = 1200;
  const width = totalWidth / 9;
  return (
    <RootNodeContainer>
      <div>{data.label}</div>

      {rootNodeHandles.map((h, i) => {
        return (
          <Handle
            type="source"
            position={Position.Bottom}
            id={h}
            style={{ left: 10 + i * width }}
          />
        );
      })}
    </RootNodeContainer>
  );
};
