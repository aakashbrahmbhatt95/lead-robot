import { Button } from "@/lib/ui/button";
import { Mic } from "lucide-react";

const TestAudio = () => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-5">
      <Mic width={80} height={80} color="lightgray" />
      <p className="text-lg font-medium">Test your agent</p>
      <Button type="button" className="text-lg font-medium" variant="outline">
        Test
      </Button>
    </div>
  );
};

export default TestAudio;
