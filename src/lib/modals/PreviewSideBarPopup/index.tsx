import { SheetContent } from "@/lib/ui/sheet";
import { X } from "lucide-react";
import { useState } from "react";
import TestLLM from "./TestLLM";
import TestAudio from "./TestAudio";
import PreviewMenuBar from "./PreviewMenuBar";

const PreviewSideBarPopup = ({
  setIsPreviewSideBarPopup,
  setIsVoiceAssitantPopup,
}: any) => {
  const [menuBar, setMenuBar] = useState("testaudio");
  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsPreviewSideBarPopup(null)}
        />
      </div>
      <PreviewMenuBar setMenuBar={setMenuBar} menuBar={menuBar} />
      {menuBar === "testaudio" && (
        <TestAudio
          setIsVoiceAssitantPopup={setIsVoiceAssitantPopup}
          setIsPreviewSideBarPopup={setIsPreviewSideBarPopup}
        />
      )}
      {menuBar === "testllm" && <TestLLM />}
    </SheetContent>
  );
};

export default PreviewSideBarPopup;
