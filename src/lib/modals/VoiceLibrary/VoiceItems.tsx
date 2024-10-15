import { Play, Pause } from "lucide-react";

export const VoiceItem = ({
  voice,
  isSelected,
  isPlaying,
  onSelect,
  onPlayPause,
}: any) => {
  return (
    <div
      className={`flex mt-2 p-3 rounded-lg cursor-pointer 
      ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white"} 
      border-[#E4E4E7]`}
      onClick={onSelect}
    >
      <div className="w-3/4 flex flex-col gap-2 pb-4">
        <div
          className={`text-sm font-semibold pl-2 flex items-center gap-3 ${isSelected ? "text-blue-700" : "text-black"}`}
        >
          <img src={voice?.avatar_url} alt="" width={25} height={25} />{" "}
          {voice?.voice_name}
        </div>
        <p
          className={`font-medium text-xs mt-3 capitalize ${isSelected ? "text-blue-500" : "text-[#71717A]"}`}
        >
          {voice?.provider} &nbsp;&nbsp;{voice?.accent} &nbsp;&nbsp;{" "}
          {voice?.gender} &nbsp;&nbsp; {voice?.age} &nbsp;&nbsp;{" "}
          {voice?.voice_type}
        </p>
      </div>
      <div className="w-1/4 flex justify-end items-center">
        <div
          className="bg-[#F4F4F5] rounded h-fit p-2 mr-2 cursor-pointer"
          onClick={(e) => onPlayPause(e, voice)}
        >
          {isPlaying ? (
            <Pause fill="black" width={12} height={12} />
          ) : (
            <Play fill="black" width={12} height={12} />
          )}
        </div>
      </div>
    </div>
  );
};
