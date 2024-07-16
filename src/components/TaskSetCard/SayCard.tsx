import { SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/lib/ui/card";
import { Switch } from "@/lib/ui/switch";
import Link from "next/link";
import { Label } from "@/lib/ui/label";
import { Checkbox } from "@/lib/ui/checkbox";
import { Input } from "@/lib/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { DotsThree, CopySimple, TrashSimple } from "@phosphor-icons/react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/lib/ui/sheet";
import { Button } from "@/lib/ui/button";
import { Textarea } from "@/lib/ui/textarea";
import { useDispatch } from "react-redux";
import { deleteComponent } from "@/redux/componentsSlice";

const SayCard = ({ allClosed, handleToggle }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState(inputValue);
  const dispatch = useDispatch();

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    setSavedValue(inputValue);
  };

  const handleDelete = (componentName: string) => {
    dispatch(deleteComponent(componentName));
  };

  return (
    <Sheet>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={allClosed.includes("say") ? "item-1" : undefined}
      >
        <AccordionItem value="item-1">
          <Card className="w-full">
            <CardHeader className="space-y-0 py-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AccordionTrigger onClick={() => handleToggle("say")} />
                  <CardTitle className="text-sm">1. Say</CardTitle>
                </div>
                <Switch defaultChecked className="" />
              </div>
            </CardHeader>
            {allClosed.includes("say") && (
              <AccordionContent>
                <CardContent className="flex flex-col items-start py-1">
                  <SheetTrigger>
                    {savedValue ? (
                      <p className="text-[#18181B] text-sm">{savedValue}</p>
                    ) : (
                      <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="text-sm border-none focus-visible::outline-none w-full"
                        placeholder="This verification process ..."
                      />
                    )}
                  </SheetTrigger>
                  <div className="flex items-center gap-4 justify-end mt-4 w-full">
                    <DotsThree size={20} />
                    <CopySimple size={20} />
                    <button onClick={() => handleDelete("say")}>
                      {" "}
                      <TrashSimple size={20} />
                    </button>
                    <div className="flex gap-1 ">
                      <Checkbox id="terms" className="" defaultChecked />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Required
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            )}
          </Card>
        </AccordionItem>
      </Accordion>
      <SheetContent>
        <SheetClose />
        <Card className="w-[330px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>1. Say </CardTitle>
              <Switch defaultChecked />
            </div>
            <CardDescription>
              Explore more in{" "}
              <Link href="" className="underline">
                prompt engineering guide
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Statement</Label>
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="I'd be happy to help you with that. I'll need some information from you first to verify your identity."
            />
            <div className="flex items-center space-x-2 mt-5 ">
              <Checkbox id="terms" className="" defaultChecked />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>

            <div className="w-full flex justify-end mt-4">
              <SheetClose asChild>
                <Button variant="outline" className=" " onClick={handleSave}>
                  Save
                </Button>
              </SheetClose>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SayCard;
