import { Button } from "@/lib/ui/button";
import { X } from "lucide-react";

export const FilterButtons = ({ filters, handleSelectChange }: any) => {
  return (
    <>
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
    </>
  );
};
