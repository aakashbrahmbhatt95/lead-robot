import Image from "next/image";
import { reviewBoxArray } from "@/components/CampaignsDetails/helper";
import { Switch } from "@/lib/ui/switch";
import info from "@/../public/info_black.svg";
import warningCircle from "@/../public/WarningCircle.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";
import { useState } from "react";
import {
  EXISTING_CONTACTS_TEXT,
  HELP_IMPORT_TEXT,
  IMPORT_JOB_TEXT,
  UPDATE_EXISTING_TEXT,
  UPDATE_NEW_DATA_TEXT,
} from "./contactsPopupHelper";
import ErrorsTable from "./ErrorsTable";
import { Input } from "@/lib/ui/input";

const Review = ({
  dryRunRes,
  setDryRunRes,
  importJobIdPayload,
  setImportJobIdPayload,
  error,
  setError,
  errorsTableData,
}: any) => {
  const [isShowError, setIsShowError] = useState(false);
  return (
    <div>
      {dryRunRes ? (
        <>
          <div className="mt-3 flex gap-3">
            <>
              {reviewBoxArray(dryRunRes)?.map((ele: any, index: any) => {
                return (
                  <div
                    className=" flex flex-col justify-center items-center border-[1px] h-[216px] w-[20%] border-[#D4D4D8] rounded-lg"
                    key={index}
                  >
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
              <div className=" flex flex-col justify-center items-center border-[1px] h-[216px] w-[20%] border-[#D4D4D8] rounded-lg">
                <Image src={warningCircle} alt="warningCircle" />
                <p className="text-lg font-semibold	text-[#18181B] mt-3">
                  {error?.length || 0}
                </p>
                <p className="text-sm font-normal text-[#71717A] mt-2">
                  Errors
                </p>
              </div>
            </>
          </div>
          <p className="text-sm font-normal text-[#71717A] mt-4">
            Total contacts: 1904
          </p>
          <p className="text-lg font-semibold	text-[#18181B] mt-3">
            {EXISTING_CONTACTS_TEXT}
          </p>
        </>
      ) : (
          <p className="ml-2 mb-2 text-sm font-medium text-[#18181B]">
        <>
          <div className="space-x-2 mt-4">
            <p className="ml-2 mb-2 text-sm font-medium text-[#18181B]">
              {IMPORT_JOB_TEXT}
            </p>
            <Input
              value={importJobIdPayload?.name}
              onChange={(event: any) => {
                setImportJobIdPayload({
                  ...importJobIdPayload,
                  name: event.target.value,
                });
                setDryRunRes(null);
                setError(null);
              }}
            />
            {error?.[0] ? (
              <div className="text-red-500 text-sm mt-4">
                {JSON.stringify(error)}
              </div>
            ) : null}
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Switch
              checked={importJobIdPayload?.update_existing}
              onCheckedChange={(checked: any) =>
                setImportJobIdPayload({
                  ...importJobIdPayload,
                  update_existing: checked,
                })
              }
            />
            <p className="text-sm font-medium text-[#18181B]">
              {UPDATE_EXISTING_TEXT}
            </p>
          </div>
        </>
      )}

      {errorsTableData && !dryRunRes ? (
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            checked={isShowError}
            onCheckedChange={(checked: any) => setIsShowError(checked)}
          />
          <p className="text-sm font-medium text-[#18181B]">Show Errors</p>
        </div>
      ) : null}
      <div className="flex items-center mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image src={info} alt="info" className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="ml-[46%] w-[299px] h-[130px] p-[40px] left-40"
            >
              <p className="text-sm font-medium text-[#18181B]">
                {UPDATE_EXISTING_TEXT}
              </p>
              <p className="text-sm font-normal text-[#71717A] mt-2">
                {UPDATE_NEW_DATA_TEXT}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm font-semibold text-[#18181B]">
          {HELP_IMPORT_TEXT}
        </p>
      </div>
      {isShowError && errorsTableData && <ErrorsTable data={errorsTableData} />}
    </div>
  );
};

export default Review;
