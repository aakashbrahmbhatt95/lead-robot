import { Button } from "@/lib/ui/button";
import { Play, X } from "lucide-react";

const VoiceResults = ({
  filters,
  filteredVoices,
  handleSelectChange,
  selectedVoice,
  setSelectedVoice,
}: any) => {
  return (
    <div className="border-[1px] border-[#E4E4E7] rounded">
      <div className="m-3 flex flex-wrap gap-2">
        {filters.voice_provider !== "all_providers" && (
          <Button type="button" className="capitalize">
            {filters.voice_provider}
            <X
              className="ml-2"
              color="white"
              width={14}
              height={14}
              onClick={() =>
                handleSelectChange("voice_provider", "all_providers")
              }
            />
          </Button>
        )}
        {filters.accent !== "all_accents" && (
          <Button type="button" className="capitalize">
            {filters.accent}
            <X
              className="ml-2"
              color="white"
              width={14}
              height={14}
              onClick={() => handleSelectChange("accent", "all_accents")}
            />
          </Button>
        )}
        {filters.gender !== "all_genders" && (
          <Button type="button" className="capitalize">
            {filters.gender}
            <X
              className="ml-2"
              color="white"
              width={14}
              height={14}
              onClick={() => handleSelectChange("gender", "all_genders")}
            />
          </Button>
        )}
        {filters.age !== "all_ages" && (
          <Button type="button" className="capitalize">
            {filters.age}
            <X
              className="ml-2"
              color="white"
              width={14}
              height={14}
              onClick={() => handleSelectChange("age", "all_ages")}
            />
          </Button>
        )}
        {filters.voice_provider === "all_providers" &&
          filters.accent === "all_accents" &&
          filters.gender === "all_genders" &&
          filters.age === "all_ages" && <Button type="button">All</Button>}
      </div>

      <p className="border-t-[1px] border-[#E4E4E7] p-3">Results</p>
      <div className="p-3">
        {filteredVoices.map((ele: any, index: any, array: any) => {
          const isSelected = selectedVoice && selectedVoice === ele.voice_id;

          return (
            <div
              key={index}
              className={`flex mt-2 p-3 rounded-lg cursor-pointer 
              ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white"} 
              ${index !== array.length - 1 ? "border-b-[1px]" : ""} border-[#E4E4E7]`}
              onClick={() => setSelectedVoice(ele?.voice_id)}
            >
              <div className="w-3/4 flex flex-col gap-2 pb-4">
                <div
                  className={`text-sm font-semibold pl-2 flex items-center gap-3 
                  ${isSelected ? "text-blue-700" : "text-black"}`}
                >
                  <img src={ele?.avatar_url} alt="" width={25} height={25} />{" "}
                  {ele?.voice_name}
                </div>
                <p
                  className={`font-medium text-xs mt-3 capitalize 
                ${isSelected ? "text-blue-500" : "text-[#71717A]"}`}
                >
                  {ele?.provider} &nbsp;&nbsp;{ele?.accent} &nbsp;&nbsp;{" "}
                  {ele?.gender}
                  &nbsp;&nbsp; {ele?.age} &nbsp;&nbsp; {ele?.voice_type}
                </p>
              </div>
              <div className="w-1/4 flex justify-end items-center">
                <div
                  className="bg-[#F4F4F5] rounded h-fit p-2 mr-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
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
