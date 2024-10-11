"use client";

import Segments from "@/components/Segments";
import React from "react";

const SegmentPage = () => {
  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">Segmentation</h2>
      <Segments />
    </div>
  );
};

export default SegmentPage;
