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

const AdvancedSettings = ({ formik }: any) => {
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>Advanced settings</AccordionTrigger>
      <AccordionContent>
        <div className="mt-3">
          <Label>Ambient Sound</Label>
          <div className="mt-1">
            <Select
              name="type"
              defaultValue={formik.values.type}
              onValueChange={(value) => formik.setFieldValue("type", value)}
            >
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
        </div>
        <div className="mt-3">
          <Label>Responsiveness</Label>
          <div className="flex justify-between my-2">
            <p className="text-[#71717A] text-sm font-normal">Slow</p>
            <p className="text-[#71717A] text-sm font-normal">Fast</p>
          </div>
          <Slider defaultValue={[20]} max={100} step={1} className="w-full" />
        </div>
        <div className="mt-3">
          <Label>Interruption Sensitivity (1.00)</Label>
          <div className="flex justify-between my-2">
            <p className="text-[#71717A] text-sm font-normal">Low</p>
            <p className="text-[#71717A] text-sm font-normal">High</p>
          </div>
          <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
          <p className="text-[#71717A] text-sm font-normal mt-2">
            Control how sensitively AI can be interrupted by human speech.
          </p>
        </div>
        <div className="mt-3">
          <Label>Voice Speed (1.00)</Label>
          <div className="flex justify-between my-2">
            <p className="text-[#71717A] text-sm font-normal">Slow</p>
            <p className="text-[#71717A] text-sm font-normal">Fast</p>
          </div>
          <Slider defaultValue={[40]} max={100} step={1} className="w-full" />
        </div>
        <div className="mt-3">
          <Label>Voice Temperature (1.00)</Label>
          <div className="flex justify-between my-2">
            <p className="text-[#71717A] text-sm font-normal">Calm</p>
            <p className="text-[#71717A] text-sm font-normal">Emotional</p>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
        </div>
        <div className="mt-3">
          <Label>Boosted Keywords</Label>
          <Input
            type="text"
            name="name"
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            placeholder={`Enter keywords, split with ","`}
          />
        </div>
        <p className="text-[#71717A] text-sm font-normal mt-2">
          {" "}
          Provide a customized list of keywords to expand our models'
          vocabulary. (ex. Retell,Walmart)
        </p>
        <div className="mt-3">
          <Label>Reminder to speak message frequency</Label>
          <Input
            type="text"
            name="name"
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <div className="mt-3">
          <p className="text-[#71717A] text-sm font-normal mt-2">
            Seconds (user is silent)
          </p>
          <Input
            type="text"
            name="name"
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            placeholder={`Enter keywords, split with ","`}
          />
        </div>
        <p className="text-[#71717A] mt-2">Times (if there is no response)</p>
        <div className="mt-3 flex justify-between items-center">
          <Label>Enable Backchannel (Beta)</Label>
          <Switch />
        </div>
        <p className="text-[#71717A] text-sm font-normal mt-2">
          Enables the agent to use affirmations like "yeah" or "uh-huh" during
          conversations, indicating active listening and engagement.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AdvancedSettings;
