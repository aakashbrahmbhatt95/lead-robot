import { weekMap } from "./helper";

const WeekSelector = ({
  values,
  setFieldValue,
  isEdit,
}: any) => {
  const handleWeekClick = (day: string) => {
    setFieldValue("weeks", values?.weeks?.includes(day)
      ? values?.weeks?.filter((d: any) => d !== day)
      : [...values?.weeks, day]
    );
  };

  return (
    <div className="flex gap-2 items-center m-4">
      {weekMap.map((ele: any) => (
        <span
          key={ele?.label}
          className={`w-fit text-sm px-2 py-2 cursor-pointer rounded-md ${
            values?.weeks?.includes(ele?.value)
              ? "bg-blue-500 text-white"
              : "bg-[#F4F4F5] text-[#3F3F46]"
          }`}
          onClick={() => !isEdit && handleWeekClick(ele?.value)}
        >
          {ele?.label}
        </span>
      ))}
    </div>
  );
};

export default WeekSelector;
