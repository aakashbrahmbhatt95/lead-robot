"use client";

import { DialogContent, DialogHeader } from "@/lib/ui/dialog";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import UploadCSV from "./UploadCSV";
import { menuBarArray } from "@/components/CampaignsDetails/helper";
import { Button } from "@/lib/ui/button";
import MapAttribute from "./mapAttribute";
import CustomTags from "./customTags";
import Review from "./review";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { getMenuBarTitle } from "./contactsPopupHelper";
import { getImportJobId } from "@/api/contactsApi";

interface ContactPopupProps {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  setIsContactPopup: (value: boolean) => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({
  selectedTab,
  setSelectedTab,
  setIsContactPopup,
}) => {
  const dispatch = useAppDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const [files, setFiles] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [dryRunRes, setDryRunRes] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [importJobIdPayload, setImportJobIdPayload] = useState({
    name: "",
    update_existing: false,
  });

  useEffect(() => {
    if (files?.[0]?.name) {
      setImportJobIdPayload({
        ...importJobIdPayload,
        name: files?.[0]?.name,
      });
    }
  }, [files]);

  const uploadCSVHandler = async () => {
    const fileUploadData = fileData.map((ele: any) => ({
      phone: ele?.phone_number,
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
      tags: tags.map((tag: any) => tag.name),
    }));
    const res = await getImportJobId(
      {
        ...importJobIdPayload,
        tags: tags.map((tag: any) => tag.id),
      },
      fileUploadData
    );
    if (res?.success) {
      setSelectedTab(4);
      setDryRunRes(res.data);
    }
  };

  const handleNext = () => {
    if (selectedTab === 3) {
      uploadCSVHandler();
    } else {
      setSelectedTab(selectedTab + 1);
    }
  };

  const handleBack = () => setSelectedTab(selectedTab - 1);

  const tabsDisabled =
    (selectedTab === 1 &&
      (fileData.length === 0 || !importJobIdPayload.name)) ||
    (selectedTab === 4 && error);

  return (
    <DialogContent className="sm:max-w-[60%] max-h-[75%] overflow-scroll">
      <DialogHeader>
        <h2 className="text-3xl font-semibold text-black">
          {selectedTab === 5
            ? "Upload Successful"
            : getMenuBarTitle(selectedTab)}
        </h2>
      </DialogHeader>
      {selectedTab !== 5 && (
        <>
          <h4 className="text-sm font-medium text-[#18181B]">
            {getMenuBarTitle(selectedTab)}
          </h4>
          <Menubar className="w-fit bg-[#F4F4F5]">
            {menuBarArray.map((ele: any, index: number) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  className="cursor-pointer text-[#3F3F46]"
                  style={{
                    backgroundColor:
                      selectedTab === ele.value ? "white" : "#F4F4F5",
                  }}
                  onClick={() => setSelectedTab(ele.value)}
                >
                  {ele.text}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </>
      )}
      {selectedTab === 1 && (
        <UploadCSV
          files={files}
          setFiles={setFiles}
          setError={setError}
          error={error}
          setFileData={setFileData}
          setImportJobIdPayload={setImportJobIdPayload}
          importJobIdPayload={importJobIdPayload}
        />
      )}
      {selectedTab === 2 && (
        <MapAttribute
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}
      {selectedTab === 3 && <CustomTags tags={tags} setTags={setTags} />}
      {selectedTab === 4 && dryRunRes && (
        <Review dryRunRes={dryRunRes} setError={setError} />
      )}
      <div
        className="mt-3 flex justify-end gap-4 pr-2"
        style={{ width: selectedTab === 1 ? "65%" : "100%" }}
      >
        {selectedTab > 1 && selectedTab < 5 && (
          <Button
            className="h-[36px] w-[56px] bg-white text-black hover:bg-white"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button
          className="h-[36px] w-[56px]"
          onClick={handleNext}
          disabled={tabsDisabled}
        >
          {selectedTab === 4 ? "Save" : "Next"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default ContactPopup;
