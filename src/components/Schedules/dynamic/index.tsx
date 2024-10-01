import { Switch } from "@/lib/ui/switch";
import { editCampaignsAction } from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const Dynamic = () => {
  const dispatch = useAppDispatch();
  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  return (
    <div>
      <p className="text-sm mt-[25px] font-normal text-[#71717A]">
        Allow this campaign to be initiated by triggers and actions from other
        campaigns.
      </p>
      <div className="flex items-center mt-5">
        <Switch
          checked={campaignDataById.dynamic_active}
          onCheckedChange={(checked) => {
            dispatch(
              editCampaignsAction(
                { ...campaignDataById, dynamic_active: checked },
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
