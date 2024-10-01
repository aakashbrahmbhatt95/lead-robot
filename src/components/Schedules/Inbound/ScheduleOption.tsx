import { RadioGroup, RadioGroupItem } from "@/lib/ui/radio-group";
import { Label } from "@/lib/ui/label";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editCampaignsAction } from "@/redux/action/campaigns-action";

interface ScheduleOptionsProps {
  isAlwaysOn: string;
  setIsAlwaysOn: (value: string) => void;
}

const ScheduleOptions = ({
  isAlwaysOn,
  setIsAlwaysOn,
}: ScheduleOptionsProps) => {
  const dispatch = useAppDispatch();
  const { campaignDataById } = useAppSelector(
    (state: any) => state.campaignReducer
  );

  return (
    <>
      <p className="text-sm mt-[25px] font-normal text-[#71717A]">
        Switch inbound calls from always on 24/7, 365 days to scheduled.
      </p>

      <RadioGroup
        className="flex mt-4 gap-5"
        value={isAlwaysOn}
        onValueChange={(value) => {
          if (value === "isalwayson") {
            const isConfirmed = window.confirm(
              "Are you sure you want to set it as isAlwaysOn?"
            );

            if (isConfirmed) {
              dispatch(
                editCampaignsAction(
                  {
                    ...campaignDataById,
                    inbound_schedule_id: null,
                  },
                  campaignDataById?.id
                )
              );
            }
          } else {
            setIsAlwaysOn(value);
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="isalwayson" id="r1" />
          <Label htmlFor="r1" className="text-sm font-medium text-gray-700">
            Always On
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="scheduled" id="r2" />
          <Label htmlFor="r2" className="text-sm font-medium text-gray-700">
            Scheduled
          </Label>
        </div>
      </RadioGroup>
    </>
  );
};

export default ScheduleOptions;
