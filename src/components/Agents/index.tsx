import { Button } from "@/lib/ui/button";
import speaker from "@/../public/speaker.svg";
import Image from "next/image";
import LanguageSelection from "@/lib/modals/AgentSettingsPopup/LanguageSelection";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import VoiceLibrary from "@/lib/modals/VoiceLibrary";
import {
  addAgentAction,
  editAgentAction,
} from "@/redux/action/agents-action";
import { Sheet } from "@/lib/ui/sheet";
import AgentSettingsPopup from "@/lib/modals/AgentSettingsPopup";
import AgentsPersonality from "./AgentsPersonality";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { getSelectedVoiceData, initialAgentValues, initialTTSAgentValues, initiatRealTimeAgentValues } from "./helper";
import { Accordion } from "@/lib/ui/accordion";
import SpeechSettings from "@/lib/modals/AgentSettingsPopup/SpeechSettings";
import CallSettings from "@/lib/modals/AgentSettingsPopup/CallSettings";
import SecuritySettings from "@/lib/modals/AgentSettingsPopup/SecuritySettings";
import { Switch } from "@/lib/ui/switch";
import RealTimeSettings from "@/lib/modals/AgentSettingsPopup/RealTimeSettings";
import { History } from "lucide-react";

const Agents = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [isAgentSettingsPopup, setIsAgentSettingsPopup] = useState<any>(null);
  const [voicesList, setVoicesList] = useState([]);
  const [isRealTime, setIsRealTime] = useState(true);
  const [isVoiceLibrary, setIsVoiceLibrary] = useState(false);

  const { agentDataByID }: any = useAppSelector((state: any) => state.agentsReducer);
  const { campaignDataById }: any = useAppSelector((state: any) => state.campaignReducer);
  const {
    realTimeTurnDetectionList,
    realTimeResponseModalitiesList,
    realTimeTranscriptionsList,
    realTimeModelsList,
  }: any = useAppSelector((state: any) => state.agentsReducer);

  useEffect(() => {
    if (agentDataByID !== null) {
      formik.setValues({
        ...formik.values,
        openai_settings: agentDataByID?.openai_settings,
        id: agentDataByID?.id,
        campaign: agentDataByID?.campaign,
        name: agentDataByID?.name,
        language: agentDataByID?.language,
        identity: agentDataByID?.identity,
        style: agentDataByID?.style,
        response: agentDataByID?.response,
        active_settings: agentDataByID?.active_settings,
        ...(agentDataByID?.active_settings === "tts" ? agentDataByID?.tts_settings : agentDataByID?.openai_settings),
        backchannel_words: agentDataByID?.tts_settings?.backchannel_words?.join(","),
        boosted_keywords: agentDataByID?.tts_settings?.boosted_keywords?.join(","),
        fallback_voice_ids: agentDataByID?.tts_settings?.fallback_voice_ids?.[0],
      });
      setIsRealTime(agentDataByID?.active_settings === "tts" ? false : true);
    } else {
      formik.setValues({
        ...initialAgentValues,
        ...(isRealTime ? {
          ...initiatRealTimeAgentValues,  
          model: realTimeModelsList?.length === 1 ? realTimeModelsList?.[0]?.value : "",
          transcription: realTimeTranscriptionsList?.length === 1 ? realTimeTranscriptionsList?.[0]?.value : "",
          response_modalities: realTimeResponseModalitiesList?.length === 1 ? realTimeResponseModalitiesList?.[0]?.value : "",
          turn_detection: realTimeTurnDetectionList?.length === 1 ? realTimeTurnDetectionList?.[0]?.value : "",
        } : initialTTSAgentValues),
      });
    }
  }, [agentDataByID]);

  const formik = useFormik({
    initialValues: {
      ...initialAgentValues,
      ...(isRealTime ? {
        ...initiatRealTimeAgentValues, 
        model: realTimeModelsList?.length === 1 ? realTimeModelsList?.[0]?.value : "",
        transcription: realTimeTranscriptionsList?.length === 1 ? realTimeTranscriptionsList?.[0]?.value : "",
        response_modalities: realTimeResponseModalitiesList?.length === 1 ? realTimeResponseModalitiesList?.[0]?.value : "",
        turn_detection: realTimeTurnDetectionList?.length === 1 ? realTimeTurnDetectionList?.[0]?.value : "",
      } : initialTTSAgentValues),
    },
    onSubmit: (values: any) => {
      const body = {
        campaign_id: params?.id,
        name: campaignDataById?.name || "Agents",
        ...values,
        boosted_keywords: values?.boosted_keywords?.split(",").map((item: any) => item.trim()),
        backchannel_words: values?.backchannel_words?.split(",").map((item: any) => item.trim()),
        fallback_voice_ids: [values?.fallback_voice_ids],
      };

      if (agentDataByID !== null) {
        dispatch(editAgentAction(body, isRealTime));
      } else {
        dispatch(addAgentAction(body, isRealTime));
      }
    },
  });

  const handleRealTimeChange = (checked: boolean) => {
    setIsRealTime(checked);
    formik.resetForm({
      values: {
        ...initialAgentValues,
        ...(checked ? {
          ...initiatRealTimeAgentValues, 
          model: realTimeModelsList?.length === 1 ? realTimeModelsList?.[0]?.value : "",
          transcription: realTimeTranscriptionsList?.length === 1 ? realTimeTranscriptionsList?.[0]?.value : "",
          response_modalities: realTimeResponseModalitiesList?.length === 1 ? realTimeResponseModalitiesList?.[0]?.value : "",
          turn_detection: realTimeTurnDetectionList?.length === 1 ? realTimeTurnDetectionList?.[0]?.value : "",
        } : initialTTSAgentValues),
      },
    });
  };

  return (
    <div className="flex gap-4 mt-10">
      <form onSubmit={formik.handleSubmit} className="w-[65%]">
        <div className="flex items-center mb-5">
          <label className="block pr-2 text-sm font-medium text-gray-700" style={{ fontWeight: !isRealTime ? "bold" : "" }}>Text to speech</label>
          <Switch checked={isRealTime} onCheckedChange={handleRealTimeChange} />
          <label className="block pl-2 text-sm font-medium text-gray-700" style={{ fontWeight: isRealTime ? "bold" : "" }}>Real time</label>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl text-semibold">Voice</p>
          <Button
            type="button"
            variant="outline"
            className="flex gap-2 items-center"
            onClick={() => setIsAgentSettingsPopup({ isEdit: false })}
          >
            <History width={20} height={20} />
            Version history
          </Button>
        </div>
        <div className="flex items-center border-[1px] mt-4 p-[20px] border-[#E4E4E7] rounded">
          <div className="w-1/4 flex flex-col justify-center items-center">
            {formik?.values?.voice_id || formik?.values?.voice ? (
              getSelectedVoiceData(isRealTime ? formik?.values?.voice :formik?.values?.voice_id, voicesList)
            ) : (
              <Image width={96} height={96} src={speaker} alt="speaker" />
            )}
          </div>
          <div className="w-3/4">
            <LanguageSelection formik={formik} />
            <Dialog open={isVoiceLibrary} onOpenChange={setIsVoiceLibrary}>
              <DialogTrigger asChild>
                <Button className="mt-3">Select Voice</Button>
              </DialogTrigger>
              <VoiceLibrary
                formik={formik}
                keyName={isRealTime ? "voice": "voice_id"}
                setIsVoiceLibrary={setIsVoiceLibrary}
                voicesList={voicesList}
                setVoicesList={setVoicesList}
                isRealTime={isRealTime}
              />
            </Dialog>
          </div>
        </div>
        <AgentsPersonality formik={formik} />
        <div className="flex justify-end mt-5">
          <Button type="submit">
            {agentDataByID !== null ? "Update Agent" : "Save Agent"}
          </Button>
        </div>
      </form>
      <div className="w-[35%] mt-10">
        {isRealTime ? (
          <RealTimeSettings formik={formik} />
        ) : (
          <Accordion type="single" collapsible className="w-full px-3 border-[1px] border-[#E4E4E7] rounded">
            <SpeechSettings formik={formik} />
            <CallSettings formik={formik} />
            <SecuritySettings formik={formik} voicesList={voicesList} setVoicesList={setVoicesList} isRealTime={isRealTime} />
          </Accordion>
        )}
      </div>
      <Sheet open={isAgentSettingsPopup !== null}>
        {isAgentSettingsPopup && <AgentSettingsPopup setIsAgentSettingsPopup={setIsAgentSettingsPopup} />}
      </Sheet>
    </div>
  );
};

export default Agents;
