import { Button } from "@/lib/ui/button";
import { Mic } from "lucide-react";

const TestAudio = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-5">
      <Mic width={80} height={80} color="lightgray" />
      <p className="text-lg font-medium">Test your agent</p>
      <a href="/livekit-audio" className="text-lg font-medium" target="_blank">
        Test
      </a>
    </div>
  );
};

export default TestAudio;
