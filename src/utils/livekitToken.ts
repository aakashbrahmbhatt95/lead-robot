import { AccessToken } from "livekit-server-sdk";
import {
  NEXT_PUBLIC_LIVEKIT_API_KEY,
  NEXT_PUBLIC_LIVEKIT_API_SECRET,
} from "./constants";

export const generateLiveKitToken = (
  roomName: string,
  identity: string
): string => {
  const apiKey = NEXT_PUBLIC_LIVEKIT_API_KEY;
  const apiSecret = NEXT_PUBLIC_LIVEKIT_API_SECRET;

  const token: any = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
  });

  return token.toJwt();
};
