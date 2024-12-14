import user from "@/../public/User.svg";
import userSwitch from "@/../public/UserSwitch.svg";
import phoneIncoming from "@/../public/PhoneIncoming.svg";
import table from "@/../public/Table.svg";
import warningCircle from "@/../public/WarningCircle.svg";

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

export const reviewBoxArray = (v: any) => {
  return [
    {
      img: user,
      count: v?.imported_count,
      text: "New people",
    },
    {
      img: userSwitch,
      count: v?.existing_count,
      text: "Existing people",
    },
    {
      img: phoneIncoming,
      count: v?.duplicated_phone_count,
      text: " Duplicate number",
    },
    {
      img: table,
      count: v?.tags?.[0],
      text: "Attributes",
    },
    {
      img: warningCircle,
      count:
        v?.invalid_row_count ||
        v?.invalid_phone_count ||
        v?.duplicated_phone_count,
      text: "Errors",
    },
  ];
};

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
    text: "Create Agent",
    value: 2,
  },
  {
    text: "Assign contacts",
    value: 3,
  },
  {
    text: "Schedule",
    value: 4,
  },
];
