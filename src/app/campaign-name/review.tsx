import Image from "next/image";
import { reviewBoxArray } from "./helper";
import { Switch } from "@/components/ui/switch";
import info from "@/../public/info_black.svg";

const Review = () => {
  return (
    <div>
      <div className="mt-3 flex gap-3">
        {reviewBoxArray?.map((ele: any) => {
          return (
            <div className=" flex flex-col justify-center items-center border-[1px] h-[216px] w-[20%] border-[#D4D4D8] rounded-lg">
              <Image src={ele?.img} alt={ele?.img} />
              <p className="text-lg font-semibold	text-[#18181B] mt-3">
                {ele?.count}
              </p>
              <p className="text-sm font-normal text-[#71717A] mt-2">
                {ele?.text}
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-sm font-normal text-[#71717A] mt-4">
        Total contacts: 1904
      </p>
      <p className="text-lg font-semibold	text-[#18181B] mt-3">
        Existing contacts data
      </p>
      <div className="flex items-center space-x-2 mt-4">
      <Switch checked />
      <p className="text-sm font-medium text-[#18181B]">Update  existing contacts</p>
    </div>
    <div className="flex items-center mt-4">
      <Image src={info} alt="info" />
      <p className="text-sm font-semibold text-[#18181B]">Help importing contacts</p>
    </div>
    </div>
  );
};

export default Review;
