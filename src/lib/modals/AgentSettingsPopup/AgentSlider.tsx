import { Label } from "@/lib/ui/label";
import { Slider } from "@/lib/ui/slider";

const AgentSlider = ({ formik, heading, min, max, step, keyName, marginTop }: any) => {
  return (
    <div className={marginTop ? marginTop : "mt-8"}>
      <Label htmlFor={heading} className="flex justify-between">
        <span>{heading}</span>
        <span>{formik.values[keyName]}</span>
      </Label>
      <Slider
        id={heading}
        value={[formik.values[keyName]]}
        onValueChange={(value) => formik.setFieldValue(keyName, value[0])}
        max={max}
        min={min}
        step={step}
        className="w-full mt-3"
      />
      <div className="flex justify-between mt-1 text-sm text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default AgentSlider;
