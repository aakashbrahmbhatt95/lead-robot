import { X } from "lucide-react";
import { useFormik } from "formik";
import { sayCardValidationSchema } from "@/components/validation";
import speaker from "@/../public/speaker.svg";
import { Accordion } from "@/lib/ui/accordion";
import { SheetClose, SheetContent } from "@/lib/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import Image from "next/image";
import Personality from "./Personality";
import AdvancedSettings from "./AdvancedSettings";
import LanguageSelection from "./LanguageSelection";

const AgentPopup = ({ setIsAgentPopup }: any) => {
  const formik = useFormik({
    initialValues: {
      identity: "",
      styleGuardrails: "",
      responseGuidelines: "",
      type: "",
    },
    enableReinitialize: true,
    validationSchema: sayCardValidationSchema,
    onSubmit: (values) => {
      // handle form submission
    },
  });

  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X className="cursor-pointer" onClick={() => setIsAgentPopup(null)} />
      </div>
      <Card className="w-[330px] mt-4">
        <CardHeader>
          <CardTitle>Agent Name</CardTitle>
          <p className="mt-4">Custom agent</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <LanguageSelection formik={formik} />
            <div className="mt-3 flex items-center gap-3">
              <Image src={speaker} alt="speaker" />
              <p>Voice</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-3">
              <Personality formik={formik} />
              <AdvancedSettings formik={formik} />
            </Accordion>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAgentPopup(null)}
              >
                Cancel
              </Button>
              <SheetClose asChild>
                <Button type="submit">Save & Preview</Button>
              </SheetClose>
            </div>
          </form>
        </CardContent>
      </Card>
    </SheetContent>
  );
};

export default AgentPopup;
