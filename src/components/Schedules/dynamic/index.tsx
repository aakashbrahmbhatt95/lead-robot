import { Switch } from "@/lib/ui/switch";

const Dynamic = () => {
  return (
    <div>
      <p className="text-sm mt-[25px] font-normal text-[#71717A]">
        Allow this campaign to be initiated by triggers and actions from other
        campaigns.
      </p>
      <div className="flex items-center mt-5">
        <Switch checked={true} />
        <label className="block pl-2 text-sm font-medium text-gray-700">
          On
        </label>
      </div>
    </div>
  );
};

export default Dynamic;
