import { Button } from "@/lib/ui/button";
import { Mic } from "lucide-react";
import speaker from "@/../public/speaker.svg";
import Image from "next/image";
import LanguageSelection from "@/lib/modals/AgentPopup/LanguageSelection";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { languagesListAction } from "@/redux/action/global-action";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import VoiceLibrary from "@/lib/modals/VoiceLibrary";
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
import { getSelectedVoiceData, initialAgentValues } from "./helper";
import { Accordion } from "@/lib/ui/accordion";
import SpeechSettings from "@/lib/modals/AgentSettingsPopup/SpeechSettings";
import CallSettings from "@/lib/modals/AgentSettingsPopup/CallSettings";
import SecuritySettings from "@/lib/modals/AgentSettingsPopup/SecuritySettings";
import { Switch } from "@/lib/ui/switch";
import RealTimeSettings from "@/lib/modals/AgentSettingsPopup/RealTimeSettings";

const Agents = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isAgentSettingsPopup, setIsAgentSettingsPopup] = useState<any>(null);
  const [voicesList, setVoicesList] = useState([]);
  const [isRealTime, setIsRealTime] = useState(false);
  const [isVoiceLibrary, setIsVoiceLibrary] = useState(false);
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
        fallback_voice_ids: agentDataByID?.fallback_voice_ids?.[0],
      });
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
        fallback_voice_ids: [values?.fallback_voice_ids],
      };
      if (agentDataByID?.campaign) {
        dispatch(editAgentAction(body));
      } else {
        dispatch(addAgentAction(body));
      }
    },
  });

  return (
    <div className="flex gap-4 mt-10">
      <form onSubmit={formik.handleSubmit} className="w-[65%]">
        <div className="flex items-center mb-5">
          <Switch
            checked={isRealTime}
            onCheckedChange={(checked: any) =>
              setIsRealTime(checked)
            }
          />
          <label className="block pl-2 text-sm font-medium text-gray-700">
            Real Time
          </label>
        </div>
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
            <Mic width={20} height={20} /> New settings
          </Button>
        </div>
        <div className="flex items-center border-[1px] mt-4 p-[20px] border-[#E4E4E7] rounded">
          <div className="w-1/4 flex flex-col justify-center items-center">
            {formik?.values?.voice_id ? (
              getSelectedVoiceData(formik?.values?.voice_id, voicesList)
            ) : (
              <Image width={96} height={96} src={speaker} alt="speaker" />
            )}
          </div>
          <div className="w-3/4">
            <LanguageSelection formik={formik} />
            <Dialog open={isVoiceLibrary} onOpenChange={setIsVoiceLibrary}>
              <DialogTrigger asChild onClick={() => setIsVoiceLibrary(true)}>
                <Button className="mt-3">
                  Select Voice
                </Button>
              </DialogTrigger>
              <VoiceLibrary
                formik={formik}
                keyName="voice_id"
                setIsVoiceLibrary={setIsVoiceLibrary}
                voicesList={voicesList}
                setVoicesList={setVoicesList}
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
      <div className="w-[35%] mt-10">
        {isRealTime ? <RealTimeSettings formik={formik} /> :
          <Accordion type="single" collapsible className="w-full px-3 border-[1px] border-[#E4E4E7] rounded">
            <SpeechSettings formik={formik} />
            <CallSettings formik={formik} />
            <SecuritySettings
              formik={formik}
              voicesList={voicesList}
              setVoicesList={setVoicesList}
            />
          </Accordion>}
      </div>
      <Sheet open={isAgentSettingsPopup !== null}>
        {isAgentSettingsPopup !== null && (
          <AgentSettingsPopup
            setIsAgentSettingsPopup={setIsAgentSettingsPopup}
            formik={formik}
            voicesList={voicesList}
            setVoicesList={setVoicesList}
          />
        )}
      </Sheet>
    </div>
  );
};

export default Agents;
