export function convertInput(input: any) {
  const output: any = {
    schedule: {},
    startDate: input[0].start_date,
    endDate: input[0].end_date,
  };

  weekdaysMap.forEach((day: any) => {
    output.schedule[day] = {
      active: false,
      startTime: "",
      endTime: "",
    };
  });
  input.map((entry: any) => {
    entry.byweekday.forEach((weekday: any) => {
      const dayName = weekdaysMap[weekday];
      const startTime = entry.times[0]; // Assuming only one time entry per day
      const endTime = addDuration(startTime, entry.duration);

      output.schedule[dayName].active = true;
      output.schedule[dayName].startTime = startTime.slice(0, 5); // "hh:mm"
      output.schedule[dayName].endTime = endTime;
    });
  });

  return output;
}

export function addDuration(time: any, duration: any) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const durationMatch = /P.*T(\d{2})H(\d{2})M(\d{2})S/.exec(duration);
  if (!durationMatch) return time;

  const [_, durHours, durMinutes, durSeconds] = durationMatch.map(Number);

  const newDate = new Date();
  newDate.setHours(hours, minutes, seconds);
  newDate.setHours(newDate.getHours() + durHours);
  newDate.setMinutes(newDate.getMinutes() + durMinutes);
  newDate.setSeconds(newDate.getSeconds() + durSeconds);

  return newDate.toTimeString().slice(0, 5); // return "hh:mm"
}

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

export const weekdaysMap = [
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
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};
