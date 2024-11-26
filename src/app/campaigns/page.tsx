"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { campaignsListAction } from "@/redux/action/campaigns-action";
import CampaignsList from "@/components/Campaigns/CampaignsList/CampaignList";
import FirstCampaign from "@/components/Campaigns/FirstCampaign/FirstCampaign";

const Campaigns = () => {
  const dispatch = useAppDispatch();
  const { campaignsList }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    dispatch(campaignsListAction());
  }, []);

  if (campaignsList === null) {
    return null;
  }

  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">Campaigns</h2>
      {campaignsList?.length ? <CampaignsList /> : <FirstCampaign />}
    </div>
  );
};

export default Campaigns;
