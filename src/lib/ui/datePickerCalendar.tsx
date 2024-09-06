import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePickerCalendar = ({ value, onChange }: any) => {
  return (
    <Calendar
      value={value}
      onChange={(date: any) => onChange(date)}
      className="react-calendar border border-gray-300 rounded-md"
    />
  );
};

export { DatePickerCalendar };
