import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Mic } from "lucide-react";
import speaker from "@/../public/speaker.svg";
import Image from "next/image";
import LanguageSelection from "@/lib/modals/AgentPopup/LanguageSelection";
import { Label } from "@/lib/ui/label";
import { Textarea } from "@/lib/ui/textarea";
import VersionHistory from "./VersionHistory";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { languagesListAction } from "@/redux/action/global-action";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import VoiceLibrary from "@/lib/modals/VoiceLibrary";
import fill_arrowdown from "@/../public/fill_arrowdown.svg";
import { ambientSoundsListAction } from "@/redux/action/agents-action";
import { Sheet } from "@/lib/ui/sheet";
import AgentSettingsPopup from "@/lib/modals/AgentSettingsPopup";

const Agents = () => {
  const dispatch = useAppDispatch();
  const [isAgentSettingsPopup, setIsAgentSettingsPopup] = useState<any>(null);
  const [isVoiceLibrary, setIsVoiceLibrary] = useState(false);

  useEffect(() => {
    dispatch(languagesListAction());
    dispatch(ambientSoundsListAction());
  }, []);

  return (
    <div className="flex gap-4 mt-5">
      <div className="w-3/4">
        <Input
          placeholder="Search template"
          className=" w-full focus-visible:outline-none focus-visible:ring-0"
        />
        <div className="flex justify-between items-center mt-3">
          <p className="text-xl text-semibold">Voice</p>
          <Button
            type="button"
            variant="outline"
            className="flex gap-2 items-center"
            onClick={() =>
              setIsAgentSettingsPopup({
                isEdit: false,
              })
            }
          >
            <Mic width={20} height={20} /> Agent settings
          </Button>
        </div>
        <div className="flex items-center border-[1px] mt-4 p-[20px] border-[#E4E4E7] rounded">
          <div className="w-1/4 flex flex-col justify-center items-center">
            <Image width={96} height={96} src={speaker} alt="speaker" />
            <p className="text-[#71717A] text-sm font-normal mt-2 underline">
              Preview
            </p>
          </div>
          <div className="w-3/4">
            <LanguageSelection formik={{}} />
            <Dialog open={isVoiceLibrary} onOpenChange={setIsVoiceLibrary}>
              <DialogTrigger asChild onClick={() => setIsVoiceLibrary(true)}>
                <div className="mt-2 flex gap-2 items-center">
                  Voice
                  <Image src={fill_arrowdown} alt="arrowDown" />
                </div>
              </DialogTrigger>
              <VoiceLibrary />
            </Dialog>
          </div>
        </div>
        <p className="text-xl text-semibold mt-3">Agents personality</p>
        <div className="mt-5">
          <Label>Identity</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="identity"
            rows={7}
          />
        </div>
        <div className="mt-5">
          <Label>Style Guardrails</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="styleGuardrails"
            rows={7}
          />
        </div>
        <div className="mt-5">
          <Label>Response Guidelines</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="responseGuidelines"
            rows={7}
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button>Save Agent</Button>
        </div>
      </div>
      <div className="w-1/4">
        <VersionHistory />
      </div>
      <Sheet open={isAgentSettingsPopup !== null}>
        {isAgentSettingsPopup !== null && (
          <AgentSettingsPopup setIsAgentSettingsPopup={setIsAgentSettingsPopup} />
        )}
      </Sheet>
    </div>
  );
};

export default Agents;
