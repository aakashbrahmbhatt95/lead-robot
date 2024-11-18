import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";
import GroupSegmentRow from "./GroupSegmentRow";
import { useEffect, useState } from "react";
import {
  getConfigFilterHandler,
  getFiltersHandler,
} from "./GroupSegmentRow/helper";
import {
  addFilterByFilterSetId,
  editFilterByFilterSetId,
  getContactFilterAction,
  initialContactFilterData,
} from "./helper";
import { useParams } from "next/navigation";

const GroupSegment = () => {
  const params = useParams();
  const [filters, setFilters] = useState<any>(null);
  const [configFilters, setConfigFilters] = useState<any>(null);
  const [contactFilterList, setContactFilterList] = useState<any>([]);
  const [contactFilterData, setContactFilterData] = useState<any>(
    initialContactFilterData
  );

  const fetchData = async () => {
    await getConfigFilterHandler(setConfigFilters);
    await getFiltersHandler(setFilters);
  };

  const fetchContactData = async () => {
    await getContactFilterAction(
      contactFilterData,
      setContactFilterData,
      contactFilterList,
      setContactFilterList,
      params?.id,
      filters,
      configFilters
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filters && configFilters) {
      fetchContactData();
    }
  }, [filters, configFilters]);

  const handleSubmit = (values: any) => {
    const contactFilterId = (isExcluded: boolean) =>
      contactFilterList?.find((ele: any) => ele?.exclude === isExcluded)?.id;

    const processConditions = (
      conditions: any[],
      isExcluded: boolean,
      action: "add" | "edit"
    ) => {
      conditions?.forEach((condition: any) => {
        const body = {
          field: condition?.field,
          filter_type: condition?.filter_type,
          lookup: condition?.lookup,
          value: condition?.lastInputValue,
          cast: condition?.cast,
        };

        if (action === "add" && !condition?.id) {
          addFilterByFilterSetId(
            body,
            contactFilterId(isExcluded),
            contactFilterData,
            setContactFilterData,
            contactFilterList,
            setContactFilterList,
            params?.id,
            filters,
            configFilters
          );
        } else if (action === "edit" && condition?.id) {
          editFilterByFilterSetId(
            body,
            contactFilterId(isExcluded),
            condition?.id,
            contactFilterData,
            setContactFilterData,
            contactFilterList,
            setContactFilterList,
            params?.id,
            filters,
            configFilters
          );
        }
      });
    };

    // Process include and exclude conditions
    processConditions(values?.includeConditions, false, "add");
    processConditions(values?.includeConditions, true, "edit");
    processConditions(values?.excludeConditions, false, "add");
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
            contactFilterData={contactFilterData}
            setContactFilterData={setContactFilterData}
            contactFilterList={contactFilterList}
            setContactFilterList={setContactFilterList}
            campaignDataById={params.id}
          />
          <GroupSegmentRow
            values={values}
            valueName="excludeCondition"
            arrayFields="excludeConditions"
            heading="Exclude"
            setFieldValue={setFieldValue}
            filters={filters}
            configFilters={configFilters}
            contactFilterData={contactFilterData}
            setContactFilterData={setContactFilterData}
            contactFilterList={contactFilterList}
            setContactFilterList={setContactFilterList}
            campaignDataById={params.id}
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
