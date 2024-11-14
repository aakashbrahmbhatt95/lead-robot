import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Field } from "formik";

const SelectLookupValue = ({
  arrayFields,
  index,
  setFieldValue,
  values,
}: any) => {
  return (
    <Field name={`${arrayFields}[${index}].lookupValue`}>
      {({ field }: any) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange({
              target: { name: field.name, value },
            });
            setFieldValue(`${arrayFields}[${index}].lastInputValue`, "");
          }}
        >
          <SelectTrigger className="w-[250px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {values[arrayFields][index].lookupArrays?.lookups?.map(
              (ele: any) => (
                <SelectItem key={ele.value} value={ele.value}>
                  {ele.label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};

export default SelectLookupValue;
