import { Checkbox } from "@/lib/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { mapTableData } from "./helper";

const UploadCSV = () => {

  return (
    <div>
      <div className="my-4">
        {mapTableData?.map((ele: any) => {
          return (
            <div className="flex w-full items-center mt-2">
              <div className="w-[5%] ml-2">{ele?.id}</div>
              <div className="w-[30%] flex gap-3 items-center">
                <Checkbox className="w-[15px] h-[15px] rounded-none" checked />{" "}
                <p className="text-[#18181B] text-sm font-bold	">{ele?.title}</p>
              </div>
              <div className="w-[25%] flex items-end">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={ele?.title} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[45%] ml-8">
                <p className="text-sm font-normal text-[#18181B]">
                  {ele?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[#71717A] mt-8 text-sm font-normal">
        1. Deselect the columns you would like to not import. <br />
        2. You can remap a column name by selecting an attribute from the
        drop-down or creating a new attribute.
      </p>
    </div>
  );
};

export default UploadCSV;
