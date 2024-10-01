import { countriesWithRegionCode } from "@/components/Contacts/helper";
import { Input } from "@/lib/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";

interface TimeZoneAndHolidaysProps {
  timeZone: string;
  setTimeZone: (value: string) => void;
  excludePublicHolidays: string;
  setExcludePublicHolidays: (value: string) => void;
  isEdit: boolean
}

const TimeZoneAndHolidays = ({
  timeZone,
  setTimeZone,
  excludePublicHolidays,
  setExcludePublicHolidays,
  isEdit
}: TimeZoneAndHolidaysProps) => {
  return (
    <div className="basis-1/4 p-3">
      <div>
        <label className="block mt-3 text-sm font-medium text-gray-700">
          Time Zone
        </label>
        <Input
          className="mt-2 w-full"
          type="text"
          name="timeZone"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        />
      </div>
      <div>
        <label className="block mt-3 text-sm font-medium text-gray-700">
          Exclude Public Holidays
        </label>
        <Select
          name="excludePublicHolidays"
          value={excludePublicHolidays}
          onValueChange={(value) => setExcludePublicHolidays(value)}
          disabled={isEdit}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {countriesWithRegionCode?.map((ele: any) => {
              return (
                <SelectItem key={ele?.code} value={ele?.code}>
                  {ele?.name} ({ele?.dial_code})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeZoneAndHolidays;
