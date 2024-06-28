import user from "@/../public/User.svg";
import userSwitch from "@/../public/UserSwitch.svg";
import phoneIncoming from "@/../public/PhoneIncoming.svg";
import table from "@/../public/Table.svg";
import warningCircle from "@/../public/WarningCircle.svg";

export const row = [
  {
    text: "Agents: 2",
    img: "",
  },
  {
    text: "Lists: 2",
    img: "",
  },
  {
    text: "10 Jun - 10 Jul",
    img: "",
  },
  {
    text: "Inbound",
    img: "",
  },
  {
    text: "Numbers: 2",
    img: "",
  },
];

export const menuBarArray = [
  {
    text: "1. Upload CSV",
    value: 1,
  },
  {
    text: "2. Map",
    value: 2,
  },
  {
    text: "3. Tag",
    value: 3,
  },
  {
    text: "4. Review",
    value: 4,
  },
];

export const mapTableData = [
  {
    id: "1",
    title: "Name",
    description: "id_name, id_name, id_name, id_name",
  },
  {
    id: "2",
    title: "Number",
    description: "#number, #number, #number, #number",
  },
  {
    id: "3",
    title: "Gender",
    description: "Male, Female, Unidentified, Non-Binary",
  },
  {
    id: "4",
    title: "Place",
    description: "USA,South Africa",
  },
  {
    id: "5",
    title: "Age",
    description: "21, 30, 40, 50",
  },
];

export const reviewBoxArray = [
  {
    img: user,
    count: "1884",
    text: "New people",
  },
  {
    img: userSwitch,
    count: "20",
    text: "Existing people",
  },
  {
    img: phoneIncoming,
    count: "10",
    text: " Number charges",
  },
  {
    img: table,
    count: "20",
    text: "Attributes",
  },
  {
    img: warningCircle,
    count: "4",
    text: "Errors",
  },
];
