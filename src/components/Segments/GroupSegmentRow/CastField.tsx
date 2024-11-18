import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { Field } from "formik";

const CastField = ({ values, arrayFields, index, setFieldValue }: any) => {
  const rowIndexData = values[arrayFields][index];
  return rowIndexData?.lookupOptions?.casts?.length ? (
    <Field name={`${arrayFields}[${index}].cast`}>
      {({ field }: any) => (
        <Select
          value={rowIndexData?.cast}
          onValueChange={(value: any) => {
            field.onChange({
              target: { name: field.name, value },
            });
            const temp = rowIndexData?.lookupOptions?.casts?.find(
              (ele: any) => ele.value === value
            );
            setFieldValue(`${arrayFields}[${index}].castInputType`, temp);
          }}
        >
          <SelectTrigger className="w-[250px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {rowIndexData?.lookupOptions?.casts?.map((ele: any) => (
              <SelectItem key={ele.value} value={ele.value || null}>
                {ele.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  ) : (
    <></>
  );
};

export default CastField;
