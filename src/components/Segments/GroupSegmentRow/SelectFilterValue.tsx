import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Field } from "formik";

const SelectFilterValue = ({
  arrayFields,
  index,
  filters,
  setFieldValue,
}: any) => {
  return (
    <Field name={`${arrayFields}[${index}].field`}>
      {({ field }: any) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange({ target: { name: field.name, value } });
            const selectedFilter = Object.entries(filters).find(
              ([, option]: any) => option.field === value
            );

            if (selectedFilter) {
              setFieldValue(
                `${arrayFields}[${index}].filterTypeOptions`,
                selectedFilter[1]
              );
            }

            setFieldValue(`${arrayFields}[${index}].lookupOptions`, []);
            setFieldValue(`${arrayFields}[${index}].filter_type`, "");
            setFieldValue(`${arrayFields}[${index}].lookup`, "");
            setFieldValue(`${arrayFields}[${index}].lastInputValue`, "");
          }}
        >
          <SelectTrigger className="w-[300px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(filters).map(([key, option]: any) => (
              <SelectItem key={key} value={option.field}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};

export default SelectFilterValue;
