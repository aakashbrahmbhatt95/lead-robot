import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { useAppSelector } from "@/redux/store";
import { Field } from "formik";
import { useEffect } from "react";

const OperatorField = ({ values, arrayFields, index, setFieldValue }: any) => {
  const { configFilterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );
  const rowIndexData = values[arrayFields]?.[index];

  useEffect(() => {
    if (rowIndexData?.filterTypeOptions?.filters?.length === 1) {
      setFieldValue(
        `${arrayFields}[${index}].filter`,
        rowIndexData.filterTypeOptions.filters[0]?.type
      );
      const selectedConfigFilter = Object.entries(configFilterList).find(
        ([key]) => key === rowIndexData.filterTypeOptions.filters[0]?.type
      );

      if (selectedConfigFilter) {
        setFieldValue(
          `${arrayFields}[${index}].lookupOptions`,
          selectedConfigFilter[1]
        );
      }
    } else {
      setFieldValue(`${arrayFields}[${index}].filter`, "");
    }
  }, [rowIndexData?.filterTypeOptions]);

  if (rowIndexData?.filterTypeOptions?.filters?.length === 1) {
    return null;
  }

  return (
    <Field name={`${arrayFields}[${index}].filter`}>
      {({ field }: any) => (
        <Select
          value={field.value || ""}
          onValueChange={(value: string) => {
            if (rowIndexData?.filterTypeOptions?.filters?.length !== 1) {
              field.onChange({ target: { name: field.name, value } });
              const selectedConfigFilter = Object.entries(
                configFilterList
              ).find(([key]) => key === value);

              if (selectedConfigFilter) {
                setFieldValue(
                  `${arrayFields}[${index}].lookupOptions`,
                  selectedConfigFilter[1]
                );
              }

              setFieldValue(`${arrayFields}[${index}].lookup`, "");
              setFieldValue(`${arrayFields}[${index}].value`, "");
            }
          }}
        >
          <SelectTrigger className="w-[250px] mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {rowIndexData?.filterTypeOptions?.filters?.map((ele: any) => (
              <SelectItem key={ele?.type} value={ele?.type}>
                {ele?.label || "Select Option"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  );
};

export default OperatorField;
