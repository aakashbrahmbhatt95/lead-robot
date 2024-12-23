"use client";

import { DialogContent, DialogHeader } from "@/lib/ui/dialog";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import UploadCSV from "./UploadCSV";
import { menuBarArray } from "@/components/CampaignsDetails/helper";
import { Button } from "@/lib/ui/button";
import MapAttributes from "./MapAttributes";
import CustomTags from "./customTags";
import Review from "./review";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { getMenuBarTitle, reduceColumns } from "./contactsPopupHelper";
import { getImportJobId } from "@/api/contactsApi";
import { uploadContacts } from "@/redux/action/contacts-action";
import { toast } from "react-toastify";

interface ContactPopupProps {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  isContactPopup: any;
  setIsContactPopup: (value: boolean) => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({
  selectedTab,
  setSelectedTab,
  isContactPopup,
  setIsContactPopup,
}) => {
  const dispatch = useAppDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const [files, setFiles] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [dryRunRes, setDryRunRes] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>(null);
  const [validMapping, setValidMapping] = useState<any>(null);
  const [importJobId, setImportJobId] = useState<any>(null);
  const [errorsTableData, setErrorsTableData] = useState<any>(null);
  const [errorsTableDataType, setErrorsTableDataType] = useState(null);
  const [selectAllAttributes, setSelectAllAttributes] = useState<boolean>(true);
  const [importJobIdPayload, setImportJobIdPayload] = useState({
    name: "",
    update_existing: false,
  });
  const [hasMappingError, setHasMappingError] = useState(false);

  useEffect(() => {
    if (!isContactPopup) {
      setSelectedAttributes([]);
      setFileData([]);
      setFiles(null);
      setError(null);
      setTags([]);
      setColumns([]);
      setDryRunRes(null);
      setSelectedCheckboxes(null);
      setImportJobId(null);
      setErrorsTableData(null);
      setErrorsTableDataType(null);
      setSelectAllAttributes(true);
      setHasMappingError(false);
    }
  }, [isContactPopup]);

  useEffect(() => {
    if (columns.length) {
      setSelectedCheckboxes(reduceColumns(columns, 1));
      setValidMapping(reduceColumns(columns, 0));
    }
  }, [columns.length]);

  useEffect(() => {
    if (files?.[0]?.name) {
      setImportJobIdPayload({
        ...importJobIdPayload,
        name: files?.[0]?.name,
      });
    }
  }, [files]);

  const uploadCSVHandler = async () => {
    const fileUploadData = fileData.map((ele: any) => {
      const attr: any = {};
      Object.keys(selectedAttributes).forEach((sa: any) => {
        attr[sa] = ele[selectedAttributes[sa]];
      });

      return {
        phone: ele?.phone_number.toString(),
        attributes: attr,
        tags: tags.map((tag: any) => tag.name),
      };
    });

    if (!dryRunRes) {
      const res: any = await getImportJobId(
        {
          ...importJobIdPayload,
          tags: tags.map((tag: any) => tag.id),
        },
        fileUploadData
      );

      if (res.data.success) {
        setDryRunRes(res.data?.data);
        setImportJobId(res.jobId);
        setSelectedTab(selectedTab + 1);
        if (res.data?.data) {
          setError(Boolean(res.data.data.invalid_rows || res.data.deta));
          setErrorsTableData(
            res.data.data.invalid_rows?.length
              ? res.data.data.invalid_rows
              : res.data.data.invalid_phones?.length
                ? res.data.data.invalid_phones
                : res.data.data.duplicated_phones
          );
          let dataType: any = "duplicated_phones";

          if (res.data.data.invalid_rows?.length > 0) {
            dataType = "invalid_rows";
          } else if (res.data.data.invalid_phones?.length > 0) {
            dataType = "invalid_phones";
          }

          setErrorsTableDataType(dataType);
        }
      }
      if (res.data.errors) {
        setError(res.data.errors[0]);
        setErrorsTableData(null);
        setDryRunRes(null);
      }
      if (res.data.error) {
        setError(null);
        setDryRunRes(null);
        setErrorsTableData(res.data.data.detail);
      }
    }
  };

  const handleNext = () => {
    if (selectedTab === 3) {
      uploadCSVHandler();
    } else if (selectedTab === 4) {
      const fileUploadData = fileData.map((ele: any) => {
        const attr: any = {};
        Object.keys(selectedAttributes).forEach((sa: any) => {
          attr[sa] = ele[selectedAttributes[sa]];
        });
        return {
          phone: ele?.phone_number.toString(),
          attributes: attr,
          tags: tags.map((tag: any) => tag.name),
        };
      });
      dispatch(uploadContacts(fileUploadData, importJobId, setIsContactPopup));
    } else if (selectedTab === 5) {
      setIsContactPopup(false);
    } else {
      setSelectedTab(selectedTab + 1);
    }
  };

  const handleBack = () => {
    if (selectedTab === 4) {
      setSelectedTab(3);
      setDryRunRes(null);
    } else {
      setSelectedTab(selectedTab - 1);
    }
  };

  const tabsDisabled =
    (selectedTab === 1 &&
      (fileData.length === 0 || !importJobIdPayload.name)) ||
    (selectedTab === 2 && hasMappingError) ||
    (selectedTab === 4 && errorsTableData?.length);

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
                  onClick={() => {
                    if (selectedTab === 1 && fileData.length === 0) {
                      toast.error("please upload the CSV file");
                    } else if (selectedTab === 2 && hasMappingError) {
                      toast.error(
                        "Please map all checked columns to attributes."
                      );
                    } else if (selectedTab === 3 && dryRunRes === null) {
                      toast.error(
                        "Import job with this Name and User already exists."
                      );
                    } else {
                      setSelectedTab(ele.value);
                    }
                  }}
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
          setColumns={setColumns}
        />
      )}
      {selectedTab === 2 && validMapping && selectedCheckboxes && (
        <MapAttributes
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          setHasMappingError={setHasMappingError}
          hasMappingError={hasMappingError}
          selectedCheckboxes={selectedCheckboxes}
          setSelectedCheckboxes={setSelectedCheckboxes}
          validMapping={validMapping}
          setValidMapping={setValidMapping}
          columns={columns.filter((ele: string) => ele !== "phone_number")}
          selectAllAttributes={selectAllAttributes}
          setSelectAllAttributes={setSelectAllAttributes}
        />
      )}
      {selectedTab === 3 && (
        <CustomTags
          tags={tags}
          setTags={setTags}
          setDryRunRes={setDryRunRes}
          error={error}
          setError={setError}
          setImportJobIdPayload={setImportJobIdPayload}
          importJobIdPayload={importJobIdPayload}
        />
      )}
      {selectedTab === 4 && (
        <Review
          dryRunRes={dryRunRes}
          errorsTableData={errorsTableData}
          errorsTableDataType={errorsTableDataType}
        />
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
          {selectedTab === 4 ? "Upload" : selectedTab === 5 ? "Close" : "Next"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default ContactPopup;
