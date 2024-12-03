import Group3 from "@/../public/Group3.png";
import Group4 from "@/../public/Group4.png";
import Group5 from "@/../public/Group5.png";
import ContactsIcon from "@/../public/contacts.svg";

export const SideBarData = [
  {
    icon: Group5,
    text: "Campaigns",
    url: "/campaigns",
  },
  {
    icon: Group4,
    text: "Insights",
    url: "/insights",
  },

  {
    icon: ContactsIcon,
    text: "Contacts",
    url: "/contacts",
  },
  {
    icon: Group3,
    text: "Settings",
    url: "",
    dropdownContent: [
      { label: "Attributes", url: "/attributes" },
      { label: "Tags", url: "/tags" },
      { label: "Logout", url: "" },
    ],
  },
];
