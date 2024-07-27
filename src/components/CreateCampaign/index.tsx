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

const CreateCampaign = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isEdit = !params.id.includes("create");
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    is_active: true,
  });
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id));
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && campaignDataById) {
      setFormValues({
        name: campaignDataById?.name,
        description: campaignDataById?.description,
        is_active: campaignDataById?.is_active,
      });
    }
  }, [isEdit,campaignDataById]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      is_active: checked,
    }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      dispatch(editCampaignsAction(formValues, params?.id));
    } else {
      dispatch(addCampaignsAction(formValues));
    }
    router.push("/campaigns");
  };

  return (
    <div className="py-[20px] px-[40px]">
      <h2 className="text-3xl font-semibold text-black">
        {isEdit ? "Edit" : "Create"} Campaign
      </h2>
      <div className="flex justify-between">
        <div className="flex-1 basis-1/3 p-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 basis-1/3 p-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 basis-1/3 p-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            IsActive
          </label>
          <Switch
            checked={formValues.is_active}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
      <Button type="button" onClick={handleSubmit} className="mt-4 p-2 rounded">
        Submit
      </Button>
      <Button
        type="button"
        onClick={() => router.push("/campaigns")}
        className="mt-4 ml-3 p-2 rounded"
      >
        Back
      </Button>
    </div>
  );
};

export default CreateCampaign;
