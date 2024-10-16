import { Button } from "@/lib/ui/button";
import { FilterButtons } from "./FilterButtons";
import { useVoicePlayer } from "./useVoicePlayer";
import { VoiceItem } from "./VoiceItems";

const VoiceResults = ({
  filters,
  filteredVoices,
  handleSelectChange,
  formik,
  keyName,
  setIsVoiceLibrary,
}: any) => {
  const { playingVoiceId, handlePlayPause } = useVoicePlayer();

  return (
    <>
      <div className="border-[1px] border-[#E4E4E7] rounded">
        <div className="m-3 flex flex-wrap gap-2">
          <FilterButtons
            filters={filters}
            handleSelectChange={handleSelectChange}
          />
        </div>

        <p className="border-t-[1px] border-[#E4E4E7] p-3">Results</p>
        <div className="p-3 max-h-[300px] overflow-y-auto">
          {filteredVoices.map((ele: any, index: any, array: any) => {
            const isSelected =
              formik?.values[keyName] &&
              formik?.values[keyName] === ele.voice_id;
            const isPlaying = playingVoiceId === ele.voice_id;

            return (
              <VoiceItem
                key={index}
                voice={ele}
                isSelected={isSelected}
                isPlaying={isPlaying}
                onSelect={() => formik.setFieldValue(keyName, ele?.voice_id)}
                onPlayPause={handlePlayPause}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-end sticky bottom-0 bg-white">
        <Button type="button" onClick={() => setIsVoiceLibrary(false)}>
          Select
        </Button>
      </div>
    </>
  );
};

export default VoiceResults;
