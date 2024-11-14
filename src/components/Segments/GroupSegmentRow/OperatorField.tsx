import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Field } from "formik";

const OperatorField = ({
  values,
  arrayFields,
  index,
  setFieldValue,
  configFilters,
}: any) => {
  const rowIndexData = values[arrayFields][index];
  return (
    <Field name={`${arrayFields}[${index}].operator`}>
      {({ field }: any) => (
        <Select
          value={field.value}
          onValueChange={(value: any) => {
            field.onChange({ target: { name: field.name, value } });
            const selectedConfigFilter = Object.entries(configFilters).find(
              ([key]) => key === value
            );

            if (selectedConfigFilter) {
              setFieldValue(
                `${arrayFields}[${index}].lookupArrays`,
                selectedConfigFilter[1]
              );
            }

            setFieldValue(`${arrayFields}[${index}].lookupValue`, "");
            setFieldValue(`${arrayFields}[${index}].lastInputValue`, "");
          }}
        >
          <SelectTrigger className="w-[250px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {rowIndexData.operatorArrays?.filters?.map((ele: any) => (
              <SelectItem key={ele} value={ele}>
                {ele}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};

export default OperatorField;
