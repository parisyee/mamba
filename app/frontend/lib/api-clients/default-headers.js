// This must be a function so that the local storage is checked each time
// the headers are requested.
export const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
  }
};
