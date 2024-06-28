import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "./ui/switch";
import Link from "next/link";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const TaskCard = () => {
  return (
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
        <Label>Question</Label>
        <Textarea placeholder="I'd be happy to help you with that. I'll need some information from you first to verify your identity." />
        <div className="flex items-center space-x-2 mt-5 ">
          <Checkbox id="terms" className="" defaultChecked />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required
          </label>
        </div>
        <CardTitle className="mt-5">Response </CardTitle>
        <Select>
          <SelectTrigger className="w-full mt-3">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Free text</SelectItem>
            <SelectItem value="2">Number</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full flex justify-end mt-4">
          <Button variant="outline" className=" ">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
