import { Input } from "@/components/ui/input";

const CustomTags = () => {
  return (
    <div>
      <div className="my-4 border-[#D4D4D8] border-[0.5px] rounded">
        <Input className="border-none" placeholder="Search..." />
        <div className="p-2 mt-2  border-t-[0.5px] border-t-[#D4D4D8]">
          <Input placeholder="Tag name" />
          <p className="text-sm font-medium text-[#18181B] mt-3 mb-2 ml-2">
            Create new tag
          </p>
        </div>
      </div>
      <p className="text-[#71717A] mt-8 text-sm font-normal">
        1. Search tags and select to add to the campaign. <br />
        2. Create custom new tags by naming them and pressing “create new tag”.
      </p>
    </div>
  );
};

export default CustomTags;
