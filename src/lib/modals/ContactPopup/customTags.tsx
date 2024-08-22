import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/ui/command";
import React, { useEffect } from "react";
import { Checkbox } from "@/lib/ui/checkbox";
import { Input } from "@/lib/ui/input";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  tagsListAction,
  addTagAction,
} from "../../../redux/action/tags-action";
import { toast } from "react-toastify";

const CustomTags = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [newTag, setNewTag] = React.useState("");
  const { tagsList }: any = useAppSelector((state: any) => state.tagReducer);

  useEffect(() => {
    dispatch(tagsListAction());
  }, []);

  return (
    <div>
      <div className="my-4 border-[#D4D4D8] border-[0.5px] rounded">
        <Command>
          <CommandInput
            placeholder="Search tag..."
            className="h-9"
            onChangeCapture={(e) =>
              setOpen(e.currentTarget.value === "" ? false : true)
            }
          />
          <CommandList>
            <div className="p-2 mt-2">
              <Input
                placeholder="Tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
            <p
              className="text-sm font-normal text-[#18181B] p-[10px] cursor-pointer"
              onClick={() => {
                if (newTag?.length) {
                  dispatch(addTagAction({ name: newTag }));
                } else {
                  toast.error("Please enter a tag name.");
                }
              }}
            >
              Create new tag
            </p>
            {value?.length ? (
              <p className="flex gap-2 flex-wrap p-[10px] border-t-[1px] border-[lightgray]">
                {value?.map((ele: any, index: any) => {
                  return (
                    <p
                      key={index}
                      className="bg-black flex gap-1 text-white py-1 px-2 rounded"
                    >
                      {ele?.name}{" "}
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
                  {tagsList.map((ele: any) => (
                    <CommandItem
                      className="flex gap-3 m-2 mt-3"
                      key={ele.name}
                      value={ele.name}
                      onSelect={() => {
                        setValue((prevValue: any) => {
                          if (
                            prevValue.some(
                              (item: any) => item.name === ele.name
                            )
                          ) {
                            return prevValue.filter(
                              (item: any) => item.name !== ele.name
                            );
                          } else {
                            return [...prevValue, ele];
                          }
                        });
                      }}
                    >
                      <Checkbox
                        checked={value.some((ele1) => ele1 === ele?.name)}
                      />
                      <p className="bg-black flex gap-1 text-white py-1 px-2 rounded">
                        {ele?.name}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandEmpty>No tag found</CommandEmpty>
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
