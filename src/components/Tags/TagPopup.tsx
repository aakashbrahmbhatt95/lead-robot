import { SheetClose, SheetContent } from "../../lib/ui/sheet";
import { Label } from "../../lib/ui/label";
import { Button } from "../../lib/ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { useFormik } from "formik";
import { Input } from "../../lib/ui/input";
import { useEffect } from "react";
import { CardTitle } from "../../lib/ui/card";
import { addTagAction, editTagAction } from "../../redux/action/tags-action";
import { tagValidationSchema } from "@/components/validation";

const TagPopup = ({ isTagPopup, setIsTagPopup }: any) => {
  const dispatch = useAppDispatch();
  const isEdit = isTagPopup !== "add";

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        name: isTagPopup?.name || "",
      });
    }
  }, [isEdit]);

  const formik: any = useFormik({
    initialValues: {
      name: isTagPopup?.name || "",
    },
    enableReinitialize: true,
    validationSchema: tagValidationSchema,
    onSubmit: (values) => {
      const body = {
        name: values?.name,
      };
      if (isEdit) {
        dispatch(editTagAction(body, isTagPopup?.id));
      } else {
        dispatch(addTagAction(body));
      }
      setIsTagPopup(null);
    },
  });

  return (
    <SheetContent>
      <div className="flex justify-end">
        <X className="cursor-pointer" onClick={() => setIsTagPopup(null)} />
      </div>
      <div className="flex items-center justify-between">
        <CardTitle>{isEdit ? "Edit Tag" : "Add Tag"}</CardTitle>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <Label>Name</Label>
          <Input
            name="name"
            className="mt-1"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600 mt-1">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="w-full flex justify-end mt-4">
          <SheetClose asChild>
            <Button type="submit" variant="outline">
              Save
            </Button>
          </SheetClose>
        </div>
      </form>
    </SheetContent>
  );
};

export default TagPopup;
