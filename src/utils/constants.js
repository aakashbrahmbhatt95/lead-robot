import { getCookie } from "cookies-next";

export const TOKEN_KEY = "token";
export const SESSION_KEY = "session";
export const getToken = () => `Bearer ${getCookie(TOKEN_KEY)}`