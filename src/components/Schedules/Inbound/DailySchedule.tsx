import { Switch } from "@/lib/ui/switch";
import { Input } from "@/lib/ui/input";
import { ArrowRight } from "lucide-react";

const DailySchedule = ({
  day,
  values,
  setFieldValue,
  isEdit,
  formValues,
}: any) => {
  return (
    <div className="flex items-center my-5 ml-3 gap-3">
      {!isEdit && (
        <Switch
          checked={values.schedule[day].active}
          onCheckedChange={(checked) =>
            setFieldValue(`schedule.${day}.active`, checked)
          }
        />
      )}
      <label className="block pl-2 text-sm font-medium w-[100px] text-gray-700">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </label>

      {values.schedule[day].active &&
        (!isEdit ? (
          <>
            <Input
              type="time"
              className="w-[120px]"
              value={values.schedule[day].startTime}
              onChange={(e) =>
                setFieldValue(`schedule.${day}.startTime`, e.target.value)
              }
            />
            <ArrowRight />
            <Input
              type="time"
              className="w-[120px]"
              value={values.schedule[day].endTime}
              onChange={(e) =>
                setFieldValue(`schedule.${day}.endTime`, e.target.value)
              }
            />
          </>
        ) : (
          <p className="block pl-2 text-sm font-medium w-[100px] text-gray-700">
            {`${formValues.schedule[day].startTime} - ${formValues.schedule[day].endTime}`}
          </p>
        ))}
    </div>
  );
};

export default DailySchedule;
