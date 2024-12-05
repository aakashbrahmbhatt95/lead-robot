import { getCookie } from "cookies-next";

export const TOKEN_KEY = "token";
export const SESSION_KEY = "session";
export const getToken = () => `Bearer ${getCookie(TOKEN_KEY)}`;
export const NEXT_PUBLIC_LIVEKIT_API_KEY = "APIodnd5ddB9pAq";
export const NEXT_PUBLIC_LIVEKIT_API_SECRET =
  "MmKML9sRIrcGKfSar5oYUOwjSHAlwfm4uGi0SbQ34N3";
export const NEXT_PUBLIC_LIVEKIT_URL = "wss://sendcast-2tr69225.livekit.cloud";
export const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
  "1088482495941-e4jgbnmnda3q1k498aa9rp1qrljevit8.apps.googleusercontent.com";
