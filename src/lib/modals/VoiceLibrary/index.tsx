import { Button } from "@/lib/ui/button";
import { DialogContent, DialogHeader } from "@/lib/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getVoiceList } from "./helper";

const VoiceLibrary = () => {
  const [voicesList, setVoicesList] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [filters, setFilters] = useState({
    voice_provider: "all_providers",
    accent: "all_accents",
    gender: "all_genders",
    age: "all_ages",
  });

  useEffect(() => {
    getVoiceList(setVoicesList);
  }, []);

  useEffect(() => {
    const filtered = voicesList.filter((voice: any) => {
      return (
        (filters.voice_provider === "all_providers" ||
          voice.provider === filters.voice_provider) &&
        (filters.accent === "all_accents" || voice.accent === filters.accent) &&
        (filters.gender === "all_genders" || voice.gender === filters.gender) &&
        (filters.age === "all_ages" || voice.age === filters.age)
      );
    });
    setFilteredVoices(filtered);
  }, [voicesList, filters]);

  const handleSelectChange = (filterType: any, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <DialogContent className="sm:max-w-[40%] max-h-[75%] overflow-scroll">
      <DialogHeader>
        <p className="text-center text-lg font-semibold">Voice Library</p>
      </DialogHeader>
      <p className="text-[#71717A] text-sm font-normal">
        Find your perfect voice
      </p>
      <div className="flex items-center justify-between">
        <Select
          name="voice_provider"
          onValueChange={(value) => handleSelectChange("voice_provider", value)}
        >
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Voice Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_providers">All Providers</SelectItem>
            <SelectItem value="elevenlabs">Eleven Labs</SelectItem>
            <SelectItem value="deepgram">Deepgram</SelectItem>
            <SelectItem value="openai">Open AI</SelectItem>
          </SelectContent>
        </Select>

        <Select
          name="accent"
          onValueChange={(value) => handleSelectChange("accent", value)}
        >
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Accent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_accents">All Accents</SelectItem>
            <SelectItem value="American">American</SelectItem>
            <SelectItem value="British">British</SelectItem>
          </SelectContent>
        </Select>

        <Select
          name="gender"
          onValueChange={(value) => handleSelectChange("gender", value)}
        >
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_genders">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select
          name="age"
          onValueChange={(value) => handleSelectChange("age", value)}
        >
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_ages">All Ages</SelectItem>
            <SelectItem value="Young">Young</SelectItem>
            <SelectItem value="Middle Aged">Middle Aged</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border-[1px] border-[#E4E4E7] rounded">
        <Button type="button" className="m-3">
          All
        </Button>

        <p className="border-t-[1px] border-[#E4E4E7] p-3">Results</p>
        <div className="p-3">
          {filteredVoices.map((ele: any, index, array) => {
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
                    {ele?.provider} &nbsp;&nbsp;{ele?.accent} &nbsp;&nbsp; {ele?.gender}
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
      <div className="flex justify-end p-3">
        <Button>Select</Button>
      </div>
    </DialogContent>
  );
};

export default VoiceLibrary;
