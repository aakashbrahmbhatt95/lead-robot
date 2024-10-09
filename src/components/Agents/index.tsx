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
  getAgentAction,
} from "@/redux/action/agents-action";
import { Sheet } from "@/lib/ui/sheet";
import AgentSettingsPopup from "@/lib/modals/AgentSettingsPopup";
import AgentsPersonality from "./AgentsPersonality";
import { useFormik } from "formik";

const Agents = () => {
  const dispatch = useAppDispatch();
  const [isAgentSettingsPopup, setIsAgentSettingsPopup] = useState<any>(null);
  const [isVoiceLibrary, setIsVoiceLibrary] = useState(false);
  const { agentList }: any = useAppSelector(
    (state: any) => state.agentsReducer
  );

  const formik: any = useFormik({
    initialValues: {
      identity: "",
      style: "",
      response: "",
      language: "",
      voice_id: "",
      ambient_sound: "",
      responsiveness: 100,
      interruption_sensitivity: 100,
      enable_backchannel: true,
      backchannel_frequency: 100,
      backchannel_words: "",
      boosted_keywords: "",
      enable_transcription_formatting: false,
      reminder_trigger_ms: 0,
      reminder_max_count: 0,
      normalize_for_speech: false,
      enable_voicemail_detection: false,
      voicemail_message: "",
      voicemail_content: "",
      voicemail_detection_timeout_ms: 100,
      end_call_after_silence_ms: 40,
      max_call_duration_ms: 40,
      opt_out_sensitive_data_storage: true,
      //Todo
      fallback_voice_ids: [],
      webhook_url: "",
      pronunciation_dictionary: {},
      voice_model: "",
      voice_temperature: 1,
      voice_speed: 1,
      volume: 1,
      ambient_sound_volume: 1,
      //Todo end
    },
    onSubmit: (values: any) => {
      dispatch(
        addAgentAction({
          //Todo
          campaign_id: 66,
          name: "Testing",
          //Todo end
          boosted_keywords: values?.boosted_keywords
            ?.split(",")
            .map((item: any) => item.trim()),
          backchannel_words: values?.backchannel_words
            ?.split(",")
            .map((item: any) => item.trim()),
          ...values,
        })
      );
    },
  });

  useEffect(() => {
    dispatch(languagesListAction());
    dispatch(ambientSoundsListAction());
    dispatch(getAgentAction());
  }, [dispatch]);

  useEffect(()=>{
    if (agentList) {
      formik.setValues({
        ...formik.values,
        ...agentList,
      });
    }
  },[agentList])

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
              />
            </Dialog>
          </div>
        </div>
        <AgentsPersonality formik={formik} />
        <div className="flex justify-end mt-5">
          <Button type="submit">Save Agent</Button>
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
