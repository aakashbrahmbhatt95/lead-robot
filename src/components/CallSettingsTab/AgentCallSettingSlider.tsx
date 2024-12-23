import { Label } from "@/lib/ui/label";
import { Slider } from "@/lib/ui/slider";

const AgentCallSettingSlider = ({
  formik,
  heading,
  min,
  max,
  step,
  keyName,
}: any) => {
  return (
    <div className="flex items-center gap-8 mt-5">
      <Label className="min-w-[250px]">
        <span>{heading}</span>
      </Label>
      <div>
        <div className="flex justify-center">
          <span className="font-bold">{formik.values[keyName]}</span>
        </div>
        <div className="w-full flex items-center gap-8">
          <span>{min}</span>
          <Slider
            id={heading}
            value={[formik.values[keyName]]}
            onValueChange={(value: any) =>
              formik.setFieldValue(keyName, value[0])
            }
            className="w-[300px]"
            max={max}
            min={min}
            step={step}
          />
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCallSettingSlider;
