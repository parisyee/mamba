import { BASE_URL } from "@/constants";
import { defaultHeaders } from "./default-headers";

export const createProject = async (project) => {
  return await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify({
      project,
    }),
  });
};

export const getProjects = async () => {
  return await fetch(`${BASE_URL}/projects`, {
    headers: defaultHeaders(),
  });
};

export const getProject = async (id) => {
  return await fetch(`${BASE_URL}/projects/${id}`, {
    headers: defaultHeaders(),
  });
};