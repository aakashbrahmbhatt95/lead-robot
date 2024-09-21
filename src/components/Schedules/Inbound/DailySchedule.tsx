import { Switch } from "@/lib/ui/switch";
import { Input } from "@/lib/ui/input";
import { ArrowRight } from "lucide-react";
import { Field, ErrorMessage } from "formik";

const DailySchedule = ({ day, values, setFieldValue, isEdit }: any) => {
  const daySchedule = values?.schedule[day];

  return (
    <div className="flex items-center my-5 ml-3 gap-3">
      {!isEdit && (
        <Field
          name={`schedule.${day}.active`}
          render={({ field }: any) => (
            <Switch
              checked={daySchedule.active}
              onCheckedChange={(checked) => setFieldValue(field.name, checked)}
            />
          )}
        />
      )}
      <label className="block pl-2 text-sm font-medium w-[100px] text-gray-700">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </label>

      {daySchedule?.active &&
        (!isEdit ? (
          <>
            <div className="flex items-center gap-2">
              <Field name={`schedule.${day}.startTime`}>
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="time"
                    className="w-[120px]"
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                  />
                )}
              </Field>
              <ArrowRight />
              <Field name={`schedule.${day}.endTime`}>
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="time"
                    className="w-[120px]"
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    disabled={!daySchedule.startTime}
                    min={daySchedule.startTime || undefined}
                  />
                )}
              </Field>
            </div>
            <div className="flex flex-col">
              <ErrorMessage
                name={`schedule.${day}.startTime`}
                component="div"
                className="text-red-500 text-sm"
              />
              <ErrorMessage
                name={`schedule.${day}.endTime`}
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </>
        ) : (
          <p className="block pl-2 text-sm font-medium w-[100px] text-gray-700">
            {`${daySchedule.startTime} - ${daySchedule.endTime}`}
          </p>
        ))}
    </div>
  );
};

export default DailySchedule;
