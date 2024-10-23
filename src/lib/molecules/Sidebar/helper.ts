import Group3 from "@/../public/Group3.png";
import Group4 from "@/../public/Group4.png";
import Group5 from "@/../public/Group5.png";
import ContactsIcon from "@/../public/contacts.svg";

export const SideBarData = [
  {
    icon: Group5,
    text: "Campaigns",
    url: "/campaigns",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group4,
    text: "Insights",
    url: "",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },

  {
    icon: ContactsIcon,
    text: "Contacts",
    url: "/contacts",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group3,
    text: "Settings",
    url: "",
    showSecondarySidebar: true,
    secondarySideBarData: [
      {
        text: "Attributes",
        url: "/attributes",
      },
      {
        text: "Tags",
        url: "/tags",
      },
      {
        text: "Logout",
        url: "",
      },
    ],
  },
];
