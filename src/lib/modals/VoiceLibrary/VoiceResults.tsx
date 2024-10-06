import { Button } from "@/lib/ui/button";
import { Play } from "lucide-react";

const VoiceResults = ({ filters, filteredVoices }: any) => {
  return (
    <div className="border-[1px] border-[#E4E4E7] rounded">
      <div className="m-3 flex flex-wrap gap-2">
        {filters.voice_provider !== "all_providers" && (
          <Button type="button" className="capitalize">{filters.voice_provider}</Button>
        )}
        {filters.accent !== "all_accents" && (
          <Button type="button" className="capitalize">{filters.accent}</Button>
        )}
        {filters.gender !== "all_genders" && (
          <Button type="button" className="capitalize">{filters.gender}</Button>
        )}
        {filters.age !== "all_ages" && (
          <Button type="button" className="capitalize">{filters.age}</Button>
        )}
        {filters.voice_provider === "all_providers" &&
          filters.accent === "all_accents" &&
          filters.gender === "all_genders" &&
          filters.age === "all_ages" && <Button type="button">All</Button>}
      </div>

      <p className="border-t-[1px] border-[#E4E4E7] p-3">Results</p>
      <div className="p-3">
        {filteredVoices.map((ele: any, index: any, array: any) => {
          return (
            <div
              key={index}
              className={`flex mt-2 ${index !== array.length - 1 ? "border-b-[1px]" : ""} border-[#E4E4E7]`}
            >
              <div className="w-3/4 flex flex-col gap-2 pb-4">
                <div className="text-sm font-semibold pl-2 flex items-center gap-3">
                  <img src={ele?.avatar_url} alt="" width={25} height={25} />{" "}
                  {ele?.voice_name}
                </div>
                <p className="font-medium text-xs text-[#71717A] mt-3 capitalize">
                  {ele?.provider} &nbsp;&nbsp;{ele?.accent} &nbsp;&nbsp;{" "}
                  {ele?.gender}
                  &nbsp;&nbsp; {ele?.age} &nbsp;&nbsp; {ele?.voice_type}
                </p>
              </div>
              <div className="w-1/4 flex justify-end items-center">
                <div
                  className="bg-[#F4F4F5] rounded h-fit p-2 mr-2 cursor-pointer"
                  onClick={() => {
                    const audio = new Audio(ele?.preview_audio_url);
                    audio.play();
                  }}
                >
                  <Play fill="black" width={12} height={12} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VoiceResults;
