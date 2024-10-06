import { useEffect, useState } from "react";
import { DialogContent, DialogHeader } from "@/lib/ui/dialog";
import { getVoiceList } from "./helper";
import VoiceFilters from "./VoiceFilters";
import { Button } from "@/lib/ui/button";
import VoiceResults from "./VoiceResults";

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
      <VoiceFilters handleSelectChange={handleSelectChange} />
      <VoiceResults filters={filters} filteredVoices={filteredVoices} />
      <div className="flex justify-end p-3">
        <Button>Select</Button>
      </div>
    </DialogContent>
  );
};

export default VoiceLibrary;