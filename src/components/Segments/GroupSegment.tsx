import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";
import GroupSegmentRow from "./GroupSegmentRow";
import { useEffect } from "react";
import {
  addFilterByFilterSetId,
  editFilterByFilterSetId,
  getContactFilterAction,
} from "@/redux/action/contactFilter-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { validateData } from "./helper";

const GroupSegment = () => {
  const dispatch = useAppDispatch();

  const { contactFilterData, contactFilterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );

  useEffect(() => {
    dispatch(getContactFilterAction());
  }, []);

  const handleSubmit = (values: any) => {
    const processConditions = (
      conditions: any[],
      isExcluded: boolean,
      action: "add" | "edit"
    ) => {
      const filterSetId = contactFilterList?.find(
        (ele: any) => ele?.exclude === isExcluded
      )?.id;

      conditions.forEach((condition: any) => {
        const body = {
          field: condition?.field,
          filter_type: condition?.filter,
          lookup: condition?.lookup,
          value: condition?.value,
          cast: condition?.cast,
        };

        if (action === "add" && !condition?.id) {
          dispatch(addFilterByFilterSetId(body, filterSetId));
        } else if (action === "edit" && condition?.id) {
          dispatch(editFilterByFilterSetId(body, filterSetId, condition?.id));
        }
      });
    };

    // Process include and exclude conditions
    processConditions(values?.includeConditions, false, "add");
    processConditions(values?.includeConditions, false, "edit");
    processConditions(values?.excludeConditions, true, "add");
    processConditions(values?.excludeConditions, true, "edit");
  };

  if (!contactFilterList?.length) {
    return null;
  }

  return (
    <Formik
      initialValues={contactFilterData}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        console.log("ca", values);
        const isDisabled =
          !(
            values.excludeConditions.length || values.includeConditions.length
          ) ||
          !validateData(values.includeConditions) ||
          !validateData(values.excludeConditions);

        return (
          <Form>
            <div className="flex gap-4 py-5 border-b-[1px] mt-3 border-gray-300 items-center">
              <p>
                <span className="font-bold">0</span> contact match these
                conditions (of a total <span className="font-bold">0</span>{" "}
                contacts)
              </p>
              <p className="bg-[#e6e4e4] w-fit py-2 px-4 rounded-full font-semibold">
                Update Recipient Count
              </p>
            </div>
            <GroupSegmentRow
              values={values}
              valueName="includeCondition"
              arrayFields="includeConditions"
              heading="Include"
              setFieldValue={setFieldValue}
            />
            <GroupSegmentRow
              values={values}
              valueName="excludeCondition"
              arrayFields="excludeConditions"
              heading="Exclude"
              setFieldValue={setFieldValue}
            />
            <OverrideOptOut
              values={values}
              setFieldValue={(field, value) => setFieldValue(field, value)}
            />
            <Button type="submit" className="mt-5" disabled={isDisabled}>
              Save
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupSegment;
