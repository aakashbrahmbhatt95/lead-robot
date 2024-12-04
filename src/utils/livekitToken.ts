import { AccessToken } from "livekit-server-sdk";

export const generateLiveKitToken = (
  roomName: string,
  identity: string
): string => {
  const apiKey = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET;

  const token: any = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
  });

  return token.toJwt();
};
