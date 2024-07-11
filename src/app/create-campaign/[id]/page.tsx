"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  addCampaignsAction,
  editCampaignsAction,
  getcampaignsDatByIdAction,
} from "@/redux/action/campaigns-action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const CreateCampaign = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isEdit = !params.id.includes("create");
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    is_active: false,
  });
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );
console.log('campaignDataById',campaignDataById)
  useEffect(() => {
    if (isEdit) {
      dispatch(getcampaignsDatByIdAction(params?.id))
    }
  }, [isEdit]);

  useEffect(() => {
    if (campaignDataById) {
      setFormValues({
        name: campaignDataById?.name,
        description: campaignDataById?.description,
        is_active: campaignDataById?.is_active,
      })
    }
  }, [campaignDataById]);

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
    <>
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
    </>
  );
};

export default CreateCampaign;
