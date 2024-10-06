import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";

const VoiceFilters = ({ handleSelectChange }: any) => {
  return (
    <div className="flex items-center justify-between">
      <Select
        name="voice_provider"
        onValueChange={(value) => handleSelectChange("voice_provider", value)}
      >
        <SelectTrigger className="w-[24%]">
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
        <SelectTrigger className="w-[24%]">
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
        <SelectTrigger className="w-[24%]">
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
        <SelectTrigger className="w-[24%]">
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
  );
};

export default VoiceFilters;
