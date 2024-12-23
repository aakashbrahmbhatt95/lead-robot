import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { RadioGroup, RadioGroupItem } from "@/lib/ui/radio-group";
import { Switch } from "@/lib/ui/switch";
import { useFormik } from "formik";
import AgentCallSettingSlider from "./AgentCallSettingSlider";
import { Button } from "@/lib/ui/button";
import { useEffect, useState } from "react";
import {
  getCallSettings,
  intialCallSettingsState,
  updateCallSettings,
} from "./helper";
import { useParams } from "next/navigation";

const CallSettingsTab = () => {
  const params = useParams();
  const [callSettings, setCallSettings] = useState(intialCallSettingsState);

  useEffect(() => {
    getCallSettings(setCallSettings, params?.id);
  }, []);

  useEffect(() => {
    formik.setValues({
      ...callSettings,
    });
  }, [callSettings]);

  const formik = useFormik({
    initialValues: { callSettings },
    onSubmit: (values: any) => {
      updateCallSettings(
        {
          end_call_after_silence_ms: values?.end_call_after_silence_ms,
          max_call_duration_ms: values?.max_call_duration_ms,
          reminder_trigger_ms: values?.reminder_trigger_ms,
          reminder_max_count: values?.reminder_max_count,
          enable_voicemail_detection: values?.enable_voicemail_detection,
          voicemail_message: values?.voicemail_message,
          voicemail_detection_timeout_ms:
            values?.voicemail_detection_timeout_ms,
          opt_out_sensitive_data_storage:
            values?.opt_out_sensitive_data_storage,
          enable_transcription_formatting:
            values?.enable_transcription_formatting,
        },
        setCallSettings,
        params?.id
      );
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center gap-8 mt-8">
        <Label className="w-[250px]">Reminder max count : </Label>
        <Input
          className="w-[100px]"
          name="reminder_max_count"
          value={formik.values.reminder_max_count}
          onChange={(e: any) => {
            const phonePattern = /^[+]?[0-9]*$/; // Accepts digits and optional '+' at the start
            if (phonePattern.test(e.target.value)) {
              formik.handleChange(e); // Update form value if input is valid
            }
          }}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex items-center gap-8 mt-3">
        <Label className="w-[250px]">Voicemail detection : </Label>
        <Switch
          className="mt-2"
          name="enable_voicemail_detection"
          checked={formik.values.enable_voicemail_detection}
          onCheckedChange={(checked: any) =>
            formik.setFieldValue("enable_voicemail_detection", checked)
          }
        />
      </div>
      <div className="flex items-center gap-8 mt-3">
        <Label className="w-[250px]">Opt out sensitive data storage : </Label>
        <Switch
          className="mt-2"
          name="opt_out_sensitive_data_storage"
          checked={formik.values.opt_out_sensitive_data_storage}
          onCheckedChange={(checked: any) =>
            formik.setFieldValue("opt_out_sensitive_data_storage", checked)
          }
        />
      </div>
      <div className="flex items-center gap-8 mt-3">
        <Label className="w-[250px]">Enable transcription formatting : </Label>
        <Switch
          className="mt-2"
          name="enable_transcription_formatting"
          checked={formik.values.enable_transcription_formatting}
          onCheckedChange={(checked: any) =>
            formik.setFieldValue("enable_transcription_formatting", checked)
          }
        />
      </div>
      <div className="flex items-center gap-8 mt-3">
        <Label className="w-[250px]">Voicemail Message</Label>
        <RadioGroup
          name="voicemail_message"
          className="mt-2"
          value={formik.values.voicemail_message}
          onValueChange={(value: any) =>
            formik.setFieldValue("voicemail_message", value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Hang up if reaching voicemail</Label>
          </div>
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Leave a message if reaching voicemail</Label>
          </div>
        </RadioGroup>
      </div>
      <AgentCallSettingSlider
        heading="End call on silence :"
        keyName="end_call_after_silence_ms"
        formik={formik}
        min={1000}
        max={1000000}
        step={1000}
      />
      <AgentCallSettingSlider
        heading="Max call duration :"
        keyName="max_call_duration_ms"
        formik={formik}
        min={1000}
        max={1000000}
        step={1000}
      />
      <AgentCallSettingSlider
        heading="Reminder trigger :"
        keyName="reminder_trigger_ms"
        formik={formik}
        min={1000}
        max={1000000}
        step={1000}
      />

      <AgentCallSettingSlider
        heading="Voicemail detection range :"
        keyName="voicemail_detection_timeout_ms"
        formik={formik}
        min={1000}
        max={1000000}
        step={1000}
        marginTop="mt-2"
      />
      <div className="flex justify-end mt-5">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CallSettingsTab;
