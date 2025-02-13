export const defaultHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
};
