import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";

const ConditionRow = ({ heading, valueName }: any) => (
  <div className="flex items-center gap-2 border-b-[1px] border-gray-300 pb-3">
    <p>
      <span className="font-bold">{heading}</span> if contacts match
    </p>
    <Field name={valueName}>
      {({ field }: any) => (
        <Select
          value={field.value}
          onValueChange={(value: any) =>
            field.onChange({ target: { name: field.name, value } })
          }
        >
          <SelectTrigger className="w-[100px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="any">ANY</SelectItem>
          </SelectContent>
        </Select>
      )}
    </Field>
    <p>of the following conditions:</p>
  </div>
);

export default ConditionRow;
