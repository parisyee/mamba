import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "@/constants";

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