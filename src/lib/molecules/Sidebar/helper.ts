import Group3 from "@/../public/Group3.png";
import Group4 from "@/../public/Group4.png";
import Group5 from "@/../public/Group5.png";

export const SideBarData = [
  {
    icon: Group3,
    text: "Dashboard",
    url: "/",
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
    icon: Group4,
    text: "Attributes",
    url: "/attributes",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group4,
    text: "Tags",
    url: "/tags",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group4,
    text: "Contacts",
    url: "/contacts",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group4,
    text: "Campaigns",
    url: "/campaigns",
    showSecondarySidebar: false,
    secondarySideBarData: [],
  },
  {
    icon: Group5,
    text: "Settings",
    url: "",
    showSecondarySidebar: true,
    secondarySideBarData: [
      {
        text: "Logout",
      },
    ],
  },
];
