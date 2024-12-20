import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AgentSlider from "./AgentSlider";
import { useEffect } from "react";
import {
  getRealTimeModelsListAction,
  getRealTimeResponseModalitiesListAction,
  getRealTimeTranscriptionsListAction,
  getRealTimeTurnDetectionListAction,
  getRealTimeVoicesListAction,
} from "@/redux/action/agents-action";

const RealTimeSettings = ({ formik }: any) => {
  const dispatch = useAppDispatch();
  const {
    realTimeTurnDetectionList,
    realTimeResponseModalitiesList,
    realTimeTranscriptionsList,
    realTimeModelsList,
    realTimeVoicesList,
  }: any = useAppSelector((state: any) => state.agentsReducer);

  useEffect(() => {
    dispatch(getRealTimeVoicesListAction());
    dispatch(getRealTimeModelsListAction());
    dispatch(getRealTimeTranscriptionsListAction());
    dispatch(getRealTimeResponseModalitiesListAction());
    dispatch(getRealTimeTurnDetectionListAction());
  }, []);

  return (
    <div className="px-4 border-[1px] border-[#E4E4E7] pb-4 rounded">
      <div className="mt-2">
        <Label>Model</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="model"
            value={formik.values.model}
            onValueChange={(value: any) => formik.setFieldValue("model", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {realTimeModelsList?.map((ele: any) => (
                <SelectItem key={ele?.value} value={ele?.value}>
                  {ele?.label}
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
            name="transcription"
            value={formik.values.transcription}
            onValueChange={(value: any) =>
              formik.setFieldValue("transcription", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transaction" />
            </SelectTrigger>
            <SelectContent>
              {realTimeTranscriptionsList?.map((ele: any) => (
                <SelectItem key={ele?.value} value={ele?.value}>
                  {ele?.label}
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
            name="voice"
            value={formik.values.voice}
            onValueChange={(value: any) => formik.setFieldValue("voice", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {realTimeVoicesList?.map((ele: any) => (
                <SelectItem key={ele?.voice_id} value={ele?.voice_id}>
                  {ele?.voice_name}
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
            name="response_modalities"
            value={formik.values.response_modalities}
            onValueChange={(value: any) =>
              formik.setFieldValue("response_modalities", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select response modalities" />
            </SelectTrigger>
            <SelectContent>
              {realTimeResponseModalitiesList?.map((ele: any) => (
                <SelectItem key={ele?.value} value={ele?.value}>
                  {ele?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AgentSlider
        heading="Temperature"
        keyName="temperature"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
      <div className="mt-3">
        <Label>Max output tokens</Label>
        <Input
          type="text"
          name="max_output_tokens"
          className="mt-2 focus-visible:outline-none focus-visible:ring-0"
          placeholder="No limit"
          value={formik.values.max_output_tokens}
          onChange={(e) => {
            const phonePattern = /^[+]?[0-9]*$/;
            if (phonePattern.test(e.target.value)) {
              formik.setFieldValue("max_output_tokens", e.target.value);
            }
          }}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="mt-2">
        <Label>Turn Detection</Label>
        <div className="w-[100%] mt-2">
          <Select
            name="turn_detection"
            value={formik.values.turn_detection}
            onValueChange={(value: any) =>
              formik.setFieldValue("turn_detection", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select turn detection" />
            </SelectTrigger>
            <SelectContent>
              {realTimeTurnDetectionList?.map((ele: any) => (
                <SelectItem key={ele?.value} value={ele?.value}>
                  {ele?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AgentSlider
        heading="Threshold"
        keyName="threshold"
        formik={formik}
        min={0}
        max={1}
        step={0.01}
      />
      <AgentSlider
        heading="Prefix Padding (ms)"
        keyName="prefix_ms"
        formik={formik}
        min={100}
        max={10000}
        step={100}
      />
      <AgentSlider
        heading="Silence Duration (ms)"
        keyName="silence_duration_ms"
        formik={formik}
        min={100}
        max={10000}
        step={100}
      />
    </div>
  );
};

export default RealTimeSettings;
