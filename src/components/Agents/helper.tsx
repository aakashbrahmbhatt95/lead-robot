import VoicePlayer from "./VoicePlayer";

export const initialAgentValues = {
  identity: "",
  style: "",
  response: "",
  language: "",
};

export const initiatRealTimeAgentValues = {
  model: "",
  transcription: "",
  voice: "",
  response_modalities: "",
  temperature: 0.5,
  max_output_tokens: 0,
  turn_detection: "",
  threshold: 0.5,
  prefix_ms: 300,
  silence_duration_ms: 300
  }
export const initialTTSAgentValues = {
  voice_id: "",
  ambient_sound: "",
  responsiveness: 0.50,
  interruption_sensitivity: 0.50,
  enable_backchannel: true,
  backchannel_frequency: 0.50,
  backchannel_words: "",
  boosted_keywords: "",
  enable_transcription_formatting: false,
  reminder_trigger_ms: 0,
  reminder_max_count: 0,
  normalize_for_speech: false,
  enable_voicemail_detection: false,
  voicemail_message: "",
  voicemail_content: "",
  voicemail_detection_timeout_ms: 30000,
  end_call_after_silence_ms: 30000,
  max_call_duration_ms: 30000,
  opt_out_sensitive_data_storage: true,
  voice_temperature: 0.50,
  voice_speed: 0.50,
  volume: 0.50,
  ambient_sound_volume: 0.50,
  fallback_voice_ids: "",
  //Todo
  webhook_url: "",
  pronunciation_dictionary: {},
  voice_model: "",
  //Todo end
  }

export const getSelectedVoiceData = (voice_id: any, voiceList: any) => {
  const filteredVoiceId = voiceList?.filter(
    (ele: any) => ele.voice_id === voice_id
  )?.[0];

  return (
    <>
      <div className="flex">
        <img src={filteredVoiceId?.avatar_url} alt="" width={30} height={30} />
        <div>
          <p className="font-medium text-xs ml-3 capitalize">
            {filteredVoiceId?.voice_name}
          </p>
          <VoicePlayer ele={filteredVoiceId} />
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
