import { api } from "@/lib/ky";
import { HTTPError } from "ky";

export async function createSpace(name: string, userid: string) {
  try {
    await api.post("space/create", { json: { name, userid } });
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}

export async function getSpaces() {
  try {
    const res = await api.get("space/spaces").json();
    return res as Array<Space>;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw new Error(await err.response.text());
    }
    throw new Error("Something went wrong. Try again");
  }
}
