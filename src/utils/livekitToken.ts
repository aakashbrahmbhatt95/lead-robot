import { AccessToken } from "livekit-server-sdk";

export const generateLiveKitToken = (
  roomName: string,
  identity: string
): string => {
  const apiKey = "APIodnd5ddB9pAq";
  const apiSecret = "MmKML9sRIrcGKfSar5oYUOwjSHAlwfm4uGi0SbQ34N3";

  const token: any = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
  });

  return token.toJwt();
};
