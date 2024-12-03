"use client";

import React from "react";
import Contacts from "../../components/Contacts";

const ContactPage = () => {
  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">Contacts</h2>
      <Contacts />
    </div>
  );
};

export default ContactPage;
