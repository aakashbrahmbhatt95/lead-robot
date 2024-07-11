"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import CampaignsList from "@/components/CampaignsList";
import FirstCampaign from "@/components/FirstCampaign";
import { useEffect } from "react";
import { campaignsListAction } from "@/redux/action/campaigns-action";

const Campaigns = () => {
  const dispatch = useAppDispatch();
  const { campaignsList }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    dispatch(campaignsListAction());
  }, []);

  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">Campaigns</h2>
      {campaignsList?.length ? <CampaignsList /> : <FirstCampaign />}
    </div>
  );
};

export default Campaigns;
