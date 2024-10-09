import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Slider } from "@/lib/ui/slider";
import { Switch } from "@/lib/ui/switch";
import { useAppSelector } from "@/redux/store";
import { Settings, Speech } from "lucide-react";

const SpeechSettings = ({ formik }: any) => {
  const { ambientSoundsList }: any = useAppSelector(
    (state: any) => state.agentsReducer
  );

  return (
    <AccordionItem value="speechsettings">
      <AccordionTrigger>
        <div className="flex gap-3">
          <Speech /> Speech Settings
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-3">
          <Label>Background Sound</Label>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-[90%]">
              <Select
                name="ambient_sound"
                value={formik.values.ambient_sound}
                onValueChange={(value) =>
                  formik.setFieldValue("ambient_sound", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sound" />
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
            <div>
              <Settings width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Label>Responsiveness</Label>
          <Slider
            value={[formik.values.responsiveness]}
            onValueChange={(value) =>
              formik.setFieldValue("responsiveness", value[0])
            }
            max={100}
            step={1}
            className="w-full mt-3"
          />
          <div className="flex justify-between my-2">
            <p className="text-[#71717A] text-sm font-normal">Slow</p>
            <p className="text-[#71717A] text-sm font-normal">Fast</p>
          </div>
        </div>
        <div className="mt-8">
          <Label>Interruption Sensitivity (1.00)</Label>
          <p className="text-[#71717A] text-sm font-normal">
            Control how sensitively AI can be interrupted by human speech.
          </p>
          <Slider
            value={[formik.values.interruption_sensitivity]}
            onValueChange={(value) =>
              formik.setFieldValue("interruption_sensitivity", value[0])
            }
            max={100}
            step={1}
            className="w-full mt-3"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <Label>Enable Backchannel</Label>
          <Switch
            className="mt-2"
            name="enable_backchannel"
            checked={formik.values.enable_backchannel}
            onCheckedChange={(checked) =>
              formik.setFieldValue("enable_backchannel", checked)
            }
          />
        </div>
        <p className="text-[#71717A] text-sm font-normal mt-2">
          Enables the agent to use affirmations like "yeah" or "uh-huh" during
          conversations, indicating active listening and engagement.
        </p>
        <div className="p-3 mt-8 bg-[#E9F9FE] rounded">
          <div className="">
            <Label>Backchannel Frequency</Label>
            <Slider
              value={[formik.values.backchannel_frequency]}
              onValueChange={(value) =>
                formik.setFieldValue("backchannel_frequency", value[0])
              }
              max={100}
              step={1}
              className="w-full mt-3"
            />
          </div>
          <div className="mt-8">
            <Label>Backchannel Words</Label>
            <p className="text-[#71717A] text-sm font-normal mt-2">
              A list of words that the agent would use for Backchanneling.
              (Learn more)
            </p>
            <Input
              type="text"
              name="backchannel_words"
              className="mt-2 focus-visible:outline-none focus-visible:ring-0"
              placeholder="Split by comma. Example: yeah, uh-huh, okay"
              value={formik?.values?.backchannel_words}
              onChange={(e) =>
                formik.setFieldValue("backchannel_words", e.target.value)
              }
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="mt-8">
          <Label>Boosted Keywords</Label>
          <p className="text-[#71717A] text-sm font-normal mt-2">
            Provide a customized list of keywords to expand our models'
            vocabulary.
          </p>
          <Input
            type="text"
            name="boosted_keywords"
            className="mt-2 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Split by comma. Example: Adidas, Coca-cola"
            value={formik.values.boosted_keywords}
            onChange={(e) =>
              formik.setFieldValue("boosted_keywords", e.target.value)
            }
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mt-8">
          <Label>Enable Speech Normalization</Label>
          <p className="text-[#71717A] text-sm font-normal mt-2">
            It converts text elements like numbers, currency, and dates into
            human-like spoken forms. (Learn more)
          </p>
          <Switch
            className="mt-2"
            name="normalize_for_speech"
            checked={formik.values.normalize_for_speech}
            onCheckedChange={(checked) =>
              formik.setFieldValue("normalize_for_speech", checked)
            }
          />
        </div>
        <div className="mt-8">
          <Label>Reminder Message Frequency</Label>
          <p className="text-[#71717A] text-sm font-normal mt-2">
            Control how often AI will send a reminder message.
            <div className="flex gap-3 mt-2">
              <Input
                type="number"
                className="w-[100px]"
                name="reminder_trigger_ms"
                value={formik.values.reminder_trigger_ms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-[#71717A] text-sm font-normal mt-2">seconds</p>
              <Input
                type="number"
                className="w-[100px]"
                name="reminder_max_count"
                value={formik.values.reminder_max_count}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-[#71717A] text-sm font-normal mt-2">times</p>
            </div>
          </p>
          <Switch
            className="mt-2"
            name="enable_transcription_formatting"
            checked={formik.values.enable_transcription_formatting}
            onCheckedChange={(checked) =>
              formik.setFieldValue("enable_transcription_formatting", checked)
            }
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SpeechSettings;
