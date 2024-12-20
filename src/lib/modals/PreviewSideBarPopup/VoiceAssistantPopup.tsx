'use client';

import '@livekit/components-styles';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ControlBar, getLivekitTokenAPI, SimpleVoiceAssistant } from './helper';
import { AgentState, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';

const VoiceAssistantPopup = () => {
  const params = useParams()
  const [voiceData, setVoiceData] = useState<any>('');
  const [agentState, setAgentState] = useState<AgentState>("disconnected");

  useEffect(() => {
    getLivekitTokenAPI(setVoiceData,params)
  }, []);

  const onConnectButtonClicked = async () => {
    await getLivekitTokenAPI(setVoiceData,params)
  };

  if (voiceData?.token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      audio={true}
      token={voiceData?.token}
      serverUrl={voiceData?.server_url}
      data-lk-theme="default"
      style={{ height: '400px' }}
    >
      <SimpleVoiceAssistant onStateChange={setAgentState} />
      <ControlBar
        onConnectButtonClicked={onConnectButtonClicked}
        agentState={agentState}
      />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}



export default VoiceAssistantPopup