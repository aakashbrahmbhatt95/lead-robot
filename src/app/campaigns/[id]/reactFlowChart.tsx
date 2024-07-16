"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import Plus from "../../../../public/Plus.svg";
import ParentTaskCard from "@/components/ParentTaskCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addPathConditionAction,
  addtaskSetAction,
  pathConditionListAction,
  taskSetListAction,
} from "@/redux/action/campaigns-action";
import { useParams } from "next/navigation";
import { Sheet } from "@/lib/ui/sheet";
import PathConditionPopup from "./pathConditionPopup";

const edgeStyles: any = {
  stroke: "black",
  strokeWidth: "1px",
};

const initialNodes: any = [];

const initialEdges: any = [];

const ReactFlowChart = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [isOpenEditPathCondition, setIsOpenEditPathCondition] =
    useState<any>(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { taskSetList, pathConditionList }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    dispatch(taskSetListAction());
    dispatch(pathConditionListAction());
  }, [dispatch]);

  useEffect(() => {
    const temp = taskSetList?.map((ele: any, index: any) => ({
      ...ele,
      id: `${ele.id}`,
      position: {
        x: 200 + 400 * index,
        y: 10 + 200 * index,
      },
      data: {
        label: <ParentTaskCard ele={ele} />,
      },
      style: {
        width: "330px",
        padding: "0px",
        border: "none",
      },
      width: 288,
      height: 36,
    }));
    setNodes(temp);
  }, [taskSetList]);

  useEffect(() => {
    const temp = pathConditionList?.map((ele: any, index: any) => ({
      id: ele?.id?.toString(),
      source: ele?.from_taskset?.toString(),
      sourceHandle: null,
      target: ele?.to_taskset?.toString(),
      targetHandle: null,
      type: "smoothstep",
      label: ele?.condition,
      style: edgeStyles,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "black",
      },
    }));
    setEdges(temp);
  }, [pathConditionList]);

  const onConnect = (params: any) => {
    dispatch(
      addPathConditionAction({
        from_taskset_id: params?.source,
        to_taskset_id: params?.target,
        condition: "Path Condition",
      })
    );
  };

  const handleAdd = () => {
    dispatch(
      addtaskSetAction({
        campaign_id: params?.id,
        name: `Task Set ${Math.random()}`,
        speak_first: false,
      })
    );
  };

  const onEdgeClick = (event: any, edge: any) => {
    event.stopPropagation();
    setIsOpenEditPathCondition(edge);
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
      <Sheet
        open={isOpenEditPathCondition !== null}
        onOpenChange={() => setIsOpenEditPathCondition(null)}
      >
        <PathConditionPopup
          isOpenEditPathCondition={isOpenEditPathCondition}
          setIsOpenEditPathCondition={setIsOpenEditPathCondition}
        />
      </Sheet>
    </div>
  );
};

export default ReactFlowChart;
