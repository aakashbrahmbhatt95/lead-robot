import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import { Button } from "@/lib/ui/button";
import ContactTable from "./contactTable";
import ContactPopup from "@/lib/modals/ContactPopup";
import { Sheet } from "../../lib/ui/sheet";
import EditContactPopup from "../../lib/modals/ContactPopup/editContactPopup";

const Contacts = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isContactPopup, setIsContactPopup] = useState<boolean>(false);
  const [isEditContactPopup, setIsEditContactPopup] = useState<any>(null);

  useEffect(() => {
    if (!isContactPopup) {
      setSelectedTab(1);
    }
  }, [isContactPopup]);

  return (
    <>
      <div className="flex justify-end gap-2 mt-4">
        <Dialog open={isContactPopup} onOpenChange={setIsContactPopup}>
          <DialogTrigger asChild onClick={() => setIsContactPopup(true)}>
            <Button variant="primary" style={{ border: "1px solid black" }}>
              Open Popup
            </Button>
          </DialogTrigger>
          <ContactPopup
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setIsContactPopup={setIsContactPopup}
          />
        </Dialog>
        <Button
          variant="primary"
          type="button"
          style={{ border: "1px solid black" }}
          onClick={() => setIsEditContactPopup("add")}
        >
          + Create Contact
        </Button>
      </div>
      <ContactTable
        setIsEditContactPopup={setIsEditContactPopup}
      />
      <Sheet open={isEditContactPopup !== null}>
        {isEditContactPopup !== null && (
          <EditContactPopup
            isEditContactPopup={isEditContactPopup}
            setIsEditContactPopup={setIsEditContactPopup}
          />
        )}
      </Sheet>
    </>
  );
};

export default Contacts;
