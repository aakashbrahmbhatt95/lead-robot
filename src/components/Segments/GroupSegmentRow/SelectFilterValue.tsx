import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { useAppSelector } from "@/redux/store";
import { Field } from "formik";

const SelectFilterValue = ({ arrayFields, index, setFieldValue }: any) => {
  const { filterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );
  return (
    <Field name={`${arrayFields}[${index}].field`}>
      {({ field }: any) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange({ target: { name: field.name, value } });
            const selectedFilter = Object.entries(filterList).find(
              ([, option]: any) => option?.field === value
            );

            if (selectedFilter) {
              setFieldValue(
                `${arrayFields}[${index}].filterTypeOptions`,
                selectedFilter[1]
              );
            }

            setFieldValue(`${arrayFields}[${index}].lookupOptions`, []);
            setFieldValue(`${arrayFields}[${index}].lookup`, "");
            setFieldValue(`${arrayFields}[${index}].lastInputValue`, "");
            setFieldValue(`${arrayFields}[${index}].cast`, "");
          }}
        >
          <SelectTrigger className="w-[300px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(filterList).map(([key, option]: any) => (
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
