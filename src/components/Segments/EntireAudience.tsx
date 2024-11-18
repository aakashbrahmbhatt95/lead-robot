import OverrideOptOut from "./OverrideOptOut";
import { Button } from "@/lib/ui/button";
import { Formik, Form } from "formik";

const EntireAudience = () => {
  const handleSubmit = (values: any) => {};

  return (
    <Formik
      initialValues={{
        overrideOptOut: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <p className="py-5">
              <span className="font-bold">101</span> recipients. Everyone in
              your audience will receive this email.
            </p>
          </div>
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

export default EntireAudience;
