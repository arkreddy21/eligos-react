import ky from "ky";

export const api = ky.extend({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      request => {
        // token need to be sliced as it is serialized as json via mantine hook
        request.headers.set("Authorization", `Bearer ${localStorage.getItem("token")?.slice(1,-1)}`);
      }
    ]
  },
})
