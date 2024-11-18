import { Label } from "@/lib/ui/label";
import { RadioGroup, RadioGroupItem } from "@/lib/ui/radio-group";
import { useState } from "react";
import GroupSegment from "./GroupSegment";
import EntireAudience from "./EntireAudience";

const Segments = () => {
  const [entireAudience, setEntireAudience] = useState("group");

  if (entireAudience == "group") {
    return <GroupSegment />;
  }
  // return (
  //   <div>
  //     <div>
  //       <RadioGroup
  //         className="flex gap-10 mt-10"
  //         value={entireAudience}
  //         onValueChange={(value) => setEntireAudience(value)}
  //       >
  //         <div className="flex items-center space-x-2">
  //           <RadioGroupItem value="group" id="r1" />
  //           <Label htmlFor="r1" className="text-base font-normal">Group or new segment</Label>
  //         </div>
  //         <div className="flex items-center space-x-2">
  //           <RadioGroupItem value="entireAudience" id="r2" />
  //           <Label htmlFor="r2" className="text-base font-normal">Entire audience</Label>
  //         </div>
  //       </RadioGroup>
  //     </div>
  //     {entireAudience === "group" ? <GroupSegment /> : <EntireAudience />}
  //   </div>
  // );
};

export default Segments;
