import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray, Field } from "formik";
import {
  getConfigFilterHandler,
  getFiltersHandler,
  initialConditionRowState,
} from "./helper";
import { useEffect, useState } from "react";
import LastInputValue from "./LastValueInput";
import ConditionRow from "./ConditionRow";

const SegmentFieldArray = ({
  values,
  valueName,
  arrayFields,
  heading,
  setFieldValue,
}: any) => {
  const [filters, setFilters] = useState<any>(null);
  const [configFilters, setConfigFilters] = useState<any>(null);

  useEffect(() => {
    getConfigFilterHandler(setConfigFilters);
    getFiltersHandler(setFilters);
  }, []);

  if (filters === null || configFilters === null) {
    return null;
  }
  console.log("arrayFields", arrayFields);
  console.log("values", values);
  return (
    <div className="py-5 px-3 mt-8 border-[1px] border-gray-300">
      <ConditionRow heading={heading} valueName={valueName} />
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
                            setFieldValue(
                              `${arrayFields}[${index}]operatorArrays`,
                              temp[0][1]
                            );
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
                          ).filter(([key]: any) => key === value);
                          if (temp) {
                            setFieldValue(
                              `${arrayFields}[${index}]valueArrays`,
                              temp[0][1]
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-[250px] mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {values[arrayFields][
                            index
                          ].operatorArrays?.filters?.map((ele: any) => (
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
                          {values[arrayFields][index].valueArrays?.lookups?.map(
                            (ele: any) => {
                              return (
                                <SelectItem key={ele} value={ele?.value}>
                                  {ele?.label}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <LastInputValue
                    values={values}
                    arrayFields={arrayFields}
                    index={index}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            ))}
            <div
              className="flex items-center mt-5 text-[#6f99a8] gap-2 cursor-pointer"
              onClick={() => push(initialConditionRowState)}
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
