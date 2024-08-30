"use client";

import * as React from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { DatePickerCalendar } from "../../ui/datePickerCalendar";

const TimePicker = ({ time, onTimeChange }: any) => {
  const handleChange = (event: any) => {
    onTimeChange(event.target.value);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2 bg-white text-gray-900"
    />
  );
};

const DateTimePicker = ({ value, onChangeDatePicker }: any) => {
  const [date, setDate] = useState<any>(value || "");
  const [time, setTime] = useState<any>("");

  const handleDateChange = (newDate: any) => {
    const dateStr = new Date(newDate).toISOString().split('T')[0];
    setDate(dateStr);
    if (dateStr && time) {
      onChangeDatePicker(`${dateStr} ${time}`);
    }
  };

  const handleTimeChange = (newTime: any) => {
    setTime(newTime);
    if (date && newTime) {
      onChangeDatePicker(`${date} ${newTime}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-full flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white text-gray-900">
          {value ? value : "Select Date and Time"}
          <CalendarIcon className="ml-2 text-gray-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white border border-gray-300 rounded-md shadow-lg"
        sideOffset={5}
      >
        <div className="flex flex-col p-2">
          <DatePickerCalendar value={date} onChange={handleDateChange} />
          <TimePicker time={time} onTimeChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
