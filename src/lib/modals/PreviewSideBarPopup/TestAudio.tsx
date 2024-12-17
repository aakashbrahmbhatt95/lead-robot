"use client";

import { Mic } from "lucide-react";

const TestAudio = ({
  setIsVoiceAssitantPopup,
  setIsPreviewSideBarPopup,
}: any) => {
  return (
    <div
      className="h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-5 p-[45px] rounded-[50%] bg-[#f0efef] cursor-pointer" 
      // onClick={() => {
      //   setIsVoiceAssitantPopup(true);
      //   setIsPreviewSideBarPopup(null);
      // }}
      >
        <Mic width={80} height={80} color="lightgray" />
        <p className="text-lg font-medium">Test your agent</p>
      </div>
    </div>
  );
};

export default TestAudio;
