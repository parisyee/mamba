import { BASE_URL } from "@/constants";
import { defaultHeaders } from "./default-headers";

export const createProject = async (project) => {
  return await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      project,
    }),
  });
};