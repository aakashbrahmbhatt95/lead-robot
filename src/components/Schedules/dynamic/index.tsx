import { Switch } from "@/lib/ui/switch";
import { editCampaignsAction } from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

const Dynamic = () => {
  const dispatch = useAppDispatch();
  const [isDynamicActive, setIsDynamicActive] = useState(false);

  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    setIsDynamicActive(campaignDataById?.dynamic_active);
  }, [campaignDataById]);

  return (
    <div>
      <p className="text-sm mt-[25px] font-normal text-[#71717A]">
        Allow this campaign to be initiated by triggers and actions from other
        campaigns.
      </p>
      <div className="flex items-center mt-5">
        <Switch
          checked={isDynamicActive}
          onCheckedChange={(checked: any) => {
            dispatch(
              editCampaignsAction(
                {
                  ...campaignDataById,
                  dynamic_active: checked,
                  timezone:
                    campaignDataById?.timeZone === "None"
                      ? ""
                      : campaignDataById?.timeZone,
                },
                campaignDataById?.id
              )
            );
          }}
        />
        <label className="block pl-2 text-sm font-medium text-gray-700">
          On
        </label>
      </div>
    </div>
  );
};

export default Dynamic;
