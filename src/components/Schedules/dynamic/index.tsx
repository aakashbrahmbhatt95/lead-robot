import { Switch } from "@/lib/ui/switch";

const Dynamic = () => {
 
  return (
    <div className="flex">
      <div className="basis-3/4">
        <div className="flex items-center mt-5">
          <Switch checked={true} />
          <label className="block pl-2 text-sm font-medium text-gray-700">
            On
          </label>
        </div>

      </div>

    </div>
  );
};

export default Dynamic;
