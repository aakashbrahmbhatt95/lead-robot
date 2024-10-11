import IncludeSegment from "./IncludeSegment";
import ExcludeSegment from "./ExcludeSegment";
import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";

const GroupSegment = () => {
  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <Formik
      initialValues={{
        includeCondition: "",
        includeConditions: [{ field: "", operator: "", value: "" }],
        excludeCondition: [{ field: "", operator: "", value: "" }],
        excludeConditions: [{ field: "", operator: "", value: "" }],
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
          <IncludeSegment values={values} />
          <ExcludeSegment values={values} />
          <OverrideOptOut
            values={values}
            setFieldValue={(field, value) => setFieldValue(field, value)}
          />
          <Button type="submit" className="mt-5">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default GroupSegment;
