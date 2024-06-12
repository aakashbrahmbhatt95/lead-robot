import Image from "next/image";
import DotsThree from "../../../public/DotsThree.svg";
import PencilSimple from "../../../public/PencilSimple.svg";
import Vector from "../../../public/Vector.svg";
import { row } from "./helper";
import ReactFlowChart from "./reactFlowChart";

const CampaignName = () => {
  return (
    <div className="p-[40px]">
      <div className="flex">
        <h2 className="text-3xl font-semibold text-black">Campaign Name</h2>
        <Image src={PencilSimple} alt="Logo" className="ml-[8px]" />
        <Image src={DotsThree} alt="Logo" className="ml-[15px]" />
      </div>
      <p className="text-[20px] mt-[15px] font-semibold text-black underline">
        Task template
      </p>
      <div className="mt-[15px] flex justify-between items-center">
        <div className="flex gap-[10px]">
          {row?.map((ele: any) => {
            return (
              <div className="flex items-center rounded-md border-[1px] border-[#18181B] px-4 py-2 gap-[5px]">
                <Image src={PencilSimple} alt="Logo" />
                <p className="text-sm font-medium text-[#18181B]">
                  {ele?.text}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center rounded-md bg-[#F4F4F5] px-4 py-2 gap-[8px]">
          <p className="text-sm font-medium text-[#71717A]">Next</p>
          <Image src={Vector} alt="Logo" />
        </div>
      </div>
      <div className="flex mt-[20px]">
        <div className="flex-1">
          <div className="flex items-center gap-4 border-t-2 border-black pt-4 mr-2.5">
            <p className="flex justify-center items-center text-xs font-medium rounded-full bg-black w-5 h-5 text-white">
              1
            </p>
            <p className="text-sm font-medium text-[#18181B]">
              Create task set
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 border-t-2 border-[18181B] pt-4 mr-2.5">
            <p className="flex justify-center items-center text-xs font-medium rounded-full w-5 h-5 border-black border-[1px]">
              2
            </p>
            <p className="text-sm font-medium text-[#18181B]">
              Assign contacts
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 border-t-2 border-[18181B] pt-4 mr-2.5">
            <p className="flex justify-center items-center text-xs font-medium rounded-full w-5 h-5 border-black border-[1px]">
              3
            </p>
            <p className="text-sm font-medium text-[#18181B]">Schedule</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 border-t-2 border-[18181B] pt-4">
            <p className="flex justify-center items-center text-xs font-medium rounded-full w-5 h-5 border-black border-[1px]">
              4
            </p>
            <p className="text-sm font-medium text-[#18181B]">Setup call</p>
          </div>
        </div>
      </div>
      <ReactFlowChart />
    </div>
  );
};

export default CampaignName;
