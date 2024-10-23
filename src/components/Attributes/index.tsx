import { useState } from "react";
import { Button } from "@/lib/ui/button";
import { Sheet } from "../../lib/ui/sheet";
import AttributePopup from "./AttributePopup";
import AttributeTable from "./AttributeTable";

const Attributes = () => {
  const [isAttributePopup, setIsAttributePopup] = useState<any>(null);

  return (
    <>
      <div className="flex justify-end mt-4">
        <Button
          variant="primary"
          type="button"
          style={{ border: "1px solid black" }}
          onClick={() => setIsAttributePopup("add")}
        >
          + Create Attribute
        </Button>
      </div>
      <AttributeTable setIsAttributePopup={setIsAttributePopup} />
      <Sheet open={isAttributePopup !== null}>
        {isAttributePopup !== null && (
          <AttributePopup
            isAttributePopup={isAttributePopup}
            setIsAttributePopup={setIsAttributePopup}
          />
        )}
      </Sheet>
    </>
  );
};

export default Attributes;
