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
  return rowIndexData?.lookupArrays?.casts?.length ? (
    <Field name={`${arrayFields}[${index}].castValue`}>
      {({ field }: any) => (
        <Select
          value={rowIndexData?.castValue}
          onValueChange={(value: any) => {
            field.onChange({
              target: { name: field.name, value },
            });
            const temp = rowIndexData?.lookupArrays?.casts?.find(
              (ele: any) => ele.value === value
            );
            setFieldValue(`${arrayFields}[${index}].castInputType`, temp);
          }}
        >
          <SelectTrigger className="w-[250px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {rowIndexData?.lookupArrays?.casts?.map((ele: any) => (
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
