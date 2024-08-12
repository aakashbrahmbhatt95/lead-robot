import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/ui/command";
import React from "react";
import { Checkbox } from "@/lib/ui/checkbox";
import { Input } from "@/lib/ui/input";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const CustomTags = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [newTag, setNewTag] = React.useState("");

  return (
    <div>
      <div className="my-4 border-[#D4D4D8] border-[0.5px] rounded">
        <Command>
          <CommandInput
            placeholder="Search attribute..."
            className="h-9"
            onChangeCapture={(e) =>
              setOpen(e.currentTarget.value === "" ? false : true)
            }
          />
          <CommandList>
          <div className="p-2 mt-2">
          <Input placeholder="Tag name" value={newTag} onChangeCapture={(e)=>setNewTag(e.target.value)} />
          </div>
            <p
              className="text-sm font-normal text-[#18181B] p-[10px] cursor-pointer"
              onClick={() => frameworks.push({
                value: newTag,
                label: newTag,
              })}
            >
              Create new tag
            </p>
            {value?.length ? (
              <p className="flex gap-2 flex-wrap p-[10px] border-t-[1px] border-[lightgray]">
                {value?.map((ele, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-black flex gap-1 text-white py-1 px-2 rounded"
                    >
                      {ele}{" "}
                      <X
                      className="cursor-pointer"
                        onClick={() => {
                          setValue(value.filter((item) => item !== ele));
                        }}
                      />
                    </p>
                  );
                })}
              </p>
            ) : (
              ""
            )}
            {open && (
              <>
                <CommandGroup>
                  <p className="p-2 text-sm border-t-[1px] border-[lightgray] font-normal text-[#18181B]">
                    Results
                  </p>
                  {frameworks.map((framework) => (
                    <CommandItem
                      className="flex gap-3 m-2 mt-3"
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue((prevValue: any) => {
                          if (prevValue.includes(currentValue)) {
                            return prevValue.filter(
                              (item) => item !== currentValue
                            );
                          } else {
                            return [...prevValue, currentValue];
                          }
                        });
                      }}
                    >
                      <Checkbox
                        checked={value.some((ele) => ele === framework.value)}
                      />
                      <p className="bg-black flex gap-1 text-white py-1 px-2 rounded">
                        {framework.label}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandEmpty>No attribute found</CommandEmpty>
              </>
            )}
          </CommandList>
        </Command>
      </div>
      <p className="text-[#71717A] mt-8 text-sm font-normal">
        1. Search tags and select to add to the campaign. <br />
        2. Create custom new tags by naming them and pressing “create new tag”.
      </p>
    </div>
  );
};

export default CustomTags;
