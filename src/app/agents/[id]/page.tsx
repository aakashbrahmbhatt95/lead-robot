"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  AgentState,
  DisconnectButton,
} from "@livekit/components-react";
import { useCallback, useEffect, useState } from "react";
import { MediaDeviceFailure } from "livekit-client";
import { ConnectionDetails } from "@/app/api/connection-details/route";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import { NoAgentNotification } from "@/lib/molecules/LiveKitComponent/NoAgentNotification";
import { CloseIcon } from "@/lib/molecules/LiveKitComponent/CloseIcon";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL1 } from "@/utils/apiConstants";
import { getToken } from "@/utils/constants";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const [connectionDetails, setConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined);
  const [agentState, setAgentState] = useState<AgentState>("disconnected");

  const onConnectButtonClicked = useCallback(async () => {
    try {
      const res = await HttpUtil.makeGET(
        `${BASE_URL1}/agents/${params?.id}`,
        "",
        {
          Authorization: getToken(),
        }
      );
      toast.success("Agent details fetch successfully");
      setConnectionDetails({
        serverUrl: res?.data?.server_url,
        roomName: res?.data?.room_name,
        participantToken: res?.data?.token,
        participantName: res?.data?.participant_identity,
      });
    } catch (err: any) {
      toast.error("Connection failed");
      return err;
    }
  }, []);

  return (
    <main
      data-lk-theme="default"
      className="h-full grid content-center bg-[var(--lk-bg)]"
    >
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio={true}
        video={false}
        onMediaDeviceFailure={onDeviceFailure}
        onDisconnected={() => {
          setConnectionDetails(undefined);
          toast.error("Connection failed");
        }}
        className="grid grid-rows-[2fr_1fr] items-center"
      >
        <SimpleVoiceAssistant onStateChange={setAgentState} />
        <ControlBar
          onConnectButtonClicked={onConnectButtonClicked}
          agentState={agentState}
        />
        <RoomAudioRenderer />
        <NoAgentNotification state={agentState} />
      </LiveKitRoom>
    </main>
  );
}

function SimpleVoiceAssistant(props: {
  onStateChange: (state: AgentState) => void;
}) {
  const { state, audioTrack }: any = useVoiceAssistant();

  useEffect(() => {
    props.onStateChange(state);
  }, [props, state]);

  useEffect(() => {
    if (state === "connecting") {
      toast.success("Connecting to agent");
    }
    if (state === "connected") {
      toast.success("Agent is ready to speak!");
    }
  }, [state]);

  return (
    <div className="h-[300px] max-w-[90vw] mx-auto">
      <BarVisualizer
        state={state}
        barCount={5}
        trackRef={audioTrack}
        className="agent-visualizer"
        options={{ minHeight: 24 }}
      />
    </div>
  );
}

function ControlBar(props: {
  onConnectButtonClicked: () => void;
  agentState: AgentState;
}) {
  /**
   * Use Krisp background noise reduction when available.
   * Note: This is only available on Scale plan, see {@link https://livekit.io/pricing | LiveKit Pricing} for more details.
   */
  const krisp = useKrispNoiseFilter();
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true);
  }, []);

  return (
    <div className="relative h-[100px]">
      <AnimatePresence>
        {props.agentState === "disconnected" && (
          <motion.button
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="uppercase absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-md"
            onClick={() => props.onConnectButtonClicked()}
          >
            Start a conversation
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {props.agentState !== "disconnected" &&
          props.agentState !== "connecting" && (
            <motion.div
              initial={{ opacity: 0, top: "10px" }}
              animate={{ opacity: 1, top: 0 }}
              exit={{ opacity: 0, top: "-10px" }}
              transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
              className="flex h-8 absolute left-1/2 -translate-x-1/2  justify-center"
            >
              <VoiceAssistantControlBar controls={{ leave: false }} />
              <DisconnectButton>
                <CloseIcon />
              </DisconnectButton>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  toast.error(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
  );
}
