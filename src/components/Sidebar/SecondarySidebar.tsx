import Image from "next/image";
import ArrowLeft from "../../../public/ArrowLeft.svg";

interface SecondarySidebarProps {
  setShowSecondarySidebar: any;
}

export const SecondarySidebar = ({
  setShowSecondarySidebar,
}: SecondarySidebarProps) => {
  return (
    <nav className="h-[calc(100vh - 100px)] flex flex-col bg-white border-r shadow-sm opacity-100 w-[360px] my-4">
      <ul className="flex-1 px-3">
        <div
          className="flex items-center justify-center cursor-pointer w-full h-[36px] border gap-2 border-[#E2E8F0] my-4 rounded-md "
          onClick={() => setShowSecondarySidebar(false)}
        >
          <Image src={ArrowLeft} alt="" width={20} height={20} />
          <p>Close Menu</p>
        </div>
        {[1, 2, 3, 4, 5]?.map((ele) => (
          <div
            className={`
      flex items-center relative py-3  my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
            flex-row px-2 hover:bg-[#f4f4f5] text-gray-600
      `}
          >
            Schedule
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default SecondarySidebar;
