"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import Plus from "../../../public/Plus.svg";
import ParentTaskCard from "@/components/ParentTaskCard";

const nodeStyles: any = {
  backgroundColor: "black",
  color: "white",
  width: "288px",
  height: "36px",
  padding: "8px 16px",
  borderRadius: "5px",
  textAlign: "center",
};

const edgeStyles: any = {
  stroke: "black",
  strokeWidth: "1px",
};

const initialNodes: any = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: {
      label: "Path Condition 1",
    },
    style: nodeStyles,
  },
  {
    id: "2",
    position: { x: 200, y: 200 },
    data: { label: "Path Condition" },
    style: nodeStyles,
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    data: { label: "Path Condition 3" },
    style: nodeStyles,
  },
  {
    id: "4",
    position: { x: 400, y: 150 },
    data: { label: "Path Condition 4" },
    style: nodeStyles,
  },
];

const initialEdges: any = [
  {
    id: "e1-2",
    type: "smoothstep",
    source: "1",
    target: "2",
    label: "Path Condition",
    style: edgeStyles,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "black",
    },
  },
  {
    id: "e1-3",
    type: "smoothstep",
    source: "2",
    target: "3",
    label: "Path Condition",
    style: edgeStyles,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "black",
    },
  },
  {
    id: "e1-4",
    type: "smoothstep",
    source: "1",
    target: "4",
    label: "Path Condition",
    style: edgeStyles,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "black",
    },
  },
];

const ReactFlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            label: "Path Condition",
            style: edgeStyles,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "black",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleAdd = () => {
    const temp: any = [
      ...nodes,
      {
        id: (nodes?.length + 1).toString(),
        position: {
          x: 200,
          y: 10,
        },
        data: {
          label: (
            <>
              <ParentTaskCard />
            </>
          ),
        },
        style: {
          width: "330px",
          padding: "0px",
          border: "none",
        },
        width: 288,
        height: 36,
      },
    ];
    setNodes(temp);
  };

  const onEdgeClick = (event: any, edge: any) => {
    event.stopPropagation();

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this edge?"
    );

    if (userConfirmed) {
      const temp = nodes?.filter((ele) => ele?.id !== edge.target);
      setNodes(temp);
    }
  };

  return (
    <div
      className="bg-[#F4F4F5] mt-5"
      style={{ height: "100vh", padding: "20px" }}
    >
      <div
        className="flex items-center w-fit rounded-md cursor-pointer bg-white px-4 py-2 gap-[8px] mb-4"
        onClick={handleAdd}
      >
        <Image src={Plus} alt="Logo" />
        <p className="text-sm font-medium text-[#18181B]">New task set</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowChart;
