"use client";

import React from "react";
import Schedules from "@/components/Schedules";

const SchedulePage = () => {

  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">Schedule</h2>
      <Schedules />
    </div>
  );
};

export default SchedulePage;
