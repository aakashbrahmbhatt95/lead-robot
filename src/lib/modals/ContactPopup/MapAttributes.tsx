import { useState, useEffect } from "react";
import { Checkbox } from "@/lib/ui/checkbox";
import { DESELECT_TEXT, REMAP_COLUMN_TEXT } from "./contactsPopupHelper";
import { useAppSelector } from "@/redux/store";
import MapComboBox from "./MapComboBox";

const MapAttributes = ({
  selectedAttributes,
  setSelectedAttributes,
  setHasMappingError,
  hasMappingError,
  columns,
  selectedCheckboxes,
  setSelectedCheckboxes,
  validMapping,
  setValidMapping,
  selectAllAttributes,
  setSelectAllAttributes,
}: any) => {
  const [errors, setErrors] = useState<any>({});
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  useEffect(() => {
    if (selectAllAttributes) {
      const defaultSelectedAttributes: any = selectedAttributes;
      let shouldUpdate = false;

      columns.forEach((column: string) => {
        const matchingAttribute = attributesList.find(
          (attr: any) => attr.key === column
        );
        if (matchingAttribute && !selectedAttributes[column]) {
          if (selectedAttributes[column] !== matchingAttribute.key) {
            defaultSelectedAttributes[column] = matchingAttribute.key;
            shouldUpdate = true;
          }
          setSelectedCheckboxes((prev: any) => ({
            ...prev,
            [column]: true,
          }));
          setValidMapping((prev: any) => ({
            ...prev,
            [column]: true,
          }));

          handleAttributeChange(column, matchingAttribute.key);
        }
      });

      if (shouldUpdate) {
        setSelectedAttributes(defaultSelectedAttributes);
      }
    }
  }, [selectAllAttributes]);

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
      setSelectAllAttributes(false);
    } else if (isChecked && selectedAttributes[column]) {
      handleAttributeChange(column, selectedAttributes[column]);
    }
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    setSelectAllAttributes(isChecked);
    setSelectedCheckboxes((prev: any) =>
      columns.reduce((acc: any, column: string) => {
        acc[column] = isChecked;
        return acc;
      }, {})
    );

    if (!isChecked) {
      setSelectedAttributes({});
      setValidMapping({});
    }
  };

  useEffect(() => {
    const isAllCheckedColumnsMapped = Object.keys(selectedCheckboxes).every(
      (column) =>
        selectedCheckboxes[column] === false ||
        (selectedCheckboxes[column] && validMapping[column])
    );
    setHasMappingError(!isAllCheckedColumnsMapped);
  }, [selectedCheckboxes, validMapping]);

  return (
    <div>
      <div className="my-4">
        <div className="flex items-center mb-4">
          <Checkbox
            className="mr-2"
            checked={selectAllAttributes || false}
            onCheckedChange={(checked: boolean) =>
              handleSelectAllChange(checked)
            }
          />
          <p className="text-[#18181B] text-sm font-bold">Select All</p>
        </div>
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
              <MapComboBox
                value={selectedAttributes[column] || ""}
                onChange={(newValue: any) =>
                  handleAttributeChange(column, newValue)
                }
                disabled={!selectedCheckboxes[column]}
                error={errors[column]}
              />
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
    </div>
  );
};

export default MapAttributes;
