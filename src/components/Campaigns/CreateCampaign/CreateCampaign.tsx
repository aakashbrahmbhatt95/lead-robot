"use client";

import { useEffect, useState } from "react";
import { Input } from "@/lib/ui/input";
import { Switch } from "@/lib/ui/switch";
import {
  addCampaignsAction,
  editCampaignsAction,
  getcampaignsDatByIdAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/lib/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { CampaignValidationSchema } from "@/components/validation";

const CreateCampaign = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isEdit = !params.id.includes("create");
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id));
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && campaignDataById) {
      setInitialValues({
        name: campaignDataById?.name,
        description: campaignDataById?.description,
        is_active: campaignDataById?.is_active,
      });
    }
  }, [isEdit, campaignDataById]);

  const handleSubmit = (values: any) => {
    if (isEdit) {
      dispatch(
        editCampaignsAction(
          {
            ...campaignDataById,
            ...values,
          },
          params?.id,
          router
        )
      );
    } else {
      dispatch(addCampaignsAction(values, router));
    }
  };

  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">
        {isEdit ? "Edit" : "Create"} Campaign
      </h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={CampaignValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="flex justify-between">
              <div className="flex-1 basis-1/3 p-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field as={Input} type="text" name="name" className="w-full" />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
              <div className="flex-1 basis-1/3 p-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as={Input}
                  type="text"
                  name="description"
                  className="w-full"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="flex-1 basis-1/3 p-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  IsActive
                </label>
                <Switch
                  checked={values.is_active}
                  onCheckedChange={(checked: any) =>
                    setFieldValue("is_active", checked)
                  }
                />
              </div>
            </div>
            <Button type="submit" className="mt-4 p-2 rounded">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/campaigns")}
              className="mt-4 ml-3 p-2 rounded"
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCampaign;
