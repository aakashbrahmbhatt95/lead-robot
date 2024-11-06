import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray, Field } from "formik";
import { getConfigFilterHandler, getFiltersHandler } from "./helper";
import { useEffect, useState } from "react";

const SegmentFieldArray = ({
  values,
  valueName,
  arrayFields,
  heading,
}: any) => {
  const [filters, setFilters] = useState<any>(null);
  const [configFilters, setConfigFilters] = useState<any>(null);
  const [fieldFilters, setFieldFilters] = useState<any>([]);
  const [selectedConfigFilter, setSelectedConfigFilter] = useState<any>(null);

  useEffect(() => {
    getConfigFilterHandler(setConfigFilters);
    getFiltersHandler(setFilters);
  }, []);

  if (filters === null || configFilters === null) {
    return null;
  }
  return (
    <div className="py-5 px-3 mt-8 border-[1px] border-gray-300">
      <div className="flex items-center gap-2 border-b-[1px] border-gray-300 pb-3">
        <p>
          <span className="font-bold">{heading}</span> if contacts match
        </p>
        <Field name={valueName}>
          {({ field }: any) => (
            <Select
              value={field.value}
              onValueChange={(value: any) =>
                field.onChange({ target: { name: field.name, value } })
              }
            >
              <SelectTrigger className="w-[100px] mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="any">ANY</SelectItem>
              </SelectContent>
            </Select>
          )}
        </Field>
        <p>of the following conditions:</p>
      </div>

      <FieldArray name={arrayFields}>
        {({ remove, push }) => (
          <>
            {values[arrayFields].map((ele: any, index: any) => (
              <div key={index}>
                {index > 0 && (
                  <p className="pt-3 font-bold">
                    {values[valueName] === "all" ? "AND" : "OR"}
                  </p>
                )}

                <div className="flex items-center py-3 gap-2 border-b-[1px] border-gray-300 pb-3">
                  <CircleMinus
                    onClick={() => remove(index)}
                    className="cursor-pointer"
                  />
                  <Field name={`${arrayFields}[${index}].field`}>
                    {({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={(value: any) => {
                          field.onChange({
                            target: { name: field.name, value },
                          });
                          const temp: any = Object.entries(filters).filter(
                            ([, option]: any) => option.field === value
                          );

                          if (temp.length > 0) {
                            setFieldFilters(temp[0][1].filters);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[300px] mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(filters).map(([key, option]: any) => (
                            <SelectItem key={key} value={option.field}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <Field name={`${arrayFields}[${index}].operator`}>
                    {({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={(value: any) => {
                          field.onChange({
                            target: { name: field.name, value },
                          });
                          const temp: any = Object.entries(
                            configFilters
                          ).filter(([key, option]: any) => key === value);
                          if (temp) {
                            setSelectedConfigFilter(temp[0][1]);
                          }
                        }}
                      >
                        <SelectTrigger className="w-[250px] mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldFilters?.map((ele: any) => (
                            <SelectItem key={ele} value={ele}>
                              {ele}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <Field name={`${arrayFields}[${index}].value`}>
                    {({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={(value: any) =>
                          field.onChange({
                            target: { name: field.name, value },
                          })
                        }
                      >
                        <SelectTrigger className="w-[250px] mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedConfigFilter?.lookups?.map((ele: any) => {
                            return (
                              <SelectItem key={ele} value={ele?.value}>
                                {ele?.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                </div>
              </div>
            ))}
            <div
              className="flex items-center mt-5 text-[#6f99a8] gap-2 cursor-pointer"
              onClick={() => push({ field: "", operator: "", value: "" })}
            >
              <CirclePlus color="#6f99a8" />
              Add
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default SegmentFieldArray;
