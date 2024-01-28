import ky from "ky";

export const api = ky.extend({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }
    ]
  },
})
