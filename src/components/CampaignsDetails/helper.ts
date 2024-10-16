import user from "@/../public/User.svg";
import userSwitch from "@/../public/UserSwitch.svg";
import phoneIncoming from "@/../public/PhoneIncoming.svg";
import table from "@/../public/Table.svg";

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

export const reviewBoxArray = (v: any) => [
  {
    img: user,
    count: "1884",
    text: "New people",
  },
  {
    img: userSwitch,
    count: v?.existing_count || "N/A",
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
];

export const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

export const tabBarData = [
  {
    text: "Create task set",
    value: 1,
  },
  {
    text: "Assign contacts",
    value: 2,
  },
  {
    text: "Schedule",
    value: 3,
  },
  {
    text: "Agents",
    value: 4,
  },
  {
    text: "Setup call",
    value: 5,
  },
];
