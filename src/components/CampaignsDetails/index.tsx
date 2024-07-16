"use client";

import Image from "next/image";
import DotsThree from "@/../public/DotsThree.svg";
import PencilSimple from "@/../public/PencilSimple.svg";
import Vector from "@/../public/Vector.svg";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getcampaignsDatByIdAction } from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/lib/ui/button";
import ReactFlowChart from "./reactFlowChart";
import { row, tabBarData } from "./helper";
import CampaignPopup from "@/lib/modals/CampaignPopup";

const CampaignsDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isOpenCampaignPopup, setIsOpenCampaignPopup] =
    useState<boolean>(false);
  const [selectedMenuBar, setSelectedMenuBar] = useState(1);
  const isEdit = !params.id.includes("create");
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id));
    }
  }, [isEdit]);

  useEffect(() => {
    if (!isOpenCampaignPopup) {
      setSelectedMenuBar(1);
    }
  }, [isOpenCampaignPopup]);

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
        <Image src={DotsThree} alt="Logo" className="ml-[15px]" />
      </div>
      <p className="text-[20px] mt-[15px] font-semibold text-black underline">
        Task template
      </p>
      <div className="mt-[15px] flex justify-between items-center">
        <div className="flex gap-[10px]">
          {row?.map((ele: any) => {
            return (
              <div className="flex items-center rounded-md border-[1px] border-[#18181B] px-4 py-2 gap-[5px]">
                <Image src={PencilSimple} alt="Logo" />
                <p className="text-sm font-medium text-[#18181B]">
                  {ele?.text}
                </p>
              </div>
            );
          })}
          <Dialog
            open={isOpenCampaignPopup}
            onOpenChange={setIsOpenCampaignPopup}
          >
            <DialogTrigger asChild onClick={() => setIsOpenCampaignPopup(true)}>
              <Button>Campaign Popup</Button>
            </DialogTrigger>
            <CampaignPopup
              selectedMenuBar={selectedMenuBar}
              setSelectedMenuBar={setSelectedMenuBar}
              setIsOpenCampaignPopup={setIsOpenCampaignPopup}
            />
          </Dialog>
        </div>
        <div className="flex items-center rounded-md bg-[#F4F4F5] px-4 py-2 gap-[8px]">
          <p className="text-sm font-medium text-[#71717A]">Next</p>
          <Image src={Vector} alt="Logo" />
        </div>
      </div>
      <div className="flex mt-[20px]">
        {tabBarData?.map((ele: any) => {
          return (
            <div className="flex-1">
              <div className="flex items-center gap-4 border-t-2 border-black pt-4 mr-2.5">
                <p className="flex justify-center items-center text-xs font-medium rounded-full bg-black w-5 h-5 text-white">
                  {ele?.value}
                </p>
                <p className="text-sm font-medium text-[#18181B]">
                  {ele?.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <ReactFlowChart />
    </div>
  );
};

export default CampaignsDetails;