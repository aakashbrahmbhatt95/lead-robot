import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Label } from "@/lib/ui/label";
import { RadioGroup, RadioGroupItem } from "@/lib/ui/radio-group";
import { Slider } from "@/lib/ui/slider";
import { Switch } from "@/lib/ui/switch";
import { Textarea } from "@/lib/ui/textarea";
import { Headset } from "lucide-react";
import AgentSlider from "./AgentSlider";

const CallSettings = ({ formik }: any) => {
  return (
    <AccordionItem value="callsettings">
      <AccordionTrigger>
        <div className="flex gap-3">
          <Headset /> Call Settings
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-8">
          <Label>Voicemail Detection</Label>
          <p className="text-[#71717A] text-sm font-normal">
            Hang up or leave if a Voicemail is detected
          </p>
          <Switch
            className="mt-2"
            name="enable_voicemail_detection"
            checked={formik.values.enable_voicemail_detection}
            onCheckedChange={(checked: any) =>
              formik.setFieldValue("enable_voicemail_detection", checked)
            }
          />
        </div>
        <div className="p-4 mt-8 bg-[#E9F9FE] rounded">
          <RadioGroup
            name="voicemail_message"
            value={formik.values.voicemail_message}
            onValueChange={(value: any) =>
              formik.setFieldValue("voicemail_message", value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Hang up if reaching voicemail</Label>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Leave a message if reaching voicemail</Label>
            </div>
          </RadioGroup>

          <Textarea
            className="mt-3 focus-visible:outline-none focus-visible:ring-0"
            rows={3}
            placeholder="Message content, use {{}} to add variable"
            name="voicemail_content"
            value={formik.values.voicemail_content}
            onChange={formik.handleChange}
          />
          <p className="text-[#71717A] mt-4 text-sm font-normal">
            Set the duration to run for voicemail detection
          </p>
          <AgentSlider
            keyName="voicemail_detection_timeout_ms"
            formik={formik}
            min={1000}
            max={1000000}
            step={1000}
            marginTop="mt-2"
          />
        </div>
        <AgentSlider
          heading="End Call on Silence"
          keyName="end_call_after_silence_ms"
          formik={formik}
          min={1000}
          max={1000000}
          step={1000}
        />
        <AgentSlider
          heading="Max Call Duration"
          keyName="max_call_duration_ms"
          formik={formik}
          min={1000}
          max={1000000}
          step={1000}
        />
        <AgentSlider
          heading="Voice Temperature"
          keyName="voice_temperature"
          formik={formik}
          min={0}
          max={1}
          step={0.01}
        />
        <AgentSlider
          heading="Voice Speed"
          keyName="voice_speed"
          formik={formik}
          min={0}
          max={1}
          step={0.01}
        />
        <AgentSlider
          heading="Volume"
          keyName="volume"
          formik={formik}
          min={0}
          max={1}
          step={0.01}
        />
        <AgentSlider
          heading="Ambient Sound Volume"
          keyName="ambient_sound_volume"
          formik={formik}
          min={0}
          max={1}
          step={0.01}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default CallSettings;
