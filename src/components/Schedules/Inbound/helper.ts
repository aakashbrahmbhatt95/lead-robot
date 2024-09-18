export const scheduleMenuBar = [
  {
    text: "Inbound",
    value: "inbound",
  },
  {
    text: "Outbound",
    value: "outbound",
  },
  {
    text: "Dynamic",
    value: "dynamic",
  },
];

export const weekData = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

 export function calculateDuration(startTime: any, endTime: any) {
  const [startHours, startMinutes] = startTime?.split(":").map(Number);
  const [endHours, endMinutes] = endTime?.split(":").map(Number);
  
  const startDate: any = new Date(0, 0, 0, startHours, startMinutes, 0);
  const endDate: any = new Date(0, 0, 0, endHours, endMinutes, 0);
  
  // Calculate the difference in seconds
  let duration = (endDate - startDate) / 1000;
  // If the endTime is earlier than startTime, assume the schedule goes into the next day
  if (duration < 0) {
    duration += 24 * 3600; // Add 24 hours in seconds
  }
  
  return duration;
}

export const dayMap: any = {
  "monday": 0,
  "tuesday": 1,
  "wednesday": 2,
  "thursday": 3,
  "friday": 4,
  "saturday": 5,
  "sunday": 6
};