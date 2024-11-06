import { Label } from "@/lib/ui/label";
import { Textarea } from "@/lib/ui/textarea";

const AgentsPersonality = ({ formik }: any) => {
  return (
    <>
      <p className="text-xl text-semibold mt-3">Personality</p>
      <div className="mt-5">
        <Label>Identity</Label>
        <Textarea
          className="mt-1 focus-visible:outline-none focus-visible:ring-0"
          name="identity"
          rows={7}
          onChange={formik.handleChange}
          value={formik.values.identity}
        />
      </div>
      <div className="mt-5">
        <Label>Style Guardrails</Label>
        <Textarea
          className="mt-1 focus-visible:outline-none focus-visible:ring-0"
          name="style"
          rows={7}
          onChange={formik.handleChange}
          value={formik.values.style}
        />
      </div>
      <div className="mt-5">
        <Label>Response Guidelines</Label>
        <Textarea
          className="mt-1 focus-visible:outline-none focus-visible:ring-0"
          name="response"
          rows={7}
          onChange={formik.handleChange}
          value={formik.values.response}
        />
      </div>
    </>
  );
};

export default AgentsPersonality;
