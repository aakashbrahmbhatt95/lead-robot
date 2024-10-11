import { Input } from "@/lib/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { FieldArray, Field } from "formik";

const ExcludeSegment = ({ values }: any) => {
  return (
    <div className="py-5 px-3 mt-8 border-[1px] border-gray-300">
      <div className="flex items-center gap-2 border-b-[1px] border-gray-300 pb-3">
        <p>
          <span className="font-bold">Exclude</span> if contacts match
        </p>
        <Field as="select" name="excludeCondition">
          {({ field }: any) => (
            <Select
              value={field.value}
              onValueChange={field.onChange(field.name)}
            >
              <SelectTrigger className="w-[100px] mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="any">ANY</SelectItem>
              </SelectContent>
            </Select>
          )}
        </Field>
        <p>of the following conditions:</p>
      </div>

      <FieldArray name="excludeConditions">
        {({ remove, push }) => (
          <>
            {values.excludeConditions.map(
              (excludeCondition: any, index: any) => (
                <div key={index}>
                  {index > 0 && (
                    <p className="pt-3 font-bold">
                      {values?.excludeCondition === "all" ? "AND" : "OR"}
                    </p>
                  )}

                  <div className="flex items-center py-3 gap-2 border-b-[1px] border-gray-300 pb-3">
                    <CircleMinus
                      onClick={() => remove(index)}
                      className="cursor-pointer"
                    />
                    <Field
                      as="select"
                      name={`excludeConditions[${index}].field`}
                    >
                      {({ field }: any) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange(field.name)}
                        >
                          <SelectTrigger className="w-[300px] mt-1">
                            <SelectValue placeholder="Email Address" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email Address</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <Field
                      as="select"
                      name={`excludeConditions[${index}].operator`}
                    >
                      {({ field }: any) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange(field.name)}
                        >
                          <SelectTrigger className="w-[250px] mt-1">
                            <SelectValue placeholder="is" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="is">is</SelectItem>
                            <SelectItem value="is_not">is not</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <Field
                      as={Input}
                      name={`excludeConditions[${index}].value`}
                      className="w-[250px]"
                    />
                  </div>
                </div>
              )
            )}
            <div
              className="flex items-center mt-5 text-[#6f99a8] gap-2 cursor-pointer"
              onClick={() => push({ field: "", operator: "", value: "" })}
            >
              <CirclePlus color="#6f99a8" />
              Add
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default ExcludeSegment;
