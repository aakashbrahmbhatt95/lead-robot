import { useState, useEffect } from "react";

export const useVoicePlayer = () => {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    // Cleanup: stop audio when component unmounts
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
    };
  }, [audioInstance]);

  const handlePlayPause = (e: any, voice: any) => {
    e.stopPropagation();

    if (audioInstance && playingVoiceId === voice.voice_id) {
      // If the same voice is playing, pause it
      audioInstance.pause();
      setPlayingVoiceId(null);
    } else {
      // Pause any currently playing audio
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }

      // Play new voice
      const newAudio = new Audio(voice.preview_audio_url);
      setAudioInstance(newAudio);
      setPlayingVoiceId(voice.voice_id);
      newAudio.play();

      // Reset playing state when audio ends
      newAudio.onended = () => {
        setPlayingVoiceId(null);
      };
    }
  };

  return {
    playingVoiceId,
    handlePlayPause,
  };
};
