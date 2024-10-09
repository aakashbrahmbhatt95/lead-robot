import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Button } from "@/lib/ui/button";
import { Label } from "@/lib/ui/label";
import { Switch } from "@/lib/ui/switch";
import { Plus, ShieldAlert } from "lucide-react";

const SecuritySettings = ({formik}: any) => {
  return (
    <AccordionItem value="securitysettings">
      <AccordionTrigger>
        <div className="flex gap-3">
          <ShieldAlert /> Security Settings
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-8">
          <Label>Opt Out Sensative Data Storage</Label>
          <p className="text-[#71717A] text-sm font-normal">
            Control whether we should store sensitive data. (Learn more)
          </p>
          <Switch
            className="mt-2"
            name="opt_out_sensitive_data_storage"
            checked={formik.values.opt_out_sensitive_data_storage}
            onCheckedChange={(checked) =>
              formik.setFieldValue("opt_out_sensitive_data_storage", checked)
            }
          />
        </div>
        <div className="mt-8">
          <Label>Fallback Value</Label>
          <p className="text-[#71717A] text-sm font-normal">
            If the current voice provider fails, assign a fallback voice to
            continue the call.
          </p>
          <Button variant="outline" className="mt-3 flex gap-1">
            <Plus width={16} height={16} /> Add
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SecuritySettings;
