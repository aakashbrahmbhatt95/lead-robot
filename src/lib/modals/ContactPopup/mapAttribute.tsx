import { Checkbox } from "@/lib/ui/checkbox";
import MapComboBox from "./MapComboBox";
import { useAppSelector } from "../../../redux/store";
import { DESELECT_TEXT, REMAP_COLUMN_TEXT } from "./contactsPopupHelper";

const MapAttribute = ({ selectedAttributes, setSelectedAttributes }: any) => {
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  const handleCheckboxChange = (attribute: any, checked: boolean) => {
    if (checked) {
      setSelectedAttributes((prev: any) => [...prev, attribute]);
    } else {
      setSelectedAttributes((prev: any) =>
        prev.filter((attr: any) => attr.id !== attribute.id)
      );
    }
  };

  return (
    <div>
      <div className="my-4">
        {attributesList?.map((ele: any, index: any) => {
          return (
            <div className="flex w-full items-center mt-2" key={index}>
              <div className="w-[5%] ml-2">{ele?.id}</div>
              <div className="w-[30%] flex gap-3 items-center">
                <Checkbox
                  className="w-[15px] h-[15px] rounded-none"
                  checked={selectedAttributes.some(
                    (attr: any) => attr.id === ele.id
                  )}
                  onCheckedChange={(checked: any) =>
                    handleCheckboxChange(ele, checked)
                  }
                />{" "}
                <p className="text-[#18181B] text-sm font-bold">{ele?.label}</p>
              </div>
              <div className="w-[25%] flex items-end">
                <MapComboBox />
              </div>
              <div className="w-[45%] ml-8">
                <p className="text-sm font-normal text-[#18181B]">{ele?.key}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[#71717A] mt-8 text-sm font-normal">
        {DESELECT_TEXT} <br />
        {REMAP_COLUMN_TEXT}
      </p>
    </div>
  );
};

export default MapAttribute;
