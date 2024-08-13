import Image from "next/image";
import { invoices, reviewBoxArray } from "@/components/CampaignsDetails/helper";
import { Switch } from "@/lib/ui/switch";
import info from "@/../public/info_black.svg";
import warningCircle from "@/../public/WarningCircle.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

const Review = () => {
  const [isShowError, setIsShowError] = useState(false);
  const { fileErrorDetails }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  return (
    <div>
      <div className="mt-3 flex gap-3">
        <>
          {reviewBoxArray?.map((ele: any, index: any) => {
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
              {fileErrorDetails?.length || 0}
            </p>
            <p className="text-sm font-normal text-[#71717A] mt-2">Errors</p>
          </div>
        </>
      </div>
      <p className="text-sm font-normal text-[#71717A] mt-4">
        Total contacts: 1904
      </p>
      <p className="text-lg font-semibold	text-[#18181B] mt-3">
        Existing contacts data
      </p>
      <div className="flex items-center space-x-2 mt-4">
        <Switch checked />
        <p className="text-sm font-medium text-[#18181B]">
          Update existing contacts
        </p>
      </div>
      {fileErrorDetails?.length && (
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            checked={isShowError}
            onCheckedChange={(checked: any) => setIsShowError(checked)}
          />
          <p className="text-sm font-medium text-[#18181B]">Show Errors</p>
        </div>
      )}
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
                Update existing contacts
              </p>
              <p className="text-sm font-normal text-[#71717A] mt-2">
                Updates existing contact with new data from your import.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm font-semibold text-[#18181B]">
          Help importing contacts
        </p>
      </div>
      {isShowError && (
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Row</TableHead>
              <TableHead>Column</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileErrorDetails?.map((ele: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{ele?.row}</TableCell>
                <TableCell>{ele?.column}</TableCell>
                <TableCell>{ele?.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* <Table className="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices?.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table> */}
    </div>
  );
};

export default Review;
