import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import UploadSimple from "@/../public/UploadSimple.svg";
import FileCsv from "@/../public/FileCsv.svg";
import Image from "next/image";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";

const UploadCSV = () => {
  const [selectedImport, setSelectedImport] = useState(1);
  const [files, setFiles] = useState<any>(null);
  const [importGoogleSheet, setImportGoogleSheet] = useState(false);
  const [error, setError] = useState<any>(null);

  const fileInputRef: any = useRef(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex gap-4">
      <div className="w-[65%]">
        <div className="h-[300px] bg-[#FAFAFA]">
          <div {...getRootProps()} className="w-full pt-[25px]">
            <input {...getInputProps()} ref={fileInputRef} />
            <div className="flex flex-col h-full items-center justify-center">
              <Image src={files ? FileCsv : UploadSimple} alt="UploadSimple" />
              <h4 className="text-lg font-semibold text-[#18181B] mt-3">
                {files ? files?.[0]?.name : "Upload CSV"}
              </h4>
              {files === null ? (
                <>
                  {importGoogleSheet ? (
                    <div className="grid w-full px-4 items-center gap-1.5">
                      <Label htmlFor="input" className="text-sm font-normal">
                        Paste Link
                      </Label>
                      <Input
                        type="text"
                        id="input"
                        placeholder="Google Sheet URL"
                      />
                    </div>
                  ) : error ? (
                    <p className="text-sm font-normal text-[#E11D48] mt-3">
                      {error}
                    </p>
                  ) : (
                    <p className="text-sm font-normal text-[#71717A] mt-3">
                      Drag and drop CSV here
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm font-normal text-[#22C55E] mt-3">
                  Imported 1830 contacts
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-[20px] gap-2">
            <Button
              variant={"outline"}
              className="h-[36px] text-sm font-normal cursor-pointer"
              onClick={handleChooseFileClick}
            >
              Choose File
            </Button>
            <Button
              variant={"outline"}
              className="h-[36px] text-sm font-normal cursor-pointer"
              onClick={() => setImportGoogleSheet(true)}
              disabled={importGoogleSheet}
            >
              Import Google Sheet
            </Button>
          </div>
        </div>
        <p className="text-[#71717A] mt-3 text-sm font-normal">
          Phone number is a required field.{" "}
          <span className="underline">View example CSV file.</span>
        </p>
      </div>
      <div className="w-[35%]">
        <Menubar className="flex-col h-auto p-2">
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 1 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(1)}
            >
              Import CSV
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 2 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(2)}
            >
              Import CRM
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 3 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(3)}
            >
              Add Individual
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default UploadCSV;
