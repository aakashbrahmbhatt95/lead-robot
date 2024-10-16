import { SheetContent } from "@/lib/ui/sheet";
import { X } from "lucide-react";
import { Accordion } from "@/lib/ui/accordion";
import SpeechSettings from "./SpeechSettings";
import CallSettings from "./CallSettings";
import SecuritySettings from "./SecuritySettings";

const AgentSettingsPopup = ({
  setIsAgentSettingsPopup,
  formik,
  voicesList,
  setVoicesList,
}: any) => {
  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsAgentSettingsPopup(null)}
        />
      </div>
      <Accordion type="single" collapsible className="w-full mt-3">
        <SpeechSettings formik={formik} />
        <CallSettings formik={formik} />
        <SecuritySettings
          formik={formik}
          voicesList={voicesList}
          setVoicesList={setVoicesList}
        />
      </Accordion>
    </SheetContent>
  );
};

export default AgentSettingsPopup;
