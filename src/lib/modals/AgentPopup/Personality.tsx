import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Label } from "@/lib/ui/label";
import { Textarea } from "@/lib/ui/textarea";

const Personality = ({ formik }: any) => {
  return (
    <AccordionItem value="personality">
      <AccordionTrigger>Personality</AccordionTrigger>
      <AccordionContent>
        <div className="mt-3">
          <p className="bg-[#F4F4F5] text-[#3F3F46] font-medium	text-xs p-2 rounded w-fit">
            + add personality traits
          </p>
        </div>
        <div className="mt-5">
          <Label>Identity</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="identity"
            value={formik.values.identity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mt-5">
          <Label>Style Guardrails</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="styleGuardrails"
            value={formik.values.styleGuardrails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mt-5">
          <Label>Response Guidelines</Label>
          <Textarea
            className="mt-1 focus-visible:outline-none focus-visible:ring-0"
            name="responseGuidelines"
            value={formik.values.responseGuidelines}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Personality;
