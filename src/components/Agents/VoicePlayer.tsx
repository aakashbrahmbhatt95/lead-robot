import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const VoicePlayer = ({ ele }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const handlePlayPause = (e: any) => {
    e.stopPropagation();

    if (!audio) {
      const newAudio = new Audio(ele?.preview_audio_url);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);

      // Reset when audio finishes playing
      newAudio.onended = () => {
        setIsPlaying(false);
      };
    } else if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="bg-[#F4F4F5] rounded ml-3 w-fit p-2 cursor-pointer"
      onClick={handlePlayPause}
    >
      {isPlaying ? (
        <Pause fill="black" width={12} height={12} />
      ) : (
        <Play fill="black" width={12} height={12} />
      )}
    </div>
  );
};

export default VoicePlayer;
