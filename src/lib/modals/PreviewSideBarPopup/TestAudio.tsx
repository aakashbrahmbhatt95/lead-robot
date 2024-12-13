"use client";

import { Mic } from "lucide-react";
import { useParams } from "next/navigation";

const TestAudio = ({
  setIsPreviewSideBarPopup,
}: any) => {
  const params = useParams()
  return (
    <div
      className="h-[80vh] flex flex-col items-center justify-center gap-5 cursor-pointer"
      onClick={() => {
        window.open(`/agents/${params?.id}`, "_blank");
        setIsPreviewSideBarPopup(null);
      }}
    >
      <Mic width={80} height={80} color="lightgray" />
      <p className="text-lg font-medium">Test your agent</p>
    </div>
  );
};

export default TestAudio;
