import { Button } from "@/lib/ui/button";
import { Mic } from "lucide-react";
import speaker from "@/../public/speaker.svg";
import Image from "next/image";
import LanguageSelection from "@/lib/modals/AgentPopup/LanguageSelection";
import VersionHistory from "./VersionHistory";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { languagesListAction } from "@/redux/action/global-action";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import VoiceLibrary from "@/lib/modals/VoiceLibrary";
import fill_arrowdown from "@/../public/fill_arrowdown.svg";
import {
  addAgentAction,
  ambientSoundsListAction,
  editAgentAction,
  getAgentAction,
} from "@/redux/action/agents-action";
import { Sheet } from "@/lib/ui/sheet";
import AgentSettingsPopup from "@/lib/modals/AgentSettingsPopup";
import AgentsPersonality from "./AgentsPersonality";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { initialAgentValues } from "./helper";

const Agents = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isAgentSettingsPopup, setIsAgentSettingsPopup] = useState<any>(null);
  const [isVoiceLibrary, setIsVoiceLibrary] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<any>(null);
  const { agentDataByID }: any = useAppSelector(
    (state: any) => state.agentsReducer
  );
  const { campaignDataById }: any = useAppSelector(
    (state: any) => state.campaignReducer
  );

  useEffect(() => {
    dispatch(languagesListAction());
    dispatch(ambientSoundsListAction());
    dispatch(getAgentAction(params?.id));
  }, [dispatch]);

  useEffect(() => {
    if (agentDataByID?.campaign) {
      formik.setValues({
        ...formik.values,
        ...agentDataByID,
        backchannel_words: agentDataByID?.backchannel_words?.join(","),
        boosted_keywords: agentDataByID?.boosted_keywords?.join(","),
      });
      setSelectedVoice(formik.values.voice_id);
    } else {
      formik.setValues(initialAgentValues);
    }
  }, [agentDataByID]);

  const formik: any = useFormik({
    initialValues: { initialAgentValues },
    onSubmit: (values: any) => {
      const body = {
        campaign_id: params?.id,
        name: campaignDataById?.name || "Agents",
        ...values,
        boosted_keywords: values?.boosted_keywords
          ?.split(",")
          .map((item: any) => item.trim()),
        backchannel_words: values?.backchannel_words
          ?.split(",")
          .map((item: any) => item.trim()),
      };
      if (agentDataByID?.campaign) {
        dispatch(editAgentAction(body));
      } else {
        dispatch(addAgentAction(body));
      }
    },
  });

  return (
    <div className="flex gap-4 mt-5">
      <form onSubmit={formik.handleSubmit} className="w-3/4">
        <div className="flex justify-between items-center">
          <p className="text-xl text-semibold">Voice</p>
          <Button
            type="button"
            variant="outline"
            className="flex gap-2 items-center"
            onClick={() =>
              setIsAgentSettingsPopup({
                isEdit: false,
              })
            }
          >
            <Mic width={20} height={20} /> Agent settings
          </Button>
        </div>
        <div className="flex items-center border-[1px] mt-4 p-[20px] border-[#E4E4E7] rounded">
          <div className="w-1/4 flex flex-col justify-center items-center">
            <Image width={96} height={96} src={speaker} alt="speaker" />
            <p className="text-[#71717A] text-sm font-normal mt-2 underline">
              Preview
            </p>
          </div>
          <div className="w-3/4">
            <LanguageSelection formik={formik} />
            <Dialog open={isVoiceLibrary} onOpenChange={setIsVoiceLibrary}>
              <DialogTrigger asChild onClick={() => setIsVoiceLibrary(true)}>
                <div className="mt-2 flex gap-2 items-center">
                  Voice
                  <Image src={fill_arrowdown} alt="arrowDown" />
                  {formik?.values?.voice_id ? (
                    <p>{formik.values.voice_id}</p>
                  ) : null}
                </div>
              </DialogTrigger>
              <VoiceLibrary
                formik={formik}
                setIsVoiceLibrary={setIsVoiceLibrary}
                selectedVoice={selectedVoice}
                setSelectedVoice={setSelectedVoice}
              />
            </Dialog>
          </div>
        </div>
        <AgentsPersonality formik={formik} />
        <div className="flex justify-end mt-5">
          <Button type="submit">
            {agentDataByID?.campaign ? "Update Agent" : "Save Agent"}
          </Button>
        </div>
      </form>
      <div className="w-1/4">
        <VersionHistory />
      </div>
      <Sheet open={isAgentSettingsPopup !== null}>
        {isAgentSettingsPopup !== null && (
          <AgentSettingsPopup
            setIsAgentSettingsPopup={setIsAgentSettingsPopup}
            formik={formik}
          />
        )}
      </Sheet>
    </div>
  );
};

export default Agents;
