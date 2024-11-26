import { Field } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL1, GET_CONTACT_FILTER } from "@/utils/apiConstants";
import { useAppSelector } from "@/redux/store";
import { getToken } from "@/utils/constants";

const ConditionRow = ({ heading, valueName, arrayFields }: any) => {
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );
  const { contactFilterList }: any = useAppSelector(
    (state: any) => state.contactFilterReducer
  );

  return (
    <div className="flex items-center gap-2 border-b-[1px] border-gray-300 pb-3">
      <p>
        <span className="font-bold">{heading}</span> if contacts match
      </p>
      <Field name={valueName}>
        {({ field }: any) => (
          <Select
            value={field.value}
            onValueChange={async (value: any) => {
              const getContactFilterId = (isExcluded: boolean) => {
                return contactFilterList?.find(
                  (ele: any) => ele?.exclude === isExcluded
                )?.id;
              };

              const res = await HttpUtil.makePUT(
                `${BASE_URL1}${GET_CONTACT_FILTER}${getContactFilterId(arrayFields === "includeConditions" ? false : true)}`,
                {
                  exclude: arrayFields === "includeConditions" ? false : true,
                  any: value === "any" ? true : false,
                  campaign_id: campaignDataById?.id,
                },
                {
                  Authorization: getToken(),
                }
              );
              field.onChange({ target: { name: field.name, value } });
            }}
          >
            <SelectTrigger className="w-[100px] mt-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL</SelectItem>
              <SelectItem value="any">ANY</SelectItem>
            </SelectContent>
          </Select>
        )}
      </Field>
      <p>of the following conditions:</p>
    </div>
  );
};

export default ConditionRow;
