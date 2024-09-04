import { BASE_URL1, GET_CONTACT_IMPORT_JOB_URL } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { HttpUtil } from "@/utils/http-util";
import { toast } from "react-toastify";

export const uploadDryRun = async (body: any, importJobId: any) => {
  const res = await HttpUtil.makePOST(
    `${BASE_URL1}${GET_CONTACT_IMPORT_JOB_URL}${importJobId}/dry-run`,
    body,
    {
      Authorization: getToken(),
    }
  );
  try {
    if (res?.data?.invalid_rows?.length) {
      console.log("res?.data?.invalid_rows", res?.data?.invalid_rows);
      return res;
    } else {
      console.log("success res");
      //   dispatch(
      //     importJobContactsByIdAction(body, importJobId, setIsContactPopup)
      //   );
    }
    
  } catch (err: any) {
    toast.error("Oops! Something went wrong");
    return err;
  }
};

export const getImportJobId = async (body: any, fileUploadData: any) => {
  try {
    let res = await HttpUtil.makePOST(
      `${BASE_URL1}${GET_CONTACT_IMPORT_JOB_URL}`,
      body,
      {
        Authorization: getToken(),
      }
    );
    if (res?.success) {
      res = await uploadDryRun(fileUploadData, res?.data?.id);
    }
    if (res?.error) {
      toast.error(
        JSON.stringify(res?.data?.errors?.[0]) || "Oops! Something went wrong"
      );
    }
    return res;
  } catch (err) {
    toast.error("Oops! Something went wrong");
    return err;
  }
};
