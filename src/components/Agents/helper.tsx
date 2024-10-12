import { Play } from "lucide-react";

export const initialAgentValues = {
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
};

export const getSelectedVoiceData = (voice_id: any, voiceList: any) => {
  const filteredVoiceId = voiceList?.filter(
    (ele: any) => ele.voice_id === voice_id
  )?.[0];
  console.log("filteredVoiceId", filteredVoiceId);
  return (
    <>
      <div className="flex">
        <img src={filteredVoiceId?.avatar_url} alt="" width={30} height={30} />
        <div>
          <p className="font-medium text-xs ml-3 capitalize">
            {filteredVoiceId?.voice_name}
          </p>
          <div
            className="bg-[#F4F4F5] rounded ml-3 w-fit p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const audio = new Audio(filteredVoiceId?.preview_audio_url);
              audio.play();
            }}
          >
            <Play fill="black" width={12} height={12} />
          </div>
        </div>
      </div>
      <p className="font-sm text-xs mt-3 capitalize">
        {filteredVoiceId?.provider} &nbsp;{filteredVoiceId?.accent} &nbsp;{" "}
        {filteredVoiceId?.gender}
      </p>
      <p className="font-sm text-xs mt-1 capitalize">
        {filteredVoiceId?.age} &nbsp; {filteredVoiceId?.voice_type}
      </p>
    </>
  );
};
