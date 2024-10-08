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
import { Settings, Speech } from "lucide-react";

const SpeechSettings = () => {
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
              <Select name="type">
                <SelectTrigger>
                  <SelectValue placeholder="Select Sound" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
            defaultValue={[20]}
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
            defaultValue={[100]}
            max={100}
            step={1}
            className="w-full mt-3"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <Label>Enable Backchannel</Label>
        </div>
        <p className="text-[#71717A] text-sm font-normal mt-2">
          Enables the agent to use affirmations like "yeah" or "uh-huh" during
          conversations, indicating active listening and engagement.
        </p>
        <Switch className="mt-2" checked />
        <div className="p-3 mt-8 bg-[#E9F9FE] rounded">
          <div className="">
            <Label>Backchannel Frequency</Label>
            <Slider
              defaultValue={[100]}
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
              name="name"
              className="mt-2 focus-visible:outline-none focus-visible:ring-0"
              placeholder="Split by comma. Example: yeah, uh-huh, okay"
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
            name="name"
            className="mt-2 focus-visible:outline-none focus-visible:ring-0"
            placeholder="Split by comma. Example: Adidas, Coca-cola"
          />
        </div>
        <div className="mt-8">
          <Label>Enable Speech Normalization</Label>
          <p className="text-[#71717A] text-sm font-normal mt-2">
            It converts text elements like numbers, currency, and dates into
            human-like spoken forms. (Learn more)
          </p>
          <Switch className="mt-2" />
        </div>
        <div className="mt-8">
          <Label>Reminder Message Frequency</Label>
          <p className="text-[#71717A] text-sm font-normal mt-2">
            Control how often AI will send a reminder message.
            <div className="flex gap-3 mt-2">
              <Input type="number" className="w-[50px]" />
              <p className="text-[#71717A] text-sm font-normal mt-2">seconds</p>
              <Input type="number" className="w-[50px]" />
              <p className="text-[#71717A] text-sm font-normal mt-2">times</p>
            </div>
          </p>
          <Switch className="mt-2" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SpeechSettings;
