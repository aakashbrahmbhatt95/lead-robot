import DateTimePicker from "@/lib/molecules/DateTimePicker";
import { Input } from "@/lib/ui/input";
import { Switch } from "@/lib/ui/switch";
import { Field } from "formik";
import { MultiSelect } from "./MultiSelect";

const LastInputValue = ({ values, arrayFields, index, setFieldValue }: any) => {
  const rowIndexData = values[arrayFields][index];
  const inputType = rowIndexData.lookupOptions?.casts?.length
    ? rowIndexData.castInputType?.input_type
    : rowIndexData.lookupOptions?.input_type;

  const fieldName = `${arrayFields}[${index}].lastInputValue`;

  return inputType === "list" ? (
    <Field name={fieldName}>
      {({ field }: any) => (
        <MultiSelect
          field={field}
          options={rowIndexData.filterTypeOptions?.choices || []}
          setFieldValue={setFieldValue}
        />
      )}
    </Field>
  ) : inputType === "bool" ? (
    <div className="w-[25%] px-4">
      <Switch
        checked={rowIndexData.lastInputValue || false}
        onCheckedChange={(checked) => {
          setFieldValue(fieldName, checked);
        }}
      />
    </div>
  ) : inputType === "datetime" ||
    inputType === "datetime_within" ||
    inputType === "this_datetime" ? (
    <div className="w-[25%]">
      <DateTimePicker
        value={rowIndexData.lastInputValue}
        onChangeDatePicker={(value: any) => {
          setFieldValue(fieldName, value);
        }}
      />
    </div>
  ) : (
    <Field
      as={Input}
      type={
        inputType === "str"
          ? "text"
          : inputType === "Number" || inputType === "int"
            ? "number"
            : inputType
      }
      name={fieldName}
      className="w-[250px]"
    />
  );
};

export default LastInputValue;
