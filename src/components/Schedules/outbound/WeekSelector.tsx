interface WeekSelectorProps {
  weekMap: string[];
  weekData: string[];
  setWeekData: any;
  isEdit: boolean;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({
  weekMap,
  weekData,
  setWeekData,
  isEdit,
}) => {
  const handleWeekClick = (day: string) => {
    setWeekData((prev: any) =>
      prev.includes(day) ? prev.filter((d: any) => d !== day) : [...prev, day]
    );
  };
  return (
    <div className="flex gap-2 items-center m-4">
      {weekMap.map((day) => (
        <span
          key={day}
          className={`w-fit text-sm px-2 py-2 cursor-pointer rounded-md ${
            weekData.includes(day)
              ? "bg-blue-500 text-white"
              : "bg-[#F4F4F5] text-[#3F3F46]"
          }`}
          onClick={() => !isEdit && handleWeekClick(day)}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default WeekSelector;
