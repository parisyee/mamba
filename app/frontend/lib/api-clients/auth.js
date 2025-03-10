import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "@/constants";
import { defaultHeaders } from "./default-headers";

export const createAccessToken = async (email, password) => {
  return await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
};

export const getTokenInfo = async (token) => {
  return await fetch(`${BASE_URL}/oauth/token/info`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
};

export const revokeAccessToken = async () => {
  return await fetch(`${BASE_URL}/oauth/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("accessToken"),
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
};