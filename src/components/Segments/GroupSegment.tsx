import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";
import SegmentFieldArray from "./SegmentFieldArray";
import { initialConditionRowState } from "./helper";

const GroupSegment = () => {
  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <Formik
      initialValues={{
        includeCondition: "all",
        includeConditions: [initialConditionRowState],
        excludeCondition: "all",
        excludeConditions: [initialConditionRowState],
        overrideOptOut: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex gap-4 py-5 border-b-[1px] border-gray-300 items-center">
            <p>
              <span className="font-bold">0</span> contact match these
              conditions (of a total <span className="font-bold">0</span>{" "}
              contacts)
            </p>
            <p className="bg-[#e6e4e4] w-fit py-2 px-4 rounded-full font-semibold">
              Update Recipient Count
            </p>
          </div>
          <SegmentFieldArray
            values={values}
            valueName="includeCondition"
            arrayFields="includeConditions"
            heading="Include"
            setFieldValue={setFieldValue}
          />
          <SegmentFieldArray
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
          <Button type="submit" className="mt-5">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default GroupSegment;
