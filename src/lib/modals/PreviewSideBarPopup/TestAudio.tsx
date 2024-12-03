import { Button } from "@/lib/ui/button";
import { generateLiveKitToken } from "@/utils/livekitToken";
import { Mic } from "lucide-react";

const TestAudio = () => {
  const handleJoinRoom = async () => {
    const roomName = "example-room"; // Replace with your desired room name
    const identity = `user-${Date.now()}`; // Replace with a unique identifier

    const token = await generateLiveKitToken(roomName, identity);
    console.log("token", token);
    const livekitUrl = `wss://sendcast-2tr69225.livekit.cloud?access_token=${token}`;
    window.open(livekitUrl, "_blank"); // Opens in a new tab
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-5">
      <Mic width={80} height={80} color="lightgray" />
      <p className="text-lg font-medium">Test your agent</p>
      <Button
        type="button"
        className="text-lg font-medium"
        variant="outline"
        onClick={handleJoinRoom}
      >
        Test
      </Button>
    </div>
  );
};

export default TestAudio;
