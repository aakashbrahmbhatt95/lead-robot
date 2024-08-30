"use client";

import { DialogContent, DialogHeader } from "@/lib/ui/dialog";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import UploadCSV from "./UploadCSV";
import { menuBarArray } from "@/components/CampaignsDetails/helper";
import { Button } from "@/lib/ui/button";
import MapAttribute from "./mapAttribute";
import CustomTags from "./customTags";
import Review from "./review";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { addImportJobAction } from "../../../redux/action/contacts-action";

const ContactPopup = ({
  selectedMenuBar,
  setSelectedMenuBar,
  setIsContactPopup,
}: any) => {
  const dispatch = useAppDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [reviewErrorDetails, setReviewErrorDetails] = useState<any>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [importJobs, setImportJobs] = useState<any>({
    name: "",
    update_existing: false,
  });

  const uploadCSVHandler = () => {
    const importJobIDBody = fileData?.map((ele: any) => {
      return {
        phone: `+91-${ele?.phone_number}`,
        attributes: {
          customer_id: ele?.customer_id,
          title: ele?.title,
          name: ele?.name,
          surname: ele?.surname,
          email: ele?.email,
          date_of_birth: ele?.date_of_birth,
          last_contact: ele?.last_contact,
          city: ele?.city,
          postal_code: ele?.postal_code,
          lead_source: ele?.lead_source,
          consent: ele?.consent,
        },
        tags: tags?.map((ele: any) => ele?.name),
      };
    });
    dispatch(
      addImportJobAction(
        {
          ...importJobs,
          tags: tags?.map((ele: any) => ele?.id),
        },
        importJobIDBody,
        setIsContactPopup
      )
    );
  };
  return (
    <DialogContent className="sm:max-w-[60%] max-h-[75%] overflow-scroll">
      <DialogHeader>
        <h2 className="text-3xl font-semibold text-black">
          {selectedMenuBar === 5
            ? "Upload Successful"
            : selectedMenuBar === 3
              ? "Tag Contact"
              : "Add Contact"}
        </h2>
      </DialogHeader>
      {selectedMenuBar !== 5 && (
        <>
          <h4 className="text-sm font-medium text-[#18181B]">
            {selectedMenuBar === 1
              ? "CSV"
              : selectedMenuBar === 2
                ? "Map attributes"
                : selectedMenuBar === 3
                  ? "Add custom tags"
                  : "Review"}
          </h4>
          <Menubar className="w-fit bg-[#F4F4F5]">
            {menuBarArray?.map((ele: any, index: any) => {
              return (
                <MenubarMenu key={index}>
                  <MenubarTrigger
                    className="cursor-pointer text-[#3F3F46]"
                    style={{
                      backgroundColor:
                        selectedMenuBar === ele?.value ? "white" : "#F4F4F5",
                    }}
                    onClick={() => setSelectedMenuBar(ele?.value)}
                  >
                    {ele?.text}
                  </MenubarTrigger>
                </MenubarMenu>
              );
            })}
          </Menubar>
        </>
      )}
      {selectedMenuBar === 1 && (
        <UploadCSV
          setFileData={setFileData}
          setReviewErrorDetails={setReviewErrorDetails}
        />
      )}
      {selectedMenuBar === 2 && (
        <MapAttribute
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}
      {selectedMenuBar === 3 && <CustomTags tags={tags} setTags={setTags} />}
      {selectedMenuBar === 4 && (
        <Review
          reviewErrorDetails={reviewErrorDetails}
          setImportJobs={setImportJobs}
          importJobs={importJobs}
        />
      )}
      {/* {selectedMenuBar === 5 && <UploadSuccessful />} */}
      <div
        className="mt-3 flex justify-end gap-4 pr-2"
        style={{ width: selectedMenuBar === 1 ? "65%" : "100%" }}
      >
        {selectedMenuBar !== 1 && selectedMenuBar !== 5 && (
          <Button
            className="h-[36px] w-[56px] bg-white text-black hover:bg-white"
            onClick={() => {
              setSelectedMenuBar(
                selectedMenuBar === 2
                  ? 1
                  : selectedMenuBar === 3
                    ? 2
                    : selectedMenuBar === 4
                      ? 3
                      : 1
              );
            }}
          >
            Back
          </Button>
        )}
        <Button
          className="h-[36px] w-[56px]"
          onClick={() => {
            if (selectedMenuBar === 4) {
              uploadCSVHandler();
            }
            setSelectedMenuBar(
              selectedMenuBar === 1
                ? 2
                : selectedMenuBar === 2
                  ? 3
                  : selectedMenuBar === 3
                    ? 4
                    : selectedMenuBar === 4
                      ? 5
                      : 1
            );
          }}
          disabled={
            (selectedMenuBar === 4 && reviewErrorDetails?.length) ||
            (selectedMenuBar === 4 && !fileData?.length)
          }
        >
          {selectedMenuBar === 1
            ? "Next"
            : selectedMenuBar === 2
              ? "Map"
              : selectedMenuBar === 3
                ? "Tag"
                : selectedMenuBar === 4
                  ? "Next"
                  : "Save"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default ContactPopup;
