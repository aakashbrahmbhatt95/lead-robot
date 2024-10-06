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

const VoiceLibrary = () => {
  return (
    <DialogContent className="sm:max-w-[40%] max-h-[75%] overflow-scroll">
      <DialogHeader>
        <p className="text-center text-lg font-semibold">Voice Library</p>
      </DialogHeader>
      <p className="text-[#71717A] text-sm font-normal">
        Find your perfect voice
      </p>
      <div className="flex items-center justify-between">
        <Select name="voice_provider">
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Voice Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voice_provider">Voice Provider</SelectItem>
            <SelectItem value="eleven_labs">Eleven Labs</SelectItem>
            <SelectItem value="deepgram">Deepgram</SelectItem>
            <SelectItem value="open_ai">Open AI</SelectItem>
          </SelectContent>
        </Select>
        <Select name="accent">
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Accent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allaccent">All Accent</SelectItem>
            <SelectItem value="american">American</SelectItem>
            <SelectItem value="british">British</SelectItem>
          </SelectContent>
        </Select>
        <Select name="gender">
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="young">All Gender</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select name="age">
          <SelectTrigger className="w-[24%] mt-3">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="young">Young</SelectItem>
            <SelectItem value="middle_aged">Middle Aged</SelectItem>
            <SelectItem value="old">Old</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border-[1px] border-[#E4E4E7] rounded">
        <Button type="button" className="m-3">
          All
        </Button>

        <p className="border-t-[1px] border-[#E4E4E7] p-3">Results</p>
        <div className="p-3">
          {[1, 2, 3, 4]?.map((ele, index, array) => {
            return (
              <div
                className={`flex mt-2 ${
                  index !== array.length - 1 ? "border-b-[1px]" : ""
                } border-[#E4E4E7]`}
              >
                <div className="w-3/4 flex flex-col gap-2 pb-4">
                  <p className="text-sm font-semibold pl-2">David</p>
                  <p className="font-medium text-xs text-[#71717A] mt-3">
                    South african Middle aged Professional Informative education
                  </p>
                </div>
                <div className="w-1/4 flex justify-end items-center">
                  <div className="bg-[#F4F4F5] rounded h-fit p-2 mr-2">
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
