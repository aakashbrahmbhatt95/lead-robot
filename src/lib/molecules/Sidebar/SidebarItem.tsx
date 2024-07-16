import { createContext, useContext } from "react";

interface SidebarContextType {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  expanded: false,
});

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
  handleSidebarItemClick?: any;
}

export const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  handleSidebarItemClick,
}: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
      flex items-center relative py-3  my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active && expanded
              && "bg-white"
          }
          ${
            expanded
              ? "flex-row px-2 hover:bg-white text-gray-600"
              : "flex-col px-0"
          }
      `}
      onClick={() => handleSidebarItemClick(text)}
    >
      <div className={` ${
            active && !expanded
              &&
              "px-4 py-2 rounded-3xl h-9 items-center flex justify-center bg-white w-full"
          }
          ${
            !expanded
            && "hover:bg-white text-gray-600 px-4 py-2 rounded-3xl h-9 items-center flex justify-center w-full"
          }
          `}>
        {icon}
        </div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3" : "ml-0 mt-2"
        }`}
        >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
};
