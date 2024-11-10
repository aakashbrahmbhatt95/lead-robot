import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray, Field } from "formik";
import { useEffect, useState } from "react";
import LastInputValue from "./LastValueInput";
import ConditionRow from "./ConditionRow";
import {
  getConfigFilterHandler,
  getFiltersHandler,
  handleFieldChange,
  handleOperatorChange,
  handleValueChange,
  initialConditionRowState,
} from "./helper";

const SegmentFieldArray = ({
  values,
  valueName,
  arrayFields,
  heading,
  setFieldValue,
}: any) => {
  const [filters, setFilters] = useState(null);
  const [configFilters, setConfigFilters] = useState(null);

  useEffect(() => {
    getConfigFilterHandler(setConfigFilters);
    getFiltersHandler(setFilters);
  }, []);

  if (!filters || !configFilters) return null;

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
                        onValueChange={(value) =>
                          handleFieldChange(
                            field,
                            index,
                            value,
                            filters,
                            setFieldValue,
                            arrayFields
                          )
                        }
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
                        onValueChange={(value: any) =>
                          handleOperatorChange(
                            field,
                            index,
                            value,
                            configFilters,
                            setFieldValue,
                            arrayFields
                          )
                        }
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
                        onValueChange={(value) =>
                          handleValueChange(
                            field,
                            index,
                            value,
                            setFieldValue,
                            arrayFields
                          )
                        }
                      >
                        <SelectTrigger className="w-[250px] mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {values[arrayFields][index].valueArrays?.lookups?.map(
                            (ele: any) => (
                              <SelectItem key={ele.value} value={ele.value}>
                                {ele.label}
                              </SelectItem>
                            )
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
