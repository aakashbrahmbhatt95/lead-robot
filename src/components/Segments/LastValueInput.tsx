import DateTimePicker from "@/lib/molecules/DateTimePicker";
import { Input } from "@/lib/ui/input";
import { Switch } from "@/lib/ui/switch";
import { Field } from "formik";
import { MultiSelect } from "./MultiSelect";

const LastInputValue = ({ values, arrayFields, index, setFieldValue }: any) => {
  return values[arrayFields][index].operator === "list" ? (
    <Field name={`${arrayFields}[${index}].inputValue`}>
      {({ field }: any) => (
        <MultiSelect
          field={field}
          options={values[arrayFields][index].operatorArrays?.choices || []}
          setFieldValue={setFieldValue}
        />
      )}
    </Field>
  ) : values[arrayFields][index].operator === "boolean" ? (
    <div className="w-[25%] px-4">
      <Switch
        checked={values[arrayFields][index].inputValue || false}
        onCheckedChange={(checked) => {
          console.log("checked", checked);
          setFieldValue(`${arrayFields}[${index}].inputValue`, checked);
        }}
      />
    </div>
  ) : values[arrayFields][index].operator === "datetime" ||
    values[arrayFields][index].operator === "datetime_within" ||
    values[arrayFields][index].operator === "this_datetime" ? (
    <div className="w-[25%]">
      <DateTimePicker
        value={values[arrayFields][index].inputValue}
        onChangeDatePicker={(value: any) => {
          setFieldValue(`${arrayFields}[${index}].inputValue`, value);
        }}
      />
    </div>
  ) : (
    <Field
      as={Input}
      type={
        values[arrayFields][index].operator === "date"
          ? "date"
          : values[arrayFields][index].operator === "time"
            ? "time"
            : values[arrayFields][index].operator
      }
      name={`${arrayFields}[${index}].inputValue`}
      className="w-[250px]"
    />
  );
};

export default LastInputValue;
