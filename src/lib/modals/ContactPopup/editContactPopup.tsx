"use client";
import { CardTitle } from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/select";
import { SheetClose, SheetContent } from "../../ui/sheet";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import { X } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
import { useFormik } from "formik";
import { contactValidationSchema } from "@/components/validation";
import { Input } from "../../ui/input";
import {
  addContactsAction,
  editContactsAction,
} from "../../../redux/action/contacts-action";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { countriesWithRegionCode } from "../../../components/Contacts/helper";

const EditContactPopup = ({
  isEditContactPopup,
  setIsEditContactPopup,
}: any) => {
  const dispatch = useAppDispatch();
  const isEdit = isEditContactPopup !== "add";
  const [tags, setTags] = useState<any>([]);
  const [contactTagList, setContactTagList] = useState<any>([]);
  const { tagsList }: any = useAppSelector((state: any) => state.tagReducer);
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  useEffect(() => {
    if (tagsList?.length) {
      setContactTagList(tagsList);
    }
  }, [tagsList]);

  useEffect(() => {
    if (isEdit && tagsList) {
      formik.setValues({
        phone: isEditContactPopup?.phone || "",
        country_code: isEditContactPopup?.attributes?.country_code || "",
        attributes: attributesList.reduce((acc, attribute) => {
          acc[attribute.key] =
            isEditContactPopup?.attributes?.[attribute.key] || "";
          return acc;
        }, {}),
      });
      setTags(isEditContactPopup?.tags || []);
      setContactTagList((prevContactTagList: any[]) => {
        const tagsToRemove = isEditContactPopup?.tags || [];
        return prevContactTagList.filter(
          (tag: any) => !tagsToRemove.includes(tag.name)
        );
      });
    }
  }, [isEdit, tagsList]);

  const formik: any = useFormik({
    initialValues: {
      phone: isEditContactPopup?.phone || "",
      country_code: isEditContactPopup?.attributes?.country_code || "",
      attributes: attributesList.reduce((acc, attribute) => {
        acc[attribute.key] =
          isEditContactPopup?.attributes?.[attribute.key] || "";
        return acc;
      }, {}),
      tags: isEditContactPopup?.tags || [],
    },
    enableReinitialize: true,
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      const body = {
        phone: `${values?.country_code}-${values?.phone}`,
        attributes: {
          ...values.attributes,
        },
        tags: tags,
      };
      console.log('body', body)
      if (isEdit) {
        dispatch(editContactsAction(body, isEditContactPopup?.id));
      } else {
        dispatch(addContactsAction(body));
      }
      // setIsEditContactPopup(null);
    },
  });

  const renderAttributeInput = (attribute) => {
    return (
      <div key={attribute.id} className="mb-2">
        <Label htmlFor={`attributes.${attribute.key}`}>{attribute.label}</Label>
        {(() => {
          switch (attribute.type) {
            case "text":
              return (
                <Input
                  id={`attributes.${attribute.key}`}
                  name={`attributes.${attribute.key}`}
                  className="mt-1"
                  placeholder={attribute.label}
                  value={formik.values.attributes[attribute.key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              );
            case "integer":
            case "decimal":
              return (
                <Input
                  id={`attributes.${attribute.key}`}
                  type="number"
                  name={`attributes.${attribute.key}`}
                  className="mt-1"
                  placeholder={attribute.label}
                  value={formik.values.attributes[attribute.key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              );
            case "boolean":
              return (
                <Switch
                  className="mt-1 block"
                  checked={formik.values.attributes[attribute.key]}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue(`attributes.${attribute.key}`, checked)
                  }
                />
              );
            case "select":
              return (
                <Select
                  id={`attributes.${attribute.key}`}
                  name={`attributes.${attribute.key}`}
                  value={formik.values.attributes[attribute.key]}
                  onValueChange={(value) =>
                    formik.setFieldValue(`attributes.${attribute.key}`, value)
                  }
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {attribute.choices.map((ele: any) => (
                      <SelectItem key={ele} value={ele}>
                        {ele}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            case "date":
            case "time":
            case "datetime":
              return (
                <Input
                  id={`attributes.${attribute.key}`}
                  type={attribute.type}
                  name={`attributes.${attribute.key}`}
                  className="mt-1"
                  placeholder={attribute.label}
                  value={formik.values.attributes[attribute.key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <SheetContent className="overflow-scroll">
      <div className="flex justify-end">
        <X
          className="cursor-pointer"
          onClick={() => setIsEditContactPopup(null)}
        />
      </div>
      <div className="flex items-center justify-between">
        <CardTitle>{isEdit ? "Edit Contact" : "Add Contact"}</CardTitle>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-3">
          <Label>Phone Number</Label>
          <div className="flex w-[100%] gap-2 items-center">
            <div className="w-[30%]">
              <Select
                name="country_code"
                defaultValue={formik.values.country_code}
                onValueChange={(value) =>
                  formik.setFieldValue("country_code", value)
                }
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {countriesWithRegionCode?.map((ele: any) => {
                    return (
                      <SelectItem key={ele?.dial_code} value={ele?.dial_code}>
                        {ele?.code} {ele?.dial_code}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <Input
              name="phone"
              className="mt-1 w-[70%]"
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {(formik.touched.phone && formik.errors.phone) ||
          (formik.touched.country_code && formik.errors.country_code) ? (
            <div className="text-red-600">
              {formik.errors.country_code || formik.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="mt-3">
          <Label>Tags</Label>
          <Select
            name="tags"
            onValueChange={(value: any) => {
              setTags([...tags, value]);
              setContactTagList(
                contactTagList.filter((tag: any) => tag.name !== value)
              );
            }}
          >
            <SelectTrigger className="w-full mt-3">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {contactTagList?.map((ele: any) => (
                <SelectItem key={ele.name} value={ele.name}>
                  {ele.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {tags.length > 0 && (
            <div className="flex gap-2 items-center flex-wrap mt-2">
              {tags?.map((tag: string) => (
                <p
                  key={tag}
                  className="bg-black flex gap-2 items-center text-white px-2 py-1 rounded"
                >
                  {tag}{" "}
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setTags(tags.filter((t: any) => t !== tag));
                      setContactTagList((prev: any) => [
                        ...prev,
                        { name: tag },
                      ]);
                    }}
                  />
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3">{attributesList.map(renderAttributeInput)}</div>
        <div className="w-full flex justify-end mt-4">
          <SheetClose asChild>
            <Button type="submit">Save</Button>
          </SheetClose>
        </div>
      </form>
    </SheetContent>
  );
};

export default EditContactPopup;
