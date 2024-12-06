import { Mic } from "lucide-react";

const TestAudio = ({
  setIsVoiceAssitantPopup,
  setIsPreviewSideBarPopup,
}: any) => {
  return (
    <div
      className="h-[80vh] flex flex-col items-center justify-center gap-5 cursor-pointer"
      onClick={() => {
        setIsVoiceAssitantPopup(true);
        setIsPreviewSideBarPopup(null);
      }}
    >
      <Mic width={80} height={80} color="lightgray" />
      <p className="text-lg font-medium">Test your agent</p>
    </div>
  );
};

export default TestAudio;
