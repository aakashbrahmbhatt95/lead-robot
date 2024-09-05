import { useState, useEffect } from "react";
import { Checkbox } from "@/lib/ui/checkbox";
import { DESELECT_TEXT, REMAP_COLUMN_TEXT } from "./contactsPopupHelper";
import { useAppSelector } from "@/redux/store";

const MapAttribute = ({
  selectedAttributes,
  setSelectedAttributes,
  setHasMappingError,
  hasMappingError,
  columns,
}: any) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>(
    columns.reduce((acc: any, column: string) => {
      acc[column] = true;
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState<any>({});
  const [validMapping, setValidMapping] = useState<any>(
    columns.reduce((acc: any, column: string) => {
      acc[column] = false;
      return acc;
    }, {})
  );

  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  const handleAttributeChange = (column: string, selectedKey: string) => {
    const duplicateKey = Object.keys(selectedAttributes).find(
      (key) => selectedAttributes[key] === selectedKey && key !== column
    );

    if (duplicateKey) {
      setErrors((prev: any) => ({
        ...prev,
        [column]: `The attribute "${selectedKey}" is already mapped to another column.`,
      }));
      setValidMapping((prev: any) => ({ ...prev, [column]: false }));
    } else {
      setErrors((prev: any) => ({ ...prev, [column]: "" }));

      setSelectedAttributes((prev: any) => ({
        ...prev,
        [column]: selectedKey,
      }));

      if (selectedKey) {
        setValidMapping((prev: any) => ({
          ...prev,
          [column]: true,
        }));
      }
    }
  };

  const handleCheckboxChange = (column: string, isChecked: boolean) => {
    setSelectedCheckboxes((prev: any) => ({
      ...prev,
      [column]: isChecked,
    }));

    if (!isChecked) {
      setSelectedAttributes((prev: any) => {
        const { [column]: _, ...rest } = prev;
        return rest;
      });

      setErrors((prev: any) => ({ ...prev, [column]: "" }));
      setValidMapping((prev: any) => ({ ...prev, [column]: false }));
    } else if (isChecked && selectedAttributes[column]) {
      handleAttributeChange(column, selectedAttributes[column]);
    }
  };

  
  useEffect(() => {
    const isAllCheckedColumnsMapped = Object.keys(selectedCheckboxes).every(
      (column) =>
        selectedCheckboxes[column] === false ||
        (selectedCheckboxes[column] && validMapping[column])
    );
    setHasMappingError(!isAllCheckedColumnsMapped)
  }, [JSON.stringify(selectedCheckboxes), JSON.stringify(validMapping)])

  return (
    <div>
      <div className="my-4">
        {columns.map((column: string, colIndex: number) => (
          <div className="flex w-full items-center mt-2" key={colIndex}>
            <Checkbox
              className="mr-2"
              checked={selectedCheckboxes[column] || false}
              onCheckedChange={(checked: boolean) =>
                handleCheckboxChange(column, checked)
              }
            />

            <div className="w-[30%] flex items-center">
              <p className="text-[#18181B] text-sm font-bold">{column}</p>
            </div>

            <div className="w-[40%]">
              <select
                value={selectedAttributes[column] || ""}
                onChange={(e) => handleAttributeChange(column, e.target.value)}
                disabled={!selectedCheckboxes[column]}
                className={`border ${
                  errors[column] ? "border-red-500" : "border-gray-300"
                } rounded p-2 w-full`}
              >
                <option value="">Select an attribute</option>
                {attributesList.map((attr: any) => (
                  <option key={attr.id} value={attr.key}>
                    {attr.label}
                  </option>
                ))}
              </select>
              {errors[column] && (
                <p className="text-red-500 text-sm">{errors[column]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-[#71717A] text-sm font-normal">
          {DESELECT_TEXT} <br />
          {REMAP_COLUMN_TEXT}
        </p>
      </div>

      {hasMappingError && (
        <div className="text-red-500 text-sm mt-4">
          Please map all checked columns to attributes.
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Mapped Columns</h3>
        <pre>{JSON.stringify(selectedAttributes, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MapAttribute;
