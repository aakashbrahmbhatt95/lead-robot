import { Input } from "@/lib/ui/input";

interface TimeZoneAndHolidaysProps {
  timeZone: string;
  setTimeZone: (value: string) => void;
  excludePublicHolidays: string;
  setExcludePublicHolidays: (value: string) => void;
}

const TimeZoneAndHolidays = ({
  timeZone,
  setTimeZone,
  excludePublicHolidays,
  setExcludePublicHolidays,
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
        <Input
          className="mt-2 w-full"
          type="text"
          name="excludePublicHolidays"
          value={excludePublicHolidays}
          onChange={(e) => setExcludePublicHolidays(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TimeZoneAndHolidays;
