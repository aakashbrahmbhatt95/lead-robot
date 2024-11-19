import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray } from "formik";
import LastInputValue from "./LastValueInput";
import ConditionRow from "./ConditionRow";
import { initialConditionRowState } from "./helper";
import CastField from "./CastField";
import OperatorField from "./OperatorField";
import SelectFilterValue from "./SelectFilterValue";
import SelectLookupValue from "./SelectLookupValue";
import { deleteFilterByFilterSetId } from "../helper";
import { useAppSelector } from "@/redux/store";

const GroupSegmentRow = ({
  values,
  valueName,
  arrayFields,
  heading,
  setFieldValue,
  contactFilterData,
  setContactFilterData,
  contactFilterList,
  setContactFilterList,
  campaignDataById,
}: any) => {
  const { filterList, configFilterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );
  if (!filterList || !configFilterList) return null;

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
                    onClick={() => {
                      const contactFilterId = (isExcluded: boolean) =>
                        contactFilterList?.find(
                          (ele: any) => ele?.exclude === isExcluded
                        )?.id;
                      deleteFilterByFilterSetId(
                        contactFilterId(
                          arrayFields === "includeConditions" ? false : true
                        ),
                        ele?.id,
                        contactFilterData,
                        setContactFilterData,
                        contactFilterList,
                        setContactFilterList,
                        campaignDataById,
                        filterList,
                        configFilterList
                      );
                    }}
                    className="cursor-pointer"
                  />
                  <SelectFilterValue
                    arrayFields={arrayFields}
                    index={index}
                    setFieldValue={setFieldValue}
                  />
                  {values[arrayFields][index]?.filterTypeOptions?.filters
                    ?.length && (
                    <>
                      <OperatorField
                        values={values}
                        arrayFields={arrayFields}
                        index={index}
                        setFieldValue={setFieldValue}
                        configFilterList={configFilterList}
                      />
                      {values[arrayFields][index].lookupOptions?.lookups
                        ?.length && (
                        <>
                          <SelectLookupValue
                            arrayFields={arrayFields}
                            index={index}
                            setFieldValue={setFieldValue}
                            values={values}
                          />
                          <LastInputValue
                            values={values}
                            arrayFields={arrayFields}
                            index={index}
                            setFieldValue={setFieldValue}
                          />
                          <CastField
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
