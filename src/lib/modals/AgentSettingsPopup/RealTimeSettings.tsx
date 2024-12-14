import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { useAppSelector } from "@/redux/store";
import AgentSlider from "./AgentSlider";

const RealTimeSettings = ({ formik }: any) => {
  const { ambientSoundsList }: any = useAppSelector(
    (state: any) => state.agentsReducer
  );

  return (
    <div className="px-4 border-[1px] border-[#E4E4E7] pb-4 rounded">
      <div className="mt-2">
        <Label>Model</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="realtime_model"
            value={formik.values.realtime_model}
            onValueChange={(value: any) =>
              formik.setFieldValue("realtime_model", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {ambientSoundsList?.map((ele: any) => (
                <SelectItem key={ele[0]} value={ele[0]}>
                  {ele[1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-2">
        <Label>Transcription</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="realtime_transaction"
            value={formik.values.realtime_transaction}
            onValueChange={(value: any) =>
              formik.setFieldValue("realtime_transaction", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transaction" />
            </SelectTrigger>
            <SelectContent>
              {ambientSoundsList?.map((ele: any) => (
                <SelectItem key={ele[0]} value={ele[0]}>
                  {ele[1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-2">
        <Label>Voice</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="realtime_voice"
            value={formik.values.realtime_voice}
            onValueChange={(value: any) =>
              formik.setFieldValue("realtime_voice", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {ambientSoundsList?.map((ele: any) => (
                <SelectItem key={ele[0]} value={ele[0]}>
                  {ele[1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-2">
        <Label>Response modalities</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="realtime_response_modalities"
            value={formik.values.realtime_response_modalities}
            onValueChange={(value: any) =>
              formik.setFieldValue("realtime_response_modalities", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select response modalities" />
            </SelectTrigger>
            <SelectContent>
              {ambientSoundsList?.map((ele: any) => (
                <SelectItem key={ele[0]} value={ele[0]}>
                  {ele[1]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AgentSlider
        heading="Temperature"
        keyName="realtime_temperature"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
      <div className="mt-3">
        <Label>Max output tokens</Label>
        <Input
          type="text"
          name="realtime_maxOutputTokens"
          className="mt-2 focus-visible:outline-none focus-visible:ring-0"
          placeholder="No limit"
          value={formik.values.realtime_maxOutputTokens}
          onChange={(e) => {
            const phonePattern = /^[+]?[0-9]*$/;
            if (phonePattern.test(e.target.value)) {
              formik.setFieldValue("realtime_maxOutputTokens", e.target.value);
            }
          }}
          onBlur={formik.handleBlur}
        />
      </div>
      <AgentSlider
        heading="Threshold"
        keyName="realtime_threshold"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
      <AgentSlider
        heading="Prefix Padding (ms)"
        keyName="realtime_prefix_padding"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
      <AgentSlider
        heading="Silence Duration (ms)"
        keyName="realtime_silence_duration"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );
};

export default RealTimeSettings;
