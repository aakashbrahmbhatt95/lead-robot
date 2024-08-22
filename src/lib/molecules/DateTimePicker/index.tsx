"use client";

import * as React from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";

const TimePicker = ({ time, onTimeChange }) => {
  const handleChange = (event) => {
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

const DateTimePicker = ({ value, onChange }: any) => {
  const [date, setDate] = useState(value ? format(value, "yyyy-MM-dd") : "");
  const [time, setTime] = useState(value ? format(value, "HH:mm") : "");

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (newDate && time) {
      onChange(new Date(`${newDate}T${time}`));
    }
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    if (date && newTime) {
      onChange(new Date(`${date}T${newTime}`));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-full flex justify-between items-center border border-gray-300 rounded-md p-2 bg-white text-gray-900">
          {value ? format(value, "PPPpp") : "Select Date and Time"}
          <CalendarIcon className="ml-2 text-gray-600" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white border border-gray-300 rounded-md shadow-lg"
        sideOffset={5}
      >
        <div className="flex flex-col p-2">
          <Calendar value={date} onChange={handleDateChange} />
          <TimePicker time={time} onTimeChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
