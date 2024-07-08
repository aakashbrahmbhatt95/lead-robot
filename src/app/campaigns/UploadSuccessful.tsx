import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const UploadSuccessful = () => {
  return (
    <div>
      <div className="grid w-full gap-1.5 mt-2">
        <Label htmlFor="message">Description</Label>
        <Textarea
          placeholder="Type your description here"
          id="message"
          className="focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <p className="text-sm font-normal text-[#71717A] mt-2">Support text</p>
    </div>
  );
};

export default UploadSuccessful;
