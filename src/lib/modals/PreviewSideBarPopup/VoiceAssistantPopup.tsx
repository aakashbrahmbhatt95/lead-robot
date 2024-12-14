'use client';

import '@livekit/components-styles';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ControlBar, getLivekitTokenAPI, SimpleVoiceAssistant } from './helper';
import { AgentState, LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';

const VoiceAssistantPopup = () => {
  const params = useParams()
  const [token, setToken] = useState('');
  const [agentState, setAgentState] = useState<AgentState>("disconnected");

  useEffect(() => {
    getLivekitTokenAPI(setToken,params)
  }, []);

  const onConnectButtonClicked = async () => {
    await getLivekitTokenAPI(setToken,params)
  };

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      audio={true}
      token={token}
      serverUrl="wss://sendcast-2tr69225.livekit.cloud"
      data-lk-theme="default"
      style={{ height: '500px' }}
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