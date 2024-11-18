import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";
import GroupSegmentRow from "./GroupSegmentRow";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getContactFilterAction } from "@/redux/action/contactFilter-action";
import {
  addFilterByFilterSetId,
  getConfigFilterHandler,
  getFiltersHandler,
} from "./GroupSegmentRow/helper";

const GroupSegment = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState(null);
  const [configFilters, setConfigFilters] = useState(null);

  const { contactFilterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );
  const contactFilterId = (value: any) => {
    const temp = contactFilterList?.filter(
      (ele: any) => ele?.exclude === value
    )?.[0]?.id;
    return temp;
  };
  useEffect(() => {
    dispatch(getContactFilterAction());
    getConfigFilterHandler(setConfigFilters);
    getFiltersHandler(setFilters);
  }, []);

  const handleSubmit = (values: any) => {
    values?.includeConditions?.map((ele: any) => {
      const body: any = {
        field: ele?.filterValue,
        filter_type: ele?.operator,
        lookup: ele?.lookupValue,
        value: ele?.lastInputValue,
        cast: ele?.castValue,
      };
      addFilterByFilterSetId(body, contactFilterId(false));
    });
    values?.excludeConditions?.map((ele: any) => {
      const body: any = {
        field: ele?.filterValue,
        filter_type: ele?.operator,
        lookup: ele?.lookupValue,
        value: ele?.lastInputValue,
        cast: ele?.castValue,
      };
      addFilterByFilterSetId(body, contactFilterId(true));
    });
  };

  if (!contactFilterList?.length) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        includeCondition: "all",
        includeConditions: [],
        excludeCondition: "all",
        excludeConditions: [],
        overrideOptOut: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
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
            filters={filters}
            configFilters={configFilters}
          />
          <GroupSegmentRow
            values={values}
            valueName="excludeCondition"
            arrayFields="excludeConditions"
            heading="Exclude"
            setFieldValue={setFieldValue}
            filters={filters}
            configFilters={configFilters}
          />
          <OverrideOptOut
            values={values}
            setFieldValue={(field, value) => setFieldValue(field, value)}
          />
          <Button type="submit" className="mt-5">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default GroupSegment;
