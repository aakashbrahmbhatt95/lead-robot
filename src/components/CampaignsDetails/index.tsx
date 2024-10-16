"use client";

import Image from "next/image";
import PencilSimple from "@/../public/PencilSimple.svg";
import Vector from "@/../public/Vector.svg";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getcampaignsDatByIdAction } from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReactFlowChart from "./reactFlowChart";
import { tabBarData } from "./helper";
import Schedules from "../Schedules";
import Segments from "../Segments";
import Agents from "../Agents";

const CampaignsDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [taskId, setTaskId] = useState(1);
  const params = useParams();
  const isEdit = !params.id.includes("create");
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id));
    }
  }, [isEdit]);

  return (
    <div className="p-[40px]">
      <div className="flex">
        <h2 className="text-3xl font-semibold text-black">
          {campaignDataById?.name}
        </h2>
        <Image
          src={PencilSimple}
          alt="Logo"
          className="ml-[8px] cursor-pointer"
          onClick={() => router.push(`/create-campaign/${params?.id}`)}
        />
      </div>
      <p className="text-[20px] mt-[15px] font-semibold text-black underline">
        Task template
      </p>
      <div className="mt-[15px] flex items-center justify-end rounded-md bg-[#F4F4F5] w-fit px-4 py-2 gap-[8px] ml-auto">
        <p className="text-sm font-medium text-[#71717A]">Next</p>
        <Image src={Vector} alt="Logo" />
      </div>
      <div className="flex mt-[20px]">
        {tabBarData?.map((ele, index) => (
          <div
            className="flex-1 cursor-pointer"
            key={index}
            onClick={() => setTaskId(ele?.value)}
          >
            <div
              className={`flex items-center gap-4 pt-4 mr-2.5 ${
                taskId === ele?.value ? "border-t-2 border-black" : ""
              }`}
            >
              <p className="flex justify-center items-center text-xs font-medium rounded-full bg-black w-5 h-5 text-white">
                {ele?.value}
              </p>
              <p className="text-sm font-medium">{ele?.text}</p>
            </div>
          </div>
        ))}
      </div>
      {taskId === 1 && <ReactFlowChart />}
      {taskId === 2 && <Segments />}
      {taskId === 3 && <Schedules />}
      {taskId === 4 && <Agents />}
    </div>
  );
};

export default CampaignsDetails;
