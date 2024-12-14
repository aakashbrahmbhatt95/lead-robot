import { SheetContent } from "@/lib/ui/sheet";
import { X } from "lucide-react";
import VersionHistory from "@/components/Agents/VersionHistory";

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
      <VersionHistory />
    </SheetContent>
  );
};

export default AgentSettingsPopup;
