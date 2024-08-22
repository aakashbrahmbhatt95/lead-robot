import { useState } from "react";
import { Button } from "@/lib/ui/button";
import { Sheet } from "../../lib/ui/sheet";
import TagPopup from "./TagPopup";
import TagTable from "./TagTable";

const Tags = () => {
  const [isTagPopup, setIsTagPopup] = useState<any>(null);

  return (
    <>
      <div className="flex justify-end mt-4">
        <Button
          variant="primary"
          type="button"
          style={{ border: "1px solid black" }}
          onClick={() => setIsTagPopup("add")}
        >
          + Create Tag
        </Button>
      </div>
      <TagTable setIsTagPopup={setIsTagPopup} />
      <Sheet open={isTagPopup !== null}>
        {isTagPopup !== null && (
          <TagPopup isTagPopup={isTagPopup} setIsTagPopup={setIsTagPopup} />
        )}
      </Sheet>
    </>
  );
};

export default Tags;
