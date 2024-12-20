"use client";

import Image from "next/image";
import PencilSimple from "@/../public/PencilSimple.svg";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getcampaignsDatByIdAction } from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ReactFlowChart from "./reactFlowChart";
import { tabBarData } from "./helper";
import Schedules from "../Schedules";
import Segments from "../Segments";
import Agents from "../Agents";
import { ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import { Button } from "@/lib/ui/button";
import { Sheet } from "@/lib/ui/sheet";
import PreviewSideBarPopup from "@/lib/modals/PreviewSideBarPopup";
import {
  getConfigFiltersAction,
  getFiltersAction,
} from "@/redux/action/contactFilter-action";
import { Dialog, DialogContent } from "@/lib/ui/dialog";
import VoiceAssistantPopup from "@/lib/modals/PreviewSideBarPopup/VoiceAssistantPopup";
import { ambientSoundsListAction, getAgentAction, getRealTimeModelsListAction, getRealTimeResponseModalitiesListAction, getRealTimeTranscriptionsListAction, getRealTimeTurnDetectionListAction, getRealTimeVoicesListAction } from "@/redux/action/agents-action";
import { languagesListAction } from "@/redux/action/global-action";

const CampaignsDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [taskId, setTaskId] = useState(1);
  const params = useParams();
  const isEdit = !params.id.includes("create");
  const [isPreviewSideBarPopup, setIsPreviewSideBarPopup] = useState(false);
  const [isVoiceAssitantPopup, setIsVoiceAssitantPopup] = useState(false);
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    dispatch(getFiltersAction());
    dispatch(getConfigFiltersAction());
    dispatch(getRealTimeVoicesListAction());
    dispatch(getRealTimeModelsListAction());
    dispatch(getRealTimeTranscriptionsListAction());
    dispatch(getRealTimeResponseModalitiesListAction());
    dispatch(getRealTimeTurnDetectionListAction());
    dispatch(languagesListAction());
    dispatch(ambientSoundsListAction());
    dispatch(getAgentAction(params?.id));
  }, []);

  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id));
    }
  }, [isEdit]);

  return (
    <div className="p-[40px]">
      <div className="flex justify-between items-center">
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
        <Button
          type="button"
          className="flex gap-2"
          onClick={() => setIsPreviewSideBarPopup(true)}
        >
          <PhoneCall width={20} height={20} />
          Preview
        </Button>
      </div>
      <div className="flex justify-end gap-3  mt-5">
        <Button
          variant="outline"
          className="flex items-center cursor-pointer rounded-md bg-[#F4F4F5] px-4 py-2"
          onClick={() => setTaskId(Math.max(0, taskId - 1))}
          disabled={taskId === 1}
        >
          <ChevronLeft color="#71717A" width="25" height="25" />
          <p className="text-sm font-medium text-[#71717A] ml-2">Previous</p>
        </Button>
        <Button
          variant="outline"
          className="flex items-center cursor-pointer rounded-md bg-[#F4F4F5] px-4 py-2"
          onClick={() => setTaskId(taskId + 1)}
          disabled={taskId === 5}
        >
          <p className="text-sm font-medium text-[#71717A] mr-2">Next</p>
          <ChevronRight color="#71717A" width="25" height="25" />
        </Button>
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
      {taskId === 2 && <Agents />}
      {taskId === 3 && <Segments />}
      {taskId === 4 && <Schedules />}
      <Sheet open={isPreviewSideBarPopup}>
        {isPreviewSideBarPopup && (
          <PreviewSideBarPopup
            setIsPreviewSideBarPopup={setIsPreviewSideBarPopup}
            setIsVoiceAssitantPopup={setIsVoiceAssitantPopup}
          />
        )}
      </Sheet>
      <Dialog
        open={isVoiceAssitantPopup}
        onOpenChange={setIsVoiceAssitantPopup}
      >
        <DialogContent className="sm:max-w-[60%] max-h-[70%] p-0 overflow-scroll bg-white">
          <VoiceAssistantPopup />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsDetails;
