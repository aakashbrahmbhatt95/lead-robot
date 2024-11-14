import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray } from "formik";
import { useEffect, useState } from "react";
import LastInputValue from "./LastValueInput";
import ConditionRow from "./ConditionRow";
import {
  getConfigFilterHandler,
  getFiltersHandler,
  initialConditionRowState,
} from "./helper";
import CastField from "./CastField";
import OperatorField from "./OperatorField";
import SelectFilterValue from "./SelectFilterValue";
import SelectLookupValue from "./SelectLookupValue";

const GroupSegmentRow = ({
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
  console.log("values", values);
  console.log("arrayFields", arrayFields);
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
                  <SelectFilterValue
                    arrayFields={arrayFields}
                    index={index}
                    filters={filters}
                    setFieldValue={setFieldValue}
                  />
                  {values[arrayFields][index].operatorArrays?.filters
                    ?.length && (
                    <>
                      <OperatorField
                        values={values}
                        arrayFields={arrayFields}
                        index={index}
                        setFieldValue={setFieldValue}
                        configFilters={configFilters}
                      />
                      {values[arrayFields][index].lookupArrays?.lookups
                        ?.length && (
                        <>
                          <SelectLookupValue
                            arrayFields={arrayFields}
                            index={index}
                            setFieldValue={setFieldValue}
                            values={values}
                          />
                          <CastField
                            values={values}
                            arrayFields={arrayFields}
                            index={index}
                            setFieldValue={setFieldValue}
                          />
                          <LastInputValue
                            values={values}
                            arrayFields={arrayFields}
                            index={index}
                            setFieldValue={setFieldValue}
                          />
                        </>
                      )}
                    </>
                  )}
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

export default GroupSegmentRow;
